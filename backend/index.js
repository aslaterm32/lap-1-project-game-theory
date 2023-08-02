require('dotenv').config()
const app = require('./app')

// const port = process.env.PORT
const port = process.env.PORT

// app.put("/");
app.listen(port, () => {
    // if (err) {
    //   return console.log(err);
    // }
    console.log(`API listening on port ${port}`)
})
