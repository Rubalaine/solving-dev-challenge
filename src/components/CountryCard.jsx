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
      <p>
        Nome: {country.name.official} {country.flag}
      </p>
      <p>
        Nome nativo:{" "}
        {country.name.nativeName && Object.keys(country.name.nativeName)
          ? country.name.nativeName[Object.keys(country.name.nativeName)[0]]
              .official
          : "Sem nome nativo"}
      </p>
      <p>Capital: {country.capital && country.capital[0]}</p>
      <p>Região: {country.region}</p>
      <p>Sub-Região: {country.subregion}</p>
      <p>População: {country.population}</p>
      <p>Área: {country.area}</p>
      <p>
        Fusos Horários:{" "}
        {country.timezones.map((timezone, key) => (
          <span key={key}>[ {timezone} ] </span>
        ))}
      </p>
      <a href={country.flags.png}>Vizualizar bandeira</a>
    </Card>
  );
};

export default CountryCard;
