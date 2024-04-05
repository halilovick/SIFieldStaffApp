import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    list: {
        paddingBottom: 20,
        alignItems: 'flex-start', 
    },
    card: {
        marginHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        width: 220,
        height:300
    },
    title: {
        color: 'black',
        fontSize: 22,
        fontWeight: '400',
        marginBottom: 10,
        marginHorizontal: 20,
        marginTop: 10
    },
    detailsButton: {
        backgroundColor: 'skyblue',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginHorizontal: 20,
        marginBottom: 20, 
        marginTop: 'auto', 
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
   
    },
    detailsButtonText: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white',
       
    },
    cardImage: {
        width: '100%',
        height: 150
    }
})
export default styles;