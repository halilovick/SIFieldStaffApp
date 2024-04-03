import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    openAuthAppButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30, 
        backgroundColor: '#FFFFFF', 
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        marginTop:20,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
      },
      openAuthAppButtonText: {
        color: '#2f3849',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
      },
      authAppIcon: {
        width: 30,
        height: 30,
      },
    title: {
        fontSize: 32,
        fontWeight: '300',
        color: '#2f3849',
        textAlign: 'center',
        marginTop: 70
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        paddingHorizontal: 20,
        color: '#2B3A42',
        marginTop: 20,
    },
    loginButtonContainer: {
        alignItems: 'center',
        width: '100%',
    },
    loginButton: {
        height: 50,
        backgroundColor: '#2f3849',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 20,
        width: '40%',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    appImage: {
        borderBottomLeftRadius: 95,
    },
    inputWrapper: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    inputContainer: {
        padding: 10,
        width: '100%',
    },
    icon: {
        marginTop: 15,
        marginRight: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
});

export default styles;
