import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Modal, Button} from 'react-native';

function Header (){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Tic-Tac-Space</Text>
        </View>
    )
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