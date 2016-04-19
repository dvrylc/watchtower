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
    flex: 2
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

class TvDetails extends Component {
  // Constructor
  constructor(props) {
    super(props);
    
    // Bind `this` to functions
    // this.navigateToMovieTrailers = this.navigateToMovieTrailers.bind(this);
    
    this.state = {
      tvDetails: {},
      loaded: false
    }
  }
  
  // Lifecycle
  componentDidMount() {
    this.fetchData(this.props.tv.id);
  }
  
  // Functions
  fetchData(tvID) {
    api.loadTvDetails(tvID)
      .then(response => {
        this.setState({
          tvDetails: response,
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
        type: 'tv',
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
    // Check if TV show's details have loaded
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    
    const tv = this.props.tv;
    const tvDetails = this.state.tvDetails;
    const tvGenres = tvDetails.genres.map(g => g.name);
    
    return (
      <ScrollView
        style={styles.container}
        contentInset={{bottom: 49}}>
        <Image
          style={styles.heroImage}
          source={{uri: api.getPoster(tv.backdrop_path, 'w1280')}}
        />
        
        <View style={styles.body}>
          <Text style={styles.title}>{tv.original_name}</Text>
          
          {/* Metadata */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionFlex}>
              <View style={styles.sectionLabels}>
                <Text style={styles.sectionLabel}>Rating</Text>
                <Text style={styles.sectionLabel}>Status</Text>
                <Text style={styles.sectionLabel}>First aired</Text>
                <Text style={styles.sectionLabel}>Last aired</Text>
                <Text style={styles.sectionLabel}>Run time</Text>
                <Text style={styles.sectionLabel}>Genre</Text>
              </View>
              
              <View style={styles.sectionContent}>
                <Text style={styles.description}>
                  {parseFloat(tv.vote_average).toFixed(1)} / 10.0 ({tv.vote_count} votes)
                </Text>
                
                <Text style={styles.description}>
                  {tvDetails.status}
                </Text>
                
                <Text style={styles.description}>
                  {moment(tv.first_air_date).format('D MMM Y')}
                </Text>
                
                <Text style={styles.description}>
                  {moment(tv.last_air_date).format('D MMM Y')}
                </Text>
                
                <Text style={styles.description}>
                  About {tvDetails.episode_run_time[0]} minutes
                </Text>
                
                <Text style={styles.description}>
                  {tvGenres.join(', ')}
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
                  {tvDetails.overview}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Trailers */}
          <View style={styles.sectionContainer}>
            <TouchableOpacity onPress={() => this.navigateToTrailers(tv.id)}>
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
              url: tvDetails.homepage,
              label: "Official website"
            }
          ])}
        </View>
      </ScrollView>
    );
  }
}

export default TvDetails;
