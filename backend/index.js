const app = require('./app');

const port = 3000;

// app.put("/");
app.listen(port, () => {
  // if (err) {
  //   return console.log(err);
  // }
    console.log(`API listening on port ${port}`);
});
