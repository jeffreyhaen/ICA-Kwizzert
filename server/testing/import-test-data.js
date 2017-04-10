'use strict';

const data = require('../../assignment/test-data-nl.json');
const constants = require('../../utilities/constants');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(constants.MONGODB_CONNECTIONSTRING);

// Category
const schemaCategory = mongoose.Schema({
    name: {type: String, required: true},
});

const Category = mongoose.model("Category", schemaCategory);

// Question
const schemaQuestion = mongoose.Schema({
    category: {type: schemaCategory, required: true},
    value: {type: String, required: true},
    answer: {type: String, required: true},
});

const Question = mongoose.model("Question", schemaQuestion);

/* ------------------------------------------------------- */

let saveQuestion = function (question) {
    return new Promise(function (resolve, reject) {
        question.save(function(err, result) {
            if (err) {
                reject(err);
            }
            else {
                console.log(`Question saved! (${question.value})`);
                resolve(data);
            }
        });
    });
};

let categories = [];

let questions = data.map(function(item, i) { 
    let existingCategory = categories.find((c) => c.name === item.category);
    
    if (existingCategory === undefined) {
        existingCategory = new Category({ name: item.category });
        categories.push(existingCategory);
    }

    let question = new Question({ category: existingCategory, value: item.question, answer: item.answer });

    return saveQuestion(question);
});

Question.remove({}, function(err, result) {
    console.log("Question collection cleared!");

    Promise.all(questions)
        .then(function(result) {
            console.log('\n All questions are saved!');
        })
        .catch(function(error) {
            console.log(error);
        });
});
