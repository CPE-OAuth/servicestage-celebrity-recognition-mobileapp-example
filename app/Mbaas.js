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
  TextInput,
  TouchableHighlight,
  Alert
} from 'react-native';

import ParseUtil from './data/ParseUtil'
import ClebRecog from './ClebRecog';

export default class Mbaas extends Component {

  static navigationOptions = {
    title : 'MBAAS',
    header: null,
  };

  constructor(props) {
    super(props);
    state = {
      hostIP   : '',
      port: '',
    }
  }

  onClickListener = (viewId) => {
    if(viewId == "update")
    { 
    const { hostIP, port } = this.state;
    ParseUtil.hostIP = hostIP;
    ParseUtil.port = port;
    const { navigation: { navigate } } = this.props;
    Alert.alert(
        'Success',
        'Update Success.',
        [
            {text: 'OK', onPress: () => 
            {
            ClebRecog.navigationOptions.header = null;
            navigate('ClebRecog')
        }
        },
        ],
        { cancelable: false }
        )

    }
    else if(viewId == "cancel")
    {
    const { navigation: { navigate } } = this.props;
    Alert.alert(
        'MbaaS',
        'Are you sure to Cancel?',
        [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
        {
        
        ClebRecog.navigationOptions.header = null;
        navigate('ClebRecog')
        }
        },
        ],
        { cancelable: false }
        )
        }
  }

  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="HostIP"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(hostIP) => this.setState({hostIP})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Port"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(port) => this.setState({port})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.mbaasButton]} onPress={() => this.onClickListener('update')}>
            <Text style={styles.mbaasText}>Update MbaaS Instance</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.mbaasButton]} onPress={() => this.onClickListener('cancel')}>
            <Text style={styles.mbaasText}>Cancel</Text>
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
    backgroundColor: '#DCDCDC',
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
    width:210,
    borderRadius:30,
  },
  mbaasButton: {
    backgroundColor: "#841584",
  },
  mbaasText: {
    color: 'white',
    fontSize: 15,
    fontFamily:'tahoma',
    fontWeight: 'bold'
  },
});