// import React, {useCallback, useEffect, useState} from 'react';
// import {View, TextInput, StyleSheet, Text, Alert} from 'react-native';
// import axios from 'axios';
// import {API_URL} from '../../config';
// import Loading from '../../components/Loading';
// import PressableButton from '../../components/PressableButton';

// const EditPostScreen = ({route, navigation}) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const {id} = route.params;

//   useEffect(() => {
//     fetchPost(id);
//   }, [fetchPost, id]);

//   const fetchPost = useCallback(async () => {
//     setIsLoading(true);

//     try {
//       const {data} = await axios.get(`${API_URL}/post/${id}`);
//       setTitle(data.data.title);
//       setContent(data.data.content);
//     } catch (error) {
//       console.error('Error fetching post:', error);
//       Alert.alert('Error', 'Failed to fetch post.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [id]);

//   const updatePost = async () => {
//     setIsUpdating(true);

//     try {
//       await axios.patch(`${API_URL}/post/${id}`, {
//         title,
//         content,
//       });
//       setIsUpdating(false);
//       if (navigation.canGoBack()) {
//         navigation.goBack();
//       }
//     } catch (error) {
//       console.error('Error updating post:', error);
//       Alert.alert('Error', 'Failed to update post.');
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <View style={{backgroundColor: '#eee', flex: 1}}>
//       {isUpdating && <Loading text="Updating post..." />}
//       {isLoading ? (
//         <View style={{flex: 1, justifyContent: 'center'}}>
//           <Loading text="Loading post..." />
//         </View>
//       ) : (
//         <View style={{padding: 20}}>
//           <Text style={styles.title}>Edit post</Text>
//           <TextInput
//             placeholder="Title"
//             value={title}
//             onChangeText={setTitle}
//             style={styles.titleInput}
//           />
//           <TextInput
//             placeholder="Content"
//             style={styles.contentInput}
//             value={content}
//             onChangeText={setContent}
//             multiline
//             numberOfLines={4}
//           />
//           <PressableButton
//             onPress={updatePost}
//             title="Update Post"
//             backgroundColor="#2196F3"
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   titleInput: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   contentInput: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//     height: 110,
//     textAlignVertical: 'top',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#008080',
//   },
//   button: {
//     padding: 20,
//     backgroundColor: 'gray',
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: 'blue',
//     fontWeight: 'bold',
//   },
// });
// export default EditPostScreen;

import React, {useCallback, useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Text, Alert} from 'react-native';
import axios from 'axios';
import {API_URL} from '../../config';
import Loading from '../../components/Loading';
import PressableButton from '../../components/PressableButton';
import PostService from '../../services/postService';

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
      const {data} = await axios.get(`${API_URL}/posts/${id}`);
      setTitle(data.data.title);
      setContent(data.data.content);
    } catch (error) {
      console.log('Error fetching post:', JSON.stringify(error));
      Alert.alert('Error', 'Failed to fetch post.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const updatePost = async () => {
    setIsUpdating(true);

    try {
      const res = await PostService.updatePost(id, {title, content});
      if (res.status === 200) {
        Alert.alert('Success', 'Post updated successfully.');
      }
      console.log(res);
      setIsUpdating(false);
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } catch (error) {
      console.log('Error updating post:', JSON.stringify(error));
      Alert.alert('Error', 'Failed to update post.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#008080',
  },
  input: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  contentInput: {
    height: 110,
    textAlignVertical: 'top',
  },
});

export default EditPostScreen;
