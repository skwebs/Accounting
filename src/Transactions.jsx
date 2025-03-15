import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const DATA = [
  {
    title: 'Fruits',
    data: ['Apple', 'Banana', 'Orange', 'Mango'],
  },
  {
    title: 'Vegetables',
    data: ['Carrot', 'Broccoli', 'Spinach', 'Cucumber'],
  },
  {
    title: 'Dairy',
    data: ['Milk', 'Cheese', 'Yogurt', 'Butter'],
  },
];

const Transactions = () => {
  const renderSectionHeader = ({section: {title}}) => (
    <View
      style={{
        // backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: 5,
        padding: 15,
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          backgroundColor: 'white',
          paddingVertical: 5,
          paddingHorizontal: 10,
          minWidth: 100,
          borderRadius: 5,
          shadowColor: 'black',
          shadowOpacity: 0.2,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 100,
          elevation: 3,
        }}>
        {title}
      </Text>
    </View>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{backgroundColor: 'white', flex: 1, padding: 5, width: '100%'}}>
      <View style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    // backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionHeaderText: {
    // color: '#fff',
    color: '#ff0000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
