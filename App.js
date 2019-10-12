import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

export default function App() {
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTemp() {
      try {
        const response = await fetch(
          "https://stark-eyrie-31043.herokuapp.com/temperature"
        );
        if (response.status >= 400) throw "Error Fetching Data!";
        const { temp } = await response.json();
        setTemp(temp);
      } catch (error) {
        setError(true);
      }
    }
    fetchTemp();
  }, []);
  return (
    <View style={styles.container}>
      <Text>What's the Temperature?</Text>
      {!temp && !error && <ActivityIndicator size={50} color="#fff" />}
      {temp && temp > 0 && temp < 120 && <Text>{temp}</Text>}
      {error && <Text>Error . . .</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#950C0C",
    color: "#FFF",
    alignItems: "center",
    justifyContent: "center"
  }
});
