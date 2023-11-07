import { StyleSheet } from "react-native";
import {themes} from "../../theme/colors";
import {Dimensions} from 'react-native'
const {width , height } = Dimensions.get("window")
export default StyleSheet.create({
    spaceContainer: {
        height:height*0.45,
        width:width*0.75,
        margin:10,
        borderRadius:10,
        backgroundColor: themes['light'].colors.tertiary,
        elevation:5,
        overflow:"hidden"

    },
    spaceHeading:{
        fontFamily: themes.font.medium,
        fontSize: 14,
        fontWeight: "700",
        lineHeight:14 ,
        letterSpacing: 1
        
    },
    checkBoxView: {
        width: 13,
        height: 13,
        borderColor: themes['light'].colors.gray4,
        borderWidth: 1,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:3
     },
    checkedBoxView: {
        backgroundColor: themes['light'].colors.primary,
    },
    checkBoxViewFill: {
        width: 10.5,
        height: 10.5,
        backgroundColor: themes['light'].colors.primary,
        borderRadius: 3
    },
    checkBoxCheck: {
        fontSize: 10,
        color: themes['light'].colors.tertiary
    },
    checkBoxTitleContainer: {
        // flex: 1,
        marginLeft: 10,
        // marginLeft: getLayoutDirection() ? 0 : 10,
        // marginRight: getLayoutDirection() ? 10 : 0,
        // flexDirection: 'row',
        justifyContent: 'center',
    },
    ProfileName: {
        fontSize: 17,
        fontFamily: themes.font.medium,
        color: themes['light'].colors.dark, 
        textAlign: 'left',
        // marginEnd:10
    },
    checkBoxSecondTitle: {
        color: themes['light'].colors.primary,
        fontFamily: themes.font.bold,
        textDecorationLine: 'underline'
    },
    place:{
        fontSize: 15,
        fontFamily: themes.font.medium,
        color: themes['light'].colors.dark,
    }
});

