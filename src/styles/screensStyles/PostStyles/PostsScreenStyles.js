import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  listContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 20,
    width: '50%',
    alignItems: 'center',
  },
  trashedButton: {
    backgroundColor: 'darkgrey',
  },
  addButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Container for empty list message
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // Message text when no trashed posts are available
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },

  // Go Back button inside EmptyListCustomComponent
  emptyButton: {
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  // Text inside Go Back button
  emptyButtonText: {
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {height: 10},
});

export default styles;
