import Matter from 'matter-js'
import React from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import bat from '.././assets/dracbat.gif';

const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center"
    }
  })


const Bat = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody /2
    const yBody = props.body.position.y - heightBody /2

    return(
        <View style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}>
            <ImageBackground source={ bat } resizeMode="cover" style={styles.image}></ImageBackground>
        </View>
    )
}

export default (world, color, pos, size) => {
   const initialBat = Matter.Bodies.rectangle(
       pos.x,
       pos.y,
       size.width,
       size.height,
       {label: 'Bat'}
   )
   Matter.World.add(world, initialBat)

   return {
       body: initialBat,
       color,
       pos,
       renderer: <Bat/>
   }
}
