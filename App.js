import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Button from 'react-native-flat-button'
import entities from './entities';
import Physics from './physics';
import bgImage from './assets/background.jpg';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171723'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  buttonContainer: {
    width: 260,
    height: 70,
    marginVertical: 5
  },
  buttonText: {
    fontSize: 30
  }
})

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  useEffect(() => {
    setRunning(false)
  }, [])
  return (
    <View style={styles.container}>
      <ImageBackground source={ bgImage } resizeMode="cover" style={styles.image}>
        <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20, color: 'white', flex: 1 }}>{currentPoints}</Text>
        <GameEngine
          ref={(ref) => { setGameEngine(ref) }}
          systems={[Physics]}
          entities={entities()}
          running={running}
          onEvent={(e) => {
            switch (e.type) {
              case 'game_over':
                setRunning(false)
                gameEngine.stop()
                break;
              case 'new_point':
                setCurrentPoints(currentPoints + 1)
                break;
            }
          }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <StatusBar style="auto" hidden={true} />

        </GameEngine>

        {!running ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
            type="info"
            onPress={() => {
              setCurrentPoints(0)
              setRunning(true)
              gameEngine.swap(entities())
            }}
            containerStyle={styles.buttonContainer}
          >
           <Text style={styles.buttonText}>START GAME</Text>
          </Button>
          </View> : null}
        </ImageBackground>
    </View>
  );
}

