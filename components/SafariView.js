import { Linking } from 'react-native';
import SafariViewController from 'react-native-safari-view';

const SafariView = (url) => {
  SafariViewController.isAvailable()
    .then(SafariViewController.show({
      url: url
    }))
    .catch(e => {
      Linking.openURL(url);
    });
}

export default SafariView;
