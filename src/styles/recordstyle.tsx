import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    buttonsContainer:{
       flex:1,
       justifyContent:'flex-end',
       flexDirection:'row',
       alignItems:'center',
       marginTop:10
    }, 
    button:{
      paddingHorizontal:20,
      paddingVertical:16,
      backgroundColor:'#2f3849',
      marginHorizontal:12,
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
    },
    buttonText:{
      color:'white',
      fontWeight:'500',
      marginRight:10
    },
    inputContainer: {
        marginTop:40,
        marginBottom: 20,
        width:'100%',
      },
      container: {
        marginTop:30,
        padding:16,
        justifyContent:'center',
        alignItems:'center'
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
        width:'100%'
      },
      input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginHorizontal: 5,
        marginVertical:15,
        flex: 1,
        width:200
      },
})

export default styles;