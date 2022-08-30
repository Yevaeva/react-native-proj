import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, StyleSheet, Text, useColorScheme, View} from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

const Game = ({randomNumberCount, initialSeconds, onPlayAgain}) => {
  const randomNumbers = useMemo(
    () =>
      shuffle(
        Array.from({length: randomNumberCount}).map(
          () => 1 + Math.floor(10 * Math.random()),
        ),
      ),
    [randomNumberCount],
  );

  const target = randomNumbers
    .slice(0, randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  const [selectedIds, setSelectedIds] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    setIntervalId(
      setInterval(() => {
        setRemainingSeconds(prev => prev - 1);
      }, 1000),
    );
    () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    if (remainingSeconds === 0) {
      clearInterval(intervalId);
    }
    if (gameStatus() !== 'PLAYING') {
      clearInterval(intervalId);
    }
  }, [remainingSeconds, gameStatus, intervalId]);

  const isNumberSelected = index => {
    return selectedIds.indexOf(index) >= 0;
  };

  const gameStatus = useCallback(() => {
    const sumSelected = selectedIds.reduce((acc, curr) => {
      return acc + randomNumbers[curr];
    }, 0);
    if (remainingSeconds === 0) {
      return 'LOST';
    }
    if (sumSelected < target) {
      return 'PLAYING';
    }
    if (sumSelected === target) {
      return 'WON';
    }
    if (sumSelected > target) {
      return 'LOST';
    }
  }, [remainingSeconds, selectedIds, target, randomNumbers]);

  const selectNumber = index => {
    setSelectedIds([...selectedIds, index]);
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`STATUS_${gameStatus()}`]]}>
        {target}
      </Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((numb, index) => (
          <RandomNumber
            number={numb}
            key={index}
            isDisabled={isNumberSelected(index) || gameStatus() !== 'PLAYING'}
            onPress={selectNumber}
            id={index}
          />
        ))}
      </View>
      <View style={styles.timer}>
        <Text style={styles.timerText}>{remainingSeconds}</Text>
      </View>
      {gameStatus() !== 'PLAYING' && (
        <Button title="Play Again" onPress={onPlayAgain} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
  },
  target: {
    fontSize: 50,
    backgroundColor: '#aaa',
    textAlign: 'center',
    margin: 50,
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  STATUS_PLAYING: {
    backgroundColor: '#bbb',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
  timer: {
    padding: 5,
    flex: 1,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 20,
    color: 'blue',
    fontWeight: '600',
  },
});

export default Game;
