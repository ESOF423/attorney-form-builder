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

# Updating on server

```shell
ssh <username>@server.redstonelab.net # ssh into the server
cd /var/www/html # go to the html directory
sudo ./update.sh # run the update script
```

# Bug reporting
To report bugs, go to the "issues" link on this Github page. 
