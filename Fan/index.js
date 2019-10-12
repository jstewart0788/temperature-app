import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, StyleSheet, View, Switch, Text } from 'react-native';

const Fan = (props) => {

  const [fan, setFan] = useState(null);
  const [error, setError] = useState(false);
  const { navigate } = props.navigation;

  useEffect(() => {
    async function fetchFan() {
      try {
        const response = await fetch(
          "https://stark-eyrie-31043.herokuapp.com/api/fan"
        );
        if (response.status >= 400) throw "Error Fetching Data!";
        const { fan } = await response.json();
        console.log(fan)
        setFan(fan);
      } catch (error) {
        setError(true);
      }
    }
    fetchFan();
  }, []);

  const toggleFan = () => {
    postFanValue(!fan);
    setFan(!fan);
  }

  function postFanValue(fan) {
    try {
      fetch(
        'https://stark-eyrie-31043.herokuapp.com/api/fan', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fan }),
        }
      );
      console.log('sucessfully updated')
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.tempView}>
        <Text style={styles.titleText}>Toggle fan. . .</Text>
        {typeof fan !== "boolean" && !error && <ActivityIndicator size="large" color="#fff" />}
        {typeof fan === "boolean" && (
          <Switch
            value={fan}
            onValueChange={toggleFan}
            style={styles.switch}
          />
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
    fontSize: 50
  },
  tempView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  switch: {
    marginTop: 60,
    transform: [{ scaleX: 3 }, { scaleY: 3 }]
  }
});

Fan.navigationOptions = {
  title: 'Fan',
};


export default Fan;
