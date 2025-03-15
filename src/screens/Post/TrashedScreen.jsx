// import React, {useState, useCallback} from 'react';
// import {
//   View,
//   FlatList,
//   Alert,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
//   Pressable,
//   StatusBar,
// } from 'react-native';
// import axios from 'axios';
// import {useFocusEffect, useNavigation} from '@react-navigation/native'; // Import useFocusEffect
// import {API_URL} from '../../config';
// import Loading from '../../components/Loading';
// import TrashedPostItem from '../../components/TrashedPostItem';
// import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

// function EmptyListCustomComponent() {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.emptyContainer}>
//       <Text style={styles.emptyText}>No trashed data available</Text>
//       <Pressable
//         onPress={() => navigation.goBack()}
//         style={[styles.buttonPressable]}>
//         <Text style={[styles.buttonText, {color: 'gray'}]}>Go Back</Text>
//       </Pressable>
//     </View>
//   );
// }

// const TrashedScreen = ({navigation}) => {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   /**
//    * Fetches trashed posts
//    *
//    * Fetches trashed posts and updates the state with the new data.
//    * If there is an error, it will show an alert to the user.
//    * @async
//    */
//   const fetchPosts = async () => {
//     try {
//       setIsLoading(true);
//       const {data} = await axios.get(`${API_URL}/post/trashed`);
//       setPosts(data.data || []); // Ensure posts is always an array
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response?.status === 404) {
//         setPosts([]); // If 404, set an empty list instead of throwing an error
//       } else {
//         console.error('Error fetching posts:', error);
//         Alert.alert('Error', 'Failed to fetch posts.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /**
//    * Fetches trashed posts
//    *
//    * Fetches trashed posts using Axios and logs the received data to the console.
//    * If there is an error, it will log the error details to the console.
//    * @async
//    */
//   // async function fetchData() {
//   //   try {
//   //     const response = await axios.get(`${API_URL}/post/trashed`);
//   //     console.log('Data:', response.data);
//   //   } catch (error) {
//   //     if (error.response) {
//   //       // The request was made and the server responded with a status code
//   //       // that falls out of the range of 2xx
//   //       console.error(
//   //         'Server Error:',
//   //         error.response.status,
//   //         error.response.data,
//   //       );
//   //     } else if (error.request) {
//   //       // The request was made but no response was received
//   //       console.error('Request Error:', error.request);
//   //     } else {
//   //       // Something happened in setting up the request that triggered an Error
//   //       console.error('Error:', error.message);
//   //     }
//   //   }
//   // }

//   useFocusEffect(
//     useCallback(() => {
//       fetchPosts(); // Refresh posts when screen is focused
//       // fetchData();
//     }, []),
//   );

//   const HandleDeleteForever = async id => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to permanently delete this post?',
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             setIsLoading(true);
//             try {
//               await axios.delete(`${API_URL}/post/${id}/delete`);
//               await fetchPosts(); // Refresh posts after deletion
//             } catch (error) {
//               console.error('Error deleting post:', error);
//               Alert.alert('Error', 'Failed to delete the post.');
//             } finally {
//               setIsLoading(false);
//             }
//           },
//         },
//       ],
//     );
//   };

//   const restorePost = async id => {
//     setIsLoading(true);
//     try {
//       await axios.patch(`${API_URL}/post/${id}/restore`);
//       await fetchPosts(); // Refresh posts after deletion
//     } catch (error) {
//       console.error('Error deleting post:', error);
//       Alert.alert('Error', 'Failed to delete the post.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /**
//    * Restore all trashed posts
//    *
//    * Fetches trashed posts and then calls the PATCH /post/restore endpoint
//    * to restore all trashed posts.
//    *
//    * @async
//    */
//   const restoreAll = async () => {
//     setIsLoading(true);
//     try {
//       await axios.patch(`${API_URL}/post/restore`);
//       await fetchPosts(); // Refresh posts after deletion
//     } catch (error) {
//       console.error('Error deleting post:', error);
//       Alert.alert('Error', 'Failed to delete the post.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /**
//    * Deletes all trashed posts forever
//    *
//    * Calls the DELETE /post/trashed endpoint to delete all trashed posts.
//    * This action is irreversible and will permanently delete all trashed posts.
//    *
//    * @async
//    */
//   const deleteAllForever = async () => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to permanently delete all trashed posts?',
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             setIsLoading(true);
//             try {
//               await axios.delete(`${API_URL}/post/trashed`);
//               fetchPosts(); // Refresh posts after deletion
//             } catch (error) {
//               console.error('Error deleting post:', error);
//               Alert.alert('Error', 'Failed to delete the post.');
//             } finally {
//               setIsLoading(false);
//             }
//           },
//         },
//       ],
//     );
//   };

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.container}>
//         <View style={{width: '100%', flex: 1, position: 'relative'}}>
//           {isLoading ? (
//             <Loading />
//           ) : (
//             <>
//               <FlatList
//                 data={posts}
//                 keyExtractor={item => item.id.toString()}
//                 renderItem={({item}) => (
//                   <TrashedPostItem
//                     item={item}
//                     onRestore={restorePost}
//                     onDelete={HandleDeleteForever}
//                   />
//                 )}
//                 ListEmptyComponent={<EmptyListCustomComponent />}
//               />
//               <View style={styles.buttonWrapper}>
//                 <TouchableOpacity
//                   onPress={deleteAllForever}
//                   style={[styles.button, {backgroundColor: 'red'}]}>
//                   <Text style={styles.buttonText}>Delete All Forever</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={restoreAll}
//                   style={[styles.button, {backgroundColor: 'green'}]}>
//                   <Text style={styles.buttonText}>Restore All</Text>
//                 </TouchableOpacity>
//               </View>
//             </>
//           )}
//         </View>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   buttonWrapper: {
//     display: 'flex',
//     flexDirection: 'row',
//   },

//   button: {
//     padding: 20,
//     width: '50%',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 16,
//     color: 'gray',
//   },
//   buttonPressable: {
//     marginTop: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.1)',
//     borderRadius: 5,
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//   },
// });

// export default TrashedScreen;
import React, {useState, useCallback} from 'react';
import {
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {API_URL} from '../../config';
import Loading from '../../components/Loading';
import TrashedPostItem from '../../components/TrashedPostItem';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import PostService from '../../services/postService';

function EmptyListCustomComponent() {
  const navigation = useNavigation();
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No trashed data available</Text>
      <Pressable onPress={() => navigation.goBack()} style={styles.emptyButton}>
        <Text style={styles.emptyButtonText}>Go Back</Text>
      </Pressable>
    </View>
  );
}

const TrashedScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [restoring, setRestoring] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.get(`${API_URL}/posts/trashed`);
      setPosts(data.data || []);
    } catch (error) {
      // console.error('All Error:', error);
      console.log(JSON.stringify(error));
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setPosts([]);
      } else {
        console.log('Error fetching posts:', error);
        // Alert.alert('Error', 'Failed to fetch posts.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, []),
  );

  const HandleDeleteForever = async id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to permanently delete this post?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              await axios.delete(`${API_URL}/posts/${id}/delete`);
              await fetchPosts();
            } catch (error) {
              console.error('Error deleting post:', error);
              Alert.alert('Error', 'Failed to delete the post.');
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  const restorePost = async id => {
    setRestoring(true);
    try {
      await axios.patch(`${API_URL}/posts/${id}/restore`);
      await fetchPosts();
    } catch (error) {
      console.error('Error restoring post:', error);
      Alert.alert('Error', 'Failed to restore the post.');
    } finally {
      setRestoring(false);
    }
  };

  const restoreAllPost = async () => {
    setRestoring(true);
    try {
      const res = await PostService.restoreAllPost();
      console.log('restoreAllPost:', res);
      await fetchPosts();
    } catch (error) {
      console.log('Error restoring posts:', JSON.stringify(error));
      Alert.alert('Error', 'Failed to restore all posts.');
    } finally {
      setRestoring(false);
    }
  };

  // protected delete as warning
  const promptDeleteForever = async id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure to delete all trashed posts forever?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteAllForever(id),
        },
      ],
    );
  };

  // final action to delete
  const deleteAllForever = async () => {
    Alert.alert('Final Action Warning', 'Your cannot undo this action?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setIsLoading(true);
          try {
            await PostService.deleteAllTrashedPostForever();
            fetchPosts();
          } catch (error) {
            console.error('Error deleting posts:', error);
            Alert.alert('Error', 'Failed to delete posts.');
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentWrapper}>
          {restoring && <Loading text="Restoring..." />}
          {deleting && <Loading text="Deleting..." />}
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <FlatList
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <TrashedPostItem
                    item={item}
                    onRestore={restorePost}
                    onDelete={HandleDeleteForever}
                  />
                )}
                ListEmptyComponent={<EmptyListCustomComponent />}
                onRefresh={fetchPosts}
                refreshing={isLoading}
              />
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  onPress={promptDeleteForever}
                  style={[styles.actionButton, styles.deleteButton]}>
                  <Text style={styles.actionButtonText}>
                    Delete All Forever
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={restoreAllPost}
                  style={[styles.actionButton, styles.restoreButton]}>
                  <Text style={styles.actionButtonText}>Restore All</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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

export default TrashedScreen;
