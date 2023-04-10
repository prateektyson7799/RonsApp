import React,{useEffect} from "react";
import { StyleSheet,SafeAreaView, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import localImage from "../assets/logo.png";
import { Icon } from 'react-native-elements'
import { StatusBar } from "expo-status-bar";
import * as Progress from 'react-native-progress';
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("RonsDB.db");
const ID = 1;
const QuizScreen = ({ navigation }) => {
  useEffect(()=> {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS quiz_info (uid INTEGER PRIMARY KEY, qid INTEGER PRIMARY KEY, q_sid INTEGER)"
    );
    tx.executeSql("SELECT * FROM QUIZ_INFO WHERE uid = ?",[ID],(_, result) => {
      if (result.rows.length < 5) {
        tx.executeSql(
          "INSERT INTO quiz_info (uid, qid, q_sid ) VALUES (?, ?, ?)",
          [
            ID,
            1,
            0,
          ]
        );
        tx.executeSql(
          "INSERT INTO quiz_info (uid, qid, q_sid ) VALUES (?, ?, ?)",
          [
            ID,
            2,
            0,
          ]
        );
        tx.executeSql(
          "INSERT INTO quiz_info (uid, qid, q_sid ) VALUES (?, ?, ?)",
          [
            ID,
            3,
            0,
          ]
        );
        tx.executeSql(
          "INSERT INTO quiz_info (uid, qid, q_sid ) VALUES (?, ?, ?)",
          [
            ID,
            4,
            0,
          ]
        );
        tx.executeSql(
          "INSERT INTO quiz_info (uid, qid, q_sid ) VALUES (?, ?, ?)",
          [
            ID,
            5,
            0,
          ]
        );
      }else{
        Alert.alert(result);
      }
    });
  })});
  return (
    <SafeAreaView>
       <View style={styles.backButton}>
      <TouchableOpacity
          onPress={() => navigation.navigate("Menu")}>
      <Icon name="west" type='material' size={40}></Icon>
      </TouchableOpacity> 
      <Text  style={styles.Title}> Quizzes </Text>
      </View>
      
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Practice</Text>
          <Progress.Bar progress={0.3} width={275} color={'black'}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Register")}>
          <Text style={styles.buttonText}>Quiz - I</Text>
          <Progress.Bar progress={0.3} width={275} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Quiz - II</Text>
          <Progress.Bar progress={0.3} width={275} color={'black'}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Quiz - III</Text>
          <Progress.Bar progress={0.3} width={275} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Quiz - IV</Text>
          <Progress.Bar progress={0.3} width={275} color={'black'}/>
        </TouchableOpacity>
      </View> 
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  WelContainer:{
    backgroundColor: "black",

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
    backgroundColor: 'grey',
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 10,
    paddingVertical: 45,
    paddingHorizontal: 50,
    width: 390,
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
    fontSize: 20,
 
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  backButton:{
    marginTop: 40,
    flexDirection: 'row',
    alignContent:'flex-start',
    paddingLeft: 20,
    

  },
  Title:{
    textAlign: 'center',
    marginLeft: 90,
    fontSize: 30,
    fontStyle:"italic"
  }

});

export default QuizScreen;
