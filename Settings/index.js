import React, { useState } from "react";
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';

function Settings(props) {
  const [onTemp, setOnTemp] = useState("");
  const [offTemp, setOffTemp] = useState("");

  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <View style={styles.tempView}>
        <Text style={styles.titleText}>Set temperature breakpoints . . .</Text>
        <Text style={styles.titleText} >Turn On</Text>
        <TextInput
          style={{ height: 40, width: 100, backgroundColor: "#FFF", padding: 8, margin: 16 }}
          placeholder="75"
          onChangeText={(text) => setOnTemp(text)}
          value={onTemp}
        />
        <Text style={styles.titleText}>Turn Off</Text>
        <TextInput
          style={{ height: 40, width: 100, backgroundColor: "#FFF", padding: 8, margin: 16 }}
          placeholder="90"
          onChangeText={(text) => setOffTemp(text)}
          value={offTemp}
        />
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
