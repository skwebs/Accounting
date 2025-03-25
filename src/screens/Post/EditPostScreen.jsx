import React, {useCallback, useEffect, useState} from 'react';
import {View, TextInput, Text, Alert} from 'react-native';

import Loading from '../../components/Loading';
import PressableButton from '../../components/PressableButton';
import PostService from '../../services/postService';
import NetworkStatusChecker from '../../components/NetworkStatusChecker';
import styles from '../../styles/screensStyles/PostStyles/EditPostScreenStyles';
import Snackbar from 'react-native-snackbar';
import Toast from 'react-native-simple-toast';

const EditPostScreen = ({route, navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const {id} = route.params;

  useEffect(() => {
    fetchPost(id);
  }, [fetchPost, id]);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);

    try {
      const {data} = await PostService.getPostById(id);
      setTitle(data.data.title);
      setContent(data.data.content);
    } catch (error) {
      console.log(error);
      if (error.type === 'network') {
        Alert.alert('Network Error', error.message);
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      } else {
        Alert.alert('Error', 'Failed to fetch post.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, navigation]);

  const updatePost = async () => {
    setIsUpdating(true);

    try {
      const res = await PostService.updatePost(id, {title, content});
      if (res.status === 200) {
        // Alert.alert('Success', 'Post updated successfully.');
        // Snackbar.show({
        //   text: 'Post updated successfully.',
        //   duration: Snackbar.LENGTH_SHORT,
        //   // backgroundColor: 'green',
        // });

        Toast.show('Post updated successfully.', Toast.LONG);
      }
      console.log(res);
      setIsUpdating(false);
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } catch (error) {
      if (error.type === 'network') {
        Alert.alert('Network Error', error.message);
      } else {
        console.log('Error updating post:', JSON.stringify(error));
        Alert.alert('Error', 'Failed to update post.');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <View style={styles.container}>
      <NetworkStatusChecker />
      {isUpdating && <Loading text="Updating post..." />}
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <Loading text="Loading post..." />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.header}>Edit post</Text>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Content"
            style={[styles.input, styles.contentInput]}
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={4}
          />
          <PressableButton
            onPress={updatePost}
            title="Update Post"
            backgroundColor="#2196F3"
          />
        </View>
      )}
    </View>
  );
};

export default EditPostScreen;
