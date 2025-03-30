// import React, {useState, useCallback, useEffect} from 'react';
// import {
//   View,
//   FlatList,
//   Alert,
//   TouchableOpacity,
//   Text,
//   Pressable,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import Loading from '../../components/Loading';
// import TrashedPostItem from '../../components/TrashedPostItem';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import PostService from '../../services/postService';
// import styles from '../../styles/screensStyles/PostStyles/TrashedScreenStyles';
// import Toast from 'react-native-simple-toast';

// function EmptyListCustomComponent() {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.emptyContainer}>
//       <Text style={styles.emptyText}>No trashed data available</Text>
//       <Pressable onPress={() => navigation.goBack()} style={styles.emptyButton}>
//         <Text style={styles.emptyButtonText}>Go Back</Text>
//       </Pressable>
//     </View>
//   );
// }

// const TrashedScreen = ({navigation}) => {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [restoring, setRestoring] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   const fetchPosts = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const {data} = await PostService.getTrashedPosts();
//       setPosts(data.data || []);
//     } catch (error) {
//       console.log(error);
//       if (error.type === 'network') {
//         // Alert.alert('Network Error', 'Please check your internet connection.');
//         Toast.show('Please check your internet connection.', Toast.LONG);
//         navigation.goBack();
//       } else if (error.type === 'not_found') {
//         setPosts([]);
//       } else {
//         // Alert.alert('Error', 'Failed to fetch posts.');
//         Toast.show('Failed to fetch posts.', Toast.LONG);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [navigation]);

//   const singlePostDeleteForever = async id => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to permanently delete this post?',
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             setDeleting(true);
//             try {
//               // await axios.delete(`${API_URL}/posts/${id}/delete`);
//               await PostService.deleteSinglePostForever(id);
//               await fetchPosts();
//             } catch (error) {
//               if (error.type === 'network') {
//                 // Alert.alert(
//                 //   'Network Error',
//                 //   'Please check your internet connection.',
//                 // );
//                 Toast.show(
//                   'Please check your internet connection.',
//                   Toast.LONG,
//                 );
//               } else {
//                 Alert.alert('Error', 'Failed to fetch posts.');
//               }
//               console.error('Error deleting post:', error);
//               Alert.alert('Error', 'Failed to delete the post.');
//             } finally {
//               setDeleting(false);
//             }
//           },
//         },
//       ],
//     );
//   };

//   const restoreSinglePost = async id => {
//     setRestoring(true);
//     try {
//       await PostService.restoreSinglePost(id);
//       await fetchPosts();
//     } catch (error) {
//       if (error.type === 'network') {
//         Alert.alert('Network Error', error.message);
//       }
//       console.log('Error restoring post:', error);
//       Alert.alert('Error', 'Failed to restore the post.');
//     } finally {
//       setRestoring(false);
//     }
//   };

//   const restoreAllPost = async () => {
//     setRestoring(true);
//     try {
//       const res = await PostService.restoreAllPost();
//       console.log('restoreAllPost:', res);
//       await fetchPosts();
//     } catch (error) {
//       console.log('Error restoring posts:', JSON.stringify(error));
//       Alert.alert('Error', 'Failed to restore all posts.');
//     } finally {
//       setRestoring(false);
//     }
//   };

//   // protected delete as warning
//   const promptDeleteAllForever = async id => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure to delete all trashed posts forever?',
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => deleteAllForever(id),
//         },
//       ],
//     );
//   };

//   // final action to delete
//   const deleteAllForever = async () => {
//     Alert.alert('Final Action Warning', 'Your cannot undo this action?', [
//       {text: 'Cancel', style: 'cancel'},
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: async () => {
//           setIsLoading(true);
//           try {
//             await PostService.deleteAllTrashedPostForever();
//             fetchPosts();
//           } catch (error) {
//             if (error.type === 'network') {
//               Alert.alert(
//                 'Network Error',
//                 'Please check your internet connection.',
//               );
//             }
//             console.error('Error deleting posts:', error);
//             Alert.alert('Error', 'Failed to delete posts.');
//           } finally {
//             setIsLoading(false);
//           }
//         },
//       },
//     ]);
//   };

//   return (
//     <>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.contentWrapper}>
//           {restoring && <Loading text="Restoring..." />}
//           {deleting && <Loading text="Deleting..." />}
//           {!restoring && !deleting && isLoading ? (
//             <Loading text="Loading..." />
//           ) : (
//             <>
//               <FlatList
//                 data={posts}
//                 keyExtractor={item => item.id.toString()}
//                 renderItem={({item}) => (
//                   <TrashedPostItem
//                     item={item}
//                     onRestore={restoreSinglePost}
//                     onDelete={singlePostDeleteForever}
//                   />
//                 )}
//                 ListEmptyComponent={<EmptyListCustomComponent />}
//                 onRefresh={fetchPosts}
//                 refreshing={isLoading}
//               />
//               <View style={styles.actionButtonsContainer}>
//                 <TouchableOpacity
//                   onPress={promptDeleteAllForever}
//                   style={[styles.actionButton, styles.deleteButton]}>
//                   <Text style={styles.actionButtonText}>
//                     Delete All Forever
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={restoreAllPost}
//                   style={[styles.actionButton, styles.restoreButton]}>
//                   <Text style={styles.actionButtonText}>Restore All</Text>
//                 </TouchableOpacity>
//               </View>
//             </>
//           )}
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// export default TrashedScreen;

import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../components/Loading';
import TrashedPostItem from '../../components/TrashedPostItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import PostService from '../../services/postService';
import styles from '../../styles/screensStyles/PostStyles/TrashedScreenStyles';
import Toast from 'react-native-simple-toast';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

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

const ItemSeparator = () => <View style={styles.separator} />;

const PostShimmer = () => {
  return (
    <View style={shimmerStyles.container}>
      <ShimmerPlaceholder
        shimmerColors={shimmerColors}
        style={shimmerStyles.smallShimmer}
      />
      <ShimmerPlaceholder
        shimmerColors={shimmerColors}
        style={shimmerStyles.largeShimmer}
      />
      <ShimmerPlaceholder
        shimmerColors={shimmerColors}
        style={shimmerStyles.largeShimmer}
      />
      <ShimmerPlaceholder
        shimmerColors={shimmerColors}
        style={shimmerStyles.largeShimmer}
      />
      <View style={shimmerStyles.row}>
        <ShimmerPlaceholder
          shimmerColors={shimmerColors}
          style={shimmerStyles.mediumShimmer}
        />
        <ShimmerPlaceholder
          shimmerColors={shimmerColors}
          style={shimmerStyles.mediumShimmer}
        />
      </View>
    </View>
  );
};
const shimmerColors = ['#e0e0e0', '#f5f5f5', '#e0e0e0'];

const TrashedScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const {data} = await PostService.getTrashedPosts();
      setPosts(data.data || []);
    } catch (error) {
      console.log(error);
      if (error.type === 'network') {
        Toast.show('Please check your internet connection.', Toast.LONG);
        navigation.goBack();
      } else if (error.type === 'not_found') {
        setPosts([]);
      } else {
        Toast.show('Failed to fetch posts.', Toast.LONG);
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostAction = async (
    action,
    id = null,
    confirmMessage,
    successMessage,
  ) => {
    Alert.alert('Confirm', confirmMessage, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: async () => {
          const loadingState =
            action === 'restore' ? setRestoring : setDeleting;
          loadingState(true);
          try {
            if (action === 'restore') {
              id
                ? await PostService.restoreSinglePost(id)
                : await PostService.restoreAllPost();
            } else {
              id
                ? await PostService.deleteSinglePostForever(id)
                : await PostService.deleteAllTrashedPostForever();
            }
            await fetchPosts();
            Toast.show(successMessage, Toast.LONG);
          } catch (error) {
            const errorMessage =
              error.type === 'network'
                ? 'Please check your internet connection.'
                : `Failed to ${action} the post${id ? '' : 's'}.`;
            Toast.show(errorMessage, Toast.LONG);
          } finally {
            loadingState(false);
          }
        },
      },
    ]);
  };

  const renderPostItem = ({item}) => (
    <TrashedPostItem
      item={item}
      onRestore={() =>
        handlePostAction(
          'restore',
          item.id,
          'Are you sure you want to restore this post?',
          'Post restored successfully.',
        )
      }
      onDelete={() =>
        handlePostAction(
          'delete',
          item.id,
          'Are you sure you want to permanently delete this post?',
          'Post deleted permanently.',
        )
      }
    />
  );

  const renderShimmerItem = () => (
    <View style={{paddingHorizontal: 10}}>
      <View style={styles.shimmerContainer}>
        <PostShimmer />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        {(restoring || deleting) && (
          <Loading text={restoring ? 'Restoring...' : 'Deleting...'} />
        )}

        <>
          <FlatList
            data={isLoading ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : posts}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparator}
            ListEmptyComponent={!isLoading && <EmptyListCustomComponent />}
            renderItem={isLoading ? renderShimmerItem : renderPostItem}
            onRefresh={fetchPosts}
            refreshing={isLoading}
          />
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              onPress={() =>
                handlePostAction(
                  'delete',
                  null,
                  'Are you sure to delete all trashed posts forever?',
                  'All posts deleted permanently.',
                )
              }
              style={[styles.actionButton, styles.deleteButton]}>
              <Text style={styles.actionButtonText}>Delete All Forever</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handlePostAction(
                  'restore',
                  null,
                  'Are you sure you want to restore all posts?',
                  'All posts restored successfully.',
                )
              }
              style={[styles.actionButton, styles.restoreButton]}>
              <Text style={styles.actionButtonText}>Restore All</Text>
            </TouchableOpacity>
          </View>
        </>
      </View>

      {/* <FlatList
        data={isLoading ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : posts}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={!isLoading && <EmptyListCustomComponent />}
        renderItem={isLoading ? renderShimmerItem : renderPostItem}
        onRefresh={fetchPosts}
        refreshing={isLoading}
      />
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          onPress={() =>
            handlePostAction(
              'delete',
              null,
              'Are you sure to delete all trashed posts forever?',
              'All posts deleted permanently.',
            )
          }
          style={[styles.actionButton, styles.deleteButton]}>
          <Text style={styles.actionButtonText}>Delete All Forever</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handlePostAction(
              'restore',
              null,
              'Are you sure you want to restore all posts?',
              'All posts restored successfully.',
            )
          }
          style={[styles.actionButton, styles.restoreButton]}>
          <Text style={styles.actionButtonText}>Restore All</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default TrashedScreen;

const shimmerStyles = StyleSheet.create({
  container: {
    gap: 5,
    width: '100%',
  },
  smallShimmer: {
    width: '10%',
    height: 20,
    borderRadius: 5,
  },
  largeShimmer: {
    width: '80%',
    height: 20,
    borderRadius: 5,
  },
  row: {
    gap: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediumShimmer: {
    flex: 1,
    height: 40,
  },
});
