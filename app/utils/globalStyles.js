import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
    
      logoContainer: {
        flex: 1,
        justifyContent: 'center',
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
});