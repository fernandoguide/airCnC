import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, Alert, Image, StyleSheet, AsyncStorage } from 'react-native';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List() {
    const [techs, setTechs] = useState([]);



    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.20.64:3000', {
                query: { user_id }
            })
            socket.on('booking_response', booking => {
                Alert.alert('Resposta da sua reserva',
                `Sua Reserva em  ${ booking.spot.company} na data ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`,
                );
            });
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        marginTop: 20,
        alignSelf: 'center'


    },
})