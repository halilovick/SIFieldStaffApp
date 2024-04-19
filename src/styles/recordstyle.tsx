import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  button: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2f3849',
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },

  modalButton: {
    borderRadius: 25,
    paddingVertical: 10,
    backgroundColor: '#2f3849',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop:10,
    width: '50%'
  },

  buttonText: {
    color: 'white',
    fontWeight: '500',
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: 'white',
    marginTop: 30,
    padding: 16,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%'
  },
  titleContainer: {
    marginBottom: 10,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    flex: 1,
    borderRadius: 12,
    color: 'black'
  },

  iconContainer: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -13 }],
  },
  invalidInput: {
    borderColor: 'red'
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 10,
    marginHorizontal: 5,
  },
  imageInputTitle: {
    textAlign: 'center',
    marginBottom: 10
  },

})

export default styles;