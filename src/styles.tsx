import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: '#eee',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#777',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#a3f407',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#444444',
        fontSize: 18,
        fontWeight: 'bold',
    },
    appImage: {
        width: 150, 
        height: 150, 
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20,
    },
    icon: {
        marginRight: 5,
        height: 50,
    }
});

export default styles;