import React ,{ useState } from 'react';
import { View,SafeAreaView,TextInput, TouchableOpacity,Text,Alert ,StyleSheet ,AsyncStorage} from 'react-native';

import api from '../services/api';

export default function Book({ navigation }){
    // pegando o id passado como parametro da outra rota
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${id}/bookins`,{
            date
        },{
            headers : { user_id }
        })
        Alert.alert('Solicitacao de reserva enviada.');
        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }
    return (
        <SafeAreaView style={styles.container}>
         
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Qual data você quer  reservar?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    // onChangeText={text => setEmail(text)}
                    onChangeText ={setDate}
                />
                <TouchableOpacity  onPress={handleSubmit} style={[styles.button]}>
                    <Text style={styles.buttonText}>Solicitar Reserva</Text>
                </TouchableOpacity>
                  <TouchableOpacity  onPress={handleCancel} style={[styles.button,styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 80,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
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
        borderRadius: 2
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});