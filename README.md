# Hardware Metrics Monitor

This is a web application that monitors your computer's hardware metrics. The metrics are:
* CPU usage
* Memory usage
* Disk usage

First, there is a shell script that gathers these metrics and stores them in a MongoDB collection. Then, when you access the Angular app in your browser, it will hit the api server that fetches these metrics in the storage. The metrics are displayed in graphs generate by Chart.js library.

### Requirements
- OS Ubuntu or another Linux distro
- MongoDB installed
- Sar Linux command installed
- Angular 8 (it should work with other versions)
- Nodejs 12 (it should work with other versions)

### Installing
- In "metrics/api" and "metrics/webapp" directories:
```
npm install
```

### Configuring
- Add the shell script (metrics/script/get_metrics.sh) in crontab to run every 5 minutes:
```
*/5 * * * * [YOUR_PATH]/metrics/script/get_metrics.sh
```

## Running
Start the api (metrics/api):
```
./run.sh start
```

Run the web app (metrics/webapp)
```
ng serve
```

Access the web app in your browser by: http://localhost:4200 and you should see the chart metrics.


## License

This project is licensed under the MIT License.
