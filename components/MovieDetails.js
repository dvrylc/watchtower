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

import Trailers from './Trailers';
import SafariView from './SafariView';

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
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  sectionFlex: {
    flexDirection: 'row'
  },
  sectionLabels: {
    flex: 1,
    paddingRight: 10
  },
  sectionContent: {
    flex: 3
  },
  title: {
    fontSize: 16,
    fontWeight: '500'
  },
  sectionLabel: {
    textAlign: 'right'
  },
  description: {
    color: colors.lightFont
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  linkLabel: {
    flex: 1,
    fontSize: 16
  },
  linkArrow: {
    width: 16,
    height: 16
  }
});

class MovieDetails extends Component {
  // Constructor
  constructor(props) {
    super(props);
    
    // Bind `this` to functions
    this.navigateToTrailers = this.navigateToTrailers.bind(this);
    
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
  
  navigateToTrailers(id) {
    this.props.navigator.push({
      component: Trailers,
      title: 'Trailers',
      passProps: {
        type: 'movie',
        id: id
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
  
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <View style={styles.sectionContainer} key={index}>
          <TouchableOpacity onPress={() => SafariView(link.url)}>
            <View style={styles.linkContainer}>
              <Text style={styles.linkLabel}>{link.label}</Text>
              <Image
                style={styles.linkArrow}
                source={nextIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    });
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
      <ScrollView
        style={styles.container}
        contentInset={{bottom: 49}}>
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
                <Text style={styles.sectionLabel}>Run time</Text>
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
          
          {/* Trailers */}
          <View style={styles.sectionContainer}>
            <TouchableOpacity onPress={() => this.navigateToTrailers(movie.id)}>
              <View style={styles.linkContainer}>
                <Text style={styles.linkLabel}>Trailers</Text>
                <Image
                  style={styles.linkArrow}
                  source={nextIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Links */}
          {this.renderLinks([
            {
              url: movieDetails.homepage,
              label: "Official website"
            },
            {
              url: `http://www.imdb.com/title/${movieDetails.imdb_id}`,
              label: "View on IMDb"
            }
          ])}
        </View>
      </ScrollView>
    );
  }
}

export default MovieDetails;
