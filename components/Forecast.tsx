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

const ForecastContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;
  width: 90vw;
`;

const TimeDate = styled.h4`
  font-size: 15px;
  color: #333333;
  text-align: center;
`;

const Weather = ({ weather }: any) => {
  return (
    <Container>
      {weather.list && (
        <ForecastContainer>
          {weather.list.map((w: any, i: number) => (
            <WeatherContainer key={i}>
              <TimeDate>{w.dt_txt}</TimeDate>
              <h2>{Math.round(w.main.temp)}°C</h2>
              <h3>{w.weather[0].main}</h3>
              <Image
                src={`http://openweathermap.org/img/w/${w.weather[0].icon}.png`}
                alt="weather icon"
              />
            </WeatherContainer>
          ))}
        </ForecastContainer>
      )}
    </Container>
  );
};

export default Weather;
