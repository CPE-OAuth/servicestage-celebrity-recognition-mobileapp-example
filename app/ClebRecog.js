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
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  CameraRoll,
} from 'react-native';

import ViewPhotos from './ViewPhotos';


const { width } = Dimensions.get('window');

export default class ClebRecog extends Component {
  static navigationOptions = {
    title : 'Celebrity Recognition',
    headerStyle: {
      backgroundColor: '#00a0fe',
    },
    headerTintColor: 'white',
    headerTitleStyle: { 
      textAlign:"center", 
      flex:1,
      fontSize: 18,
      fontFamily:'verdana',
      fontStyle: 'italic',
      fontWeight: 'bold'
    },
  };

  state = {
    showPhotoGallery: false,
    photoArray: []
  }

  constructor(props) {
    super(props);
    state = {
      user   : '',
      password: ''
    }
    this.searchState = this.searchState.bind(this);
  }

  onClickListener = (viewId) => {
       this.props.navigation.navigate('Mbaas');
  }

  searchState(result) {
    this.setState({ showPhotoGallery: false})
      if(result== "details")
      {
        this.props.navigation.navigate('CelebInfo');
      }
  }

  getPhotosFromGallery() {
    CameraRoll.getPhotos({ first: 1000000 })
      .then(res => {
        let photoArray = res.edges;
		    this.setState({ showPhotoGallery: true, photoArray: photoArray })
      })
  }

  render() {
    if (this.state.showPhotoGallery) {
      return (
        <ViewPhotos
          photoArray={this.state.photoArray} redirect={this.searchState}/>
      )
    }

    return (
      <View style={styles.container}>
        <Image
          resizeMode='contain'
          style={styles.logo}
          source={require('./res/logo.png')}
        />
        <TouchableHighlight style={[styles.buttonContainer, styles.searchButton]} onPress={() => this.getPhotosFromGallery()}>
          <Text style={styles.searchText}>Select Photo</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('mbaas')}>
            <Text style={styles.mbaasText}>Update MBaaS Info</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width - 100,
    maxHeight: 100,
    marginBottom:20
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:30,
  },
  searchButton: {
    backgroundColor: "#841584",
  },
  searchText: {
    color: 'white',
    fontSize: 17,
    fontFamily:'tahoma',
    fontWeight: 'bold'
  },
  mbaasText: {
    fontSize: 15,
    fontFamily:'tahoma',
    fontWeight: 'bold'
  }
});