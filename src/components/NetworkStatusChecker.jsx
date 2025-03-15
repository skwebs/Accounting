// import React, {} from 'react';
// import {
//   View,
//   Text,
//   Linking,
//   StyleSheet,
//   Pressable,
// } from 'react-native';
// import useNetworkStore from '../store/networkStore';

// const NetworkStatusChecker = () => {
//   const isConnected = useNetworkStore(state => state.isConnected);
//   return (
//     <>
//       {!isConnected && (
//         <View style={styles.container}>
//           <Text style={styles.text}>No Internet.</Text>
//           <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
//             <Pressable
//               style={styles.button}
//               onPress={() =>
//                 Linking.sendIntent('android.settings.WIFI_SETTINGS')
//               }>
//               <Text>Wifi Settings</Text>
//             </Pressable>
//             <Pressable
//               style={styles.button}
//               onPress={() =>
//                 Linking.sendIntent('android.settings.DATA_ROAMING_SETTINGS')
//               }>
//               <Text>Data Settings</Text>
//             </Pressable>
//           </View>
//         </View>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'gray',
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//   },
//   text: {
//     color: '#fff',
//   },
//   button: {
//     backgroundColor: 'white',
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
// });

// export default NetworkStatusChecker;
import React from 'react';
import {View, Text, Linking, StyleSheet, Pressable} from 'react-native';
import useNetworkStore from '../store/networkStore';

const NetworkStatusChecker = () => {
  const isConnected = useNetworkStore(state => state.isConnected);

  return (
    !isConnected && (
      <View style={styles.container}>
        <Text style={styles.messageText}>No Internet.</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.sendIntent('android.settings.WIFI_SETTINGS')
            }>
            <Text style={styles.buttonText}>Wifi Settings</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.sendIntent('android.settings.DATA_ROAMING_SETTINGS')
            }>
            <Text style={styles.buttonText}>Data Settings</Text>
          </Pressable>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  messageText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
  },
});

export default NetworkStatusChecker;
