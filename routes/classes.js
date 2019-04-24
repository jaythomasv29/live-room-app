const express = require('express');
const router = express.Router();
//bring in database
const db = require('../config/database');
//brings in model
const Course = require('../models/Classes');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; //Like operation in SQL

// /gets all course list route
router.get('/', function(req, res){
    //model.findAll()
    Course.findAll()
    .then(function(courses){
        //renders classes view
        res.render('classes', {
            //displays the passed object from findAll
            courses
        })
    }) 
    .catch(function(err){
        console.log(err);
    })
})

// discussion route
router.get('/discussion', function(req, res){
    
})
//Display add class form
router.get('/add', function(req, res){
    res.render('add')
})


//Add a course
router.post('/add', function(req, res){
let { course_name, school, teacher} = req.body;
//server validation
let errors = [];
//if fields are empty
if(!course_name) {
    errors.push({ text: 'Please add a course name' })
}
if(!school) {
    errors.push({ text: 'Please add a school' })
}
if(!teacher) {
    errors.push({ text: 'Please add a teacher' })
}
//Check for errors
if (errors.length > 0){
    res.render('add', {
        errors,
        course_name,
        school,
        teacher
    })
} else {
     //Insert into table using .create
     Course.create({
        course_name,
        school,
        teacher
    })
        .then(function(courses){
        //redirects to classes route
        res.redirect('/classes');
    })
        .catch(function(err){
        console.log(err);
    })
    }
 });

//search for classes
router.get('/search', function(req, res){
    let { term } = req.query;
    if(term) {
        term = term.toLowerCase();
        //destructure term from req.query
        //findAll where course_name OR teacher has similar term
        Course.findAll({ where: {
            [Op.or]: [{course_name: { [Op.like]: '%' + term + '%' } }, {teacher: { [Op.like]: '%' + term + '%' } }] 
        }
            })
        .then(function(courses){
            //then render
            res.render('classes', { courses })
        })
        //error catching
        .catch(function(err){
            console.log(err);
        })
    }

})
module.exports = router;