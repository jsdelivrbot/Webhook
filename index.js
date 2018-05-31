'use strict';

const
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express().use(bodyParser.json());
  app.use(timeout('5s'));
  app.use(haltOnTimedout);

  function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
  }

  app.listen(3000)

app.listen(process.env.PORT || 1337, timeout('5s'), haltOnTimedout, () => console.log('webhook is listening'));

app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  if (body.object === 'page') {

    body.entry.forEach(function(entry) {

      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }

});

app.get('/webhook', timeout('5s'), haltOnTimedout, (req, res) => {

  let VERIFY_TOKEN = "EAAIR4BeZBZAxoBALl44NOrtSexWvvUTHWwRyLdCNZCZCUisqZAnk9Hx6LOo8uAONHmN51veZByfLB5gVAOSaRmRguJ6A0yaW26yXnsOPrRHS3Hf7qbdFRxFe8Vh5CcNfiCnnVBkO0UrY7rgmlbLkW3hZCTZAJ3Mnu7iF9QgSkcOdNO3aTg0lmteG"
    
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  if (mode && token) {

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      res.sendStatus(403);      
    }
  }
});