import React, {
  Component,
  Image,
  ListView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import TvDetails from './TvDetails';

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

class TvList extends Component {
  // Constructor
  constructor(props) {
    super(props);
    
    // Bind `this` to functions
    this.handleRefresh = this.handleRefresh.bind(this);
    this.navigateToTvDetails = this.navigateToTvDetails.bind(this);
    this.renderRow = this.renderRow.bind(this);
    
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      loaded: false,
      refreshing: false
    }
  }
  
  // Lifecycle
  componentDidMount() {
    this.fetchData();
  }
  
  // Functions
  fetchData() {
    api.loadTv()
      .then(response => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response.results),
          loaded: true,
          refreshing: false
        });
      })
      .done();
  }
  
  handleRefresh() {
    this.setState({
      refreshing: true
    });
    
    this.fetchData();
  }
  
  navigateToTvDetails(tv) {
    this.props.navigator.push({
      component: TvDetails,
      title: 'Details',
      passProps: {
        tv: tv
      }
    });
  }
  
  renderLoadingView() {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading TV shows...</Text>
      </View>
    );
  }
  
  renderRow(row) {
    return (
      <TouchableOpacity onPress={() => this.navigateToTvDetails(row)}>
        <View style={styles.row}>
          <Image
            style={styles.poster}
            resizeMode='contain'
            source={{uri: api.getPoster(row.poster_path, 'w154')}}
          />
          
          <View style={styles.body}>
            <Text style={styles.title}>{row.original_name}</Text>
            
            <Text style={styles.description}>
              Rated {parseFloat(row.vote_average).toFixed(1)} / 10.0 ({row.vote_count} votes)
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
    // Check if TV shows have loaded
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        contentInset={{bottom: 49}}
        
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        }
      />
    );
  }
}

export default TvList;
