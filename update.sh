#!/bin/bash
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

pm2 delete app
git pull # pull latest changes on master
sudo pm2 start app.js # restart the server.js process
pm2 flush # clear app logs