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
import 'react-native';
import { AsyncStorage, Alert } from 'react-native'; 
import { Parse } from 'parse/react-native';

export default class ParseUtil {
    //TODO update the below host details(hostIP,port) with valid values before running the app
    static hostIP = '';
    //Configure port only when required.If hostIP contains the complete mbaas instance details, no need to configure port
    static port =  '';
    static timerHandle=null;
    static celebDetails={};

     static celebRecog(filebase64,callback,loadingcall) {
      init(); 
      const params =  { path: filebase64 };
      ParseUtil.timerHandle = setTimeout(() => { 
        loadingcall();  
        ParseUtil.timerHandle = null;
        Alert.alert(
          'Error',
          'Failed to query celebrity details. Request timed out.',
          [
              {text: 'OK', onPress: () => 
              {
                callback();
          }
          },
          ],
          { cancelable: false }
          )
      }, 60000);  
      Parse.Cloud.run("celebrity", params)
      .then((data) => {
        if(ParseUtil.timerHandle==null)
        {
          return;
        }
        loadingcall();
        clearTimeout(ParseUtil.timerHandle);
        ParseUtil.celebDetails ={};
        console.log("upload Complete "+data);
        if(data != undefined && data.objectId != undefined)
        {
            var celebInfo = Parse.Object.extend("CelebInfo");
            var query = new Parse.Query(celebInfo);
            query.get(data.objectId)
            .then((object) => {
              // The object was retrieved successfully.
              ParseUtil.celebDetails.name = object.get('name');
              ParseUtil.celebDetails.born = object.get('born');
              ParseUtil.celebDetails.education = object.get('education');
              ParseUtil.celebDetails.photo = object.get('photo').url();
              ParseUtil.celebDetails.nationality = object.get('nationality');
              ParseUtil.celebDetails.wiki = object.get('wiki');
              ParseUtil.celebDetails.position = object.get('position');
              ParseUtil.celebDetails.description = object.get('description');
              callback("details");
            }, (error) => {
              // The object was not retrieved successfully.
              // error is a Parse.Error with an error code and message.
              Alert.alert(
                'Error',
                'Failed to query celebrity details.',
                [
                    {text: 'OK', onPress: () => 
                    {
                      callback();
                }
                },
                ],
                { cancelable: false }
                )
            });

           
        } 
        else if(data != undefined && data.name != undefined){
        ParseUtil.celebDetails.name = data.name;
        ParseUtil.celebDetails.photo = filebase64;
        callback("details");
        }
        else if(data != undefined && data.error_msg !=undefined)
        {
          Alert.alert(
            'Error',
            data.error_msg,
            [
                {text: 'OK', onPress: () => 
                {
                  callback();
            }
            },
            ],
            { cancelable: false }
            )
        }
        else
        {
          Alert.alert(
            'Error',
            'No celebrity details found for the input image.Please input valid image.',
            [
                {text: 'OK', onPress: () => 
                {
                  callback();
            }
            },
            ],
            { cancelable: false }
            )
        }
      });
   }

}

const init = () =>
{
  Parse.setAsyncStorage(AsyncStorage);
  Parse.initialize("myAppId");
  
  if(ParseUtil.port == undefined || ParseUtil.port == "" )
  {
    console.log('http://'+ParseUtil.hostIP+'/mbaas');
    Parse.serverURL = 'http://'+ParseUtil.hostIP+'/mbaas';
  }
  else{
    console.log('http://'+ParseUtil.hostIP+':'+ParseUtil.port+'/mbaas');
    Parse.serverURL = 'http://'+ParseUtil.hostIP+':'+ParseUtil.port+'/mbaas';
  }
}