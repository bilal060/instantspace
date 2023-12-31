import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { themes } from '../../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';
export function CustomSwitch({ title,icon, ToggleSwitch,value , islinear}) {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        ToggleSwitch && ToggleSwitch(!isEnabled);
        setIsEnabled((previousState) => !previousState);
      
    };
    return (
       
        <View style={{...styles.card}}>
           {islinear &&  <LinearGradient style={{ position:"absolute", width:"100%", height:"100%" , justifyContent:"center",alignItems:"center",      borderRadius: 10,}} colors=  {['#FB7C5F', '#DF525B']} > 
           </LinearGradient>
}
            <View style={{...styles.iconView, backgroundColor:   islinear == true ? "white"  : value == true  ? themes['light'].colors.main  : isEnabled== false ? '#ECECEC' : value == true  ? themes['light'].colors.main    :  themes['light'].colors.main  , borderColor: value == true  ? '#ffcbcc' : isEnabled== false ? '#ECECEC' :  "#ffcbcc" }}>
                <MaterialIcons name={icon} size={34} color={ islinear == true ? "FB7C5F" :'white'} />
            </View>
            <Text style={{...styles.text,color:islinear && "white"}}>{title}</Text>
            {!value&&
            <Switch
                trackColor={{ false: '#ffcbcc', true: themes['light'].colors.main }}
                thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch && toggleSwitch}
                value={value && value ? value : isEnabled}
            />

}

        </View>
    
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        height: 194,
        elevation: 2,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        margin:10,
        width:134
    },
    iconView:{
        width:70,
        height:70,
        backgroundColor:  themes['light'].colors.main ,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 70,
        borderWidth: 8,
        borderColor:'#ffcbcc'
    },
    text: {
        color: 'black',
        fontSize: 14,
        marginVertical: 7,
        textAlign: 'center',
        fontFamily: themes.font.black,
        
    },
})