import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
      marginTop:30
    },
    input: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      textAlign: 'center',
      margin: 5,
    },
    delete2faCodeButton:{
      marginLeft:16
    }
  });

  export default styles;