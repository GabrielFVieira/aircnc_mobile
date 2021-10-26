import React, { useState, useEffect } from 'react';
import { Vibration, View, AsyncStorage, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [techs, setTechs] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('List');
            }
        });

    }, []);

    function callError(message, vibration) {
        setError(message);
        Vibration.vibrate(vibration);
    }

    async function handelSubmit() {
        try {
            setError('');

            if(!email) {
                callError('Digite seu email', 50);
                return;
            } else if(!password) {
                callError('Digite sua senha', 50);
                return;
            }

            const response = await api.post('./sessions', {
                email,
                password
            })

            const { _id } = response.data;

            await AsyncStorage.setItem('user', _id);
            await AsyncStorage.setItem('techs', techs);

            navigation.navigate('List');
        }
        catch(e) {
            if (e.response && e.response.data) {
                callError(e.response.data.message, 100);
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.error}>{error}</Text>

                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>SENHA *</Text>
                <TextInput 
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Sua senha"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                />

                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handelSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    error: {
        alignSelf: 'center',
        color: '#cc0000',
        fontSize: 15,
        marginBottom: 15
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});