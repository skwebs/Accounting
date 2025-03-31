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

const SettingsTab = () => {
  return (
    <View style={styles.container}>
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
});
