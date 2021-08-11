import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: calc(100% - 80px);

  transition: width 0.5s;
  padding: 40px;
  margin-top: 50px;

  @media (min-width: 60em) {
    width: 656px !important;
  }

  @media (min-width: 41.5em) {
    width: 550px !important;
  }
`;

export const FieldsContainer = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
