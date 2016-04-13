import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import MovieDetails from './MovieDetails';

import api from '../utils/api';
import colors from '../utils/colors';
import truncate from '../utils/truncate';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    marginTop: 44
  },
  row: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingRight: 10,
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    
    flex: 1,
    flexDirection: 'row'
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
    fontSize: 18,
    fontWeight: '500'
  },
  description: {
    color: colors.lightFont
  }
});

class MoviesList extends Component {
  // Constructor
  constructor(props) {
    super(props);
    
    // Bind `this` to functions
    this.renderRow = this.renderRow.bind(this);
    this.navigateToMovieDetails = this.navigateToMovieDetails.bind(this);
    
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
  
  navigateToMovieDetails(movie) {
    this.props.navigator.push({
      component: MovieDetails,
      title: 'Details',
      passProps: {
        movie: movie
      }
    });
  }
  
  renderLoadingView() {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading movies...</Text>
      </View>
    );
  }
  
  renderRow(row) {
    return (
      <TouchableOpacity onPress={() => this.navigateToMovieDetails(row)}>
        <View style={styles.row}>
          <Image
            style={styles.poster}
            resizeMode='contain'
            source={{uri: api.getPoster(row.poster_path, 'w154')}}
          />
          
          <View style={styles.body}>
            <Text style={styles.title}>{row.title}</Text>
            
            <Text style={styles.description}>
              Released in {row.release_date.slice(0,4)}
              {'\n'}
              {truncate(row.overview, 100)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
