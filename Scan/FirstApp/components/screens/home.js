import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { Context } from "../globalContext/globalContext.js";
import FlashMessage, { showMessage } from 'react-native-flash-message';
import containers from '../styles/containers.js';
import fonts from '../styles/fonts.js';
import modals from  '../styles/modals.js';
import buttons from '../styles/buttons.js';
import inputs from '../styles/inputs.js';
import AddLabelInfo from './AddLabelInfo'; 

function Home({ navigation }) {
    // Context and state management
    const { isLoggedIn, setIsLoggedIn, appSettings, domain } = useContext(Context);
    const [handlingUnit, setHandlingUnit] = useState('');
    const [showAddButton, setShowAddButton] = useState(false); 
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    // Handle logout action
    const handleLogout = () => {
        setIsLoggedIn(false);
        navigation.navigate('Login');
    };

    // Function to search for handling unit
    const handleSearch = async () => {
        try {
            console.log("Searching for HandlingUnit:", handlingUnit);
            
            const response = await fetch(`${domain}/api/v1.0/Labelinfo/get-labelinfo/${handlingUnit}/`);

            if (response.ok) {
                const data = await response.json();
                console.log("Search result:", data);
                alert("Handling unit already exists");
                setShowAddButton(false); 
            } else if (response.status === 404) {
                console.log("Handling unit does not exist");
                alert("Handling unit does not exist");
                setShowAddButton(true);
                setShowModal(true); // Show modal when handling unit does not exist
            } else {
                throw new Error("Failed to search for handling unit");
            }
        } catch (error) {
            console.error("Error during search:", error);
            Alert.alert("Error", "Failed to search for handling unit");
        }
    };

    // Handle cancel action for modal
    const handleCancel = () => {
        setShowModal(false);
        // Additional actions to reset any input fields or states if needed
    };

    // Hide the modal function
    const onHideModal = () => {
        setShowModal(false);
    };

    // Effect to automatically execute search when handlingUnit changes
    useEffect(() => {
        if (handlingUnit.trim().length === 10) {
            handleSearch();
        }
    }, [handlingUnit]);

    // Flash message for handlingUnit
    useEffect(() => {
        if (handlingUnit.trim().length === 10 && handlingUnit.trim() !== "") {
            showMessage({
                message: "Scanned",
                type: "info",
            });
        }
    }, [handlingUnit]);

    return (
        <View style={containers(appSettings).outerPage}>
            <View style={inputs(appSettings).inputContainer}>
                <TextInput
                    style={inputs(appSettings).inputField}
                    placeholder="Enter HandlingUnit number"
                    value={handlingUnit}
                    onChangeText={text => setHandlingUnit(text)}
                />
                {/* Removed onPress event from TouchableOpacity */}
                <TouchableOpacity style={[buttons(appSettings).searchbutton]}>
                    <Text style={fonts(appSettings).buttontext}>Search</Text>
                </TouchableOpacity>
            </View>
            {showAddButton && (
                <TouchableOpacity style={buttons(appSettings).addButton} onPress={() => setShowModal(true)}>
                    <Text style={fonts(appSettings).buttontext}>Add LabelInfo</Text>
                </TouchableOpacity>
            )}
            {isLoggedIn && (
                <TouchableOpacity style={buttons(appSettings).logoutButton} onPress={handleLogout}>
                    <Text style={fonts(appSettings).buttontext}>Logout</Text>
                </TouchableOpacity>
            )}
            
            {/* Modal for AddLabelInfo component */}
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={modals(appSettings).modalContainer}>
                    <View style={modals(appSettings).modalContent}>
                        <AddLabelInfo onHideModal={onHideModal} />
                        {/* <FlashMessage position="top" /> */}
                        {/* Removed FlashMessage from here */}
                        <TouchableOpacity style={buttons(appSettings).cancelButton} onPress={handleCancel}>
                            <Text style={buttons(appSettings).buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Moved FlashMessage component outside of the Modal */}
            <FlashMessage position="top" />
            <TouchableOpacity style={fonts.logoutButton} onPress={handleLogout}>Logout</TouchableOpacity>
        </View>
    );
}

export default Home;
