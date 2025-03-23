import React, {useState, useCallback} from 'react';
import {
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import PostItem from '../../components/PostItem';
import Loading from '../../components/Loading';
import NetworkStatusChecker from '../../components/NetworkStatusChecker';
import useNetworkStore from '../../store/networkStore';
import PostService from '../../services/postService';
import {SafeAreaView} from 'react-native-safe-area-context';

import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

import styles from '../../styles/screensStyles/PostStyles/PostsScreenStyles';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

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

const ItemSeparator = () => (
  <>
    <View style={styles.separator} />
  </>
);

const shimmerColors = ['#e0e0e0', '#f5f5f5', '#e0e0e0'];
const PostShimmer = () => {
  return (
    <View style={sStyles.container}>
      <ShimmerPlaceholder
        shimmerColors={shimmerColors}
        style={sStyles.smallShimmer}
      />
      <ShimmerPlaceholder
        shimmerColors={shimmerColors}
        style={sStyles.largeShimmer}
      />
      <ShimmerPlaceholder
        shimmerColors={shimmerColors}
        style={sStyles.largeShimmer}
      />
      <ShimmerPlaceholder
        shimmerColors={shimmerColors}
        style={sStyles.largeShimmer}
      />
      <View style={sStyles.row}>
        <ShimmerPlaceholder
          shimmerColors={['#e0e0e0', '#f5f5f5', '#e0e0e0']}
          style={sStyles.mediumShimmer}
        />
        <ShimmerPlaceholder
          shimmerColors={shimmerColors}
          style={sStyles.mediumShimmer}
        />
      </View>
    </View>
  );
};

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
            // <Loading text="Loading posts..." />
            <FlatList
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              ItemSeparatorComponent={ItemSeparator}
              renderItem={({item, index}) => (
                <View style={{paddingHorizontal: 10}}>
                  <View
                    style={[
                      {
                        backgroundColor: 'white',
                        padding: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#dfdfdf',
                      },
                    ]}>
                    <PostShimmer />
                  </View>
                </View>
              )}
            />
          ) : (
            <FlatList
              data={posts}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={ItemSeparator} // Pass it as a reference
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

const sStyles = StyleSheet.create({
  container: {
    gap: 5,
    width: '100%',
  },
  smallShimmer: {
    width: '10%',
    height: 20,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  largeShimmer: {
    width: '80%',
    height: 20,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  row: {
    gap: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediumShimmer: {
    flex: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
});
