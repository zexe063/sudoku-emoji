

import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export  function GameOver() {
  const [showModal, setShowModal] = useState(true);
  const [lives, setLives] = useState(1);

  const handleSecondChance = () => {
    // Show video ad here
    setLives(prev => prev + 2);
    setShowModal(false);
  };

  const handleNewGame = () => {
    setLives(3);
    setShowModal(false);
  };

  const handleRestart = () => {
    setLives(3);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Heart with +2 */}
            <View style={styles.heartContainer}>
              <View style={styles.heart}>
                <Text style={styles.heartIcon}>❤️</Text>
              </View>
              <View style={styles.plusTwoContainer}>
                <Text style={styles.plusTwo}>+2</Text>
              </View>
            </View>

            {/* Game Over Text */}
            <Text style={styles.title}>Game Over</Text>
            <Text style={styles.subtitle}>
              You've reached the mistake limit and{'\n'}
              lost the game. Watch a short video for{'\n'}
              a second chance!
            </Text>

            {/* Second Chance Button (Green) */}
            <TouchableOpacity
              style={styles.secondChanceButton}
              onPress={handleSecondChance}
            >
             <Ionicons name="film" size={24} color="white" style={{ marginRight: 10 }} />
              <Text style={styles.secondChanceText}>Second chance</Text>
            </TouchableOpacity>

            {/* New Game Button */}
            <TouchableOpacity
              style={styles.lightButton}
              onPress={handleNewGame}
            >
              <Text style={styles.lightButtonText}>New Game</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* Game Background */}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameContainer: {
    padding: 20,
  },
  gameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '85%',
    maxWidth: 400,
  },
  heartContainer: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  heart: {
    position: 'absolute',
  },
  heartIcon: {
    fontSize: 80,
  },
  plusTwoContainer: {
    position: 'absolute',
    zIndex: 10,
  },
  plusTwo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  secondChanceButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 12,
  },
  videoIcon: {
    marginRight: 10,
  },
  secondChanceText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  lightButton: {
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    marginBottom: 12,
    alignItems: 'center',
  },
  lightButtonText: {
    color: '#059669',
    fontSize: 18,
    fontWeight: '600',
  },
});