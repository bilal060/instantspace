import { StyleSheet, Text, View, Image,TextInput } from 'react-native';
import { themes } from '../../../theme/colors';
import CText from '../../cText/CText';

export function TextInputIcons ({image,placeholder,multi, value,onChangetxt,error , inputErrorStyle}) {
    const renderErrorView = () => {
        return (
          <CText style={{...styles.errorTextStyle, ...inputErrorStyle}}>
            {error}
          </CText>
        );
      };
    return(
        <View style={{flex:0.48}} >
        <View style={[styles.flexView,{flex:multi ? 0.47 : 1}]}>
            <Image style={styles.icon} source={image} />
            <TextInput value={value} onChangeText={(txt)=>{
                // console.log(txt)
            onChangetxt(txt);
            }} style={styles.textInput} placeholderTextColor={'grey'} placeholder={placeholder} />
        </View>
          {error && renderErrorView()}  
          </View>
    )
}
const styles = StyleSheet.create({
    flexView:{
        marginVertical:10,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius:10,
        borderColor:'grey',
        borderWidth:0.6,
    },
    icon:{
        height: 17,
        width: 17,
        tintColor: 'grey',
        resizeMode: 'contain',
        marginHorizontal:7
    },
    textInput:{
        color:'black',
        fontSize:15,
        flex:1
    },
    errorTextStyle: {
        color:themes.light.colors.danger,
        fontFamily: themes.font.regular,
        // marginTop: 1,
        marginHorizontal: 10,
        fontSize: 13,
        bottom:4,
        textAlign: 'left',
      },
})