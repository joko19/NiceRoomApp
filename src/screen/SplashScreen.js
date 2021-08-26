import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import NiceRoom from './../image/niceroom.png';

export default function SplashScreen({ navigation }) {
  return (
    <>
      <View style={styles.load}>
        <View style={styles.container}>
          <Image source={NiceRoom} style={styles.logo} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  load: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  logo: {
    width: '100%',
    // height: 200,
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
