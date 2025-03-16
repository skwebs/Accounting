import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },

  // Wrapper for the entire screen content
  contentWrapper: {
    width: '100%',
    flex: 1,
    position: 'relative',
  },

  // Action buttons container
  actionButtonsContainer: {
    flexDirection: 'row',
  },

  // General action button styling
  actionButton: {
    padding: 20,
    width: '50%',
  },

  // Text inside action buttons
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Delete button with red background
  deleteButton: {
    backgroundColor: 'red',
  },

  // Restore button with green background
  restoreButton: {
    backgroundColor: 'green',
  },

  // Container for empty list message
  emptyContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default styles;
