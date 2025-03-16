import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#008080',
  },
  titleInput: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 2,
  },
  contentInput: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 2,
    height: 110,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default styles;
