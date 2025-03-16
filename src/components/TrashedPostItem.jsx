import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from '../styles/compStyles/TrashedPostItemStyles';

const TrashedPostItem = ({item, onRestore, onDelete}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.id}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.content}>{item.created_at}</Text>
      <View>
        <Text style={styles.trashedAtLabel}>Trashed at:</Text>
        <Text style={styles.trashedAtValue}>{item.deleted_at}</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Pressable
          onPress={() => onRestore(item.id)}
          style={[styles.button, styles.restoreButton]}>
          <Text style={[styles.buttonText, styles.restoreButtonText]}>
            Restore
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onDelete(item.id)}
          style={[styles.button, styles.deleteForeverButton]}>
          <Text style={[styles.buttonText, styles.deleteForeverButtonText]}>
            Delete Forever
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TrashedPostItem;
