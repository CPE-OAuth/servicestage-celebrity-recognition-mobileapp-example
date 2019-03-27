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
  StyleSheet,
  Text,
  ScrollView,
  Linking
} from 'react-native';

import ParseUtil from './data/ParseUtil'

class CelebInfo extends Component {
  static navigationOptions = {
    title : 'Celebrity Details',
    headerStyle: {
      backgroundColor: '#00a0fe',
    },
    headerTintColor: 'white',
    headerTitleStyle: { 
      flex:1,
      fontSize: 18,
      fontFamily:'verdana',
      fontStyle: 'italic',
      fontWeight: 'bold'
    },
  };
  

  state = {
    celebdetails: ParseUtil.celebDetails,
    data:'data:image/png;base64,'+ParseUtil.celebDetails.photo
  }

  render() {
    if (this.state.celebdetails.description == undefined) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>{this.state.celebdetails.name}</Text>
          </View>
          <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
          <Image
            source={{ uri: this.state.data }}
            style={styles.image}
             />
          </View>
          </View>
          );
    
  }
  else
  {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>{this.state.celebdetails.name}</Text>
        </View>
        <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
        <Image
          source={{ uri: this.state.celebdetails.photo }}
          style={styles.image}
           />
        </View>
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5,fontWeight: 'bold' }}>{this.state.celebdetails.position}</Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Text style={styles.textStyle}> {this.state.celebdetails.born}</Text>
          
        </View>
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Text style={styles.textStyle}> {this.state.celebdetails.nationality}</Text> 
        </View>
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Text style={{ color: 'black', marginLeft: 10, marginRight: 10 }}>{this.state.celebdetails.description}</Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Text style={{ color: 'blue', marginLeft: 5, marginRight: 5,fontStyle:'italic', fontWeight: 'bold',textDecorationLine: 'underline' }} onPress={() => Linking.openURL(this.state.celebdetails.wiki)} >{this.state.celebdetails.wiki}</Text>
        </View>
      </ScrollView>
    );
  }
  }
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 120,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#979797',
  },
  textStyle:{
    color: 'black',
    fontWeight: 'normal'
  }
})

export default CelebInfo;