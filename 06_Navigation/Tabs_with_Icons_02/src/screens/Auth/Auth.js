import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';

// COMPONENTE CUALQUIERA (PAG INICIO)
class AuthScreen extends Component {
    render () {
        return (
            <View>
                <Text>Auth Screen</Text>
                {/* AL PRESIONAR EL BOTON SE ABREN LOS TABS */}
                <Button title="Login" onPress={startMainTabs}/>
            </View>
        );
    }
}

export default AuthScreen;