import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Context } from "../globalContext/globalContext.js";
import containers from '../styles/containers.js';
import fonts from '../styles/fonts.js';
import modals from '../styles/modals.js';
import buttons from '../styles/buttons.js';
import margins from '../styles/margins.js';
import inputs from '../styles/inputs.js';

function AddLabelInfo({ appSettings, onHideModal }) {
    const navigation = useNavigation();
    const [handlingUnit, setHandlingUnit] = useState('');
    const [storageLocation, setStorageLocation] = useState('');
    const [storageBin, setStorageBin] = useState('');
    const [materialNumber, setMaterialNumber] = useState('');
    const [quantity, setQuantity] = useState('');
    const globalContext = useContext(Context);
    const { domain } = globalContext;

    const handleAddLabelInfo = async () => {
        try {
            // Implement logic to add LabelInfo using API
            const response = await fetch(`${domain}/api/v1.0/Labelinfo/create-labelinfo/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    HandlingUnit: handlingUnit,
                    Storage_Location: storageLocation,
                    Storage_Bin: storageBin,
                    Material_Number: materialNumber,
                    Quantity: quantity
                }),
            });

            if (response.ok) {
                showMessage({
                    message: "LabelInfo added successfully",
                    type: "success",
                });
                onHideModal(); // Hide the modal
                navigation.goBack();
            } else {
                throw new Error("Failed to add LabelInfo");
            }
        } catch (error) {
            console.error("Error adding LabelInfo:", error);
            Alert.alert("Error", "Failed to add LabelInfo");
        }
    };

    return (
        <View style={styles.addlabelinfocontainer}>
            <Text style={styles.addlabelinfoheading}>Add Label Info</Text>
            <TextInput
                value={handlingUnit}
                onChangeText={setHandlingUnit}
                placeholder="Handling Unit"
                style={styles.addlabelinfoinput}
            />
            <TextInput
                value={storageLocation}
                onChangeText={setStorageLocation}
                placeholder="Storage Location"
                style={styles.addlabelinfoinput}
            />
            <TextInput
                value={storageBin}
                onChangeText={setStorageBin}
                placeholder="Storage Bin"
                style={styles.addlabelinfoinput}
            />
            <TextInput
                value={materialNumber}
                onChangeText={setMaterialNumber}
                placeholder="Material Number"
                style={styles.addlabelinfoinput}
            />
            <TextInput
                value={quantity}
                onChangeText={setQuantity}
                placeholder="Quantity"
                style={styles.addlabelinfoinput}
            />
            <TouchableOpacity onPress={handleAddLabelInfo} style={styles.addlabelinfobutton}>
                <Text style={styles.addlabelinfobuttonText}>Add Label Info</Text>
            </TouchableOpacity>
            <FlashMessage position="top" />
        </View>
    );
}

const styles = StyleSheet.create({
    addlabelinfocontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    addlabelinfoheading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addlabelinfoinput: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    addlabelinfobutton: {
        backgroundColor: '#6e7c85',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addlabelinfobuttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AddLabelInfo;
