var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Astronaut = require('../models/astronaut');
var Environment = require('../models/environment');
var Habitat = require('../models/habitat');
var Lab = require('../models/lab');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mars Habitat Simulator' });
});

router.get('/newAstronaut', function(req,res,next){
	res.render('newAstronaut', { title: 'New Astronaut'});
});

router.get('/newEnvironment', function(req,res,next){
	res.render('newEnvironment', { title: 'New Environment'});
});

router.get('/newLab', function(req,res,next){
	res.render('newLab', { title: 'New Laboratory'});
});

router.get('/newHabitat', function(req,res,next){
	var astronaut = [];
	var environment = [];
	var lab = [];
	Astronaut.find({}, function(err, astro){
		console.log("Astro");
    console.log(astro);
    astronaut = astro;
    Environment.find({},function(err,envir){
    	console.log("Envir");
  		console.log(envir);
  		environment = envir;
  		Lab.find({},function(err,labs){
  			console.log("Lab");
  			console.log(labs);
  			lab=labs;
  			res.render('newHabitat', { title: 'New Habitat', astronaut:astronaut,environment:environment,lab:lab});
  		});
  	});
  });
});

router.post('/environment', function(req,res,next){
	console.log("/environment - got here");
	var tempAvg = req.body.tempAvg;
	var radLvl = req.body.radLvl;
	var lat = req.body.lat;
	var lon = req.body.lon;
	var loc = [lat,lon];
	var numSteps = req.body.numSteps;
	var geoFtrs = [];
	for(var i=0;i<=numSteps;i++){
		var namekey = "name"+i;
		var desckey = "desc"+i;
		var distFromkey = "distFrom"+i;
		var tempArray = [req.body[namekey],req.body[desckey],req.body[distFromkey]];
		geoFtrs.push(tempArray);
	}
	var envirData = {tempAvg:tempAvg,radLvl:radLvl,loc:loc,geoFtrs:geoFtrs};
	console.log("variables printed out: ",tempAvg,radLvl,loc,geoFtrs);
	var environment = new Environment(envirData);
	environment.save( function(err){
    if(err){
        console.log("Environment did not save");
        console.log(err);
    } else {
    	console.log("Environment saved.");
    	res.json('Saved to database');
    }
	});
});

router.post('/lab', function(req,res,next){
	console.log("/lab - got here");
	var title = req.body.title;
	var leng = req.body.leng;
	var wide = req.body.wide;
	var high = req.body.high;
	var size = [leng,wide,high];
	var numSteps = req.body.numSteps;
	var equip = [];
	for(var i=0;i<=numSteps;i++){
		var namekey = "name"+i;
		var desckey = "desc"+i;
		var imageUrlkey = "imageUrl"+i;
		var powerkey = "power"+i;
		var tempArray = [req.body[namekey],req.body[desckey],req.body[imageUrlkey],req.body[powerkey]];
		equip.push(tempArray);
	}
	var labData = {title:title,size:size,equip:equip};
	console.log("variables printed out: ",title,size,equip);
	var lab = new Lab(labData);
	lab.save( function(err){
    if(err){
        console.log("Lab did not save");
        console.log(err);
    } else {
    	console.log("Lab saved.");
    	res.json('Saved to database');
    }
	});
});

router.post('/astronaut', function(req,res,next){
	var o2Req = req.body.o2Req;
	var foodReq = req.body.foodReq;
	var wasteAmt = req.body.wasteAmt;
	var radTol = req.body.radTol;
	console.log("got here");
	var astroData = {o2Req:o2Req,foodReq:foodReq,wasteAmt:wasteAmt,radTol:radTol};
	console.log(o2Req,foodReq,wasteAmt,radTol);
	console.log(astroData)
	var astronaut = new Astronaut(astroData);
	console.log(astronaut);
	astronaut.save( function(err){
    if(err){
        console.log("Astronaut did not save");
        console.log(err);
    }
    else{
    	console.log("Astronaut saved.");
    	res.json('Saved to database');
    }
	});
});

router.post('/habitat', function(req,res,next){
	var o2Req = req.body.o2Req;
	var foodReq = req.body.foodReq;
	var wasteAmt = req.body.wasteAmt;
	var radTol = req.body.radTol;
	console.log("got here");
	var labData = {o2Req:o2Req,foodReq:foodReq,wasteAmt:wasteAmt,radTol:radTol};
	console.log(o2Req,foodReq,wasteAmt,radTol);
	console.log(labData)
	var lab = new Astronaut(labData);
	console.log(lab);
	lab.save( function(err){
    if(err){
        console.log("Habitat did not save");
        console.log(err);
    }
    else{
    	console.log("Habitat saved.");
    	res.json('Saved to database');
    }
	});
});


module.exports = router;
