import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../screens/landing";
import Login from "../screens/login";
import Home from "../screens/home";
import AddLabelInfo from "../screens/AddLabelInfo"; // Import AddLabelInfo component

import { Context } from "../globalContext/globalContext.js";

const Stack = createStackNavigator();

function Navigator() {
  const { isLoggedIn } = useContext(Context);

  return (

    <Stack.Navigator initialRouteName="Landing">
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="AddLabelInfo" component={AddLabelInfo} options={{ headerShown: false }} /> 
        </>
      ) : (
        <>
          <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  
  );
}

export default Navigator;
