import { supabase } from './client'

var venueID


function sessionLoad(){
    venueID = sessionStorage.getItem("venueID");
    //console.log(venueID)
    venueID = 1

  }

async function colorChange(){

    const { data, error } = await supabase    //Call a function with the database
    .from('venue')                            //from table venue
    .select('pColor')                         //select the pColor column...
    .eq('venueID', venueID)                   //...if the venueID column is equals venueID
    const colorID = JSON.stringify(data);     //Parse data from an object into a string because ¯\_(ツ)_/¯
    //console.log(colorID)                      //print the data
    var pColor = ""                           //Create pColor var
    for(let i = 12;i<18;i++){                 //
        pColor = pColor + colorID[i];           //This shit is wierd but basically
        //console.log(pColor)                     //it takes [{"pColor":"9e32a8"}] and makes it so only 9e32a8 stays
    }
    pColor = "#"+pColor;                      //add # to the color to make it hex
    document.getElementById("primary").style.backgroundColor = pColor; //Interact with css to change the color of the website
}


async function loadOrders(){
    let { data: orderdata, error } = await supabase
    .from('orders')
    .select("*")
    .eq('venueID', venueID)
    console.log(orderdata)
    for(i = 0; i < orderdata.length; i++){
        var cartItem = JSON.stringify(orderdata[i])
        var cartItemSplit = cartItem.split('"')

        console.log("the normal array is "+cartItemSplit[26])
        var cName = cartItemSplit[5]
        var id = cartItemSplit[2]
        var idp = ""
        for(let p = 1; p < id.length-1;p++){
            idp = idp+id[p]
        }
        //console.log("the name of the person is "+cName+" and the id of the order is "+idp)
        var orderContainer = document.createElement('div')
        orderContainer.className = "contList"

        var idContainer = document.createElement('h3')
        idContainer.appendChild(document.createTextNode("Order ID: "+idp))
        orderContainer.appendChild(idContainer)

        

        var cDetailsContainer = document.createElement('div')
        

        // var cDetailsdetails = document.createElement('h4')
        // cDetailsdetails.appendChild(document.createTextNode(cNo+" "+ expDate+" "+secCodew))
        // cDetailsContainer.appendChild(cDetailsdetails)

        orderContainer.appendChild(cDetailsContainer)


        
        var cartItemString = JSON.stringify(cartItemSplit[19])
        console.log("The stringified version is "+cartItemString)
        var cartItemArr = cartItemString.split(',')
        
        var length = cartItemArr.length

        //console.log(cartItemArr[2])
        cartItemArr[0] = (cartItemArr[0][1])
        cartItemArr[cartItemArr.length-1] = (cartItemArr[length-1][0])
        //console.log("the new array is "+cartItemArr+" lol")
        //console.log("the array is " +cartItemArr.length+ " long")
        
        for(let y = 0; y < cartItemArr.length; y++){
            let { data: menuitemorder, error } = await supabase
            .from('menu')
            .select('name')
            .eq('id', cartItemArr[y])
            menuitemorder = JSON.stringify(menuitemorder)
            var menuitemordersplit = menuitemorder.split('"')
            console.log(menuitemordersplit[3])

            var itemContainer = document.createElement('h4')
            itemContainer.className = "cartList"
            itemContainer.appendChild(document.createTextNode(menuitemordersplit[3]))
            orderContainer.appendChild(itemContainer)
        }

        var isComplete = cartItemSplit[26]
        var isCompletew = ""
        for(let w = 1; w < isComplete.length-1;w++){
            isCompletew = isCompletew+isComplete[w]
        }
        

        if(isCompletew=="false"){
            document.getElementById("pendingOrders").appendChild(orderContainer)
        }

        if(isCompletew=="true"){
            document.getElementById("completedOrders").appendChild(orderContainer)
        }
        
    }
}

window.addEventListener('load', (event) => {
    sessionLoad();
    loadOrders();
    colorChange();

});

async function completeOrder(){
    var updateID = document.getElementsByName("mComplete")[0].value;
    console.log(updateID)
    const { data, error } = await supabase      //start a query
        .from('orders')                          //from venue...
        .update({'isComplete': true})           //...update pColor column to newColor...
        .eq('id', updateID)              
        console.log("updated!")
        window.location.reload();
}

async function viewDetails(){
    var viewID = document.getElementsByName("vCardDetails")[0].value;
    
    let { data: receiptdata, error } = await supabase
    .from('orders')
    .select("*")
    .eq('id', viewID)
    console.log(receiptdata)

    var receiptitem = JSON.stringify(receiptdata)
    var receiptitemsplit = receiptitem.split('"')

    var cNo = receiptitemsplit[9]
    var cName = receiptitemsplit[5]
        var expDate = receiptitemsplit[13]
        var secCode = receiptitemsplit[16]
        var secCodew = ""
        for(let w = 1; w < secCode.length-1;w++){
            secCodew = secCodew+secCode[w]
        }
    alert("ORDER NUMBER "+viewID+" DETAILS\n\nThe customer's full name is: "+cName+"\n\nThe card number is: "+ cNo+" \n\nThe exp date is: "+ expDate+"\n\n The security code is: "+secCodew)
    window.location.reload();
}

let updateOrderbtn = document.getElementById("updateOrderbtn");
updateOrderbtn.addEventListener('click', event => {
  completeOrder();
});

let viewReceiptbtn = document.getElementById("viewRecieptbtn");
viewRecieptbtn.addEventListener('click', event => {
  viewDetails();
});