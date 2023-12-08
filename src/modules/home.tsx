import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'

import icon_add from '../assets/icon_add.png'
import Account from './account'
import { useRef } from 'react'

const Title = () => {
  return (
    <View style={styles.titleView}>
      <Text style={styles.titleText}>Account Management</Text>
    </View>
  )
}

export default () => {
  const addAccountRef = useRef<any>(null);

  return (
    <View style={styles.root}>
      <Title />

      <TouchableOpacity style={styles.button} onPress={() => {
        addAccountRef.current.show()
      }}>
        <Image style={styles.addButton} source={icon_add} />
      </TouchableOpacity>

      <Account ref={addAccountRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%'
  },
  titleView: {
    height: 80,
    width: '100%',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 15,
    position: 'absolute',
    bottom: 30,
    right: 20
  },
  addButton: {
    resizeMode: 'contain',
  }
})