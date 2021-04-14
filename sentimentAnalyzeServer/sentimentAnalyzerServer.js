const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUndertandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLangugageUnderstanding = new NaturalLanguageUndertandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    return naturalLangugageUnderstanding;
}
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
          'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
          },
          'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
          },
        },
      };
    getNLUInstance().analyze(analyzeParams)
    .then(analysisresults => {
        
         const elements = analysisresults.result.keywords.map(element => element);        

         const values = (elements.map(element => element.emotion));                  
         
         return res.send(Object.entries(values[0]));
        }
    )
    .catch(error => {
        console.log(error);
    }) 
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
          'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
          },
          'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
          },
        },
      };
    getNLUInstance().analyze(analyzeParams)
    .then(analysisresults => {
        
        const sentiments = analysisresults.result.keywords.map(element => element.sentiment)                        
        return res.send(sentiments[0].label)
        }
    )
    .catch(error => {
        console.log(error);
    })    
});

app.get("/text/emotion", (req,res) => {

    const analyzeParams = {
        'text': req.query.text,
        'features': {
          'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
          },
          'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
          },
        },
      };
    getNLUInstance().analyze(analyzeParams)
    .then(analysisresults => {
        
         const elements = analysisresults.result.keywords.map(element => element);        

         const values = (elements.map(element => element.emotion));                  
         
         return res.send(Object.entries(values[0]));
        }
    )
    .catch(error => {
        console.log(error);
    })    
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
          'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
          },
          'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
          },
        },
      };
    getNLUInstance().analyze(analyzeParams)
    .then(analysisresults => {
        
        const sentiments = analysisresults.result.keywords.map(element => element.sentiment)        
        
        
        return res.send(sentiments[0].label)
        }
    )
    .catch(error => {
        console.log(error);
    })    
});

let server = app.listen(8000, () => {
    console.log('Listening', server.address().port)
})

