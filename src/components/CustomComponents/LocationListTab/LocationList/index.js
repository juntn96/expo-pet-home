import React from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import LocationListItem from '../LocationListItem'

export default class LocationList extends React.Component {
  state = {
    // renderContents: false,
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentDidUpdate() {

  }

  shouldComponentUpdate(nextProps, nextState) {

  }

  scrollTo(opts) {
    this._scrollView._component.scrollTo(opts);
  }

  render() {
    return (
      <View onLayout={this.props.onLayout} style={styles.container}>
        {/* {this.state.renderContents ? ( */}
          <FlatList
            ref={view => {
              this._scrollView = view;
            }}
            contentContainerStyle={this.props.contentContainerStyle}
            renderItem={this._renderItem}
            style={styles.container}
            data={[0, 1, 2, 3, 4, 5, 6]}
            keyExtractor={(item, index) => index.toString()}
          />
        {/* ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 75,
            }}>
            <ActivityIndicator />
          </View>
        )} */}
      </View>
    );
  }

  _renderItem = ({ item }) => {
    return (
      <LocationListItem
        onPress={() => this._handlePressLocation(item)}
        brewery={item}
      />
    );
  }

  _handlePressLocation = item => {
    this.props.navigation.navigate('LocationDetail');
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
});