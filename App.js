import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission denied');
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
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
            <View style={styles.overlay} />
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Entre le nom de la cité"
                    placeholderTextColor="#FFFFFF" 
                    value={city}
                    onChangeText={setCity}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={searchCity}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
            {weatherData && (
                <>
                    <Text style={styles.cityName}>{weatherData.city.name}</Text>
                    <CurrentWeather data={weatherData} />
                    <ForecastWeather data={weatherData} />
                </>
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Opacité de 50%
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        width: '90%',
        zIndex: 1, // Assurez-vous que le conteneur de recherche est au-dessus de l'overlay
    },
    input: {
        height: 40,
        color: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
        flex: 1,
    },
    button: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    buttonText: {
        color: 'white',
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: 'white', // Couleur du nom de la ville
    },
});