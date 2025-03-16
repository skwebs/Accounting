import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  messageText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
  },
});

export default styles;
