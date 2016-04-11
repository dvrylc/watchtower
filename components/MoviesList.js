import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import api from '../utils/api';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    marginTop: 44
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    marginLeft: 20,
    paddingVertical: 15,
    borderBottomColor: colors.border,
    borderBottomWidth: 0.5
  }
});

class MoviesList extends Component {
  // Constructor
  constructor(props) {
    super(props);
    
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      loaded: false
    }
  }
  
  // Lifecycle
  componentDidMount() {
    this.fetchData();
  }
  
  // Functions
  fetchData() {
    api.loadMovies()
      .then(response => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response.results),
          loaded: true
        });
      })
      .done();
  }
  
  renderLoadingView() {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading Movies...</Text>
      </View>
    );
  }
  
  renderRow(row) {
    return (
      <View style={styles.row}>
        <Text>{row.original_title}</Text>
      </View>
    );
  }
  
  // Render
  render() {
    // Check if movies have loaded
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        contentInset={{bottom: 49}}
      />
    );
  }
}

export default MoviesList;
