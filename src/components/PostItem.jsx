import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const PostItem = ({item, onEdit, onDelete}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.id}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.content}>{item.created_at}</Text>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => onEdit(item.id)}
          style={[styles.button, {backgroundColor: 'rgba(0, 0, 0, 0.1)'}]}>
          <Text style={[styles.buttonText, {color: 'gray'}]}>Edit Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={[styles.button, {backgroundColor: 'rgba(255, 0, 0, 0.1)'}]}>
          <Text style={[styles.buttonText, {color: 'red'}]}>Trash Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonWrapper: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },

  button: {
    padding: 10,
    width: '50%',
    borderRadius: 5,
    border: '1px solid #ccc',
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PostItem;
