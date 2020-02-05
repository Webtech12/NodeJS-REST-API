// require mongo modules
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

// connection string
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// mongodb connection
MongoClient.connect(connectionURL, {useUnifiedTopology:true}, (err, client) => {
    if(err)
        return console.log(err);

    // database assignment
    const db = client.db(databaseName)

    // insert one 
    const obj = {description: 'desc1', completed: false}
    const obj1 = {description: 'desc2', completed: true}
    const obj2 = {description: 'desc3', completed: false}
    // db.collection('users').insertOne(obj, (err, result) => {
    //     if (err) {
    //        return console.log(err);
    //     }
    //     console.log(result.ops);
    // })

    // insert many
    db.collection('tasks').insertMany([obj,obj1,obj2], (err, result) =>{
        if (err) {
            return console.log(err);
        }
        console.log(result.ops);
    })

})