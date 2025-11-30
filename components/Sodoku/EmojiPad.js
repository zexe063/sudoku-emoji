


import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';

const EMOJIS = ['🎨', '🍕', '🌺', '☀️', '🌹', '🪘', '🛵', '🦋', '🎭'];

export const EmojiPad = ({ onEmojiPress, selectedCell }) => {
    return (
        <View style={styles.emojiPad}>
            {EMOJIS.map((emoji) => (
                <TouchableOpacity
                    key={emoji}
                    style={[styles.emojiButton, !selectedCell && styles.disabledButton]}
                    onPress={() => onEmojiPress(emoji)}
                    disabled={!selectedCell}
                >
                    <Text style={styles.emojiButtonText}>{emoji}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const { width } = Dimensions.get('window');
const gridSize = Math.min(width * 0.95, 450);
const cellSize = gridSize / 9;

const styles = StyleSheet.create({
    emojiPad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
        width: gridSize,
        paddingHorizontal: 5,
    },
    emojiButton: {
        width: cellSize * 1.1,
        height: cellSize * 1.1,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderBottomWidth: 4,
        borderColor: '#d1d5db',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    emojiButtonText: {
        fontSize: cellSize * 0.65,
    },
    disabledButton: {
        opacity: 0.5,
        backgroundColor: '#f5f5f5',
    },
});