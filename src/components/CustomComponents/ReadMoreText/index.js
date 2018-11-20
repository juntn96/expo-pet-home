import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const asyncMeasure = component => {
  return new Promise(resolve => {
    component.measure((x, y, w, h) => {
      resolve(h);
    });
  });
};

const asyncNextFrame = () => {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
};

class ReadMoreText extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      measure: false,
      showAllText: false,
      showReadMore: false,
    };
  }

  async componentDidMount() {
    await asyncNextFrame();
    this.maxHeight = await asyncMeasure(this.textView);
    this.setState({ measure: true });
    await asyncNextFrame();
    this.minHeight = await asyncMeasure(this.textView);
    if (this.maxHeight > this.minHeight) {
      this.setState({ showReadMore: true });
    }
  }

  _showText = () => {
    const { showAllText } = this.state;
    this.setState({
      showAllText: !showAllText,
    });
  };

  render() {
    const { measure, showAllText, showReadMore } = this.state;
    const { numberOfLines } = this.props;
    const line = measure && !showAllText ? numberOfLines : 0;
    return (
      <TouchableOpacity
        disabled={!showAllText}
        activeOpacity={1}
        ref={ref => (this.textView = ref)}
        onPress={this._showText}
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Text numberOfLines={line}>
          {this.props.children}
        </Text>
        {showReadMore && !showAllText ? (
          <TouchableOpacity onPress={this._showText}>
            <Text style={{ color: "#2196F3" }}>Xem thêm</Text>
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    );
  }
}

export default ReadMoreText;
