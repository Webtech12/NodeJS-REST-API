// requiring and defining modules
const express = require('express')
const app = express()

// defining ports
const port = process.env.PORT || 3000


// routes
app.get('/users', (req, res) => res.send('Hello World!'))


// starting server
app.listen(port, () => console.log(`app listening on port ${port}`))