// @flow

import { action, observable, computed, decorate, flow } from "mobx";
import remotedev from "mobx-remotedev";

import { fipeApi } from "../config/fipeApi";

export const acceptableCategorires = ["Carros", "Motos", "Caminhoes"];

const _defaultInitialState = {
  requiredInfo: {
    category: null,
    brand: null,
    model: null,
    year: null,
  },
  fipeResponses: {
    brands: [],
    models: [],
    years: [],
    finalResult: null,
  },
};

class FipeStore {
  constructor(initialState, uiStore) {
    this.setInitialState(initialState || _defaultInitialState);
    this.uiStore = uiStore;
  }

  setInitialState = (initialState) => {
    Object.assign(this, initialState);
  };

  makeRequest = flow(function* () {
    const { category, brand, model, year } = this.requiredInfo;
    this.uiStore.setLoading(true);

    try {
      if (!category && !brand && !model && !year) {
        throw new Error("Missing required informations to call fipe api");
      } else if (category && !brand && !model && !year) {
        const response = yield fipeApi.get(`/${category.toLowerCase()}/marcas`);

        this.fipeResponses = { ...this.fipeResponses, brands: response.data };
      } else if (category && brand && !model && !year) {
        const response = yield fipeApi.get(
          `/${category}/marcas/${brand.codigo}/modelos`
        );

        this.fipeResponses = {
          ...this.fipeResponses,
          models: response.data.modelos,
        };
      } else if (category && brand && model && !year) {
        const response = yield fipeApi.get(
          `/${category}/marcas/${brand.codigo}/modelos/${model.codigo}/anos`
        );

        this.fipeResponses = { ...this.fipeResponses, years: response.data };
      } else {
        const response = yield fipeApi.get(
          `/${category}/marcas/${brand.codigo}/modelos/${model.codigo}/anos/${year.codigo}`
        );

        this.fipeResponses = {
          ...this.fipeResponses,
          finalResult: response.data,
        };
      }
    } catch (error) {
      if (error.response) {
        console.log("error.response", error.response);
        this.uiStore.setError("Ocorreu um erro ao fazer a requisição");
      } else if (error.request) {
        console.log("error.request", error.request);
        this.uiStore.setError("Ocorreu um erro ao fazer a requisição");
      } else {
        console.log("error.message", error.message);
        this.uiStore.setError("Ocorreu um erro ao fazer a requisição");
      }

      yield setTimeout(() => {
        this.uiStore.setError(null);
      }, 2000);
    } finally {
      this.uiStore.setLoading(false);
    }
  }).bind(this);

  setCategory = flow(function* (value) {
    if (!acceptableCategorires.includes(value)) {
      throw new Error(`Invalid category ${value}`);
    }

    this.requiredInfo = {
      category: value,
      brand: null,
      model: null,
      year: null,
    };
    this.fipeResponses = {
      brands: [],
      models: [],
      years: [],
      finalResult: null,
    };

    yield this.makeRequest();
  }).bind(this);

  setBrand = flow(function* (value) {
    if (!this.fipeResponses.brands.includes(value)) {
      throw new Error(`Invalid brand ${value}`);
    }

    this.requiredInfo = {
      ...this.requiredInfo,
      brand: value,
      model: null,
      year: null,
    };
    this.fipeResponses = {
      ...this.fipeResponses,
      models: [],
      years: [],
      finalResult: null,
    };

    yield this.makeRequest();
  }).bind(this);

  setModel = flow(function* (value) {
    if (!this.fipeResponses.models.includes(value)) {
      throw new Error(`Invalid model ${value}`);
    }

    this.requiredInfo = {
      ...this.requiredInfo,
      model: value,
      year: null,
    };
    this.fipeResponses = {
      ...this.fipeResponses,
      years: [],
      finalResult: null,
    };

    yield this.makeRequest();
  }).bind(this);

  setYear = flow(function* (value) {
    if (!this.fipeResponses.years.includes(value)) {
      throw new Error(`Invalid year ${value}`);
    }

    this.requiredInfo = {
      ...this.requiredInfo,
      year: value,
    };
    this.fipeResponses = {
      ...this.fipeResponses,
      finalResult: null,
    };

    yield this.makeRequest();
  }).bind(this);
}

export default remotedev(
  decorate(FipeStore, {
    requiredInfo: observable,
    fipeResponses: observable,
    setInitialState: action,
    setCategory: action,
    setBrand: action,
    setModel: action,
    setYear: action,
  })
);
