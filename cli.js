#!/usr/bin/env node

import moment from 'moment-timezone';
import fetch from 'node-fetch';
import minimist from 'minimist';

let timezone = moment.tz.guess()

//Grab provided args.
const args = minimist(process.argv.slice(2));

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

//must use let here bc const can't be initialized inside an if/else
let latitude;
let longitude;

//separating args, remember they can be under S and E as well!
if (args.n){
  latitude = args.n;
} else if (args.s){
  latitude = -args.s;
} else if (!latitude){
    console.log("Latitude must be in range")
    process.exit(0);
}

if (args.e){
  longitude = args.e;
} else if (args.w){
  longitude = -args.w;
}  else if (!longitude){
  console.log("Longitude must be in range")
  process.exit(0);
}

if (args.z){
  timezone = args.z;
}

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