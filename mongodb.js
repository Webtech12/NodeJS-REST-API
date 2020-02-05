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

    db.collection('users').insertOne({
        name: 'test',
        age: 20
    })
})