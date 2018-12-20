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
    renderContents: false,
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentDidUpdate() {

  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        {/* {this.state.renderContents ? ( */}
          <FlatList
            ref={view => {
              this._scrollView = view;
            }}
            contentContainerStyle={this.props.contentContainerStyle}
            renderItem={this._renderItem}
            style={styles.container}
            data={data}
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
    console.log(item)
    return (
      <LocationListItem
        onPress={() => this._handlePressLocation(item)}
        data={item}
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
    marginTop: 10,
    backgroundColor: '#FBFBFB',
  },
});