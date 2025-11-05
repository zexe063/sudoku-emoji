

// components/Header/Header.js
import React from 'react';
import { View, Image, StyleSheet, _Image } from 'react-native';

export  function Header() {
    return (
        <View style={styles.headerContainer}>
            {/* Logo Image */}
            <Image 
  source={require('./icon.png')} 
  style={{ width: 200, height: 200 }}
    resizeMode="contain"
/>
           
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingTop: 50, // Extra padding for status bar
        backgroundColor: '#fff',
    },
    logoImage: {
        width: 150,
        height: 50,
    },
});