# Attorney Form Builder


# Description
This application serves to take data from a webform and convert it to a legal document using LaTex. This service can be offered by an attorney, to enable their clients to create legally valid wills and other legal forms with a highly automated, computerized process. This saves both the attorney and their customers time. Our instance of this application can be found at [here](http://server.redstonelab.net:8080). 


# Documentation
Please refer to our [wiki](https://github.com/ESOF423/attorney-form-builder/wiki) for information on development setup, and user usage

Install node dependencies
```
$ yarn && yarn install --production=false
```

Run tests
```
$ yarn test
```

# Testing Framework and Execution

Install [Mocha](https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha)
```
$ npm install mocha
$ npm install chai

```
Execute Test Files
```
$ npm run test
```

# Updating on server

```shell
ssh <username>@server.redstonelab.net # ssh into the server
cd /var/www/html # go to the html directory
sudo ./update.sh # run the update script
```

# Bug reporting
To report bugs, go to the "issues" link on this Github page. 
