const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = process.env.PORT || 8080;
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');
const cors = require('cors');

app.use(express.json());

const whitelist = ["http://localhost:3000", "http://localhost:5456"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error("No permitido"))
    }
  }
}

app.use(cors(options))

app.get('/api', (req, res) => {
  res.send('Hello this is my server in express');
})

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Nueva ruta');
})

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("My port is: " + port);
});
