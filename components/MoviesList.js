import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import api from '../utils/api';
import colors from '../utils/colors';
import truncate from '../utils/truncate';

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
    marginLeft: 10,
    paddingVertical: 10,
    paddingRight: 10,
    borderBottomColor: colors.border,
    borderBottomWidth: 0.5,
    
    flex: 1,
    flexDirection: 'row'
  },
  posterContainer: {
    flex: 0
  },
  poster: {
    width: 70,
    height: 105,
    marginRight: 10
  },
  body: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: '500'
  },
  description: {
    fontSize: 14,
    color: colors.lightFont
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
        <View style={styles.posterContainer}>
          <Image
            style={styles.poster}
            resizeMode='contain'
            source={{uri: api.getPoster(row.poster_path, 'w154')}}
          />
        </View>
        
        <View style={styles.body}>
          <Text style={styles.title}>{row.title}</Text>
          
          <Text style={styles.description}>
            Released in {row.release_date.slice(0,4)}
            {'\n'}
            {truncate(row.overview, 100)}
          </Text>
        </View>
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
