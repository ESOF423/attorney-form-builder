pm2 delete app
git pull # pull latest changes on master
sudo pm2 start app.js # restart the server.js process
pm2 flush # clear app logs