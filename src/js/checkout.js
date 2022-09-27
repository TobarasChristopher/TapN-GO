import { supabase } from './client'

var venueID
var cartIDlistp = []

function sessionLoad(){
    venueID = sessionStorage.getItem("venueID");
    cartIDlistp = sessionStorage.getItem("cartIDs")
    console.log(venueID)
    cartIDlist = (cartIDlistp.split(","))
    console.log(cartIDlist)
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

async function loadCart(){
    for(i = 0; i<cartIDlist.length;i++){
        console.log("it is "+cartIDlist[i])
        let { data: cartdata, error } = await supabase
            .from('menu')
            .select('*')
            .eq('id', cartIDlist[i])
        //console.log(cartdata)
        stringdata = JSON.stringify(cartdata)
        
        var stringdatasplit = stringdata.split('"')
        console.log(stringdatasplit)

        var itemDesc = document.createElement('h3')
        itemDesc.appendChild(document.createTextNode(stringdatasplit[9]+" - "+stringdatasplit[13]))
        document.getElementById("cartList").appendChild(itemDesc)
    }
}

window.addEventListener('load', (event) => {
    sessionLoad();
    loadCart();
});

window.addEventListener('load', (event) => {
    colorChange();
  
});

//----------------------------------createOrder----------------------------------------//
async function createOrder(){
    let { data, error } = await supabase  //Call a function with database
    .from('orders')                       //from orders table
    .insert([                             //insert
      { id: Math.floor(Math.random()*9999),
        cName: document.getElementsByName("cName")[0].value ,
        cardNo: document.getElementsByName("cardNo")[0].value,
        expDate: document.getElementsByName("expDate")[0].value,
        secCode: document.getElementsByName("secCode")[0].value,
        cartItems: cartIDlistp,
        venueID: venueID,
        isComplete: false,
        tableNo: document.getElementsByName("tableNo")[0].value,
    },
    ])
    alert("The order was created! Enjoy your meal!")
    window.location.href = "VenueSelect.html"; 
}

let authbtn = document.getElementById("authbtn");
authbtn.addEventListener('click', event => {     //Event handler
  createOrder();
});

//document.getElementsByName("pass")[0].value