import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    color: '#666',
  },
  buttonWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    padding: 10,
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'lightgray',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: 'gray',
  },
  editButtonText: {
    color: 'gray',
  },
  trashButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderColor: 'red',
  },
  trashButtonText: {
    color: 'red',
  },
});

export default styles;
