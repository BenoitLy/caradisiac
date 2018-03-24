const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
const fs = require('fs');
const async = require('async');

var listCars = [];
//var brand;

async function getAllBrands(){
	const brands = await getBrands();
	var bra = [];
	bra = brands
	return bra;
}

async function getAllModels(string){
	const models = await getModels(string);
	return models;
}

function loopArray(res, callback){
	async.each(res, createBrandObject);
	callback();
}

function createBrandObject(name){
	var brand = {
			"name": name,
			models: []
	};
	listCars.push(brand);
}

/*function updateList(brand){
	listCars.push(brand);
}*/

function createJSON(brand){
	var jstring = JSON.stringify(listCars, brand, "\t");
	console.log(jstring);
}

function main(){
	const brands = getAllBrands();
	brands.then(function(res){
		loopArray(res, createJSON);
	})
}

main();






/*const brands = getAllBrands();

brands.then(function(res){
	test(res, printEnd);
})

function test(res, callback){
	async.each(res, print);
	callback();
}


function printEnd(){
	console.log("|||||||||||||||||||||||||||");
}

function print(value){
	console.log(value);
}*/
/*async function main(){
	const brands = getAllBrands();

	brands.then(function(result){
		for(i = 0; i < result.length; i++){
			brand = {
				"name": result[i],
				models: []
			};
			console.log(i + " : " + result[i]);
		}
		listOfCars.push(brand);
	})
}*/

/*function createList(brand){
	console.log("list : " + brand);
	listOfCars.push(brand);
}

function printList(list){
	console.log(list);
}*/

/*const test = main();
test.then(function(result){
	var jstr = JSON.stringify(list, brand, "\t");
	console.log(jstr);
})*/


/*brands.then(function(result){
	for(i = 0; i < result.length; i++){
		const models = getAllModels(result[i]);
		models.then(function(result){
			console.log(result);
		});
	}
})*/


/*const brands = getAllBrands(function(){
	for(i = 0; brands.length; i++){
		const models = getAllModels(brands[i]);
		console.log(models);
		//var jstr = JSON.stringify(models);
		//fs.appendFileSync('./test.json', jstr);
	}
});*/




/*var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({  // default is fine for me, change as you see fit
    host: 'localhost:9292',
    log: 'trace'
});

var body = [];
for (var i = 0; i < stocks.length; i++ ) {
    var config = { index:  { _index: 'caracarapuce', _type: 'models', _id: i } };
    body.push(config);
    body.push(models[i]);
}

client.bulk({
    body: body
}, function (error, response) {
    if (error) {
        console.error(error);
        return;
    }
    else {
        console.log(response);  //  I don't recommend this but I like having my console flooded with stuff.  It looks cool.  Like I'm compiling a kernel really fast.
    }
});*/
