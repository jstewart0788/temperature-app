import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, StyleSheet, View, Text, TextInput } from 'react-native';

function Settings(props) {
  const [onTemp, setOnTemp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { navigate } = props.navigation;

  useEffect(() => {
    async function fetchTurnOn() {
      try {
        const response = await fetch(
          "https://stark-eyrie-31043.herokuapp.com/api/turnon"
        );
        if (response.status >= 400) throw "Error Fetching Data!";
        let { turnOn } = await response.json();
        turnOn = (turnOn / 1000 * 9 / 5 + 32).toFixed(1);
        setOnTemp(turnOn);
      } catch (error) {
        setError(true);
      }
    }
    fetchTurnOn();
  }, []);

  const submitTurnOn = () => {
    postTurnOn((onTemp - 32) * 5 / 9 * 1000);
    setOnTemp(onTemp)
  }

  const turnSuccessOff = () => {
    setSuccess(false);
  }

  const postTurnOn = async (turnOn) => {
    try {
      setLoading(true);
      await fetch(
        'https://stark-eyrie-31043.herokuapp.com/api/turnon', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ turnOn }),
        }
      );
      setLoading(false);
      setSuccess(true);
      setTimeout(turnSuccessOff, 3000);
      console.log('sucessfully updated')
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.tempView}>
        <Text style={styles.titleText}>Set temperature breakpoint:</Text>
        <Text style={styles.titleText} >Turn on at. . .</Text>
        {((onTemp === null && !error) || loading) && <ActivityIndicator size="large" color="#fff" />}
        {onTemp !== null && !loading && (
          <>
            <TextInput
              style={{ height: 40, width: 100, backgroundColor: "#FFF", padding: 8, margin: 16 }}
              onChangeText={(text) => setOnTemp(text)}
              value={`${onTemp}`}
            />
            <Button
              title="Submit"
              onPress={submitTurnOn}
            />
            {success && <Text style={styles.successText} >Successfully set</Text>}

          </>
        )}
        {error && <Text style={styles.error}>Error . . .</Text>}
      </View>
      <Button
        color="#f4511e"
        title="Main Menu"
        onPress={() => navigate("Temperature")}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#950C0C",
    color: "#FFF",
    justifyContent: "center"
  },
  titleText: {
    color: "#FFF",
    fontSize: 25
  },
  successText:{
    color: "green",
    fontSize: 15
  },
  tempView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});

Settings.navigationOptions = {
  title: 'Settings',
};


export default Settings;
