import React, {Component} from 'react'
import {Button, View, Text, StyleSheet , FlatList, Image, ActivityIndicator, TouchableOpacity, ToastAndroid, Alert} from 'react-native'


export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      dataSource: [],
      isLoading: true

    }
  }

  renderItem = ({ item }) =>{
    return(
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', margin: 10, border: 1, borderColor: "#D3D3D3", backgroundColor: "#FFF", padding:8, borderWidth:2, borderRadius:10}} onPress={() => ToastAndroid.show(item.first_name, ToastAndroid.SHORT)}>
        <Image style={{width: 100, height: 100, margin:5, borderRadius:50, }}
          source={{ uri: item.avatar }}
        />
        <View style={{flex:1, justifyContent: 'center', marginLeft:10}}>
          <Text style={{fontSize:22, fontWeight:'bold'}}>
            {item.first_name}
          </Text>
          <Text style={{ color: "#4682B4"}}>
            {item.email}
          </Text>
        </View>
      </TouchableOpacity>
    )
    
  }
  
  floatingButtonEvent = () => {
    Alert.alert("Apakah anda ingin menambahkan user?");
  }

  menuEvent = () => {
    Alert.alert("Hallo User");
  }

  searchEvent = () => {
    Alert.alert("Selamt mencari");
  }
  
  componentDidMount(){
    const url = 'https://reqres.in/api/users?page=2'
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson.data,
        isLoading: false

      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
  header = () => {
    return(
      <View style={{ backgroundColor: 'blue', justifyContent: 'center' }}>
        <Text>hhosea</Text>
        <Text>hhosea</Text>
        <Text>hhosea</Text>
      </View>
    )
  }

  render(){
    return (
      this.state.isLoading
      ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems:'center'}}>
        <ActivityIndicator size='large' color="#330066" animating />
      </View>
      :
      <View style={styles.container}>
          <View style={{ backgroundColor: '#e3e1df', justifyContent: 'space-between', flexDirection: 'row', width: '100%', borderBottomEndRadius: 10, borderBottomStartRadius: 10, border: 1, borderWidth: 2, borderColor: "#cfcbc8" }}>
            <TouchableOpacity onPress={this.menuEvent}>
            <Image source={require('./images/menu.png')}  style={{width: 50, height: 40, margin:10}}  />
            </TouchableOpacity>
            <Text style={{fontSize:20, justifyContent: 'center', marginTop: 15}}>Contact</Text>
            <TouchableOpacity onPress={this.searchEvent}>
            <Image source={require('./images/search.png')} style={{ width: 50, height: 40,margin:10 }} />
            </TouchableOpacity>
          </View>
        <View >
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={this.floatingButtonEvent} style={styles.TouchableOpacityStyle}>
          <Image source={require('./images/native.png')} style={styles.floatingStyle}/>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#FFFFFF",
    flex: 1,
  },

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 80,
  },


  floatingStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  }
});