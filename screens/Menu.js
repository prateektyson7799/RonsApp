import React from "react";
import { StyleSheet,SafeAreaView, Text, View, TouchableOpacity, Image } from "react-native";
import localImage from "../assets/logo.png";
import { Icon } from 'react-native-elements'
import { StatusBar } from "expo-status-bar";



const MenuScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <StatusBar barStyle = "dark-content"  backgroundColor="black"></StatusBar>
      <Text style={styles.buttonText1}> Welcome </Text>
      <View style={styles.WelContainer}>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Consonants</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Register")}>
          <Text style={styles.buttonText}>Vowels</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Quiz")}>
          <Text style={styles.buttonText}>Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>R-sound Combinations</Text>
        </TouchableOpacity>
   
      </View> 
      
      <View style={styles.buttonContainer1}>
      <TouchableOpacity
          onPress={() => navigation.navigate("Register")}>
            <Icon name="play" 
              type='font-awesome' style={styles.button1}>
            </Icon>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate("Register")}>
      <Icon name="film" type='font-awesome' style={styles.button1}></Icon>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate("Register")}>
      <Icon name="favorite" type='material'style={styles.button1}></Icon>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate("Setting")}>
      <Icon name="settings" type='material' style={styles.button1}></Icon> 
      </TouchableOpacity>
  </View>
    </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  WelContainer:{
    width: 0,
    height: 10,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 205,
    borderRightWidth: 205,
    borderBottomWidth: 140,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "black",
    transform: [{ rotate: "180deg" }],
  },
  container: {
   
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  buttonContainer1: {
    flexDirection: "row",
    marginTop: 30,
  },
  button: {
    backgroundColor: 'black',
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 10,
    paddingVertical: 35,
    paddingHorizontal: 20,
    width: 290,
    margin: 10,
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s, color 0.3s",
  },
  button1: {
    borderWidth: 5,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: 70,
    margin: 10,
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s, color 0.3s",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  buttonText1: {
    color: "white",
    backgroundColor: "black",
    fontSize: 40,
    paddingTop:40,
    paddingLeft: 100,
    paddingRight:100,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default MenuScreen;
