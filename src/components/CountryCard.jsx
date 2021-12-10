import React from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 20px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;
const CountryCard = ({ country }) => {
  return (
    <Card>
      <p>Nome: {country.nome}</p>
      <p>Nome nativo: {country.nome_nativo}</p>
      <p>Capital: {country.capital}</p>
      <p>Região: {country.regiao}</p>
      <p>Sub-Região: {country.sub_regiao}</p>
      <p>População: {country.populacao}</p>
      <p>
        Área: {country.area} Km<sup>2</sup>
      </p>
      <p>
        Fusos Horários:{" "}
        {country.fuso_horario.map((timezone, key) => (
          <span key={key}>[ {timezone} ] </span>
        ))}
      </p>
      <a href={country.bandeira}>Vizualizar bandeira</a>
    </Card>
  );
};

export default CountryCard;
