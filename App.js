import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet, TextInput, Image, Alert} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
import PhonicSoundButton from './PhonicSoundButton';
export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      text:"",
      chunks:[],
      phonicSounds:[]
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <Header
      backgroundColor={'#9C8218'}
      centerComponent={{
        text:'Monkey Chunky',
        style:{color:'#FFF',fontSize:20}
      }}
      />
      <Image 
      style={styles.imageIcon}
      source={{
        uri:'https://www.freeiconspng.com/uploads/monkey-png-23.png'
      }}
      />
      <TextInput style={styles.inputBox}
      onChangeText={(text)=>{
        this.setState({
          text:text
        });
      }}
      value={this.state.text}
      />
      <TouchableOpacity style={styles.goButton}
      onPress={()=>{
        var word=this.state.text.toLowerCase().trim();
        db[word]?(
          this.setState({
            chunks:db[this.state.text].chunks
          }),
          this.setState({
            phonicSounds:db[this.state.text].phones
          })
        ):Alert.alert("the word does not exist in our databse because we don't have the budget to include it");
       
      }}>
        <Text style={styles.buttonText}>
          GO
        </Text>
      </TouchableOpacity>
      <View>
        {this.state.chunks.map((item,index)=>{
          return(
            <PhonicSoundButton wordChunk={this.state.chunks[index]}
            soundChunk={this.state.phonicSounds.index}
            buttonIndex={index}
            />
          );
        })}
      </View>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox:{
    marginTop:200,
    width:'80%',
    alignSelf:'center',
    height:40,
    textAlign:'center',
    borderWidth:4,
    outline:'none'
  },
  goButton:{
    width:'50%',
    height:55,
    alignSelf:'center',
    padding:10,
    margin:10
  },
  buttonText:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold'
  },
  displayText:{
    textAlign:'center',
    fontSize:30
  },
  imageIcon:{
    width:180,
    height:180,
    marginLeft:110,
    marginTop:70
  },
  

});
