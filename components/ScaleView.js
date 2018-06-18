import React, { Component } from 'react'
import { View, 
         Text, 
         Image, 
         Animated, 
         Easing, 
         StyleSheet } from 'react-native'

export default class ScaleView extends Component {
  constructor() {
    super() 
    this.state = {
      scaleValue: new Animated.Value(0), // default value is 0
      rotationValue: new Animated.Value(0)
    }
  }

  componentDidMount() {
    super.componentDidMount
    this.animateView()
  }

  animateView() {
    // use destructuring to capture value from state 
    let { scaleValue, rotationValue } = this.state

    // reset values to 0
    scaleValue.setValue(0)
    rotationValue.setValue(0)

    const animations = [
      Animated.timing(
        scaleValue, 
        {
          toValue: 1, 
          duration: 1000, 
          easing: Easing.bounce
        }
      ),
      Animated.timing(
        rotationValue, 
        {
          toValue: 1, 
          duration: 1000, 
          easing: Easing.linear
        }
      )
    ]
    Animated.sequence(animations).start(() => this.animateView())
  }

  render() {
    // destructured values from state
    let { scaleValue, rotationValue } = this.state

    // maps values over a range
    const scale = scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 3]
    })

    // maps values over a range
    const rotate = rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '720deg']
    })

    return(
      <View style={styles.container}>
        <Animated.View 
          style={{
            transform: [{scale: scale}]
          }}
        > 
          <Image
            source={require('../assets/duck.png')}
            style={{
              width: 100, 
              height: 100, 
            }}
          />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{rotate: rotate}]
          }}
        >
          <Text style={styles.spinText}>another day of rubber ducking</Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  spinText: {
    fontSize: 25, 
    color: 'limegreen',
    fontWeight: '900'
  }
})
