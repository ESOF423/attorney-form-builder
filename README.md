# Attorney Form Builder
[![Build Status](https://travis-ci.org/ESOF423/attorney-form-builder.svg?branch=master)](https://travis-ci.org/ESOF423/attorney-form-builder)


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