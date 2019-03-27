## Step 4:  Load Celebrity recognition Sample from Github

1.	Open the Command prompt and navigate to your development workspace. Then run `git clone http://rnd-gitlab-ca-g.huawei.com/PaaS/servicestage/services/celebrityreco.git`  

    If you are having issues cloning the project, you can instead visit the url and download the project as a zip.

2.	Change to `celebrityreco` directory using `cd {{path to}}/celebrityreco`

3.	Run `npm install` to install project dependency.  It may take some time to install all dependency.  Once completed, it shows a line similar to the below.  
![s3a.png](./imgs/s3a.png)  

4.	Run `npm install -g react-native-cli` to install react native client.
```
    Note: Install command might hang/fail if running behind proxy, Please run the below command and try `npm install -g react-native-cli` again.
    `npm config set registry http://registry.npmjs.org/`
``` 

5.  Change to `celebrityreco/android` folder.  Create a **local.properties** file.  In the file, it should contains the path to Android SDK.  For example,

```
    sdk.dir=C\:\\Users\\{{Your Username}}\\AppData\\Local\\Android\\Sdk
```

6.  Run `gradlew clean`.    
```
   Note: SSL exception might occur if running behind proxy when downloading https://services.gradle.org/distributions/gradle-4.6-all.zip file".	 
   To avoid this edit distributionUrl in "[project]/gradle/wrapper/gradle-wrapper.properties" file as follows to use http url.

      `distributionUrl=http\://services.gradle.org/distributions/gradle-4.6-all.zip`
```
      
7.  Run `cd..` to go back.    

8.  Run the following command to verify bundling is ok.   

```
   react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```


  
  
