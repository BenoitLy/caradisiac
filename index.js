const {getModels} = require('node-car-api');
const {getBrands} = require('node-car-api');
const async = require('async');
const express = require('express');
const app = express();
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
	host: 'localhost:9200', 
	log: 'trace'
});

var port = 9292;

async function getAllBrands () {
  const brands = await getBrands();
  return brands;
  //console.log(brands);
}

async function getAllModels (brand) {
  const models = await getModels(brand);
  return models;
}

async function getAllCars () {
	var listCars = [];
	var brands = getAllBrands();
	brands.then(function(result){
		async.each(result, function(brand){
			var models = getAllModels(brand);
			models.then(function(res){
				res.forEach(function(model){
					//console.log(model);
					listCars.push(model);
				})
			})	
		})
	})
	return listCars;
}
async function saveIntoElasticSearch () {
	var list = await getAllCars(print);

	var body = [];
  	for (var i = 0; i < caradisiac.length; i++ ) {
    	var config = { index:  { _index: 'caradisiac', _type: 'model', _id: i } };
    	body.push(config);
    	body.push(caradisiac[i]);
    }

    client.bulk({
    	body: body
    }, function(error, response){
    	if (error) {
    		console.error(error);
    	}
    	else {
    		console.log(response);
    	}
    })
}

app.listen(port, function(){
	console.log("Listening on port : " + port);
})

app.get('/populate', function(req, res){
	saveIntoElasticSearch();
	send.res("Populate : ok")
})

app.get('/cars', function(req, res){
	client.search({
		index: 'caradisiac',
		type: 'model',
		body:{
			"size": 10,
			"sort":[
			{"volume.keyword": {"order": "desc"}}
			]
		}
	}, function(error, response, status){
		if (error) {
			console.log(error);
		}
		else {
			res.send(response.hits.hits);
		}
	});
})



