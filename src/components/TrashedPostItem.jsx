import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';

const TrashedPostItem = ({item, onRestore, onDelete}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.id}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.content}>{item.created_at}</Text>
      <View>
        <Text style={{fontSize: 14, color: '#666'}}>Trashed at:</Text>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>
          {item.deleted_at}
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Pressable
          onPress={() => onRestore(item.id)}
          style={[styles.button, {backgroundColor: 'rgba(0, 0, 0, 0.1)'}]}>
          <Text style={[styles.buttonText, {color: 'gray'}]}>Restore</Text>
        </Pressable>
        <Pressable
          onPress={() => onDelete(item.id)}
          style={[styles.button, {backgroundColor: 'rgba(255, 0, 0, 0.1)'}]}>
          <Text style={[styles.buttonText, {color: 'red'}]}>
            Delete Forever
          </Text>
        </Pressable>
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

export default TrashedPostItem;
