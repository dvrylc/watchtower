import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import moment from 'moment';

import MovieTrailers from './MovieTrailers';

import api from '../utils/api';
import colors from '../utils/colors';

const nextIcon = require('../images/next.png');

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
    marginTop: 10,
    marginLeft: 10
  },
  sectionContainer: {
    paddingVertical: 10,
    paddingRight: 10,
    borderColor: colors.border,
    borderBottomWidth: 0.5
  },
  sectionFlex: {
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
  },
  linkLabel: {
    flex: 1,
    fontSize: 18
  },
  linkArrow: {
    width: 18,
    height: 18
  }
});

class MovieDetails extends Component {
  // Constructor
  constructor(props) {
    super(props);
    
    // Bind `this` to functions
    this.navigateToMovieTrailers = this.navigateToMovieTrailers.bind(this);
    
    this.state = {
      movieDetails: {},
      loaded: false
    }
  }
  
  // Lifecycle
  componentDidMount() {
    this.fetchData(this.props.movie.id);
  }
  
  // Functions
  fetchData(movieID) {
    api.loadMovieDetails(movieID)
      .then(response => {
        this.setState({
          movieDetails: response,
          loaded: true
        });
      })
      .done();
  }
  
  navigateToMovieTrailers(movieID) {
    this.props.navigator.push({
      component: MovieTrailers,
      passProps: {
        movieID: movieID
      }
    })
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
    const movieDetails = this.state.movieDetails;
    const movieGenres = movieDetails.genres.map(g => g.name);
    
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
            <View style={styles.sectionFlex}>
              <View style={styles.sectionLabels}>
                <Text style={styles.sectionLabel}>Released</Text>
                <Text style={styles.sectionLabel}>Rating</Text>
                <Text style={styles.sectionLabel}>Run Time</Text>
                <Text style={styles.sectionLabel}>Genres</Text>
              </View>
              
              <View style={styles.sectionContent}>
                <Text style={styles.description}>
                  {moment(movie.release_date).format('D MMM Y')}
                </Text>
                
                <Text style={styles.description}>
                  {parseFloat(movie.vote_average).toFixed(1)} / 10.0 ({movie.vote_count} votes)
                </Text>
                
                <Text style={styles.description}>
                  {movieDetails.runtime} minutes
                </Text>
                
                <Text style={styles.description}>
                  {movieGenres.join(', ')}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Overview */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionFlex}>
              <View style={styles.sectionLabels}>
                <Text style={styles.sectionLabel}>Overview</Text>
              </View>
              
              <View style={styles.sectionContent}>
                <Text style={styles.description}>
                  {movieDetails.overview}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Links */}
          <View style={styles.sectionContainer}>
            <TouchableOpacity onPress={() => this.navigateToMovieTrailers(movie.id)}>
              <View style={styles.sectionFlex}>
                <Text style={styles.linkLabel}>Trailers</Text>
                <Image
                  style={styles.linkArrow}
                  source={nextIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default MovieDetails;
