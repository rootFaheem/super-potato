import React, { Component } from "react";

import axios from "axios";

export default class NotFound extends Component {
  state = {
    seenIndex: [],
    values: {},
    index: ""
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = axios.get("/api/values/current");
    this.setState({
      values: values.data
    });
  }

  async fetchIndexes() {
    const seenIndex = axios.get("/api/values/all");
    this.setState({
      seenIndex: seenIndex.data
    });
  }
  render() {
    return <div></div>;
  }
}
