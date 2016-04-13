import React, {
  Component,
  View
} from 'react-native';
import YouTube from 'react-native-youtube';

class YouTubePlayer extends Component {
  render() {
    return (
      <YouTube
        ref="youtubePlayer"
        videoId={this.props.youtubeID}
        play={false}
        hidden={false}
        playsInline={false}
        showinfo={false}

        onReady={(e)=>{this.setState({isReady: true})}}
        onChangeState={(e)=>{this.setState({status: e.state})}}
        onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
        onError={(e)=>{this.setState({error: e.error})}}
        onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}
        
        style={this.props.style}
      />
    );
  }
}

export default YouTubePlayer;
