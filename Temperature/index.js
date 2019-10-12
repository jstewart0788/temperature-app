import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Button } from "react-native";

function Temperature(props) {
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState(false);
  const { navigate } = props.navigation;
  useEffect(() => {
    async function fetchTemp() {
      try {
        const response = await fetch(
          "https://stark-eyrie-31043.herokuapp.com/api/temperature"
        );
        if (response.status >= 400) throw "Error Fetching Data!";
        let { temp } = await response.json();
        temp = (temp / 1000 * 9 / 5 + 32).toFixed(1);
        setTemp(temp);
      } catch (error) {
        setError(true);
      }
    }
    fetchTemp();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.tempView}>
        <Text style={styles.titleText}>What's the Temperature?</Text>
        {!temp && !error && <ActivityIndicator size="large" color="#fff" />}
        {temp && (
          <Text style={styles.temperature}>{temp}</Text>
        )}
        {error && <Text style={styles.error}>Error . . .</Text>}
      </View>
      <View>
        <Button
          color="#f4511e"
          title="Fan"
          onPress={() => navigate("Fan")}
        />
        <Button
          color="#f4511e"
          title="Settings"
          onPress={() => navigate("Settings")}
        />
      </View>
    </View>
  );
}

Temperature.navigationOptions = {
  title: 'Temperature',
};

export default Temperature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#950C0C",
    color: "#FFF",
    alignItems: "stretch",
    justifyContent: "center"
  },
  tempView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    color: "#FFF",
    fontSize: 30
  },
  temperature: {
    color: "#FFF",
    fontSize: 150
  }
});
