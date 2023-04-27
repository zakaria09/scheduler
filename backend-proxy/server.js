//server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors({'Access-Control-Allow-Origin': '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/auth', async (req, res, next) => {
    console.log(req.body, req.headers);
    try {
      const response = await axios.post('https://auth.calendly.com/oauth/token', req.body, {headers: { authorization: req.headers.authorization, accept: 'application/x-www-form-urlencoded' }});
      res.send(response.data);
      console.log(response)
    } catch (err) {
      console.log(err)
      res.json(err)
    }
    // res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

var server = app.listen(3000, function() {
    console.log("Backend Application listening at http://localhost:3000")
})
