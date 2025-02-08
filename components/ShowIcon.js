import React from 'react';
import { Image } from 'react-native';

export default function ShowIcon({ icon }) {
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return <Image source={{ uri: iconUrl }} style={{ width: 50, height: 50 }} />;
}