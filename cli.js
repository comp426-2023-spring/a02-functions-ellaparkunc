#!/usr/bin/env node
//shebang for Node
//to run this, do  galosh.js 35.9 79.0558
import moment from 'moment-timezone';
import fetch from 'node-fetch';
import minimist from 'minimist';

const timezone = moment.tz.guess()

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

//separating args
const lattitude = args.n;
//console.log(lattitude);
const longitude = args.w;


// Make a request, also TODO, add previously saved args to url
//problem: url is not reading my variable bc it is certainly a float
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lattitude + '&longitude=' + longitude + '&hourly=temperature_2m');

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

//data.daily.precipitation_hours[0]

console.log(data);
