import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  FooterTab,
  Footer,
  List,
} from "native-base";
import TagList from "../TagList";
import CustomHeader from "../CustomComponents/CustomHeader";
import AddPostModal from "../../components/CustomComponents/AddPostModal";

import "../CustomComponents/PostOptionModal";

import Modal from "react-native-modalbox";

import ActivityModal from "../CustomComponents/ActivityModal";

import PostItem from "../CustomComponents/PostItem";

import { postData } from "../../utils/fakeData";

export default class extends Component {
  
  _openModel = postData => {
    this.optionModal.open();
  };

  render() {
    return (
      <Container>
        <CustomHeader
          title="Pet Home"
          buttonLeft="menu"
          actionLeft={() => {
            this.props.navigation.openDrawer();
          }}
          buttonRight="ios-notifications-outline"
          badgeNumberRight="9"
          actionRight={() => {
            this.activityModal.open();
          }}
        />
        <ActivityModal
          ref={ref => {
            this.activityModal = ref;
          }}
        />
        <Modal
          ref={ref => {
            this.optionModal = ref;
          }}
          position={"bottom"}
          swipeToClose={true}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 300,
            backgroundColor: "red",
          }}
        >
          <Text>modal</Text>
        </Modal>
        <View>
          <TagList navigation={this.props.navigation} />
        </View>
        <Content>
          <View style={{ margin: 10 }}>
            <List
              showsVerticalScrollIndicator={false}
              dataArray={postData}
              renderRow={item => {
                return (
                  <PostItem postData={item} optionPress={this._openModel} />
                );
              }}
            />
          </View>
        </Content>
        <Footer style={{ backgroundColor: "#EC466A" }}>
          <FooterTab style={{ backgroundColor: "#EC466A" }}>
            <Button vertical>
              <Icon name="ios-search-outline" style={{ color: "#FFF" }} />
            </Button>
            <AddPostModal />
            <Button vertical>
              <Icon name="ios-bookmark-outline" style={{ color: "#FFF" }} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
