
npm install
ng build --prod


docker stop time-sheet-web
docker rm time-sheet-web
docker rmi time-sheet-web:latest
docker build -f Dockerfile . -t time-sheet-web
docker run --name time-sheet-web -d -p 4988:4200 time-sheet-web:latest

