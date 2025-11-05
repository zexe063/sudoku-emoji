// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screen components
import Level from './components/Level/Level';
import { Sudoku } from './components/Sodoku/Sudoku';

// Create a Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        // NavigationContainer is the root that manages the navigation state
        <NavigationContainer>
           <StatusBar hidden={true} />
            {/* Stack.Navigator holds all the screens for this stack */}
            <Stack.Navigator initialRouteName="LevelSelect">
                {/* Define the first screen: the Level selection screen */}
                <Stack.Screen
                    name="LevelSelect"
                    component={Level}
                  options={{ headerShown: false }} // Sets the header title
                />
                {/* Define the second screen: the Sudoku game screen */}
                <Stack.Screen
                    name="Sudoku"
                    component={Sudoku}
                    options={{ title: 'Sudoku Puzzles' }} // Sets the header title
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


