import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/screensStyles/PostStyles/PostItemStyles'; // Import the styles

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
          style={[styles.button, styles.editButton]}>
          <Text style={[styles.buttonText, styles.editButtonText]}>
            Edit Post
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={[styles.button, styles.trashButton]}>
          <Text style={[styles.buttonText, styles.trashButtonText]}>
            Trash Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostItem;
