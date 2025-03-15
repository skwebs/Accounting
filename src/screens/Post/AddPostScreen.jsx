import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Alert} from 'react-native';
import Loading from '../../components/Loading';
import {Text} from 'react-native-gesture-handler';
import PressableButton from '../../components/PressableButton';
import PostService from '../../services/postService';
import NetworkStatusChecker from '../../components/NetworkStatusChecker';

const AddPostScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationError, setValidationError] = useState({});
  const [addingPost, setAddingPost] = useState(false);

  const savePost = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Post title cannot be empty');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Validation', 'Post content cannot be empty');
      return;
    }

    setAddingPost(true);
    try {
      const res = await PostService.createPost({title, content, user_id: 1});
      console.log(res);
      setAddingPost(false);
      navigation.goBack();
    } catch (error) {
      if (error.type === 'validation') {
        setValidationError(error.errors);
        Alert.alert('Validation Error', error.message);
        console.log('find validation Error', error.errors);
      } else if (error.type === 'network') {
        Alert.alert('Network Error', error.message);
      }

      console.log('Error adding post:', error);
      // Alert.alert('Error', 'Failed to add post');
    } finally {
      setAddingPost(false);
    }
  };

  return (
    <View style={styles.container}>
      <NetworkStatusChecker />

      {addingPost && <Loading text="Saving post..." />}

      <View style={styles.formContainer}>
        <Text style={styles.title}>Add a new post</Text>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
        />
        {validationError.title && (
          <Text style={styles.error}>{validationError.title}</Text>
        )}
        <TextInput
          placeholder="Content"
          style={styles.contentInput}
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
        />
        {validationError.content && (
          <Text style={styles.error}>{validationError.content}</Text>
        )}
        <View style={styles.buttonContainer}>
          <PressableButton
            onPress={savePost}
            title="Save Post"
            backgroundColor="#2196F3"
          />
        </View>
      </View>
    </View>
  );
};

export default AddPostScreen;

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
