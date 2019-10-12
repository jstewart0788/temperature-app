import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Temperature from './Temperature';
import Fan from './Fan';
import Settings from './Settings';


const AppNavigator = createStackNavigator(
  {
    Temperature,
    Fan,
    Settings
  },
  {
    initialRouteName: 'Temperature',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const App = createAppContainer(AppNavigator);

export default App;