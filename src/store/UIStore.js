import { action, observable, decorate } from "mobx";
import remotedev from "mobx-remotedev";

const _defaultInitialState = {
  error: null,
  loading: false,
};

class UIStore {
  constructor(initialState) {
    this.setInitialState(initialState || _defaultInitialState);
  }

  setInitialState = (initialState) => {
    Object.assign(this, initialState);
  };

  setError = (error) => {
    this.error = error;
  };

  setLoading = (loading) => {
    this.loading = loading;
  };
}

export default remotedev(
  decorate(UIStore, {
    error: observable,
    setInitialState: action,
    setError: action,
  })
);
