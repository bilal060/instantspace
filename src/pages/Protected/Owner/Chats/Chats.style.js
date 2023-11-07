import {Dimensions, StyleSheet} from 'react-native';
import {themes as theme, themes} from '../../../../theme/colors';
const {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
  
  container: {
    flexGrow: 1,
    paddingHorizontal: 0,
    backgroundColor: theme['light'].colors.tertiary,
  },
  subcontainer: {
    flexGrow: 1,
    paddingHorizontal: 0,
    // backgroundColor: theme['light'].colors.primary,
  },
  ProfileCard:{
    marginVertical:10,
    flexDirection:"row",
    alignItems:"center",

  },
  messageName:{
    color: theme.light.colors.iconColor,
    fontSize: 17,
    fontFamily: theme.font.semiBold,
    fontWeight: '400',
    lineHeight:17
  },
  message:{
    color: theme.light.colors.gray4,
    fontSize: 13,
    fontFamily: theme.font.regular,
    fontWeight: '400',
    lineHeight:17
  },
 bottomView:{
    marginVertical:5,
    height:1,
    // width:width*0.8,
    marginLeft:width*0.2,
    backgroundColor:theme.light.colors.gray3
    
  },
  messageHeader:{
    height:100,
    flexDirection:"row",

    paddingTop:40,
    alignItems:'center',
    backgroundColor: themes.light.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  profileName:{
    color: theme.light.colors.tertiary,
    fontSize: 17,
    fontFamily: theme.font.semiBold,
    fontWeight: '400',
    lineHeight:17
  },
  online:{
    color: theme.light.colors.tertiary,
    fontSize: 12,
    fontFamily: theme.font.light,
    fontWeight: '400',
    lineHeight:17,
    marginLeft:5
  },
  onlineView:{
    height:10,
    width:10,
    backgroundColor:'green',
    borderRadius:100
  },
  chatlist :{
    backgroundColor: theme.light.colors.tertiary,
    paddingHorizontal: 20,
    paddingVertical: 25,

  },
  senderView:{
  backgroundColor: theme.light.colors.lightSecondary,
  marginRight:width*0.1,
  padding:10,
  marginTop:10,
  borderTopEndRadius:10,
  borderBottomEndRadius:10,
  borderBottomStartRadius:10,


  
  },
  reciverView:{
    backgroundColor: theme.light.colors.primary,
    width:width*0.8,
    alignSelf:"flex-end",
    padding:15,
    marginTop:10,
    borderBottomEndRadius:10,
    borderTopStartRadius:10,

    borderBottomStartRadius:10,
  
    
    },
    senderMessageName:{
        color: theme.light.colors.iconColor,
        fontSize: 14,
        fontFamily: theme.font.semiBold,
        fontWeight: '400',
        lineHeight:17
      },
      senderDate:{
        color: theme.light.colors.gray4,
        fontSize: 9,
        fontFamily: theme.font.light,
        fontWeight: '400',
        lineHeight:17,
        textAlign:"right",
        margin:10,
        marginBottom:-5,
      },
      reviverMessageName:{
        color: theme.light.colors.tertiary,
        fontSize: 14,
        fontFamily: theme.font.semiBold,
        fontWeight: '400',
        lineHeight:17
      },
      senderDate:{
        color: theme.light.colors.gray4,
        fontSize: 9,
        fontFamily: theme.font.light,
        fontWeight: '400',
        lineHeight:17,
        textAlign:"right",
        margin:10,
        marginBottom:-5,
      },
      reciverDate:{
        color: theme.light.colors.tertiary,
        fontSize: 9,
        fontFamily: theme.font.light,
        fontWeight: '400',
        lineHeight:17,
        textAlign:"right",
        margin:10,
        marginBottom:-5,
      },
      inputInnerContainerStyle:{
        backgroundColor:"#C3D6DA",
        borderRadius:10
      }
})
