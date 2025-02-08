import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function ShowIcon({ icon }) {
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return <Image source={{ uri: iconUrl }} style={styles.icon} />;
}

const styles = StyleSheet.create({
    icon: {
        width: 80,
        height: 50,
    },
});