import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import PostItem from '../../components/PostItem';
import Loading from '../../components/Loading';
import NetworkStatusChecker from '../../components/NetworkStatusChecker';
import useNetworkStore from '../../store/networkStore';
import PostService from '../../services/postService';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../styles/screensStyles/PostStyles/PostsScreenStyles';
function EmptyListCustomComponent() {
  const navigation = useNavigation();
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No post(s) available</Text>
      <Pressable
        onPress={() => navigation.navigate('AddPost')}
        style={styles.emptyButton}>
        <Text style={styles.emptyButtonText}>Create Post</Text>
      </Pressable>
    </View>
  );
}

const PostsScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isConnected = useNetworkStore(state => state.isConnected);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const {data} = await PostService.getPosts();
      setPosts(data.data);
      console.log(data.data);
    } catch (error) {
      if (error.type === 'network') {
        Alert.alert('Network Error', error.message);
      }
      console.log(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      isConnected && loadPosts();
    }, [loadPosts, isConnected]),
  );
  // useEffect(() => {
  //   loadPosts();
  // }, [loadPosts]);

  const handleDeletePost = id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this post?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              const res = await PostService.deletePost(id);
              console.log(res);
              await loadPosts();
            } catch (error) {
              Alert.alert(
                'Error',
                error.message || 'Failed to delete the post.',
              );
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <NetworkStatusChecker />

        <View style={styles.listContainer}>
          {isLoading ? (
            <Loading text="Loading posts..." />
          ) : (
            <FlatList
              data={posts}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <PostItem
                  item={item}
                  onEdit={() => navigation.navigate('EditPost', {id: item.id})}
                  onDelete={() => handleDeletePost(item.id)}
                />
              )}
              ListEmptyComponent={<EmptyListCustomComponent />}
              onRefresh={loadPosts}
              refreshing={isLoading}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TrashedPost')}
            style={[styles.button, styles.trashedButton]}>
            <Text style={styles.buttonText}>Trashed Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddPost')}
            style={[styles.button, styles.addButton]}>
            <Text style={styles.buttonText}>Add Post</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PostsScreen;
