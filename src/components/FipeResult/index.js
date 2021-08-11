import * as React from "react";

import { Container, CarInfoContainer, PriceInfoContainer } from "./styles";

import { Fade, Typography, CircularProgress } from "@material-ui/core";

const FipeResult = (props) => {
  const { results, loading } = props;

  if (results)
    return (
      <Fade in>
        <Container>
          <CarInfoContainer>
            <Typography variant="body1">{results.Marca}</Typography>
            <Typography variant="h6">{results.Modelo}</Typography>
            <Typography variant="body2">
              Código Fipe: <b>{results.CodigoFipe}</b>
            </Typography>
          </CarInfoContainer>
          <PriceInfoContainer>
            <Typography variant="body1">Preço médio</Typography>
            <Typography variant="h5">{results.Valor}</Typography>
            <Typography variant="body2">
              Mês de referência: <b>{results.MesReferencia}</b>
            </Typography>
          </PriceInfoContainer>
        </Container>
      </Fade>
    );
  else if (loading) return <CircularProgress />;

  return <></>;
};

export default FipeResult;
