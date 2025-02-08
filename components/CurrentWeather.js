import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ShowIcon from './ShowIcon';

export default function CurrentWeather({ data }) {
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        if (data.current) {
            setCurrentWeather(data.current);
        }
    }, [data]);

    return (
        <View>
            {currentWeather && (
                <>
                    <Text>{data.city.name}</Text>
                    <Text>{new Date(currentWeather.dt * 1000).toLocaleString()}</Text>
                    <ShowIcon icon={currentWeather.weather[0].icon} />
                    <Text>{currentWeather.temp}°C</Text>
                    <Text>{currentWeather.weather[0].description}</Text>
                </>
            )}
        </View>
    );
}