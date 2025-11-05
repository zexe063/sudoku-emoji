// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

// const EMOJIS = ['🎨', '🍕', '🌺', '☀️', '🌹', '🪘', '🛵', '🦋', '🎭']

// export const EmojiPad = ({ onEmojiPress, selectedCell }) => {
//     return (
//         <View style={styles.emojiPad}>
//             {EMOJIS.map((emoji) => (
//                 <TouchableOpacity 
//                     key={emoji} 
//                     style={styles.emojiButton} 
//                     onPress={() => onEmojiPress(emoji)}
//                     disabled={!selectedCell}
//                 >
//                     <Text style={styles.emojiButtonText}>{emoji}</Text>
//                 </TouchableOpacity>
//             ))}
//         </View>
//     );
// };

// const { width } = Dimensions.get('window');
// const gridSize = Math.min(width * 0.95, 450);
// const cellSize = gridSize / 9;

// const styles = StyleSheet.create({
//     emojiPad: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         marginTop: 20,
//         width: gridSize,
//     },
//     emojiButton: {
//         width: cellSize * 1.1,
//         height: cellSize * 1.1,
//         margin: 4,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: '#e0e0e0',
        
//     },
//     emojiButtonText: {
//         fontSize: cellSize * 0.65,
//     },
// });




import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';

const EMOJIS = ['🎨', '🍕', '🌺', '☀️', '🌹', '🪘', '🛵', '🦋', '🎭'];

export const EmojiPad = ({ onEmojiPress, selectedCell }) => {
    return (
        <View style={styles.emojiPad}>
            {EMOJIS.map((emoji) => (
                <TouchableOpacity
                    key={emoji}
                    style={[styles.emojiButton, !selectedCell && styles.disabledButton]} // Apply disabled style
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
        // justifyContent: 'center',
        marginTop: 25,
        marginLeft:20,
        width: gridSize,
    },
    emojiButton: {
        width: cellSize * 1.5,
        height: cellSize * 1.5,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        
        backgroundColor: 'white',
        borderRadius: 8,
        borderBottomWidth: 3,
        borderColor: '#e5e5e5',
          borderWidth: 1,
      

        
      
    },
    emojiButtonText: {
        fontSize: cellSize * 0.7,
    },
    
});