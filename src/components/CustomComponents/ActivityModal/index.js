import React, { Component } from "react";
import { View, Text, Modal } from "react-native";
import { Tabs, Tab } from 'native-base'
import CustomHeader from '../CustomHeader'
import NotificationList from '../NotificationList'
import MessageList from '../MessageList'

class ActivityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  open = () => {
    this.setState({
      modalVisible: true
    })
  }

  close = () => {
    this.setState({
      modalVisible: false
    })
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View>
        <Modal
          
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {}}
        >
          <CustomHeader
            title="Hoạt động"
            buttonLeft="md-close"
            actionLeft={() => {
              this.close()
            }}
          />
          <Tabs>
            <Tab
              heading="Thông báo"
            >
              <NotificationList/>
            </Tab>

            <Tab
              heading="Tin nhắn"
            >
              <MessageList/>
            </Tab>
          </Tabs>
        </Modal>
      </View>
    );
  }
}

export default ActivityModal;
