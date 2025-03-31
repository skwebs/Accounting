import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../styles/theme/Colors';

const renderItem = () => {
  return (
    <View style={{paddingHorizontal: 15}}>
      <View style={{backgroundColor: '#fff', padding: 10, borderRadius: 6}}>
        <Text>12/12/2022</Text>
        <Text>Amount</Text>
        <Text>Transaction</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => {
  return <View style={{height: 15}} />;
};

const TransactionTab = () => {
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

export default TransactionTab;

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
