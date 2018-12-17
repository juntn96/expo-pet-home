import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@expo/vector-icons';

import Layout from '../../../../constants/layout';
import { RegularText, BoldText } from '../StyledText';

export default class LocationListItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.brewery !== this.props.brewery;
  }

  render() {
    let { smallLogo, name } = this.props.brewery;

    return (
      <TouchableNativeFeedback
        delayPressIn={80}
        onPress={this.props.onPress}
        delayPressIn={80}
        style={styles.container}
        fallback={TouchableHighlight}
        underlayColor="#ccc">
        <View style={styles.logoContainer}>
          <FadeIn
            placeholderStyle={{
              backgroundColor:
                Platform.OS === 'android' ? 'transparent' : '#eee',
            }}>
            <Image
              resizeMode="contain"
              source={{ uri: 'http://storage.growlerfill.ca/2/conversions/medium.png' }}
              style={styles.logo}
            />
          </FadeIn>
        </View>

        <View style={styles.infoContainer}>
          <RegularText style={styles.name}>{"name"}</RegularText>

          <RegularText style={styles.address}>
            {this._renderAddressText()}
          </RegularText>
          <RegularText style={styles.hours}>
            {this._renderStar()}
          </RegularText>
        </View>

        <View style={styles.buttonContainer}>
          <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
        </View>
      </TouchableNativeFeedback>
    );
  }

  _renderStar() {
    return "star"
  }

  _renderAddressText() {    
    return "addressText";
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
    width: Layout.window.width,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 16,
  },
  hours: {
    fontSize: 12,
  },
  address: {
    fontSize: 12,
  },
  logoContainer: {
    padding: 15,
  },
  logo: {
    width: 60,
    height: 60,
  },
  buttonContainer: {
    paddingRight: 5,
  },
});
