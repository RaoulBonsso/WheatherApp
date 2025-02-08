import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Weather from './Weather';

export default function ForecastWeather({ data }) {
    const [forecastsGrouped, setForecastsGrouped] = useState([]);

    useEffect(() => {
        const forecastsData = data.list.map(forecast => {
            const forecastDate = new Date(forecast.dt_txt);
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

        const daysGrouped = [...new Set(forecastsData.map(forecast => forecast.day))];

        const forecastsGrouped = daysGrouped.map(day => {
            const forecasts = forecastsData.filter(forecast => forecast.day === day);
            return { day, data: forecasts };
        });

        forecastsGrouped[0].day = "Aujourd'hui";
        setForecastsGrouped(forecastsGrouped);
    }, [data]);

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            {forecastsGrouped.map((forecast, index) => (
                <Weather key={index} forecast={forecast} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginTop: 20,
    },
});