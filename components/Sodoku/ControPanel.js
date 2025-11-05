// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
// import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

// // Get the available width for the control panel
// const { width } = Dimensions.get('window');
// const controlPanelWidth = Math.min(width * 0.95, 450);

// const numberOfButtons = 5;
// const cellSize = controlPanelWidth / (numberOfButtons + 3.5); 

// export const ControlPanel = ({
//     onNewGame,
//     onSolve,
//     onUndo,
//     onHint,
//     onErase,
//     canUndo,
//     hintsLeft,
//     selectedCell
// }) => {
//     // Helper function to keep the JSX clean
//     const renderControlButton = ({ onPress, disabled, iconName, label, IconComponent = MaterialCommunityIcons }) => (
//         <TouchableOpacity
//             style={[styles.controlButton, disabled && styles.disabledButton]}
//             onPress={onPress}
//             disabled={disabled}
//         >
//             <IconComponent name={iconName} size={cellSize * 0.5} color={disabled ? '#b0b0b0' : '#424242'} />
//             <Text style={[styles.controlLabel, disabled && styles.disabledLabel]}>{label}</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.controlContainer}>
//             {renderControlButton({
//                 onPress: onUndo,
//                 disabled: !canUndo,
//                 iconName: 'undo-variant',
//                 label: 'Undo'
//             })}
//             {renderControlButton({
//                 onPress: onErase,
//                 disabled: !selectedCell,
//                 iconName: 'eraser',
//                 label: 'Erase'
//             })}
//             {renderControlButton({
//                 onPress: onHint,
//                 iconName: 'lightbulb-on-outline',
//                 label: `Hint (${hintsLeft})`
//             })}
//              {renderControlButton({
//                 onPress: onNewGame,
//                 disabled: false,
//                 iconName: 'refresh-cw',
//                 label: 'New Game',
//                 IconComponent: Feather
//             })}
//             {renderControlButton({
//                 onPress: onSolve,
//                 disabled: false,
//                 iconName: 'check-all',
//                 label: 'Solve'
//             })}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     controlContainer: {
//         marginTop: 20,
//         width: controlPanelWidth,
//         flexDirection: 'row',       // Arrange buttons horizontally
//         // --- KEY CHANGE: Removed flexWrap and adjusted justification ---
//         justifyContent: 'space-around', // Distribute buttons evenly with space around them
//         alignItems: 'center',       // Align items vertically in the center
//     },
//     controlButton: {
//         width: cellSize,
//         height: cellSize,
//         // Using a smaller margin since space-around adds spacing
//         marginHorizontal: 2, 
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: '#e0e0e0',
//     },
//     disabledButton: {
//         backgroundColor: '#fafafa',
//         opacity: 0.7,
//     },
//     controlLabel: {
//         // --- KEY CHANGE: Made font size slightly smaller to ensure it fits ---
//         fontSize: cellSize * 0.16, 
//         color: '#424242',
//         fontWeight: '500',
//         marginTop: 4, // Reduced margin top
//         textAlign: 'center', // Ensure text like "New Game" centers if it wraps
//     },
//     disabledLabel: {
//         color: '#b0b0b0',
//     },
// });



import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const controlPanelWidth = Math.min(width * 0.95, 450);
const numberOfButtons = 5;
const cellSize = controlPanelWidth / (numberOfButtons + 2);

export const ControlPanel = ({
    onNewGame,
    onSolve,
    onUndo,
    onHint,
    onErase,
    canUndo,
    hintsLeft,
    selectedCell
}) => {
    const renderControlButton = ({ onPress, disabled, iconName, label, IconComponent = MaterialCommunityIcons, isReward = false }) => (
        <TouchableOpacity
            style={[styles.controlButton, isReward && styles.rewardButton, disabled && styles.disabledButton]}
            onPress={onPress}
            disabled={disabled}
        >
            <IconComponent name={iconName} size={cellSize * 0.5} color={isReward ? '#4CAF50' : (disabled ? '#b0b0b0' : '#424242')} />
            <Text style={[styles.controlLabel, isReward && styles.rewardLabel, disabled && styles.disabledLabel]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.controlContainer}>
            {renderControlButton({
                onPress: onUndo,
                disabled: !canUndo,
                iconName: 'undo-variant',
                label: 'Undo'
            })}
            {renderControlButton({
                onPress: onErase,
                disabled: !selectedCell,
                iconName: 'eraser',
                label: 'Erase'
            })}
            
            {/* --- THIS IS THE KEY CHANGE --- */}
            {/* We now check if hintsLeft is 0. If so, we render a different style of button. */}
            {hintsLeft > 0 ? (
                renderControlButton({
                    onPress: onHint,
                    iconName: 'lightbulb-on-outline',
                    label: `Hint (${hintsLeft})`
                })
            ) : (
                renderControlButton({
                    onPress: onHint,
                    iconName: 'gift-outline', // A new icon for getting a reward!
                    label: 'Get +2',         // New text
                    isReward: true           // A flag to apply special styling
                })
            )}

            {/* {renderControlButton({
                onPress: onNewGame,
                disabled: false,
                iconName: 'refresh-cw',
                label: 'New Game',
                IconComponent: Feather
            })}
            {renderControlButton({
                onPress: onSolve,
                disabled: false,
                iconName: 'check-all',
                label: 'Solve'
            })} */}
        </View>
    );
};

const styles = StyleSheet.create({
    controlContainer: {
        marginTop: 20,
        width: controlPanelWidth,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    controlButton: {
        width: cellSize,
        height: cellSize,
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    disabledButton: {
        backgroundColor: '#fafafa',
        opacity: 0.7,
    },
    // --- NEW STYLES FOR THE REWARD BUTTON ---
    rewardButton: {
        backgroundColor: '#e8f5e9', // A nice light green
        borderColor: '#4CAF50', // A matching green border
    },
    controlLabel: {
        fontSize: cellSize * 0.16,
        color: '#424242',
        fontWeight: '500',
        marginTop: 4,
        textAlign: 'center',
    },
    disabledLabel: {
        color: '#b0b0b0',
    },
    // --- NEW STYLE FOR THE REWARD LABEL ---
    rewardLabel: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});