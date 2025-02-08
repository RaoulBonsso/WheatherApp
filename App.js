import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';

export default function App() {
    const [location, setLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission denied');
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            fetchWeather(currentLocation.coords.latitude, currentLocation.coords.longitude);
        })();
    }, []);

    const fetchWeather = async (lat, lon) => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d6def4924ad5f9a9b59f3ae895b234cb&units=metric`);
        setWeatherData(response.data);
    };

    const searchCity = async () => {
        const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=d6def4924ad5f9a9b59f3ae895b234cb`);
        const { lat, lon } = response.data[0];
        fetchWeather(lat, lon);
    };

    return (
        <ImageBackground source={require('./assets/background.jpg')} style={styles.container}>
            <View style={styles.inner}>
                <TextInput placeholder="Enter city" value={city} onChangeText={setCity} style={styles.input} />
                <Button title="Search" onPress={searchCity} />
                {weatherData && (
                    <>
                        <CurrentWeather data={weatherData} />
                        <ForecastWeather data={weatherData} />
                    </>
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});