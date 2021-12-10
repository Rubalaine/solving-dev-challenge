import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import CountryCard from "./components/CountryCard";
import FilterInput from "./components/FilterInput";
import exportFromJSON from "export-from-json";
const Main = styled.main`
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
`;
const CountryGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
`;
const ButtonsList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
`;
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    const shapeData = (countries) => {
      return countries.map((country) => {
        return {
          nome: country.name.official + " " + country.flag,
          nome_nativo:
            country.name.nativeName && Object.keys(country.name.nativeName)
              ? country.name.nativeName[Object.keys(country.name.nativeName)[0]]
                  .official
              : "Sem nome nativo",
          capital: country.capital && country.capital[0],
          regiao: country.region,
          sub_regiao: country.subregion,
          populacao: country.population,
          fuso_horario: country.timezones,
          bandeira: country.flags.png,
          area: country.area,
        };
      });
    };
    const getCountries = async () => {
      try {
        setIsloading(true);
        const { data } = await axios.get("https://restcountries.com/v3.1/all");
        console.log(data);
        const shapedData = shapeData(data);
        setCountries(shapedData);
        setFilteredCountries(shapedData);
        setIsloading(false);
      } catch (error) {
        console.error("error ocurred", error);
      }
    };
    getCountries();
  }, []);

  const filter = (event) => {
    setFilteredCountries(
      countries.filter(
        (country) =>
          country.nome
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          country.regiao
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          (country.capital &&
            country.capital
              .toLowerCase()
              .includes(event.target.value.toLowerCase()))
      )
    );
  };
  const jsonExporter = (format) => {
    exportFromJSON({
      data: filteredCountries,
      fileName: "paises",
      exportType: format,
    });
  };
  return (
    <Main>
      <Header>
        <h1>Lista de todos os paises do Mundo</h1>
        <FilterInput type="text" placeholder="filtrar" onChange={filter} />
      </Header>
      {isLoading ? (
        <p>Carregando a lista de paises, aguarde ...</p>
      ) : (
        <div>
          <ButtonsList>
            <button onClick={() => jsonExporter("csv")}>
              exportar para CSV
            </button>
            <button onClick={() => jsonExporter("xls")}>
              exportar para XLS
            </button>
            <button onClick={() => jsonExporter("xml")}>
              exportar para XML
            </button>
          </ButtonsList>
          <CountryGrid>
            {filteredCountries.length ? (
              filteredCountries.map((country, index) => (
                <CountryCard country={country} key={index} />
              ))
            ) : (
              <p>Nenhum país corresponde a sua busca</p>
            )}
          </CountryGrid>
        </div>
      )}
    </Main>
  );
};

export default App;

///nome, capital, região, sub-região, população, área, fuso horario, nome nativo, link para vizualizar bandeira
