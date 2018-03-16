const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
const fs = require('fs');

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

const brands = getAllBrands();

brands.then(function(result){
	for(i = 0; i < result.length; i++){
		const models = getAllModels(result[i]);
		models.then(function(result){
			console.log(result);
		});
	}
})


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
