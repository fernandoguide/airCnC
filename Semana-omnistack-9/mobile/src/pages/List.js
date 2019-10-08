import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView,Text,Image,StyleSheet ,AsyncStorage } from 'react-native';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo}source={logo}/>
            <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
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