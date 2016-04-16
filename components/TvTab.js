import React, {
  Component,
  NavigatorIOS,
  StyleSheet
} from 'react-native';

import TvList from './TvList';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class TvTab extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'TV Shows',
          component: TvList
        }}
      />
    );
  }
}

export default TvTab;
