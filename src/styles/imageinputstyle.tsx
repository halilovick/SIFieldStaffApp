import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    image:{
        width:'100%',
        height:'100%'
    },
    button:{
        backgroundColor:'#2f3849',
        paddingHorizontal:10,
        paddingVertical:12,
        marginVertical:4,
        color:'white',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },  
    buttonText:{
        color:'white',
        fontWeight:'500',
        marginRight:10
    },
    imageContainer:{
       height:300,
       width:300,
       borderRadius:12,
    },
    emptyImageContainer:{
      borderWidth:1,
      borderStyle:'dashed',
      borderColor:'#2f3849',
      justifyContent:'center',
      alignItems:'center'
    },
    text:{
        marginVertical:15,
        fontSize:20,
        fontWeight:'500'
    }

})

export default styles;