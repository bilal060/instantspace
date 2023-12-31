import { Dimensions, StyleSheet } from 'react-native';
import { themes as theme, themes } from '../../../../theme/colors';
const { width, height } = Dimensions.get('screen');
export default StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 0,
        backgroundColor: theme['light'].colors.backgroundColor,
    },
    memberCard: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: theme['light'].colors.primary,
        borderRadius: 7,
    },
    unActiveMember: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: theme['light'].colors.lightenGray,
        borderRadius: 7,
    },
    manager: {
        fontSize: 12,
        color: theme['light'].colors.tertiary,
        fontFamily: theme.font.semiBold,
    },
    unActivemanager: {
        fontSize: 12,
        color: theme['light'].colors.gray4,
        fontFamily: theme.font.medium,
    },
    ProfileCard: {
        flex: 1,
        marginVertical: 10,
        height: 90,
    },
    listHeader: {
        flex: 1,
        fontSize: 22,
        color: theme['light'].colors.secondary3dark,
        // fontFamily: theme.font.semiBold,
        paddingLeft: 10,
        fontWeight: 'bold',
        marginVertical: 13,
    },
    buttonStyle: {
        marginTop: height * 0,
    },
    headerView: {
        marginBottom: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    card: {
        // borderRadius: 20,
        backgroundColor: theme['light'].colors.backgroundColor,
        paddingHorizontal: 15,
        backgroundColor: '#f1f6f7',
    },
    inputView: {
        width: width * 0.45,
    },
    selectFileView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 18,
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#F1F6F7',
        borderStyle: 'dashed',
        marginHorizontal: 10,
        borderWidth: 2,
        marginBottom: 30,
        borderRadius: 15,
        borderColor: theme['light'].colors.borderColor,
    },
    selectFile: {
        color: themes['light'].colors.gray4,
        fontFamily: themes.font.medium,
        fontSize: 14,
    },
    uploadText: {
        color: themes['light'].colors.iconColor,
        fontFamily: themes.font.bold,
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 15,
    },
    inputLeftIconButton: {
        widht: 20,
        height: 20,
    },
    spaceCancelBtn: {
        backgroundColor: themes['light'].colors.secondary3,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    spaceSaveBtn: {
        marginHorizontal: 10,
        marginBottom: 50,
    },
    buttonText: {
        color: themes['light'].colors.primary,
    },
    input: {
        height: 42,
        color: themes['light'].colors.gray4,
        fontFamily: themes.font.medium,
        // width: '100%',

        borderColor: themes['light'].colors.gray3,
        backgroundColor: 'transparent',
        fontSize: 16,
        borderBottomWidth: 0.5,
    },
    textInput: {
        marginHorizontal: 5,
    },
    modalInnerContainer: {
        flex: 1,
        backgroundColor: theme['light'].colors.tertiary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(124, 128, 97, 0.7)',
        paddingTop: 200,
        paddingHorizontal: 20,
    },
    icon: {
        height: 17,
        width: 17,
        tintColor: 'black',
        resizeMode: 'contain',
        paddingHorizontal: 12
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    normalText: {
        fontSize: 16,
        marginLeft: 10,
        color: 'black'
    },
    Card: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 30
    },
    Button: {
        backgroundColor: theme['light'].colors.main,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    Buttonicon: {
        height: 17,
        width: 17,
        tintColor: 'white',
        resizeMode: 'contain',
        paddingHorizontal: 12,
        marginRight: 5,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 15,
        alignItems: 'center'
    },
    categoryText: {
        // backgroundColor: '#f4f4f4',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 12.3,
        paddingHorizontal:17,
        color: 'white',
    
       
        // backgroundColor:"lightgray"
    },
    categoryTextSelected: {
        // backgroundColor: theme['light'].colors.main,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 12.3,
        paddingHorizontal:17,
        color: 'black'
    },
    text: {
        color: 'black',
        fontSize: 15
    },
    TextSelected: {
        color: 'white',
        fontSize: 15
    },
    iconn: {
        height: 20,
        width: 20,
        tintColor: 'grey',
        resizeMode: 'contain',
        paddingHorizontal: 12,
        marginRight: 7
    },
    iconSelected: {
        height: 20,
        width: 20,
        tintColor: 'white',
        resizeMode: 'contain',
        paddingHorizontal: 12
    },
    DottedView: {
        backgroundColor: theme['light'].colors.gray6,
        borderWidth: 0.7,
        borderStyle: 'dashed',
        padding: 30,
        borderRadius: 10,
    },
    greytext: {
        color: theme['light'].colors.gray1,
        fontSize: 14,
    },
    Input: {
        marginVertical: 10,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 0.6,
        color:'black',
         alignItems: 'flex-start',
        paddingHorizontal:10,
        paddingVertical:40,
        //flex:1,
        backgroundColor:"#F8F8F8",
        // height:50
    },
    shareText:{
        color: 'black',
        fontSize: 15,
        textAlign:'center',
        marginBottom:10
    },
    sicon:{
        marginRight: 7,
        backgroundColor: theme['light'].colors.gray6,
        padding:15,
        borderRadius:34,
        alignItems:'center',
        justifyContent: 'center',   
        marginVertical:20,
        marginBottom:60
    },
    dropdown: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 10,
        width: '20%',
        fontWeight: '700',
      },
      Numberinput: {
        // backgroundColor: '#F8F8F8',
        color: 'black',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: '80%',
      },
    socialicon:{
        height: 24,
        width: 24,
        tintColor: 'grey',
        resizeMode: 'contain',
    }
});
