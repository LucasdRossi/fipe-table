import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid lightgray;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 10px;
`;

export const CarInfoContainer = styled(InfoContainer)``;

export const PriceInfoContainer = styled(InfoContainer)`
  background-color: #e5e5e5;
`;
