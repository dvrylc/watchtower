import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class AboutTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>About</Text>
      </View>
    );
  }
}

export default AboutTab;
