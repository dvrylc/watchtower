import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';

import api from '../utils/api';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    marginTop: 44
  },
  heroImage: {
    flex: 1,
    height: 150
  },
  body: {
    margin: 10
  },
  sectionContainer: {
    paddingVertical: 10,
    borderColor: colors.border,
    borderBottomWidth: 0.5,
    
    flex: 1,
    flexDirection: 'row'
  },
  sectionLabels: {
    flex: 1,
    paddingRight: 20
  },
  sectionContent: {
    flex: 3
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  sectionLabel: {
    textAlign: 'right'
  },
  description: {
    color: colors.lightFont
  }
});

class MovieDetail extends Component {
  // Constructor
  constructor(props) {
    super(props);
    
    this.state = {
      movieDetail: {},
      loaded: false
    }
  }
  
  // Lifecycle
  componentDidMount() {
    this.fetchData(this.props.movie.id);
  }
  
  // Functions
  fetchData(movieID) {
    api.loadMovieDetail(movieID)
      .then(response => {
        this.setState({
          movieDetail: response,
          loaded: true
        });
      })
      .done();
  }
  
  renderLoadingView() {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading details...</Text>
      </View>
    );
  }
  
  // Render
  render() {
    // Check if movie's details have loaded
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    
    const movie = this.props.movie;
    const movieDetail = this.state.movieDetail;
    const movieGenres = movieDetail.genres.map(g => g.name);
    
    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.heroImage}
          source={{uri: api.getPoster(movie.backdrop_path, 'w1280')}}
        />
        
        <View style={styles.body}>
          <Text style={styles.title}>{movie.title}</Text>
          
          {/* Metadata */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionLabels}>
              <Text style={styles.sectionLabel}>Released</Text>
              <Text style={styles.sectionLabel}>Rating</Text>
              <Text style={styles.sectionLabel}>Run Time</Text>
              <Text style={styles.sectionLabel}>Genres</Text>
            </View>
            
            <View style={styles.sectionContent}>
              <Text style={styles.description}>
                {moment(movie.release_date).format('LL')}
              </Text>
              
              <Text style={styles.description}>
                {parseFloat(movie.vote_average).toFixed(1)} / 10.0 ({movie.vote_count} votes)
              </Text>
              
              <Text style={styles.description}>
                {movieDetail.runtime} minutes
              </Text>
              
              <Text style={styles.description}>
                {movieGenres.join(', ')}
              </Text>
            </View>
          </View>
          
          {/* Overview */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionLabels}>
              <Text style={styles.sectionLabel}>Overview</Text>
            </View>
            
            <View style={styles.sectionContent}>
              <Text style={styles.description}>
                {movieDetail.overview}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default MovieDetail;
