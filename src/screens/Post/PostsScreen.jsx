
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
import PostItem from '../../components/PostItem';
import NetworkStatusChecker from '../../components/NetworkStatusChecker';
import useNetworkStore from '../../store/networkStore';
import PostService from '../../services/postService';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import Toast from 'react-native-simple-toast';
import styles from '../../styles/screensStyles/PostStyles/PostsScreenStyles';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

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

const ItemSeparator = () => <View style={styles.separator} />;

const shimmerColors = ['#e0e0e0', '#f5f5f5', '#e0e0e0'];

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

const PostsScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isConnected = useNetworkStore(state => state.isConnected);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const {data} = await PostService.getPosts();
      setPosts(data.data);
    } catch (error) {
      if (error.type === 'network') {
        Toast.show(error.message, Toast.LONG);
      }
      console.log(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
    if (isConnected) {
      loadPosts();
    }
  }, [isConnected, loadPosts]);

  // useEffect(() => {
  //   if (isConnected) {
  //     loadPosts();
  //   }
  // }, [isConnected, loadPosts]);

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
              if (res.status === 200) {
                Toast.show('Post deleted successfully.', Toast.LONG, {
                  backgroundColor: 'green',
                });
              }
              await loadPosts();
            } catch (error) {
              Toast.show('Failed to delete the post.', Toast.LONG, {
                backgroundColor: 'red',
              });
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
    );
  };

  const renderPostItem = ({item}) => (
    <PostItem
      item={item}
      onEdit={() => navigation.navigate('EditPost', {id: item.id})}
      onDelete={() => handleDeletePost(item.id)}
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
      <NetworkStatusChecker />

      <FlatList
        data={isLoading ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : posts}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={!isLoading && <EmptyListCustomComponent />}
        renderItem={isLoading ? renderShimmerItem : renderPostItem}
        onRefresh={loadPosts}
        refreshing={isLoading}
      />

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
  );
};

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

export default PostsScreen;
