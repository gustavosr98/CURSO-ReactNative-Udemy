import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

export const DefaultInput = (props) => (
    <TextInput
        // PROPIEDADES QUE NUNCA QUIERO QUE CAMBIE
        underlineColorAndroid="transparent"
        // PROPIEDADES QUE RECIBO DESDE ARRIBA 
        {...props}
        // STYLE POR DEFAULT Y LUEGO EL STYLE QUE SE RECIBE DE ARRIBA PARA QUE SOBREESCRIBA
        style={[styles.defaultInput , props.style]}
    />
)

const styles = StyleSheet.create({
    defaultInput : {
        // AQUI VA EL STYLE POR DEFECTO
    }
})


// **********************************************
// SE PUEDE USAR COMO
// 1.   <DefaultInput />
// 2.   <DefaultInput style={styleDiferente} />