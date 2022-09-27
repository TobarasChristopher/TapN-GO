import { supabase } from './client'

var venueID = 0;

document.getElementById('venueOne')
        .addEventListener('click', function (event) {
            venueID = 1
            console.log("You have selected "+venueID)
            sessionStorage.setItem("venueID", venueID);
        });

document.getElementById('venueTwo')
        .addEventListener('click', function (event) {
            venueID = 2
            console.log("You have selected "+venueID)
            sessionStorage.setItem("venueID", venueID);
        }); 

document.getElementById('venueThree')
        .addEventListener('click', function (event) {
            venueID = 3
            console.log("You have selected "+venueID)
            sessionStorage.setItem("venueID", venueID);
        });

document.getElementById('venueFour')
        .addEventListener('click', function (event) {
            venueID = 4
            console.log("You have selected "+venueID)
            sessionStorage.setItem("venueID", venueID);
        });

document.getElementById('venueFive')
        .addEventListener('click', function (event) {
            venueID = 5
            console.log("You have selected "+venueID)
            sessionStorage.setItem("venueID", venueID);
        });

document.getElementById('venueSix')
        .addEventListener('click', function (event) {
            venueID = 6
            console.log("You have selected "+venueID)
            sessionStorage.setItem("venueID", venueID);
        });

console.log("HELLO TESTING")