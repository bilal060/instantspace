import { Dimensions, StyleSheet } from 'react-native';
import { themes as theme } from "../../theme/colors";
const { width, height } = Dimensions.get('screen')
export default StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width * 0.85,
        flexDirection: 'row',
        
        height: 80,
        backgroundColor: 'rgba(124, 128, 97, 0.7)',
    },
    mainWrapper: {
        height: height,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    loading: {
        color: theme['light'].colors.tertiary,
        fontSize: 32,
        paddingRight:10,        
    },
    loadingText: {
        fontSize: 20,
        color: theme['light'].colors.tertiary,
        fontFamily: theme.font.medium,

    },
    animation: {
        width: 100,
        height: 100
    },
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('screen').width * 0.85,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 24,
      },
});
