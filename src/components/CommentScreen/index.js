import React, { Component } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { Container, Content, Thumbnail, Text, Icon, Button, Footer } from "native-base";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 20,
                flex: 1,
                paddingRight: 20,
              }}
            >
              <Icon name="ios-arrow-back-outline" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Thumbnail
              source={require("../../assets/images/bg3.png")}
              circular
            />
            <View
              style={{
                justifyContent: "center",
                marginLeft: 10,
              }}
            >
              <Text style={{ fontWeight: "500" }}>Lam Ngoc Khanh</Text>
              <Text note style={{ fontSize: 12, alignSelf: "flex-start" }}>
                April 15, 2018
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 20,
                flex: 1,
                paddingLeft: 20,
              }}
            >
              <Icon name="md-more" />
            </TouchableOpacity>
          </View>
        </View>
        <Content>
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry
            </Text>
          </View>
          <Image
            source={require("../../assets/images/bg2.png")}
            style={{ height: 220, width: "100%" }}
          />
          {commentItem("Td Chien", "Xinh quaaaaaaaa")}
          {commentItem(
            "Trung HP",
            "Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16 เมื่อเครื่องพิมพ์โนเนมเครื่องหนึ่งนำรางตัวพิมพ์มาสลับสับตำแหน่งตัวอักษรเพื่อทำหนังสือตัวอย่าง Lorem Ipsum อยู่ยงคงกระพันมาไม่ใช่แค่เพียงห้าศตวรรษ แต่อยู่มาจนถึงยุคที่พลิกโฉมเข้าสู่งานเรียงพิมพ์ด้วยวิธีทางอิเล็กทรอนิกส์ และยังคงสภาพเดิมไว้อย่างไม่มีการเปลี่ยนแปลง มันได้รับความนิยมมากขึ้นในยุค ค.ศ."
          )}
          {commentItem(
            "Thang Nv",
            "Lorem Ipsum，也称乱数假文或者哑元文本， 是印刷及排版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了一盒印刷字体从而造出一本字体样品书，Lorem Ipsum从西元15世纪起就被作为此领域的标准文本使用"
          )}
        </Content>
        <Footer
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10, 
            marginRight: 10,
            position: 'absolute',
            bottom: 0
          }}
        >
          <View
            style={{
              flex: 1,
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 10,
              marginRight: 10,
              backgroundColor: "#EEEEEE",
              height: 45,
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <TextInput placeholder="..." underlineColorAndroid="transparent" style={{borderBottomWidth: 0, flex: 1}} />
          </View>
          <TouchableOpacity>
            <Text>Send</Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

const commentItem = (name, comment) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          marginRight: 10,
          overflow: "hidden",
        }}
      >
        <Thumbnail
          square
          style={{ borderRadius: 5 }}
          small
          source={require("../../assets/images/bg3.png")}
        />
      </View>
      <View
        style={{
          backgroundColor: "#EEEEEE",
          borderRadius: 5,
          padding: 10,
          paddingTop: 4,
          flex: 1,
        }}
      >
        <Text>
          <Text style={{ fontWeight: "500", marginBottom: 8 }}>{name}</Text>
          <Text note style={{ fontSize: 12 }}>
            {`   `}16:00 pm
          </Text>
        </Text>
        <Text>{comment}</Text>
      </View>
    </View>
  );
};
