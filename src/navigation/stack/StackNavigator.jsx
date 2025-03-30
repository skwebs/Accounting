import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import PostsScreen from '../../screens/Post/PostsScreen';
import AddPostScreen from '../../screens/Post/AddPostScreen';
import EditPostScreen from '../../screens/Post/EditPostScreen';
import TrashedScreen from '../../screens/Post/TrashedScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Posts">
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

export default StackNavigator;
