// import React, {useState} from 'react';
// import {StyleSheet, View, TextInput, Button, Alert} from 'react-native';
// import axios from 'axios';
// import {API_URL} from '../../config';
// import Loading from '../../components/Loading';
// import {Text} from 'react-native-gesture-handler';
// import PressableButton from '../../components/PressableButton';

// const AddPostScreen = ({navigation}) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   // loading state
//   const [isLoading, setIsLoading] = useState(false);

//   const savePost = async () => {
//     if (!title.trim()) {
//       Alert.alert('Validation', 'Post title cannot be empty');
//       return;
//     }
//     if (!content.trim()) {
//       Alert.alert('Validation', 'Post content cannot be empty');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       await axios.post(`${API_URL}/post`, {
//         title,
//         content,
//         user_id: 1,
//       });
//       setIsLoading(false);
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error adding post:', error);
//       Alert.alert('Error', 'Failed to add post');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={{backgroundColor: '#eee', flex: 1}}>
//       {isLoading ? (
//         <View style={{flex: 1, justifyContent: 'center'}}>
//           <Loading text="Saving post..." />
//         </View>
//       ) : (
//         <View style={{padding: 20}}>
//           <Text style={styles.title}>Add a new post</Text>
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
//             onPress={savePost}
//             title="Save Post"
//             backgroundColor="#2196F3"
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// export default AddPostScreen;

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
// });

import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Alert} from 'react-native';
import axios from 'axios';
import {API_URL} from '../../config';
import Loading from '../../components/Loading';
import {Text} from 'react-native-gesture-handler';
import PressableButton from '../../components/PressableButton';

const AddPostScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const savePost = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Post title cannot be empty');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Validation', 'Post content cannot be empty');
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/post`, {
        title,
        content,
        user_id: 1,
      });
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding post:', error);
      Alert.alert('Error', 'Failed to add post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Loading text="Saving post..." />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Add a new post</Text>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.titleInput}
          />
          <TextInput
            placeholder="Content"
            style={styles.contentInput}
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={4}
          />
          <PressableButton
            onPress={savePost}
            title="Save Post"
            backgroundColor="#2196F3"
          />
        </View>
      )}
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
    marginBottom: 20,
  },
  contentInput: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    height: 110,
    textAlignVertical: 'top',
  },
});
