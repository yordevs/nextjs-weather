import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333333;
  border: 1px solid #555555;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Image = styled.img`
  object-fit: cover;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333333;
  background-color: #bbbbbb;
  border: 1px solid #333333;
  border-radius: 5px;
  padding: 4px;
  margin: 8px;
  min-width: 100px;
`;

const TimeDate = styled.h4`
  font-size: 15px;
  color: #333333;
  text-align: center;
`;

const Weather = ({ weather }: any) => {
  return (
    <Container>
      {weather && (
        <WeatherContainer>
          <TimeDate>{weather.weather[0].dt_txt}</TimeDate>
          <h2>{Math.round(weather.main.temp)}°C</h2>
          <h3>{weather.weather[0].main}</h3>
          <Image
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="weather icon"
          />
        </WeatherContainer>
      )}
    </Container>
  );
};

export default Weather;
