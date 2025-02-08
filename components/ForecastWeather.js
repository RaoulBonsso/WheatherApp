import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Weather from './Weather';

export default function ForecastWeather({ data }) {
    const [forecastsGrouped, setForecastsGrouped] = useState([]);

    useEffect(() => {
        const forecastsData = data.list.map(forecast => {
            let forecastDate = new Date(forecast.dt_txt);
            return {
                date: forecastDate,
                hour: forecastDate.getHours(),
                day: forecastDate.toLocaleDateString('fr-FR', {
                    weekday: "long", day: 'numeric', month: "long"
                }),
                temp: forecast.main.temp,
                icon: forecast.weather[0].icon,
            };
        });

        let daysGrouped = forecastsData.map(forecast => forecast.day).filter((day, index, tableau) => tableau.indexOf(day) === index);

        let forecastsGrouped = daysGrouped.map(day => {
            const forecasts = forecastsData.filter(forecast => forecast.day === day);
            return { day: day, data: forecasts };
        });

        forecastsGrouped[0].day = "Aujourd'hui";
        setForecastsGrouped(forecastsGrouped);
    }, [data]);

    return (
        <ScrollView horizontal>
            {forecastsGrouped.map((forecast, index) => (
                <Weather key={index} forecast={forecast} />
            ))}
        </ScrollView>
    );
}