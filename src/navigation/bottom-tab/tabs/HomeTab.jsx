import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../styles/theme/Colors';

const renderItem = () => {
  return (
    <View style={{paddingHorizontal: 15}}>
      <View
        style={{
          direction: 'flex',
          gap: 10,
          padding: 10,
          backgroundColor: '#fff',
          borderRadius: 6,
          borderWidth: 1,
          borderColor: '#dfdfdf',
        }}>
        {/* skeleton */}
        <View style={{width: '100%', height: 25, backgroundColor: '#cfe2f3'}} />
        <View style={{width: '90%', height: 25, backgroundColor: '#cfe2f3'}} />

        {/* two button in single row  */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '48%',
              height: 45,
              backgroundColor: '#cfe2f3',
            }}></View>
          <View
            style={{
              width: '48%',
              height: 45,
              backgroundColor: '#cfe2f3',
            }}></View>
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => {
  return <View style={{height: 15}} />;
};

const HomeTab = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Transactions</Text> */}
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        ListHeaderComponent={ItemSeparator}
        ListHeaderComponentStyle={{paddingHorizontal: 100}}
        ListFooterComponent={ItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparator}
        // ListEmptyComponent={!isLoading && <EmptyListCustomComponent />}
        renderItem={renderItem}
        // onRefresh={loadPosts}
        // refreshing={isLoading}
      />
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ddd',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
