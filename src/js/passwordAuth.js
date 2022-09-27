import { supabase } from './client'

var venueID

function sessionLoad(){
    venueID = sessionStorage.getItem("venueID");
    console.log(venueID)
    document.getElementById("status").innerHTML = "Logging into Venue "+venueID;        //Change P1 id to wrong password
  }

async function colorChange(){

    const { data, error } = await supabase    //Call a function with the database
    .from('venue')                            //from table venue
    .select('pColor')                         //select the pColor column...
    .eq('venueID', venueID)                   //...if the venueID column is equals venueID
    const colorID = JSON.stringify(data);     //Parse data from an object into a string because ¯\_(ツ)_/¯
    console.log(colorID)                      //print the data
    var pColor = ""                           //Create pColor var
    for(let i = 12;i<18;i++){                 //
        pColor = pColor + colorID[i];           //This shit is wierd but basically
        console.log(pColor)                     //it takes [{"pColor":"9e32a8"}] and makes it so only 9e32a8 stays
    }
    pColor = "#"+pColor;                      //add # to the color to make it hex
    document.getElementById("primary").style.backgroundColor = pColor; //Interact with css to change the color of the website
}

window.addEventListener('load', (event) => {
    sessionLoad();
  
});

window.addEventListener('load', (event) => {
    colorChange();
  
});

//-------------------------------------Authentication method-------------------------------------------//




async function passwordAuth(){
    var upassword = "userpassword:"+ document.getElementsByName("pass")[0].value + "-----";   //Grab value from text field

    const { data, error } = await supabase      //start a query
    .from('venue')                              //grab password to the corresponding venueID
    .select('password')
    .eq('venueID', venueID)
    const passwordu = JSON.stringify(data[0])   //parse from object to string
    console.log(passwordu)                      //print password
    var spassword = ""                          //summon sorted vars
    var passwords = ""                          //
    for(let i = 13;i<18;i++){
        spassword = spassword+upassword[i];     //sort both vars into 5 letter long snips
        passwords = passwords+passwordu[i];

        

    }
    console.log(spassword+" "+passwords)        //print result
    if(spassword == passwords){                 //if match
        document.location.href = 'ManagerPage.html'             //relocate to this url
    }
    else{                                       //else
        document.getElementById("status").innerHTML = "Wrong Password!";        //Change P1 id to wrong password
        document.getElementById("status").style.color = "red";  
        document.getElementById("status").style.textAlign = "center";                //Color
    }


}

let authbtn = document.getElementById("authbtn");
authbtn.addEventListener('click', event => {     //Event handler
  passwordAuth();
});
