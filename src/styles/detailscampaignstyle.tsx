import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    backgroundImage: {
        flex: 0.25,
        resizeMode: 'cover',
        justifyContent: 'center',
        height: 300,
    },
    detailsContainer: {
        marginBottom: 30,
    },
    label: {
        fontWeight: 'bold',
        fontSize:16,
        marginBottom: 5,
        color: '#333',
    },
    value: {
        fontSize: 16,
        color: '#666',
    },
    boldText: {
        fontWeight: '500',
        color: '#333',
        fontSize:16,
    },
    normalText: {
        fontWeight: 'normal',
    },
    locationTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    locationsContainer: {
        flex: 0.95,
        marginBottom: 10,
        marginTop:10
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingRight: 20,
        paddingLeft: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginBottom: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    declineButton: {
        backgroundColor: '#fff',
        borderColor: '#007bff',
        borderWidth: 1,
    },
    card: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        backgroundColor: '#fff',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    cardHeaderText: {
        fontWeight: 'bold',
        color: '#333',
        fontSize:16,
    },
    cardBody: {
        marginTop: 5,
    },
    cardBodyText: {
        color: '#666',
        fontSize:16,
    },
    nameValue: {
        marginTop:10,
        fontWeight: '900', 
        fontSize: 24, 
        color: '#333',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dateLabel: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize:16,
        marginBottom: 5,
        color: '#333',
    },
    dateContent: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#e6f2ff', 
        padding: 10,
    },
    calendarIcon: {
        marginRight: 10,
    },
    dateValueContainer: {
        flex:0.55
    },
    dateValue: {
        fontSize: 16,
    },
    dateLabelContainer: {
        width: 100
    },
    centeredContainer: {
        alignItems: 'center',
    },
    
    
});

export default styles;