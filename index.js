const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Todo = require('./models/todo');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


//main file controller
app.get('/', function (req, res) {
    
    Todo.find({}, function (err, todo) {
        if (err) {
            console.log("Error while fetching Tasks List");
        }
        
        res.render('home', {
            title: "Todo App",
            todo_list: todo
        })
    });
});

//Create a new Task 

app.post('/create-task', function (req, res) {
    
    // get date object to format
    // const date = require('date-and-time');
    // const newDate = req.body.date;
    // const dateVal = date.format(newDate,'MM/DD/YYYY');
    
    Todo.create({
        desc: req.body.desc,
        date: dateVal,
        category: req.body.category
    }, function (err, newTask) {
        if (err) {
            console.log('Error while creating a new Task');
            return;
        }
        console.log('*****', newTask);
        return res.redirect('back');
    })
});

//start Server
app.listen(port, function (err) {
    if (err) {
        console.log('Error while listning to port');
    } else {
        console.log(`Yup! Server is running on port: ${port} `);
    }
});

//Delete task
app.get('/delete-task/', function(req,res){

    let taskId = req.query.taskId;
    console.log(taskId);
    Todo.findByIdAndDelete(taskId, function(err,task){
        if(err){
            console.log('Error while deleting the Task');
        } else{
            console.log('Task Deleted: ');
        }
    });
    return res.redirect('back');
});

//clear list
app.get('/clear-list/', function(req,res){
    // let taskIds = req.query.taskIds;
    console.log(req.body);
    Todo.deleteMany({});
    return res.redirect('back')
});