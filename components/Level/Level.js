

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import Svg, { Path, G, ClipPath, Defs, Rect, Line } from 'react-native-svg';
import {Header} from './Header.js';

// --- IMPORT THE PUZZLE DATA ---
// Make sure the path to Puzzle.js is correct for your project structure.
import { puzzles } from './Puzzle.js';


// --- ICONS (No changes needed here) ---
const StarIcon = () => (
    <Svg width="40" height="38" viewBox="0 0 31 29" fill="none">
      <G clipPath="url(#clip0_11063_110219)">
        <Path
          d="M13.6986 1.91157C14.6063 0.0294775 17.2868 0.0294775 18.1944 1.91157L20.8004 7.31517C21.1715 8.08468 21.9105 8.61088 22.759 8.70992L28.7372 9.40762C30.8735 9.65695 31.7149 12.3114 30.1124 13.7459L25.831 17.5785C25.1705 18.1697 24.8732 19.067 25.05 19.9357L26.1934 25.553C26.6149 27.624 24.4322 29.2487 22.5693 28.2506L17.1251 25.3339C16.3889 24.9395 15.5042 24.9395 14.768 25.3339L9.32375 28.2506C7.46081 29.2487 5.27815 27.624 5.69969 25.553L6.84305 19.9357C7.01986 19.067 6.72258 18.1697 6.06207 17.5785L1.78069 13.7459C0.178152 12.3114 1.0196 9.65695 3.15592 9.40762L9.13405 8.70992C9.98261 8.61088 10.7215 8.08468 11.0926 7.31517L13.6986 1.91157Z"
          fill="#AFAFAF"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_11063_110219">
          <Rect width="30" height="28" fill="white" transform="translate(0.946533 0.5)" />
        </ClipPath>
      </Defs>
    </Svg>
  );

const FlameIcon = () => (
  <Svg width="42" height="34" viewBox="0 0 42 34" fill="none">
    <G clipPath="url(#clip0_334_225170)">
      <Line x1="16" y1="20.3246" x2="24.7589" y2="15.2676" stroke="#AFAFAF" strokeWidth="4" />
      <Rect x="17.7635" y="3.66309" width="9.1025" height="26.2961" rx="4.55125" transform="rotate(-30 17.7635 3.66309)" fill="#AFAFAF" />
      <Rect x="2.87354" y="12.2598" width="9.1025" height="26.2961" rx="4.55125" transform="rotate(-30 2.87354 12.2598)" fill="#AFAFAF" />
      <Rect x="25.9183" y="3.62891" width="9.1025" height="18.205" rx="4.55125" transform="rotate(-30 25.9183 3.62891)" fill="#AFAFAF" />
      <Rect x="-1.23499" y="19.3027" width="9.1025" height="18.205" rx="4.55125" transform="rotate(-30 -1.23499 19.3027)" fill="#AFAFAF" />
      <Rect opacity="0.2" x="2.81079" y="20.3145" width="3.03417" height="5.05694" rx="1.51708" transform="rotate(-30 2.81079 20.3145)" fill="white" />
      <Rect opacity="0.2" x="31.1294" y="5.14355" width="3.03417" height="5.05694" rx="1.51708" transform="rotate(-30 31.1294 5.14355)" fill="white" />
      <Rect opacity="0.2" x="6.85596" y="13.2354" width="3.03417" height="6.06833" rx="1.51708" transform="rotate(-30 6.85596 13.2354)" fill="white" />
      <Rect opacity="0.2" x="22.027" y="5.14355" width="3.03417" height="6.06833" rx="1.51708" transform="rotate(-30 22.027 5.14355)" fill="white" />
    </G>
    <Defs>
      <ClipPath id="clip0_334_225170">
        <Rect width="42" height="34" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const CrownIcon = () => (
  <Svg width="42" height="34" viewBox="0 0 42 34" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0867 0.656357C11.241 -0.566997 7.97179 1.50405 7.97179 4.66166V13.4091C7.97179 19.8104 12.3546 25.1645 18.2181 26.5027C19.2287 26.8827 19.5393 27.3939 19.5793 27.8013V27.8899L19.579 27.8896L19.5793 27.8957V27.9759C19.5687 28.2279 19.4591 28.5701 19.1536 28.8471H15.9409C15.1526 28.8471 14.5136 29.4861 14.5136 30.2744C14.5136 30.435 14.5401 30.5893 14.5889 30.7333H13.0182C12.2272 30.7333 11.5859 31.3746 11.5859 32.1657C11.5859 32.9568 12.2272 33.598 13.0182 33.598H28.7601C29.5512 33.598 30.1925 32.9568 30.1925 32.1657C30.1925 31.3746 29.5512 30.7333 28.7601 30.7333H27.4615C27.5103 30.5893 27.5368 30.435 27.5368 30.2744C27.5368 29.4861 26.8978 28.8471 26.1095 28.8471H22.8507C22.5685 28.6241 22.4241 28.3499 22.3681 28.1133V27.8309C22.4457 27.3726 22.8765 26.805 24.2268 26.4375C29.9533 24.998 34.2011 19.711 34.2011 13.4091V4.66166C34.2011 1.50405 30.9319 -0.566996 28.0862 0.656358C25.4325 1.79713 22.5919 2.84158 21.0864 2.84158C19.581 2.84158 16.7403 1.79713 14.0867 0.656357ZM4.35009 16.3748C2.6223 15.4664 1.68222 13.4485 2.20034 11.4887C2.30684 11.0859 2.71874 10.8494 3.12034 10.9605L3.25989 10.9991C4.46034 11.3312 5.40222 12.1498 5.93 13.1841C6.27824 13.3866 6.50967 13.7663 6.50263 14.1977C6.48629 15.1997 6.65091 16.9075 7.20872 18.6485C7.76885 20.3967 8.68562 22.0565 10.0855 23.122C10.5909 23.5066 10.6887 24.2281 10.3041 24.7335C10.2195 24.8446 10.1187 24.936 10.0075 25.0069C9.05615 26.8441 6.86647 27.7005 4.88711 26.9278C4.50596 26.7791 4.31291 26.3477 4.45591 25.9643L4.57108 25.6556C5.00725 24.4863 5.91081 23.6374 6.98825 23.2401C6.67974 22.8379 6.40435 22.4164 6.15877 21.9847C4.26086 22.3411 2.32119 21.3362 1.55668 19.4685C1.39911 19.0836 1.58132 18.6388 1.96365 18.475L2.11386 18.4107C2.9626 18.0472 3.85995 17.9849 4.68935 18.1762C4.53785 17.5503 4.42727 16.9423 4.35009 16.3748ZM35.6154 13.2459C35.3208 13.4585 35.1315 13.8069 35.1379 14.1977C35.1542 15.1997 34.9896 16.9075 34.4318 18.6485C33.8717 20.3967 32.9549 22.0565 31.555 23.122C31.0496 23.5066 30.9518 24.2281 31.3364 24.7335C31.4351 24.8632 31.556 24.9661 31.6897 25.0408C32.6503 26.8546 34.8252 27.6957 36.7924 26.9278C37.1735 26.7791 37.3666 26.3477 37.2236 25.9643L37.1084 25.6556C36.6681 24.4753 35.7516 23.6214 34.6608 23.229C34.9786 22.8134 35.2612 22.3774 35.5122 21.9309C37.4859 22.4262 39.5623 21.4168 40.3598 19.4685C40.5174 19.0836 40.3352 18.6388 39.9528 18.475L39.8026 18.4107C38.852 18.0035 37.8405 17.9743 36.9317 18.2559C37.0997 17.5756 37.2193 16.9152 37.3 16.3035C39.0398 15.3373 39.9272 13.2427 39.3135 11.2768C39.1894 10.8792 38.7679 10.6618 38.372 10.7911L38.2291 10.8378C37.0073 11.2369 36.0835 12.1414 35.6154 13.2459Z"
      fill="#AFAFAF"
    />
  </Svg>
);

const FirstIcon = () => (
  <Svg width="42" height="34" viewBox="0 0 42 34" fill="none">
    <G clipPath="url(#clip0_7030_116434)">
      <Path fillRule="evenodd" clipRule="evenodd" d="M22.0423 14.9989C23.4698 15.8749 23.4698 17.9491 22.0423 18.825L8.91839 26.8783C7.42288 27.796 5.5 26.7199 5.5 24.9653L5.5 8.85865C5.5 7.10401 7.42288 6.02791 8.9184 6.94562L22.0423 14.9989Z" fill="white" />
      <Path fillRule="evenodd" clipRule="evenodd" d="M35.4535 14.9989C36.881 15.8749 36.881 17.9491 35.4535 18.825L22.3296 26.8783C20.8341 27.796 18.9112 26.7199 18.9112 24.9653L18.9112 8.85865C18.9112 7.10401 20.8341 6.02791 22.3296 6.94562L35.4535 14.9989Z" fill="white" />
    </G>
    <Defs>
      <ClipPath id="clip0_7030_116434">
        <Rect width="31" height="30" fill="white" transform="translate(5.5 2)" />
      </ClipPath>
    </Defs>
  </Svg>
);


// --- LevelButton COMPONENT ---
const LevelButton = ({ level, onPress }) => {
  const isStart = level.id === 1;
  const buttonStyles = isStart ? styles.startButton : styles.defaultButton;
  const shadowStyles = isStart ? styles.startShadow : styles.defaultShadow;
  const [isPressed, setIsPressed] = useState(false);

  const getIcon = () => {
    if (isStart) return <FirstIcon />;
    switch (level.difficulty) {
      case 'easy': return <StarIcon />;
      case 'medium': return <FlameIcon />;
      case 'hard':    return <CrownIcon />;
     // Let the 'boss' level use the 'hard' icon
     
      default: return null;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[styles.buttonContainer, isPressed && { transform: [{ translateY: 3 }] }]}
    >
      <View style={[styles.buttonShadow, shadowStyles]} />
      <View style={[styles.levelButton, buttonStyles]}>
        {getIcon()}
      </View>
    </TouchableOpacity>
  );
};

// --- MAIN APP COMPONENT ---
const Level = ({navigation}) => {
  const [levelData, setLevelData] = useState([]);

  // --- MODIFIED useEffect HOOK ---
  useEffect(() => {
    // These patterns determine the left/right/center alignment of the buttons
    const patternA = ['center', 'left', 'center', 'right', 'center', 'left'];
    const patternB = ['center', 'right', 'center', 'left', 'center', 'right'];

    // Map the imported puzzle data into a format the component can use
    const formattedLevels = puzzles.map((puzzle, index) => {
      const i = index + 1;
      const blockIndex = Math.floor((i - 1) / 6);
      const positionInBlock = (i - 1) % 6;

      // Assign an alternating position for the visual layout
      const position = blockIndex % 2 === 0 ? patternA[positionInBlock] : patternB[positionInBlock];

      // Return a new object that matches the component's expected props
      return {
        id: puzzle.levelId,
        difficulty: puzzle.medium, // Map the 'medium' key to 'difficulty'
        position: position,
        board: puzzle.board,
        solution: puzzle.solution,
      };
    });

    setLevelData(formattedLevels);
  }, []); // The empty dependency array means this runs only once when the component mounts

  const getLevelContainerStyle = (position) => {
    switch (position) {
      case 'left':
        return { justifyContent: 'flex-start', paddingLeft: 85 };
      case 'right':
        return { justifyContent: 'flex-end', paddingRight: 85 };
      case 'center':
      default:
        return { justifyContent: 'center' };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header></Header>
      <ScrollView contentContainerStyle={styles.container}>
        {levelData.map(level => (
          <View key={level.id} style={[styles.level, getLevelContainerStyle(level.position)]}>
            <LevelButton
              level={level}
              onPress={() => navigation.navigate('Sudoku', { puzzle: level })} 
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STYLESHEET (No changes needed here) ---
const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: 'white',
    },
    container: {
      paddingVertical: 50,
      paddingHorizontal: 20,
    },
    level: {
      marginBottom: 50,
      flexDirection: 'row',
    },
    buttonContainer: {
      width: 85,
      height: 90,
    },
    levelButton: {
      width: 85,
      height: 85,
      borderRadius: 85 / 2,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    buttonShadow: {
      width: 85,
      height: 85,
      borderRadius: 85 / 2,
      position: 'absolute',
      top: 5,
      left: 0,
    },
    defaultButton: {
      backgroundColor: '#EDEDED',
    },
    defaultShadow: {
      backgroundColor: '#e5cbcb',
    },
    startButton: {
      backgroundColor: '#ce82ff',
    },
    startShadow: {
      backgroundColor: '#6c10b6',
    },
  });

export default Level;