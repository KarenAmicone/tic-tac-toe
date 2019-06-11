import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Font } from 'expo';

class Header extends React.Component{
    constructor(){
        super()
        this.state={
            fontLoaded: false
        }
    }
    async componentDidMount(){
        await Font.loadAsync({
          'space-mono-bold': require('../assets/fonts/SpaceMono-Bold.ttf'),
        });
        this.setState({
            fontLoaded: true
        })
    }

    render(){
        return(
        <View style={styles.container}>
            {this.state.fontLoaded ? (<Text style={[styles.text, {fontFamily: 'space-mono-bold'}]}>Tic-Tac-Space</Text>):
            (<ActivityIndicator size="large"/>)
        }   
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: { 
      margin: 20, 
      fontSize: 40,
      color: 'white'
    }
  });
export default Header