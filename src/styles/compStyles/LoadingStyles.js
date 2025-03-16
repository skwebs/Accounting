import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008080',
    padding: 5,
  },
});


export default styles;
