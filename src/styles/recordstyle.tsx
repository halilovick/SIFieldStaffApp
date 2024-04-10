import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    buttonsContainer:{
       flex:1,
       justifyContent:'flex-end',
       flexDirection:'row',
       alignItems:'center'
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
        flex:1,
        width:'100%',
        height:700
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        marginBottom:30,

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
        flex: 1,
      },
})

export default styles;