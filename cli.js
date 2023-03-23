#!/usr/bin/env node

//shebang for Node
//to run this, do  galosh.js 35.9 79.0558
import moment from 'moment-timezone';
import fetch from 'node-fetch';
import minimist from 'minimist';

let timezone = moment.tz.guess()

//Grab provided args.
const args = minimist(process.argv.slice(2));
//console.log(args);

let helpText = `Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
  -h            Show this help message and exit.
  -n, -s        Latitude: N positive; S negative.
  -e, -w        Longitude: E positive; W negative.
  -z            Time zone: uses tz.guess() from moment-timezone by default.
  -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
  -j            Echo pretty JSON from open-meteo API and exit.`

if (args.h){
    console.log(helpText);
    process.exit(0);
}

//must use let here bc const must be initialized outside of an if/else
let latitude;
let longitude;

//separating args, remember they can be under S and E as well!
if (args.n){
  latitude = args.n;
} else if (args.s){
  latitude = -args.s;
} else if (!latitude){
    console.log("Must include latitude.")
    process.exit(1);
}

if (args.e){
  longitude = args.e;
} else if (args.w){
  longitude = -args.w;
}  else if (!longitude){
  console.log("Must include longitude.")
  process.exit(1);
}

//didn't add a customizable timezone tag!
if (args.z){
  timezone = args.z;
}

// Make a request, also TODO, add previously saved args to url
//problem: url is not reading my variable bc it is certainly a float
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&timezone=' + timezone);

// Get the data from the request
const data = await response.json();

const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}

//only log data IF there is a j tag
if(args.j){
  console.log(data);
  process.exit(0);
}

