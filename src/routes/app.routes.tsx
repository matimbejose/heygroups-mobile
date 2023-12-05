import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SigIn from '../screens/SigIn';
import ChatRoom from '../screens/ChatRoom';

const AppStack  = createNativeStackNavigator();

export default function AppRoutes() {
 return (
    <AppStack.Navigator initialRouteName='ChatRoom'>

        <AppStack.Screen  
        name="SigIn" 
        component={SigIn}
        options={{
            title: 'Faca o login'
        }}
        />


        <AppStack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
            headerShown: false
        }}
        />


    </AppStack.Navigator>  
    );
}