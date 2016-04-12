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
  container: {
    margin: 10
  },
  heroImage: {
    flex: 1,
    height: 150
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  description: {
    fontSize: 14,
    color: colors.lightFont
  }
});

class MovieDetail extends Component {
  render() {
    const movie = this.props.movie;
    
    return (
      <ScrollView>
        <Image
          style={styles.heroImage}
          source={{uri: api.getPoster(movie.backdrop_path, 'original')}}
        />
        
        <View style={styles.container}>
          <Text style={styles.title}>{movie.title}</Text>
          
          <Text style={styles.description}>
            Released {moment(movie.release_date).format('LL')}
          </Text>
          
          <Text style={styles.description}>
            Rated {parseFloat(movie.vote_average).toFixed(1)} / 10.0 ({movie.vote_count} votes)
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default MovieDetail;
