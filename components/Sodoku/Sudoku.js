

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { RewardedAd, RewardedAdEventType, TestIds, AdEventType } from 'react-native-google-mobile-ads';

// --- YOUR EXISTING COMPONENT IMPORTS ---
// We assume these files exist and are working correctly.
import { GameStats } from './GameStats';
import { ControlPanel } from './ControPanel';
import { EmojiPad } from './EmojiPad';
import { FirstAds } from '../Ads/FirstAds';
// --- AD SETUP ---
// Using two ad units for better analytics in AdMob is the professional standard.
const hintAdUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-6518027444067570/3389902161';
const hintRewarded = RewardedAd.createForAdRequest(hintAdUnitId);

const gameOverAdUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-6518027444067570/9763738829';
const gameOverRewarded = RewardedAd.createForAdRequest(gameOverAdUnitId);

// --- GAME CONSTANTS ---
const EMOJIS = ['🎨', '🍕', '🌺', '☀️', '🌹', '🪘', '🛵', '🦋', '🎭'];
const EMPTY_CELL = 0;
const INITIAL_HINTS = 3;
const MISTAKE_LIMIT = 3; // The game ends after this many mistakes.

// --- HELPER FUNCTIONS ---
const getEmoji = (num) => (num === EMPTY_CELL ? '' : EMOJIS[num - 1]);
const getConflicts = (currentBoard) => { const newConflicts = new Set(); const findConflicts = (arr, getKey) => { const seen = {}; arr.forEach((num, i) => { if (num !== EMPTY_CELL) { if (!seen[num]) seen[num] = []; seen[num].push(i); } }); for (const num in seen) { if (seen[num].length > 1) seen[num].forEach(i => newConflicts.add(getKey(i))); } }; for (let i = 0; i < 9; i++) { findConflicts(currentBoard[i], (col) => `${i}-${col}`); findConflicts(currentBoard.map(r => r[i]), (row) => `${row}-${i}`); } for (let br = 0; br < 3; br++) for (let bc = 0; bc < 3; bc++) { const box = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) box.push(currentBoard[br * 3 + r][bc * 3 + c]); findConflicts(box, (i) => `${br * 3 + Math.floor(i / 3)}-${bc * 3 + (i % 3)}`); } return newConflicts; };

// ===================================================================================
// --- 1. ALL UI POPUPS ARE NOW DEFINED INSIDE THIS FILE ---
// ===================================================================================




const LevelCompletedPopup = ({ isVisible, onReplay, onGoHome, time, mistakes, stars = 3 }) => {
    // Helper function to format the time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    
    const renderStars = () => {
        const starArray = [];
        for (let i = 1; i <= 5; i++) {
            starArray.push(
                <Ionicons
                    key={i}
                    name={i <= stars ? "star" : "star-outline"}
                    size={40}
                    color={i <= stars ? "#FFD700" : "#D3D3D3"}
                    style={popupStyles.starIcon}
                />
            );
        }
        return starArray;
    };

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible}>
            <View style={popupStyles.centeredView}>
                <View style={popupStyles.modalView}>
                    {/* Trophy Icon */}
                    <View style={popupStyles.trophyContainer}>
                        <MaterialCommunityIcons name="trophy" size={80} color="#FFD700" />
                    </View>

                    {/* Title */}
                    <Text style={popupStyles.modalTitle}>Level Complete!</Text>
                    <Text style={popupStyles.modalSubtitle}>Congratulations!</Text>

                    {/* Stars Rating */}
                    <View style={popupStyles.starsContainer}>
                        {renderStars()}
                    </View>

                    {/* Stats Container */}
                    <View style={popupStyles.statsContainer}>
                        <View style={popupStyles.statItem}>
                            <Ionicons name="timer-outline" size={24} color="#4A90E2" />
                            <Text style={popupStyles.statText}>{formatTime(time)}</Text>
                        </View>
                        <View style={popupStyles.statDivider} />
                        <View style={popupStyles.statItem}>
                            <Ionicons name="close-circle-outline" size={24} color="#E74C3C" />
                            <Text style={popupStyles.statText}>{mistakes} Mistakes</Text>
                        </View>
                    </View>

                    {/* Buttons Container */}
                    <View style={popupStyles.buttonContainer}>
            

                        {/* Home Button */}
                        <TouchableOpacity 
                            style={[popupStyles.button, popupStyles.homeButton]} 
                            onPress={onGoHome}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="home" size={24} color="#fff" />
                            <Text style={popupStyles.textStyle}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};



const AdLoadingModal = ({ isVisible, onClose }) => (
    <Modal visible={isVisible} transparent={true} animationType="fade">
        <View style={adModalStyles.centeredView}>
            <View style={adModalStyles.modalContainer}>
                <View style={adModalStyles.iconWrapper}>
                    <MaterialCommunityIcons name="trophy-award" size={80} color="#FFC107" />
                    <View style={adModalStyles.rewardBadge}>
                        <Text style={adModalStyles.badgeText}>+2</Text>
                    </View>
                </View>
                <Text style={adModalStyles.titleText}>Ads Loading</Text>
                <ActivityIndicator size="large" color="#555" style={{ marginVertical: 20 }} />
                <TouchableOpacity onPress={onClose}>
                    <Text style={adModalStyles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);
const GameOverModal = ({ isVisible, onSecondChance, onNewGame, isLoading }) => (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View style={gameOverStyles.modalOverlay}>
            <View style={gameOverStyles.modalContent}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#1F2937" style={{ marginVertical: 80 }} />
                ) : (
                    <>
                        <View style={gameOverStyles.heartContainer}>
                            <View style={gameOverStyles.heart}><Text style={gameOverStyles.heartIcon}>❤️</Text></View>
                            <View style={gameOverStyles.plusTwoContainer}><Text style={gameOverStyles.plusTwo}>+2</Text></View>
                        </View>
                        <Text style={gameOverStyles.title}>Game Over</Text>
                        <Text style={gameOverStyles.subtitle}>You've reached the mistake limit. Watch a video for a second chance!</Text>
                        <TouchableOpacity style={gameOverStyles.secondChanceButton} onPress={onSecondChance}>
                            <Ionicons name="film" size={24} color="white" style={{ marginRight: 10 }} />
                            <Text style={gameOverStyles.secondChanceText}>Second chance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={gameOverStyles.lightButton} onPress={onNewGame}>
                            <Text style={gameOverStyles.lightButtonText}>New Game</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    </Modal>
);

// ===================================================================================
// --- 2. MAIN SUDOKU COMPONENT ---
// ===================================================================================

export const Sudoku = ({ navigation, route }) => {
    const { puzzle: puzzleData } = route.params;

    // --- STATE MANAGEMENT ---
    const [board, setBoard] = useState([]);
    const [initialBoard, setInitialBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    const [selectedCell, setSelectedCell] = useState(null);
    const [conflicts, setConflicts] = useState(new Set());
    const [timer, setTimer] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [moveHistory, setMoveHistory] = useState([]);
    const [hintsLeft, setHintsLeft] = useState(INITIAL_HINTS);
    const [isGameActive, setIsGameActive] = useState(false);
    const [isLevelComplete, setIsLevelComplete] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [mistakeLimit, setMistakeLimit] = useState(MISTAKE_LIMIT);
    const [isHintAdLoading, setIsHintAdLoading] = useState(false);
    const [hintAdLoaded, setHintAdLoaded] = useState(false);
    const userCanceledHintAd = useRef(false);
    const [isGameOverAdLoading, setIsGameOverAdLoading] = useState(false);
    const [gameOverAdLoaded, setGameOverAdLoaded] = useState(false);

     useEffect(() => {
        let interval;
        if (isGameActive) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isGameActive]);

    // --- SIDE EFFECTS (useEffect) ---
    useEffect(() => { if (mistakes >= mistakeLimit && isGameActive) { setIsGameActive(false); setIsGameOver(true); } }, [mistakes, mistakeLimit, isGameActive]);
    
    useEffect(() => {
        const hintErr = hintRewarded.addAdEventListener(AdEventType.ERROR, (err) => { if(isHintAdLoading) { console.log(err),  setIsHintAdLoading(false); } });
        const hintLoad = hintRewarded.addAdEventListener(RewardedAdEventType.LOADED, () => { setHintAdLoaded(true); if (isHintAdLoading && !userCanceledHintAd.current) { setIsHintAdLoading(false); hintRewarded.show(); } });
        const hintEarn = hintRewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => setHintsLeft(p => p + 2));
        const hintClose = hintRewarded.addAdEventListener(AdEventType.CLOSED, () => { setHintAdLoaded(false); hintRewarded.load(); });
        hintRewarded.load();

        const goErr = gameOverRewarded.addAdEventListener(AdEventType.ERROR, () => { if(isGameOverAdLoading) { Alert.alert("Second Chance Not Available"); setIsGameOverAdLoading(false); } });
        const goLoad = gameOverRewarded.addAdEventListener(RewardedAdEventType.LOADED, () => { setGameOverAdLoaded(true); if (isGameOverAdLoading) { setIsGameOverAdLoading(false); gameOverRewarded.show(); } });
        const goEarn = gameOverRewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => { setMistakeLimit(p => p + 2); setIsGameOver(false); setIsGameActive(true); });
        const goClose = gameOverRewarded.addAdEventListener(AdEventType.CLOSED, () => { setGameOverAdLoaded(false); gameOverRewarded.load(); });
        gameOverRewarded.load();

        return () => { hintErr(); hintLoad(); hintEarn(); hintClose(); goErr(); goLoad(); goEarn(); goClose(); };
    }, [isHintAdLoading, isGameOverAdLoading]);

    // --- GAME LOGIC & HANDLERS ---
    const startNewGame = () => { if (!puzzleData) return; setBoard(puzzleData.board.map(r => [...r])); setInitialBoard(puzzleData.board.map(r => [...r])); setSolution(puzzleData.solution.map(r => [...r])); setSelectedCell(null); setConflicts(getConflicts(puzzleData.board)); setMoveHistory([]); setMistakes(0); setHintsLeft(INITIAL_HINTS); setTimer(0); setIsLevelComplete(false); setIsGameActive(true); setIsGameOver(false); setMistakeLimit(MISTAKE_LIMIT); };
    useEffect(() => { startNewGame(); }, [puzzleData]);

    const makeMove = (row, col, newValue) => { const oldValue = board[row][col]; if (oldValue === newValue) return; setMoveHistory(p => [...p, { row, col, oldValue, newValue }]); const newBoard = board.map(r => [...r]); newBoard[row][col] = newValue; if (newValue !== EMPTY_CELL && solution[row][col] !== newValue) { setMistakes(p => p + 1); } setConflicts(getConflicts(newBoard)); setBoard(newBoard); };
    const handleCellPress = (row, col) => setSelectedCell({ row, col });
    const handleEmojiPress = (emoji) => { if (!selectedCell || !isGameActive) return; const { row, col } = selectedCell; if (initialBoard[row][col] === EMPTY_CELL) { makeMove(row, col, EMOJIS.indexOf(emoji) + 1); } };
    const handleErase = () => { if (!selectedCell || !isGameActive) return; const { row, col } = selectedCell; if (initialBoard[row][col] === EMPTY_CELL && board[row][col] !== EMPTY_CELL) { makeMove(row, col, EMPTY_CELL); } };
    const handleUndo = () => { if (moveHistory.length === 0 || !isGameActive) return; const lastMove = moveHistory.pop(); const { row, col, oldValue } = lastMove; const newBoard = board.map(r => [...r]); newBoard[row][col] = oldValue; setBoard(newBoard); setConflicts(getConflicts(newBoard)); setMoveHistory([...moveHistory]); };
    const handleSolve = () => { setBoard(solution.map(r => [...r])); setConflicts(new Set()); setIsGameActive(false); setIsLevelComplete(true); };
    useEffect(() => { if (board.length > 0 && isGameActive) { const isBoardFull = !board.flat().includes(EMPTY_CELL); if (isBoardFull && conflicts.size === 0) { setIsGameActive(false); setIsLevelComplete(true); } } }, [board, conflicts, isGameActive]);
    const getCellStyles = (row, col) => { const styles = [style.cell]; if ((col + 1) % 3 === 0 && col !== 8) styles.push(style.subgridBorderRight); if ((row + 1) % 3 === 0 && row !== 8) styles.push(style.subgridBorderBottom); const isUserFilled = initialBoard.length > 0 && initialBoard[row][col] === EMPTY_CELL && board[row][col] !== EMPTY_CELL; const isInConflict = conflicts.has(`${row}-${col}`); if (selectedCell) { const { row: selRow, col: selCol } = selectedCell; const boxStartRow = Math.floor(selRow / 3) * 3; const boxStartCol = Math.floor(selCol / 3) * 3; if (row === selRow || col === selCol || (row >= boxStartRow && row < boxStartRow + 3 && col >= boxStartCol && col < boxStartCol + 3)) { styles.push(style.highlightedCell); } } if (isUserFilled) { if (isInConflict) { styles.push(style.conflictCell); } else { styles.push(style.correctCell); } } if (selectedCell && row === selectedCell.row && col === selectedCell.col) { styles.push(style.selectedCell); } return styles; };
    const handleHint = () => { if (!isGameActive || !selectedCell) {  return; } if (hintsLeft > 0) { const { row, col } = selectedCell; if (board[row][col] === EMPTY_CELL) { makeMove(row, col, solution[row][col]); setHintsLeft(p => p - 1); } } else { userCanceledHintAd.current = false; if (hintAdLoaded) hintRewarded.show(); else setIsHintAdLoading(true); } };
    const handleCancelHintAd = () => { userCanceledHintAd.current = true; setIsHintAdLoading(false); };
    const handleSecondChance = () => { if (gameOverAdLoaded) gameOverRewarded.show(); else setIsGameOverAdLoading(true); };

    // --- RENDER ---
    return (
        <View style={style.container}>
            <StatusBar hidden={true} />
           
             <LevelCompletedPopup
        isVisible={isLevelComplete}
        time={timer}
        mistakes={mistakes}
        onGoHome={() => {
    setIsLevelComplete(false);
    setTimeout(() => {
        navigation.reset({
            index: 0, 
            routes: [{ name: 'LevelSelect' }],
        });
    }, 100);
}}
    />
            <AdLoadingModal isVisible={isHintAdLoading} onClose={handleCancelHintAd} />
            <GameOverModal isVisible={isGameOver} isLoading={isGameOverAdLoading} onSecondChance={handleSecondChance} onNewGame={startNewGame} />

             <GameStats timer={timer} mistakes={mistakes} mistakeLimit={mistakeLimit} difficulty={puzzleData.difficulty} />
            <View style={style.grid}>
                {board.length > 0 && board.map((row, rIndex) => (
                    <View key={rIndex} style={style.row}>
                        {row.map((num, cIndex) => (
                            <TouchableOpacity key={cIndex} style={getCellStyles(rIndex, cIndex)} onPress={() => handleCellPress(rIndex, cIndex)} disabled={!isGameActive}>
                                <Text style={style.cellText}>{getEmoji(num)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
            <ControlPanel onNewGame={startNewGame} onSolve={handleSolve} onUndo={handleUndo} onHint={handleHint} onErase={handleErase} canUndo={moveHistory.length > 0 && isGameActive} hintsLeft={hintsLeft} selectedCell={selectedCell} isGameActive={isGameActive} />
            <EmojiPad onEmojiPress={handleEmojiPress} selectedCell={selectedCell} isGameActive={isGameActive} />
            <FirstAds></FirstAds>
        </View>
    );
};

// ===================================================================================
// --- 3. ALL STYLESHEETS ---
// ===================================================================================

const { width } = Dimensions.get('window');
const gridSize = Math.min(width * 0.95, 450);

const style = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-start', paddingTop:10 },
    grid: { width: gridSize, height: gridSize, borderWidth: 3, borderColor: '#000000', borderRadius: 5 },
    row: { flex: 1, flexDirection: 'row' },
    cell: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 0.5, borderColor: '#cccccc' },
    subgridBorderRight: { borderRightWidth: 2, borderRightColor: '#333333' },
    subgridBorderBottom: { borderBottomWidth: 2, borderBottomColor: '#333333' },
    highlightedCell: { backgroundColor: 'hsl(220,90%,90%)' },
    correctCell: { backgroundColor: '#e8f5e9' },
    conflictCell: { backgroundColor: '#d3919cff' },
    selectedCell: { borderWidth: 2.5, borderColor: 'hsl(220,90%, 60%)' },
    cellText: { fontSize: (gridSize / 9) * 0.6 },
});

const popupStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 25,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
        width: '90%',
        maxWidth: 400,
    },
    trophyContainer: {
        marginBottom: 20,
        backgroundColor: '#FFF9E6',
        borderRadius: 50,
        padding: 20,
        shadowColor: "#FFD700",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: "center",
        color: '#2C3E50',
    },
    modalSubtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
        color: '#7F8C8D',
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        gap: 8,
    },
    starIcon: {
        marginHorizontal: 2,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 30,
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        padding: 15,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#D3D3D3',
    },
    statText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2C3E50',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 15,
    },
    button: {
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        elevation: 3,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
   
    homeButton: {
        backgroundColor: "#1cb0f6",
        shadowColor: "#4A90E2",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
         borderBottomWidth:4,
          borderColor:'#1899d6',
          borderWidth: 1
        
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
const gameOverStyles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: 'white', borderRadius: 24, padding: 32, alignItems: 'center', width: '85%', maxWidth: 400 },
    heartContainer: { position: 'relative', marginBottom: 20, alignItems: 'center', justifyContent: 'center', width: 100, height: 100 },
    heart: { position: 'absolute' },
    heartIcon: { fontSize: 80 },
    plusTwoContainer: { position: 'absolute', zIndex: 10 },
    plusTwo: { fontSize: 32, fontWeight: 'bold', color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 },
    subtitle: { fontSize: 15, color: '#4B5563', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
    secondChanceButton: { backgroundColor: '#10B981', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 12 },
    secondChanceText: { color: 'white', fontSize: 18, fontWeight: '600' },
    lightButton: { backgroundColor: '#E5E7EB', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 24, width: '100%', alignItems: 'center' },
    lightButtonText: { color: '#1F2937', fontSize: 18, fontWeight: '600' },
});




const adModalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        minWidth: 280,
    },
    iconWrapper: {
        position: 'relative',
        marginBottom: 20,
    },
    rewardBadge: {
        position: 'absolute',
        top: -5,
        right: -10,
        backgroundColor: '#4CAF50',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    badgeText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    cancelText: {
        fontSize: 16,
        color: '#999',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});