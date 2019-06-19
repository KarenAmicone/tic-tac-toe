import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import Board from './components/Board'
import Header from './components/Header'
import background from './assets/background.jpg'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
          <Text>Background</Text>
          <Header/>
          <Board/>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
