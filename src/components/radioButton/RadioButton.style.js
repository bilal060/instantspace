import { StyleSheet } from "react-native";
import {themes} from "../../theme/colors";
import {getLayoutDirection} from "../../utils/methods";

export default StyleSheet.create({
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center",
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
    checkBoxTitle: {
        fontSize: 16,
        fontFamily: themes.font.medium,
        color: themes['light'].colors.dark,
        textAlign: 'left',
        marginEnd:5
    },
    checkBoxSecondTitle: {
        color: themes['light'].colors.primary,
        fontFamily: themes.font.bold,
        textDecorationLine: 'underline'
    }
});
