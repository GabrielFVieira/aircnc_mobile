import React, { useState } from 'react';
import { AsyncStorage, View, Image, TouchableOpacity, TextInput, StyleSheet, StatusBar, SafeAreaView, Text, Alert } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const spot = navigation.getParam('spot');

    console.log(spot);

    async function handelSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${spot._id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    }

    function handelCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.companyDetails}>
                    <Text style={styles.title}>{spot.company}</Text>
                    
                    <Image style={styles.thumbnail} source={{ uri: spot.thumbnail_url}} />
                    
                    <Text style={styles.category}><Text style={[styles.category, styles.categoryLabel]}>Preço: </Text>
                    {spot.price ? `R${spot.price}/dia` : 'GRATUITO'}</Text>

                    <Text numberOfLines={2} style={styles.category}><Text style={[styles.category, styles.categoryLabel]}>Tecnologias: </Text>
                    {spot.techs.join(', ')}</Text>
                </View>


            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handelSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handelCancel} style={[styles.button, styles.cancellButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight || 0,
        paddingHorizontal: 30
    },

    label: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 40
    },

    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    thumbnail: {
        width: 320,
        height: 190,
        alignSelf: 'center',
        resizeMode: 'cover',
        borderRadius: 2
    },

    title: {
        fontSize: 25,
        color: '#444',
        alignSelf: 'center',
        marginBottom: 15
    },

    category: {
        fontSize: 18,
        color: '#999',
        marginTop: 5
    },

    categoryLabel: {
        fontWeight: 'bold'
    },

    button: {
        width: '100%',
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

    cancellButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    }
});