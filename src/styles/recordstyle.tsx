import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#2f3849',
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    marginRight: 10,
  },
  inputContainer: {
    marginTop: 40,
    marginBottom: 20,
    width: '100%',
  },
  container: {
    marginTop: 30,
    padding: 16,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    flex: 1,
    borderRadius: 12,
  },
  invalidInput: {
    borderColor: 'red'
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    marginHorizontal: 5,
  },
  imageInputTitle: {
    textAlign: 'center',
    marginBottom: 10
  }
})

export default styles;