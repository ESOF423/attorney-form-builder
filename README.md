# Attorney Form Builder
[![Build Status](https://travis-ci.org/ESOF423/attorney-form-builder.svg?branch=master)](https://travis-ci.org/ESOF423/attorney-form-builder)

# Description
This application serves to take data from a webform and convert it to a legal document using LaTex. This service can be offered by an attorney, to enable their clients to create legally valid wills and other legal forms with a highly automated, computerized process. This saves both the attorney and their customers time. Our instance of this application can be found at [here](http://server.redstonelab.net:8080). 

# Installation
Install [nodejs](https://nodejs.org/en/) and ensure it is installed correctly:
```
$ node -v
```

Install [yarn](https://yarnpkg.com/en/docs/install) and ensure it is installed
```
$ yarn -v
```

Install node dependencies
```
$ yarn && yarn install --production=false
```

Run tests
```
$ yarn test
```

#Testing Framework and Execution
Installation
```
The Mocha and Chai J unit assertion libraries were utilizied to get additional coverage during the testing for this project. To install Mocha, create a directory titled 'converter'. Then use the command '$ npm init' to create a package.json folder for the project (this makes it more streamlined for all the components to interact with eachother). Answer the setup questions with the appropriate information. Create a directory titled 'app' to store Node.js and a directory titled 'test' to store the test files. Next install the testing framework with the commands '$ npm install mocha --save' and '$ npm install chai --save'. This saves the dependencies in the package.jsonfile. To install the HTTP request capabilites, type the command '$ npm install request --save'. Lastly execute the command '$ npm install express --save' to define the domain specific language.
```
Testing
```
$ To execute all current tests, use the command '$npm run test' and to execute a specific test file (for example) called appTest.js use the command '$npm run test/appTest.js'
```

# Updating on server

```shell
ssh <username>@server.redstonelab.net # ssh into the server
cd /var/www/html # go to the html directory
sudo ./update.sh # run the update script
```

# Bug reporting
To report bugs, go to the "issues" link on this Github page. 
