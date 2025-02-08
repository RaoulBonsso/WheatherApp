import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShowIcon from './ShowIcon';

export default function CurrentWeather({ data }) {
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        if (data.list) {
            setCurrentWeather(data.list[0].main); // Utilise le premier élément de la liste
        }
    }, [data]);

    return (
        <View style={styles.container}>
            {currentWeather && (
                <View style={styles.weatherCard}>
                    <Text style={styles.title}>Conditions Météorologiques</Text>
                    <ShowIcon icon={data.list[0].weather[0].icon} />
                    <Text style={styles.temp}>{currentWeather.temp}°C</Text>
                    <Text style={styles.description}>{data.list[0].weather[0].description}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    weatherCard: {
        padding: 20,
        backgroundColor: 'rgba(240, 248, 255, 0.7)',
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    temp: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    description: {
        fontSize: 18,
        color: 'gray',
    },
});