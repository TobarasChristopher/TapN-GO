import { supabase } from './client'

function sessionLoad(){
    venueID = sessionStorage.getItem("venueID");
    console.log(venueID)
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

//---------------------------------------------------------------------------------------//
var length = 1
async function display(){
    console.log("Displaying");
    let { data: menudata, error } = await supabase
    .from('menu')
    .select('*')
    .eq('venueID', venueID) 
    console.log(menudata)
    length = length + menudata.length
    console.log("it is "+length+" long")

    for(let i = 0; i < length; i++){
        var menuitem = JSON.stringify(menudata[i])
        //console.log("this is "+menuitem)
        var menuitemsplit = menuitem.split('"');
        console.log(menuitemsplit)


        var spanDesc = document.createElement('p')
        spanDesc.className = "menu-item-description"
        spanDesc.appendChild(document.createTextNode(menuitemsplit[13]))

        var descContainer = document.createElement('div')
        descContainer.className = "read-more-container"
        descContainer.appendChild(spanDesc)

        var orderContainer = document.createElement('div')
    
        var title = document.createElement('h3')
        title.appendChild(document.createTextNode(menuitemsplit[9]+ " -  €" + menuitemsplit[17]))


        var titleContainer = document.createElement('div')
        titleContainer.className = "menu-item-text"
        titleContainer.appendChild(title)
        titleContainer.appendChild(descContainer)
        titleContainer.appendChild(orderContainer)
        

        var image = document.createElement('img')
        image.setAttribute('src', 'images/menu1.png');
        image.setAttribute('height', '200px');
        image.setAttribute('width', '250px');
        
        var imageContainer = document.createElement('div')
        imageContainer.className = "menu-item"
        imageContainer.appendChild(image)
        imageContainer.appendChild(titleContainer)

        var itemContainer = document.createElement('div')
        itemContainer.className = "menu-group"
        itemContainer.appendChild(imageContainer)

        if(menuitemsplit[5]=="starter"){
            document.getElementById("menustarter").appendChild(itemContainer)
        }
        else if(menuitemsplit[5]=="main"){
            document.getElementById("menumain").appendChild(itemContainer)
        }
        else if(menuitemsplit[5]=="dessert"){
            document.getElementById("menudessert").appendChild(itemContainer)
        }
        else if(menuitemsplit[5]=="drink"){
            document.getElementById("menudrink").appendChild(itemContainer)
        }
    }
}

var cartIDlist = []

async function CreateMenuItem(){

    let { data, error } = await supabase  //Call a function with database
    .from('menu')                       //from orders table
    .insert([                             //insert
      { id: length+1 ,
        category: document.getElementsByName("mCategory")[0].value ,
        name: document.getElementsByName("mName")[0].value,
        description: document.getElementsByName("mDesc")[0].value,
        price: document.getElementsByName("mPrice")[0].value,
        thumbnailURL: "idk",
        venueID: venueID,
    },
    ])
    alert(document.getElementsByName("mName")[0].value+" was added to the menu!")
    reload()
}


let addbtn = document.getElementById("addbtn");
addbtn.addEventListener('click', event => {     //Event handler
  CreateMenuItem();
});

window.addEventListener('load', (event) => {
    display();
});


function redirect(){
    console.log("redirecting")
    window.location.href = "Checkout.html"; 
    sessionStorage.setItem("cartIDs",cartIDlist)
}

function reload(){
    window.location.reload();

}

async function DeleteMenuItem(){
const { data, error } = await supabase
  .from('menu')
  .delete("*")
  .eq( "name", document.getElementsByName("mdName")[0].value )
  alert(document.getElementsByName("mdName")[0].value+" was removed from the menu!")
    reload()
}

let deletebtn = document.getElementById("deletebtn");
deletebtn.addEventListener('click', event => {     //Event handler
  DeleteMenuItem();
});