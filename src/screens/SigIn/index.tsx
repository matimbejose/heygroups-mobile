import React,{ useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,SafeAreaView, Platform} from 'react-native';

import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';

export default function SigIn() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email , setEmail] = useState('');
    const [password,  setPassword] = useState('');
    const [type, setType] = useState(false); // se comeca como falso eh tela de login , caso contratraio eh cadastro

    function handleLogin() {
        if(type) {
            //cadastrar
            if( name === '' || email === '' || password === '') return;


            auth()
            .createUserWithEmailAndPassword(  email, password)
            .then((user) => {
                user.user.updateProfile({
                    displayName: name
                })
                .then(() => {
                    navigation.goBack();
                })
            })
            .catch( (error) => {
                if(error.code === 'auth/email-already-in-use') {
                    console.log('That email address is alreday in use !')
                }

                if(error.code === 'auth/invalid-emial') {
                    console.log('That emial address is invalid !')
                }
            })


            console.log('cadastrar user!');
        } else {
            console.log('efectuar o login!')             
        }
    }

    return(
    <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>HeyGroups</Text>
        <Text style={{ marginBottom: 20}}> Ajude , colabore, faca networking</Text>

        {
            type && (

            <TextInput 
            style={styles.input}
            value={name}
            onChangeText={ (text) => setName(text)}
            placeholder='Seu nome'
            placeholderTextColor="#999B"
            />

        )
        }

        <TextInput 
        style={styles.input}
        value={email}
        onChangeText={ (text) => setEmail(text)}
        placeholder='Seu Email'
        placeholderTextColor="#999B"
        />

        <TextInput 
        style={styles.input}
        value={password}
        onChangeText={ (text) => setPassword(text)}
        placeholder='Sua senha'
        placeholderTextColor="#999B"
        />

        <TouchableOpacity 
        style={[styles.buttonLogin, { backgroundColor: type ? '#F53745':'#57DD86' } ] }
        onPress={ handleLogin }
        >
            <Text style={styles.buttonText}>
                { type ? 'Cadastrar' : 'Acessar'}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ () => setType(!type) }>
            <Text>{ type ? 'Ja possuo uma conta ' : 'Criar uma nova conta' }</Text>
        </TouchableOpacity>


     </SafeAreaView>

    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF'
    }, 
    logo: {
        marginTop: Platform.OS === 'android' ? 55: 80,
        fontSize: 28,
        fontWeight: 'bold',
    },
    input: {
        color: '#121212',
        backgroundColor: '#EBEBEB',
        width: '90%',
        borderRadius: 6,
        marginBottom: 10,
        paddingHorizontal: 8,
        height: 50,
    },
    buttonLogin: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 6,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 19
    }
})