import React, { Component } from "react";
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";
import {
  Header,
  Icon,
  Button,
  Text,
  Left,
  Body,
  Right,
  Title,
} from "native-base";
const { width, height } = Dimensions.get('window');

export default class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      selectedStarId: '',
      selectedStar: ''
    };
  }

  setVisibleModal = visible => {
    this.setState({
      visibleModal: visible,
    });
  };

  _onPress = visible => {
    this.setState({
      visibleModal: visible,
    });
    this.props.onPressFilter(this.state);
  }

  _onClearFilter = () => {
    this.setState({ 
      selectedStarId: '',
      selectedStar: '' 
    });
  }

  _onPressStar = item => {
    if(this.state.selectedStarId === item.id) {
      this.setState({ 
        selectedStarId: '',
        selectedStar: '' 
      });
      console.log(this.state)
    } else {
      this.setState({ 
        selectedStarId: item.id,
        selectedStar: item.rating
      });
    } 
  };

  _renderStar = ({item}) => {
    const { selectedStarId } = this.state;
    return (
      <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this._onPressStar(item);
          }}
          style={[
            styles.item,
            {
              borderColor:
              selectedStarId === item.id ? "#FF8EBC" : "#615c70",
              backgroundColor:
              selectedStarId === item.id ? "#FF8EBC" : "#FFFFFF",
            },
          ]}
        >
        <View style={{ 
          flex: 1, 
          flexDirection: 'row',
          marginTop: 3,
          marginLeft: 5,
          width: width / 3 - 40,
          alignSelf: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}> 
          <Text style={{
            marginRight: 10,
            marginTop: 6,
            color: selectedStarId === item.id ? "#FFFFFF" : "#615c70",
          }}>{item.rating}</Text>
          <Icon
            name="star"
            style={{ color: selectedStarId === item.id ? "#FFFFFF" : "#FFD845" }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Modal
        visible={this.state.visibleModal}
        transparent={false}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            marginTop: 10,
          }}
        >
          <Header transparent>
            <Left style={{ flex: 1 }}>
              <Button
                transparent
                iconRight
                onPress={() => this.setVisibleModal(false)}
                style={{marginLeft: 5}}
              >
                <Icon
                  name="close"
                  style={{ color: "#615c70" }}
                />
              </Button>
            </Left>
            <Body style={{ flex: 1 }}>
              <Title style={{ color: "#615c70" }}>Bộ lọc</Title>
            </Body>
            <Right style={{ flex: 1 }}>
              <Button 
                transparent 
                style={{alignItems: 'center'}}
                onPress={this._onClearFilter}
                >
                <Title style={{ color: "#615c70" }}>Làm mới</Title>
              </Button>
            </Right>
          </Header>
          <View style={styles.mainviewStyle}>
            <ScrollView style = {styles.scrollViewStyle}>
              <FlatList
                data={[{id: 0, rating: 3},{id: 1, rating: 4},{id: 2, rating: 5}]}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={this._renderStar}
                horizontal
                style={{ marginBottom: 60, marginTop: 10, alignContent: 'space-around', alignSelf: 'center'}}
              />
              <Text>Địa điểm công cộng, công viên</Text>
              
              <Text>Cửa hàng dịch vụ thú cưng</Text>
            </ScrollView>
            <View style={styles.footer}>
              <TouchableOpacity 
                style={styles.bottomButtons}
                onPress={() => this._onPress(false)}
                >
                <Text style={styles.footerText}>Xem kết quả</Text>
              </TouchableOpacity>
            </View>
          </View>        
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  mainviewStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  item: {
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    marginRight:10
  },
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor:'#FF8EBC',
    flexDirection:'row',
    height:60,
    alignItems:'center',
    borderRadius: 5,
    shadowColor: "#CACACA",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  bottomButtons: {
    alignItems:'center',
    justifyContent: 'center',
    flex:1,
  },
  footerText: {
    color:'white',
    fontWeight:'bold',
    alignItems:'center',
    justifyContent: 'center',
    fontSize:18,
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'orange'
  },
  scrollViewStyle: {

  }
});
