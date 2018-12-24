import React, { Component } from "react";
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity
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

export default class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
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
    console.log("Press");
  }

  _onClearFilter = () => {
    console.log("Clear");
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
                  style={{ color: "#EC466A" }}
                />
              </Button>
            </Left>
            <Body style={{ flex: 1 }}>
              <Title style={{ color: "#EC466A" }}>Bộ lọc</Title>
            </Body>
            <Right style={{ flex: 1 }}>
              <Button 
                transparent 
                style={{alignItems: 'center'}}
                onPress={this._onClearFilter}
                >
                <Title style={{ color: "#EC466A" }}>Làm mới</Title>
              </Button>
            </Right>
          </Header>
          <View style={styles.mainviewStyle}>
            <ScrollView style = {styles.scrollViewStyle}>
              <View>

              </View>
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
