import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  LogBox,
  Modal,
} from "react-native";
import * as SQLite from "expo-sqlite";
//import DatePicker from "react-native-datepicker";
//import DatePicker from 'react-native-date-picker'
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
const db = SQLite.openDatabase("RonsDB.db");

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hobby, setHobby] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleRegister = () => {
    if (
      username === "" ||
      email === "" ||
      phoneNumber === "" ||
      // dateOfBirth === "" ||
      password === "" ||
      confirmPassword === "" ||
      hobby === "" ||
      favoriteGenre === ""
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (!/^[a-zA-Z0-9_-]{3,20}$/.test(username)) {
      Alert.alert("Error", "Please enter a valid username");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }
    /*if (
      !/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-(19|20)\d{2}$/.test(
        dateOfBirth
      )
    ) {
      Alert.alert("Error", "Please enter a valid date of birth");
      return;
    }*/
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[^\s]).{8,}$/.test(
        password
      )
    ) {
      Alert.alert("Error", "Please enter a valid password");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match. Please try again!");
      return;
    }
    if (!/^[a-zA-Z]{3,10}$/.test(hobby)) {
      Alert.alert("Error", "Please enter a valid hobby");
      return;
    }
    if (!/^[a-zA-Z]{3,10}$/.test(favoriteGenre)) {
      Alert.alert("Error", "Please enter a valid genre");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, phone_number TEXT, date_of_birth TEXT, password TEXT, hobby TEXT, favorite_genre TEXT)"
      );
      tx.executeSql(
        "SELECT id FROM users WHERE email = ?",
        [email],
        (_, result) => {
          if (result.rows.length > 0) {
            Alert.alert("Error", "User already exists!");
          } else {
            tx.executeSql(
              "SELECT id FROM users WHERE username = ?",
              [username],
              (_, result) => {
                if (result.rows.length > 0) {
                  Alert.alert("Error", "Username is taken. Please try again!");
                } else {
                  tx.executeSql(
                    "INSERT INTO users (username, email, phone_number, date_of_birth, password, hobby, favorite_genre) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [
                      username,
                      email,
                      phoneNumber,
                      dateOfBirth,
                      password,
                      hobby,
                      favoriteGenre,
                    ],
                    (txObj, resultSet) => {
                      Alert.alert("Success", "User registered successfully!", [
                        {
                          text: "OK",
                          onPress: () => navigation.navigate("Login"),
                        },
                      ]);
                    },
                    (txObj, error) => {
                      console.log("Error inserting user: ", error);
                    }
                  );
                }
              }
            );
          }
        },
        (txObj, error) => {
          console.log("Error selecting user: ", error);
        }
      );
    });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="gray"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.inputdate}
            placeholder="Date of Birth"
            placeholderTextColor="gray"
            value={date ? date.toLocaleDateString() : "Date of birth"}
            editable={false} // Set TextInput to non-editable
          ></TextInput>
          <View style={styles.iconContainer}>
            <Icon
              name="calendar"
              onPress={showDatepicker}
              type="material-community"
              color="white"
              component={MaterialIcons}
            />
          </View>
          {show && (
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black", // Set a contrasting background color
                opacity: 20, // Set opacity to make it semi-transparent
              }}
            >
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                textColor="white"
                mode={"date"}
                display="spinner"
                is24Hour={true}
                onChange={onChange}
              />
            </View>
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Hobby"
          placeholderTextColor="gray"
          value={hobby}
          onChangeText={setHobby}
        />
        <TextInput
          style={styles.input}
          placeholder="Favorite Genre"
          placeholderTextColor="gray"
          value={favoriteGenre}
          onChangeText={setFavoriteGenre}
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.bottomDivider} />
        <View style={styles.signupContainer}>
          <Text style={styles.signupText} onPress={() => navigation.goBack()}>
            Go Back
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    color: "white",
  },
  inputdate: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    padding: 8,
    left: 13,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    color: "white",
  },
  datepicker: {
    width: "100%",
    marginBottom: 16,
    // flexDirection: "row",
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#0095F6",
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomDivider: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#555555",
  },
  signupContainer: {
    bottom: -85,
  },
  signupText: {
    color: "#rgb(0, 149, 246)",
    fontSize: 16,
    textAlign: "center",
  },
  iconContainer: {
    left: -13,
    bottom: -10,
  },
});

export default RegisterScreen;
/*
<DatePicker
style={styles.datepicker}
date={dateOfBirth}
value={dateOfBirth}
mode="date"
placeholder="Date of Birth"
format="DD-MM-YYYY"
confirmBtnText="Confirm"
cancelBtnText="Cancel"
customStyles={{
  dateIcon: {
    position: "absolute",
    right: -5,
    top: 4,
    marginLeft: 0,
  },
  dateInput: {
    borderColor: "gray",
    alignItems: "flex-start",
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  placeholderText: {
    color: "gray",
    right: -5,
  },
  dateText: {
    right: -5,
  },
}}
onDateChange={setDateOfBirth}
/>*/
