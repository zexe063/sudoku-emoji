import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// This component now receives `mistakeLimit` as a prop to know the total number of lives.
export const GameStats = ({ difficulty, timer, mistakes, mistakeLimit, isPaused, onPausePress }) => {
    
    // This function remains the same.
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // --- THIS IS THE KEY CHANGE ---
    // Instead of a hardcoded number, MAX_LIVES is now set by the game logic.
    // We provide a default of 3 just in case `mistakeLimit` is not passed.
    const MAX_LIVES = mistakeLimit || 3; 

    // This calculation now works perfectly. If mistakeLimit is 3, it will be 3 - mistakes.
    // If it increases to 5 after an ad, it will be 5 - mistakes.
    const livesRemaining = Math.max(0, MAX_LIVES - mistakes);

    return (
        <View style={styles.container}>
            {/* Left Side: Difficulty */}
            <View style={styles.leftContainer}>
                <Text style={styles.difficultyText}>{difficulty}</Text>
            </View>

            {/* Center: Timer */}
            <View style={styles.centerContainer}>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
            </View>

            {/* Right Side: Hearts for Lives */}
            <View style={styles.rightContainer}>
                {/* This part now correctly maps over the dynamic number of lives */}
                {Array.from({ length: livesRemaining }).map((_, index) => (
                    <Text key={index} style={styles.heartIcon}>❤️</Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 15,
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start', // Align text to the start
    },
    difficultyText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'hsl(220, 100%, 40%)',
        textTransform: 'capitalize',
    },
    centerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 18, // Increased font size for better visibility
        fontWeight: '500',
        color: '#888888',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    heartIcon: {
        fontSize: 20, // Increased heart size slightly
        marginLeft: 4,
    },
});