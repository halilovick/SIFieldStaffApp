import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    buttonsContainer:{
       flex:1,
       justifyContent:'flex-end',
       flexDirection:'row',
       alignItems:'center'
    }, 
    saveButton:{
      paddingHorizontal:10,
      paddingVertical:8,
      backgroundColor:'green',
      marginHorizontal:12
    },
    cancelButton:{
      paddingHorizontal:10,
      paddingVertical:8,
      backgroundColor:'red',
      marginHorizontal:12
    },
    inputContainer: {
        marginTop:40,
        marginBottom: 20,
        flex:1
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        marginBottom:30
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