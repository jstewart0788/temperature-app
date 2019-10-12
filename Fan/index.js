import React from "react";
import { Button, StyleSheet, View, Switch, Text } from 'react-native';

class Fan extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.tempView}>
          <Text style={styles.titleText}>Toggle fan. . .</Text>
          <Switch />
        </View>
        <Button
          color="#f4511e"
          title="Main Menu"
          onPress={() => navigate("Temperature")}
        />
      </View>
    );
  }
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
});

Fan.navigationOptions = {
  title: 'Fan',
};


export default Fan;
