import React, {useState} from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Game from './src/components/Game';

const App = () => {
  const [gameId, setGameId] = useState(1);
  const resetGame = () => {
    setGameId(gameId + 1);
  };
  return (
    <Game
      key={gameId}
      randomNumberCount={6}
      initialSeconds={10}
      onPlayAgain={resetGame}
    />
  );
};

export default App;
