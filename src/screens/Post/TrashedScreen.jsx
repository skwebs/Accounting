import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
  const [isLoading, setIsLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const {data} = await PostService.getTrashedPosts();
      setPosts(data.data || []);
    } catch (error) {
      console.log(error);
      if (error.type === 'network') {
        Alert.alert('Network Error', 'Please check your internet connection.');
        navigation.goBack();
      } else if (error.type === 'not_found') {
        setPosts([]);
      } else {
        Alert.alert('Error', 'Failed to fetch posts.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  const singlePostDeleteForever = async id => {
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
              // await axios.delete(`${API_URL}/posts/${id}/delete`);
              await PostService.deleteSinglePostForever(id);
              await fetchPosts();
            } catch (error) {
              if (error.type === 'network') {
                Alert.alert(
                  'Network Error',
                  'Please check your internet connection.',
                );
              } else {
                Alert.alert('Error', 'Failed to fetch posts.');
              }
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

  const restoreSinglePost = async id => {
    setRestoring(true);
    try {
      await PostService.restoreSinglePost(id);
      await fetchPosts();
    } catch (error) {
      if (error.type === 'network') {
        Alert.alert('Network Error', error.message);
      }
      console.log('Error restoring post:', error);
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
  const promptDeleteAllForever = async id => {
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
            if (error.type === 'network') {
              Alert.alert(
                'Network Error',
                'Please check your internet connection.',
              );
            }
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
          {!restoring && !deleting && isLoading ? (
            <Loading text="Loading..." />
          ) : (
            <>
              <FlatList
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <TrashedPostItem
                    item={item}
                    onRestore={restoreSinglePost}
                    onDelete={singlePostDeleteForever}
                  />
                )}
                ListEmptyComponent={<EmptyListCustomComponent />}
                onRefresh={fetchPosts}
                refreshing={isLoading}
              />
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  onPress={promptDeleteAllForever}
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
    // marginTop: StatusBar.currentHeight || 0,
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
    padding: 20,
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
