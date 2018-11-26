import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import SearchPostTab from "../../components/SearchPostTab";

class SearchPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <SearchPostTab/>
  }
}

export default SearchPost;
