import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Context } from "../globalContext/globalContext.js";
import containers from '../styles/containers.js';
import fonts from '../styles/fonts.js';
import inputs from '../styles/inputs.js';
import margins from '../styles/margins.js';
import buttons from '../styles/buttons.js';

function Login({ navigation }) {
  const globalContext = useContext(Context);
  const { setIsLoggedIn, appSettings, domain } = globalContext;
  
  const [securePassword, setSecurePassword] = useState(true);
  const [matricule, setMatricule] = useState(""); 
  const [password, setPassword] = useState(""); 

  async function handleLogin() {
    try {
      console.log("Logging in...");
      console.log("Matricule:", matricule);
      console.log("Password:", password);
      
      let body = JSON.stringify({
        'Matricule': matricule,  // Assuming matricule is equivalent to username
        'password': password
      });
  
      const response = await fetch(`${domain}/api/v1.0/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("LOGGED IN", data);
        setIsLoggedIn(true);
        // Navigate to the Home screen within the nested navigator
        navigation.navigate("Home");
      } else {
        const errorData = await response.json();
        alert('Connexion échouée \n\n Vérifier votre matricule ou mot de passe')
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error
    }
  }
  

  return (
    <View style={containers(appSettings).outerPage}>
      <View style={containers(appSettings).formBox}>
        <Text style={[fonts(appSettings).h1, margins.top30Percent]}>Login</Text>

        <Text style={[fonts(appSettings).inputlabel, margins.topTenPercent]}>Entrez votre matricule</Text>
        <TextInput value={matricule} onChangeText={text => setMatricule(text)} textContentType='username' autoCompleteType="username" style={inputs(appSettings).textInput} placeholder='Matricule' />
        
        <Text style={[fonts(appSettings).inputlabel, margins.topTenPercent]}>Entrez votre mot de passe</Text>
        <TextInput value={password} onChangeText={text => setPassword(text)} secureTextEntry={securePassword} textContentType='password' autoCompleteType="password" style={inputs(appSettings).textInput} placeholder='Mot de passe' />
        
        <TouchableOpacity style={[buttons(appSettings).login, margins.topTenPercent]} onPress={() => handleLogin()}> 
          <Text style={[fonts(appSettings).buttontext,margins.topTenPercent]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
