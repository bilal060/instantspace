import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { themes } from '../../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';

export function NewButtonIcon({ onPress , half, title, icon, borderStyle , style , txtstyle }) {
    return (
       
        <TouchableOpacity onPress={onPress}>
             <LinearGradient colors=  {['#FB7C5F', '#DF525B']} style={[ borderStyle ? styles.borderFlexView : styles.flexView, { flex: half ? 0.4 : 1 , ...style }]}>
                {icon ? (
                    <>
                        <MaterialIcons name={'upload-file'} size={17} color={'white'} />
                    </>
                ) : (<></>)}
                <Text style={ borderStyle ? styles.bordertext : {...styles.text, ...txtstyle}}>{title}</Text>
                </LinearGradient>
        </TouchableOpacity>
      
    );
}

const styles = StyleSheet.create({
    flexView: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: themes['light'].colors.main,
        paddingVertical: 16,
       
    },
    borderFlexView:{
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: themes['light'].colors.main,
        borderWidth: 1,
        paddingVertical: 15,
    },
    bordertext: {
        color: themes['light'].colors.main,
        fontSize: 15,
        marginLeft: 7,
    },
    text: {
        color: 'white',
        fontSize: 15,
        marginLeft: 7,
     
        
        // position:"absolute"
    },
});
