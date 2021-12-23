import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Button from 'react-native-flat-button'
import entities from './entities';
import Physics from './physics';
import bgImage from './assets/background.jpg';
import skull from './assets/skull.gif';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Arial',
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
  },
  gameOver: {
    color: '#ffffff',
    fontSize: 60,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 5,
  },
  points: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    margin: 20,
    color: 'white',
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 8,
    height: 40,
    lineHeight: 37,
    flex: 1,
    position: 'absolute',
    top: 10,
    zIndex: 1
  },
  skull: {
    height: 50,
  },
})

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    setRunning(false)
  }, [])
  return (
    <View style={styles.container}>
      <ImageBackground source={ bgImage } resizeMode="cover" style={styles.image}>
        <Text style={styles.points}>{currentPoints}</Text>
        <GameEngine
          ref={(ref) => { setGameEngine(ref) }}
          systems={[Physics]}
          entities={entities()}
          running={running}
          onEvent={(e) => {
            switch (e.type) {
              case 'game_over':
                setRunning(false)
                setGameOver(true)
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
            { gameOver &&
              <View>
                 <ImageBackground source={ skull } resizeMode="contain" style={styles.skull}></ImageBackground>
                <Text style={styles.gameOver}>GAME OVER</Text>
              </View>
            }
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

