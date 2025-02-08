import React from 'react';
import { View, Text } from 'react-native';
import ShowIcon from './ShowIcon';

export default function Weather({ forecast }) {
    return (
        <View>
            <Text>{forecast.day}</Text>
            {forecast.data.map((hourData, index) => (
                <View key={index}>
                    <Text>{hourData.hour}:00</Text>
                    <ShowIcon icon={hourData.icon} />
                    <Text>{hourData.temp}°C</Text>
                </View>
            ))}
        </View>
    );
}