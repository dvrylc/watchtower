import React, {
  Component,
  NavigatorIOS,
  StyleSheet
} from 'react-native';

import MoviesList from './MoviesList';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class MoviesTab extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Movies',
          component: MoviesList
        }}
      />
    );
  }
}

export default MoviesTab;
