import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const RandomNumber = ({number, isDisabled, onPress, id}) => {
  const handlePress = () => {
    if (isDisabled) {
      return;
    }
    console.log('jhsgdbjhb');
    onPress(id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.random, isDisabled && styles.selected]}>
        {number}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  random: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
  selected: {
    opacity: 0.3,
  },
});

export default RandomNumber;
