import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Temperature from './Temperature';
import Fan from './Fan';
import Settings from './Settings';


const MainNavigator = createStackNavigator({
  Temperature: {screen: Temperature},
  Fan: {screen: Fan},
  Settings: {screen: Settings},
});

const App = createAppContainer(MainNavigator);

export default App;