import { StyleSheet } from 'react-native';
import {COLORS} from './colours'
export default StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: COLORS.white,
      },
    
      logoContainer: {
        alignItems: 'center',
        height: null,
        width: '90%',
        resizeMode: 'contain',
      },
    
      lottieContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: null,
        width: '90%',
        resizeMode: 'contain',
      },
    
      imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: null,
        width: '80%',
        resizeMode: 'contain',
      },
      buttonText: {
        fontSize: 25
      },
      avatar: {
        width: 35,
        height: 35,
        borderRadius: 10
      },
      iconView: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
      },
      dateText: {
        fontSize: 10
      },

      
});