import * as React from "react";

import { Typography, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { Container, Card, FieldsContainer } from "./styles";

import Select from "../../components/Select";
import FipeResult from "../../components/FipeResult";

import { acceptableCategorires } from "../../store/FipeStore";

class HomeComponent extends React.Component {
  render() {
    const {
      requiredInfo,
      fipeResponses,
      setCategory,
      setBrand,
      setModel,
      setYear,
      error,
      loading,
    } = this.props;

    return (
      <React.Fragment>
        <Container>
          <Typography style={{ color: "white" }} variant="h2">
            Tabela Fipe
          </Typography>
          <Typography style={{ color: "white" }} variant="h5">
            Carros , Motos e Caminhões
          </Typography>
          <Card>
            <Typography variant="h6" align="center">
              Selecione categoria, marca, modelo e ano do veículo:
            </Typography>
            <FieldsContainer>
              <Select
                options={acceptableCategorires}
                value={requiredInfo.category}
                handleChange={setCategory}
                label="Categoria"
              />
              <Select
                options={fipeResponses.brands}
                disabled={fipeResponses.brands.length === 0}
                getOptionLabel={(option) => option.nome}
                value={requiredInfo.brand}
                handleChange={setBrand}
                loading={
                  requiredInfo.category &&
                  fipeResponses.brands.length === 0 &&
                  loading
                }
                label="Marca"
              />
              <Select
                options={fipeResponses.models}
                disabled={fipeResponses.models.length === 0}
                getOptionLabel={(option) => option.nome}
                value={requiredInfo.model}
                handleChange={setModel}
                loading={
                  requiredInfo.brand &&
                  fipeResponses.models.length === 0 &&
                  loading
                }
                label="Modelo"
              />
              <Select
                options={fipeResponses.years}
                disabled={fipeResponses.years.length === 0}
                getOptionLabel={(option) => option.nome}
                value={requiredInfo.year}
                handleChange={setYear}
                loading={requiredInfo.model && fipeResponses.years.length === 0}
                label="Ano"
              />
            </FieldsContainer>
            <FipeResult
              results={fipeResponses.finalResult}
              loading={
                requiredInfo.year && !fipeResponses.finalResult && loading
              }
            />
          </Card>
        </Container>
        <Snackbar
          open={error}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default HomeComponent;
