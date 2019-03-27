//celebrity API implementation
Parse.Cloud.define('celebrity', function(req, res) {

//get config 
Parse.Config.get().then(function(config) {
  const username = config.get("iam_userName");
  const password = config.get("iam_password");
  const domainname = config.get("iam_domainName");

//Get the valid token from the huawei public cloud
var reqToken = require('request');
var token;
var tokenBody = {
    "auth": {
        "identity": {
           
            "password": {
                "user": {
                    "name": username, 
                    "password": password, 
                    "domain": {
                        "name": domainname
                    }
                }
            },
             "methods": [
                "password"
            ]
        }, 
        "scope": {
            "project": {
                "name": "cn-north-1"
            }
        }
    }
};

var reqCeleb = require('request');
var bodyCeleb = {
 "image": req.params.path,
  "url": "",
  "threshold": ""
};

    reqToken({
        url: 'https://iam.cn-north-1.myhuaweicloud.com/v3/auth/tokens',
        method: "POST",
        "rejectUnauthorized": false,
        headers: {'Content-Type' : 'application/json'},
        json: true,
        body: tokenBody
    }, function (error, response, body){
        if (error) {
            res.error(error);
        } else {
            token =  response.headers['x-subject-token'];
            //call the face library
            reqCeleb({
                url: 'https://image.cn-north-1.myhuaweicloud.com/v1.0/image/celebrity-recognition',
                method: "POST",
                "rejectUnauthorized": false,
                headers: {'Content-Type' : 'application/json', 'X-Auth-Token': token},
                json: true,
                body: bodyCeleb
            }, function (error, response, body){
                if (error) {
                    res.error(error);
                } else {
                    if(body !== undefined && body.result !== undefined && body.result[0] !== undefined && body.result[0].label !== undefined)
                    {
                           var name = body.result[0].label;
                           var celebInfo = Parse.Object.extend("CelebInfo");
                           var query = new Parse.Query(celebInfo);
                           
                           query.find().then((results) => {
                               var celebDetails={};
                              // Parse the returned Parse.Object values
                               for (let i = 0; i < results.length; i++) {
                                   var object = results[i];
                                   if(object.get('name') == name)
                                   {
                                        celebDetails.objectId = object.id;
                                   }
                               } 
                               
                               if(celebDetails.objectId === undefined)
                               {
                                    celebDetails.name = name;
                               }  
                                res.success(celebDetails);
                             });    
                        }
                        else
                        {
                            res.success(null);
                        }
                }
            });
        }
    });
    
}, function(error) {
        res.error(error);
   });
});