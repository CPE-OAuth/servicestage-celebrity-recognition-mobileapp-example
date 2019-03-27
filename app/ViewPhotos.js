/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { Component } from 'react';
import {
  Image,
  View,
  ListView,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  } from 'react-native';

import ParseUtil from './data/ParseUtil'
import RNFS from 'react-native-fs';
import Loader from './Loader';

class ViewPhotos extends Component {
  state = {
    ds: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }),
    uri: '',
    loading: false,
  }

  constructor(props) {
    super(props);
    
    this.waitingState = this.waitingState.bind(this);
  }

  renderRow(rowData) {
    const { uri } = rowData.node.image;
    return (
      <TouchableHighlight
        onPress={() => this.uploadImage(uri)}>
        <Image
          source={{ uri: rowData.node.image.uri }}
          style={styles.image} />
      </TouchableHighlight>
    )
  }

  waitingState() {
    this.setState({ loading: false})
  }

  uploadImage(uri)
  {
    RNFS.readFile(uri, 'base64')
    .then(res =>{
        ParseUtil.celebRecog(res,this.props.redirect,this.waitingState);
      
    });
    this.setState({ loading: true})
  }
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
      <Loader
          loading={this.state.loading} />
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>Pick A Photo </Text>
        </View>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.ds.cloneWithRows(this.props.photoArray)}
          renderRow={(rowData) => this.renderRow(rowData)}
          enableEmptySections={true} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  image: {
    width: 110,
    height: 120,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#979797'
  }
})

export default ViewPhotos;