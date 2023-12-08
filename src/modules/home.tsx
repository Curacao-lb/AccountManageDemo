import {
  StyleSheet,
  Text,
  View
} from 'react-native'

const Title = () => {
  return (
    <View style={styles.titleView}>
      <Text style={styles.titleText}>Account Management</Text>
    </View>
  )
}

export default () => {
  return (
    <View style={styles.root}>
      <Title />
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
  }
})