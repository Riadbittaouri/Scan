import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { Provider } from "./components/globalContext/globalContext.js";
import Navigator from './components/navigation/navigator.js';

function App() {
  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

export default App;
