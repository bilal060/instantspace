import {StyleSheet} from "react-native";
import {themes as theme} from "../../theme/colors";

export default StyleSheet.create({
    selectContainer: {
        height: 50,
       
    },
    selectButtonText: {
        flex: 1,
        marginLeft:5,
        // color: theme['light'].colors.fontColor,
        fontSize: 16,
        borderBottomColor: theme.light.colors.gray3,
        borderBottomWidth:0.5,
        paddingBottom:10,
    marginLeft:10,

        fontFamily: theme.font.medium,
        color: theme.light.colors.gray7,


    },
    buttonLoading : {
        marginRight: 15
    },

    actionSheetTitle : {
        fontFamily: theme.font.semiBold,
        color:  theme['light'].colors.primary,
        fontSize: 14,
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 25,
    },
    actionSheetButtonIcon: {
        color:  theme['light'].colors.lightenSecondary,
        fontSize: 16,
        marginRight: 15
    }
});
