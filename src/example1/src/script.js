import { supabase } from './client'

//npx parcel C:\Users\tobar\Documents\sussusamogus\example1\src\index.html

var venueID = 1   //Testing variable, changes when you select a venue

async function add(){
  console.log("Inputting data");
  const { data, error } = await supabase  //Call a function with database
    .from('orders')                       //from orders table
    .insert([                             //insert
      { title: 'Kaz', content: 'Wings' },
      { title: 'Taz', content: 'Steak' },
    ])

}

async function display(){
  console.log("Displaying");
  let { data: orders, error } = await supabase
  .from('orders')
  .select('*')    //SELECTS DATA AS 3D ARRAY
  console.log(orders);
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

function sessionStore(){
  var venueID = 1;
  sessionStorage.setItem("venueID", venueID);
}


let addbtn = document.getElementById("addbtn");
addbtn.addEventListener('click', event => {
  add();
});

let displaybtn = document.getElementById("displaybtn");
displaybtn.addEventListener('click', event => {
  display();
});

let colorChangebtn = document.getElementById("colorChangebtn");
colorChangebtn.addEventListener('click', event => {
  colorChange();
});

let venueSelected = document.getElementById("venueSelected");
venueSelected.addEventListener('click', event => {
  sessionStore();
});
