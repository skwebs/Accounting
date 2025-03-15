import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PostsScreen from './screens/Post/PostsScreen';
import AddPostScreen from './screens/Post/AddPostScreen';
import EditPostScreen from './screens/Post/EditPostScreen';
import HomeScreen from './HomeScreen';
import TrashedScreen from './screens/Post/TrashedScreen';
import {listenForNetworkChanges} from './store/networkStore';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    listenForNetworkChanges(); // Start network status monitoring
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Posts"
        screenOptions={{
          headerStyle: {
            height: 56, // Adjust as needed
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name="Posts"
          component={PostsScreen}
          options={{title: 'Posts'}}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{title: 'Add Post'}}
        />
        <Stack.Screen
          name="EditPost"
          component={EditPostScreen}
          options={{title: 'Edit Post'}}
        />
        <Stack.Screen
          name="TrashedPost"
          component={TrashedScreen}
          options={{title: 'Trashed Posts'}}
        />
        {/* added */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
