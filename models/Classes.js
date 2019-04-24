const Sequelize = require('sequelize');
//require database
const db = require('../config/database');

//creates a model
const Course = db.define('courses', {
    //object of fields
    course_name: {
        type: Sequelize.STRING
    },
    school: {
        type: Sequelize.STRING
    },
    teacher: {
        type: Sequelize.STRING
    }
})

module.exports = Course;