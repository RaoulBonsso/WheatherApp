import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShowIcon from './ShowIcon';

export default function Weather({ forecast }) {
    return (
        <View style={styles.container}>
            <Text style={styles.day}>{forecast.day}</Text>
            {forecast.data.map((hourData, index) => (
                <View key={index} style={styles.hourContainer}>
                    <View style={styles.card}>
                        <Text style={styles.hour}>{hourData.hour}:00</Text>
                        <ShowIcon icon={hourData.icon} />
                        <Text style={styles.temp}>{hourData.temp}°C</Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    day: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    hourContainer: {
        marginVertical: 5,
    },
    card: {
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: 100,
        elevation: 2,
    },
    hour: {
        fontSize: 16,
    },
    temp: {
        fontSize: 16,
    },
});