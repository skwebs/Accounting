import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Colors from '../../../styles/theme/Colors';
import LinearGradient from 'react-native-linear-gradient';
import useAuthStore from '../../../store/authStoreJs';

const SettingsTab = () => {
  const {logout} = useAuthStore();
  // logout
  const logoutHandler = () => {
    console.log('logout');
    logout();
    // navigation.navigate('Login');
    console.log('logout');
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoutButtonWrapper}>
        <TouchableOpacity
          onPress={() => {
            logoutHandler();
          }}>
          <LinearGradient colors={['#c71585', '#4A0000']} style={styles.logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
        renderItem={() => (
          // create varios menu items
          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                backgroundColor: 'white',
                borderEndEndRadius: 50,
                borderTopEndRadius: 50,
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>Item</Text>
              <Image
                source={require('../../../assets/images/right-caret.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default SettingsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  logoutButtonWrapper: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
  logout: {
    padding: 20,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
