
let express = require('express'); //importing the express module
let url = require('url'); //importing the url module
let app = express(); //creating an instance of the express application
let router = express.Router(); //creating an instance express router

let db = []; //array for storing user info

//function for generating a user list
function generateList() {
    let st = 'ID  :  NAME  :  QUANTITY  :  PRICE  :  COST  </br>';
    for (let i = 0; i < db.length; i++) {
        let quantity = parseInt(db[i].quantity)
        let price = parseInt(db[i].price)
        st += db[i].id + ' | ' + db[i].name + ' | ' + db[i].quantity + ' | ' + db[i].price + ' | ' + quantity*price + '</br>';
    }
    return st;
}

//welcome page
router.get('/', function(req, res) {
    res.send("Welcome to my FIT2095 Warehouse.");
})

//to handle add new item request
router.get('/newItem/:itemName/:quantity/:price', function (req, res) {

    idArray = []

    for (let i = 0; i < db.length ; i++)
    {
            idArray.push(db[i].id);
    }

    let currentId = 0;

    let flag = false;
    
    while (flag == false)
    {

        currentId = Math.floor(Math.random() * Math.floor(100));

        for (let j = 0; j < idArray; j++)
        {
            if ( currentId == idArray[j] )
            {
                flag = false;
            }
        }

        flag = true;

    }

    let myObj = {
        id: currentId,
        name: req.params.itemName,
        quantity: req.params.quantity,
        price: req.params.price
    }
    db.push(myObj);
    res.send(generateList());
});

//to handle display list request
router.get('/listAllItems', function (req, res) {

    res.send(generateList());

});

//to handle delete item request
router.get('/deleteItem/:itemID', function(req, res) {

    let ItemID = parseInt(req.params.itemID)
    for (let i = 0; i < db.length; i++) {

        if (ItemID === db[i].id)
        {
            db.splice(i, 1);
        }

    }
    res.send(generateList());

})

//to handle get warehouse value request
router.get('/totalValue', function(req, res) {

    let resultString = 'The total value of warehouse is: '
    let result = 0;
    for (let i = 0; i < db.length; i++){

        let quantity = parseInt(db[i].quantity)
        let price = parseInt(db[i].price)

        result += quantity*price;

    }

    resultString += result;
    res.send(resultString);

})

//export this router 
module.exports = router;

// //listening to a specific port
// app.listen(8080);