import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Modal, Button, ActivityIndicator, TouchableHighlight, ImageBackground} from 'react-native';
import rocket from '../assets/rocket.png'
import telescope from '../assets/telescope.png'
import restart from '../assets/repeat.png'
import modal from '../assets/modal-back.jpg'
import { Font } from 'expo';

export default class Board extends React.Component {
   constructor(props){
      super(props);
      this.state = {
        boardState: 
        [
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ],
        currentPlayer: 1,
        currentIcon: rocket,
        modalVisible: false,
        winner:null,
        fontLoaded: false
      }
   };

   async componentDidMount(){
    await Font.loadAsync({
      'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    this.setState({
        fontLoaded: true
    })
}

   initializeBoard = () =>{
     this.setState({
       boardState:
       [
        [0,0,0],
        [0,0,0],
        [0,0,0]
        ],
        currentPlayer: 1,
        currentIcon: rocket
     })
   }

   setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };

   onPressTile = (row, col) => {
    // Preventing changing tale
    let val = this.state.boardState[row][col];
    if(val !== 0){
      return ; 
    };

    // Setting tale 
    let currentPlayer = this.state.currentPlayer;
    let playArr = this.state.boardState.slice();
    playArr [row][col] = currentPlayer;
    this.setState({
      boardState: playArr
     });

    // Switching player
    let nextPlayer = (currentPlayer === 1) ? -1 : 1;
    let nextIcon = (this.state.currentIcon == rocket) ? telescope : rocket;
    this.setState({
      currentPlayer: nextPlayer,
      currentIcon: nextIcon
    });

    let winner = this.theWinner();
    if(winner === 1){
      this.setModalVisible();
      this.setState({
        winner: <Text style={styles.modalText}>The winner is: <Image style={{width: 35, height: 35}} source={rocket}/></Text>
      })
    } else if( winner === -1){
      this.setModalVisible();
      this.setState({
        winner: <Text style={styles.modalText}>The winner is: <Image style={{width: 35, height: 35}} source={telescope}/></Text>
      })
    } else if(winner === 2){
      this.setModalVisible();
      this.setState({
        winner: <Text style={styles.modalText}>It's a tie</Text>
      })
    }
   };

   showIcon = (row, col) => {
     let val = this.state.boardState[row][col];
     switch(val)
     {
       case 1: return <Image style={styles.icon} source={rocket}/>;
       case -1: return <Image style={styles.icon} source={telescope}/>;
       default: return <View/>
     }
   };

   theWinner = () => {
     const taleLength = 3;
     let playArr = this.state.boardState;
     let i = 0;
     let sum;
     const full = this.state.boardState.reduce((acc, el) => {
      return el.reduce((acc, el) => {
        return el === 0 ? false  : acc
      }, acc) 
   }, true);
      
     //Rows
     for(let i = 0; i<taleLength; i++){
       sum = playArr[i][0] + playArr[i][1] + playArr[i][2];
       if(sum === 3){
         return 1;
       } else if(sum === -3){
         return -1;
       } else if(sum !== 3 && full){
         return 2
       }
     };

    //Columns
     for(let i = 0; i<taleLength; i++){
      sum = playArr[0][i] + playArr[1][i] + playArr[2][i];
      if(sum === 3){
        return 1;
      } else if(sum === -3){
        return -1;
      } else if(sum !== 3 && full){
        return 2
      }
     } 

     sum = playArr[0][0] + playArr[1][1] + playArr[2][2];
     if(sum === 3){
      return 1;
    } else if(sum === -3){
      return -1;
    } else if(sum !== 3 && full){
      return 2
    }

    sum = playArr[2][0] + playArr[1][1] + playArr[0][2];
     if(sum === 3){
      return 1;
    } else if(sum === -3){
      return -1;
    } else if(sum !== 3 && full){
      return 2
    }
   } 

  render() {
    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (
          <View style={styles.container}>
          <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress = {()=> this.onPressTile(0, 0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.showIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=> this.onPressTile(0, 1)} style={[styles.tile, {borderTopWidth: 0}]}>
            {this.showIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=> this.onPressTile(0, 2)} style={[styles.tile, {borderTopWidth: 0, borderRightWidth:0}]}>
            {this.showIcon(0,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress = {()=> this.onPressTile(1, 0)} style={[styles.tile, {borderLeftWidth: 0}]}>
            {this.showIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=> this.onPressTile(1, 1)} style={[styles.tile]}>
            {this.showIcon(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=> this.onPressTile(1, 2)} style={[styles.tile, {borderRightWidth: 0}]}>
            {this.showIcon(1,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress = {()=> this.onPressTile(2, 0)} style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth:0}]}>
            {this.showIcon(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=> this.onPressTile(2, 1)} style={[styles.tile, {borderBottomWidth: 0}]}>
            {this.showIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=> this.onPressTile(2, 2)} style={[styles.tile, {borderBottomWidth: 0, borderRightWidth: 0}]}>
            {this.showIcon(2,2)}
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'space-mono',
                        margin: 30, 
                        fontSize: 30,
                        color: 'white'
                        }}>
              It's <Image style={{width: 30, height:30}} source={this.state.currentIcon}/> turn
          </Text>
          
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(false);
                this.initializeBoard();
              }}
              accessibilityLabel="Play again"
              >
              <Image style={{width: 60, height: 60}} source={restart}/>
              </TouchableHighlight>
        </View>

        <View style={{marginTop: 30}}>
        <Modal
          visible={this.state.modalVisible}
          presentationStyle={'overFullScreen'}
          animationType={'slide'}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ImageBackground source={modal} style={{width: '100%', height: '100%'}}>
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              {this.state.winner}
                <Button
                  onPress={() => {
                    this.setModalVisible(false);
                    this.initializeBoard();
                  }}
                  title="Play again"
                  color="#1e1d1e"
                  accessibilityLabel="Play again"
                />
            </View>
          </View>
          </ImageBackground>
        </Modal>
      </View>
      </View>
      ):(
          <ActivityIndicator size="large"/>
        )}
      </View>  
      
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 3,
    borderColor: 'white',
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon:{
    width: 50, 
    height: 50
  },
  modalContainer: {
    marginTop: 450,
    justifyContent: 'center'
  },
  innerContainer: {
    alignSelf: 'center',
    justifyContent: 'center'
  }, 
  modalText : {
    margin: 20, 
    color: 'white',
    fontSize: 30
  }
});