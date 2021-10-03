import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Audio} from 'expo-av'
class PhonicSoundButton extends React.Component(){
    constructor(props){
        super(props);
        this.state={
            pressedButtonIndex:'',

        }
    }
    playSound=async(soundChunk)=>{
        var soundlink='https://s3-whitehatjrcontent.whjr.online/phones/'+soundChunk+'.mp3';
        await Audio.Sound.createAsync(
            {uri:soundlink},
            {shouldPlay:true}
        );
    }
    render(){
        return(
            <TouchableOpacity
            style={
                this.props.buttonIndex===this.state.pressedButtonIndex?
                [styles.chunkButton,{backgroundColor:'#fff'}]
                : [styles.chunkButton,{backgroundColor:'#f00'}]
            }
            onPress={()=>{
                this.setState({pressedButtonIndex:this.props.buttonIndex});
                this.playSound(this.props.soundChunk)
            }}>
                <Text style={
                    this.props.buttonIndex===this.state.pressedButtonIndex?
                    [styles.displayText,{color:'#f00'}]
                    :[styles.displayText,{color:'#fff'}]
                }>
                    {this.props.wordChunk}
                </Text>
            </TouchableOpacity>
        );
    }
}
    const styles=StyleSheet.create({
        chunkButton:{
            width:'60%',
            height:50,
            justifyContent:'center',
            alignItems:'center',
            alignSelf:'center',
            borderRadius:10,
            margin:5,
            backgroundColor:'#f00'
          },
          displayText:{
            textAlign:'center',
            fontSize:30
          }

    });
export default PhonicSoundButton;