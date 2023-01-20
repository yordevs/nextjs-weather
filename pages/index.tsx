import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Forecast from "../components/Forecast";
import dynamic from "next/dynamic";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #f7f7f7;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const Input = styled.input`
  font-size: 1.5rem;
  margin: 1rem;
`;

const Button = styled.button`
  font-size: 1.5rem;
  margin: 1rem;
`;

const IndexPage = () => {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState<any>({});
  const [weather, setWeather] = useState<any>({});
  const [error, setError] = useState("");

  const getWeather = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (city === "" || city === undefined) {
      setError("Please enter a city");
      return;
    }
    setForecast({});
    setWeather({});
    setError("");

    const forecastResponse = fetch(`/api/forecast/${city}`);
    const weatherResponse = fetch(`/api/weather/${city}`);

    Promise.all([forecastResponse, weatherResponse])
      .then((values) => {
        values.forEach((element) => {
          element.json().then((data) => {
            //set forecast if it is a forecast response
            if (data.city) {
              setForecast(data);
            }
            //set weather if it is a weather response
            if (data.coord) {
              setWeather(data);
            }
            if (data.cod === "404" || data.cod === "400") {
              setError(data.message);
            }
          });
        });
      })
      .catch((err) => {
        console.log("Error", err);
      });

    setCity("");
  };

  return (
    <Container>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>Weather App</Title>
      <Input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e: any) => setCity(e.target.value)}
      />
      <Button onClick={getWeather}>Get Weather</Button>
      {forecast?.city && (
        <Title>
          {forecast?.city?.name}, {forecast?.city?.country}
        </Title>
      )}
      <Forecast weather={forecast} />
      {forecast?.city?.coord ? (
        <MapWithNoSSR location={forecast?.city?.coord} weather={weather} />
      ) : (
        <>Please enter a location</>
      )}
      {error && <Title>{error}</Title>}
    </Container>
  );
};

export default IndexPage;
