// brings in dependencies
const { Stack } = require('../models');
const cheerio = require('cheerio');
const axios = require('axios');

// function to push scraped data to DB
async function getStacks () {
     let stacks = await new Promise((resolve, reject) => {
          axios.get('https://djtechtools.com/category/dj-culture/editorial-rants/')
               .then(r => r.data)
               .then(r => {
                    let data = []
                    const $ = cheerio.load(r)
                    $('div.item-inner').each((i, elem) => {
                         let stack = {}
                         stack = {
                              title: $(elem).children('h2.title').children('a').text(),
                              summary: $(elem).children('div.post-summary').text(),
                              url: $(elem).children('h2.title').children('a').attr('href'),                              
                              isSaved: false
                         }
                         data.push(stack)
                    })
                    resolve(data)
               })
               .catch(e => res.send(e))
     })
     return stacks
}

module.exports = app => {
     // saves an entry to the DB
     app.put('/stack/:id', (req, res) => {
          Stack.findByIdAndUpdate(req.params.id, { isSaved: true })
          .then(r => res.sendStatus(200))
          .catch(e=> res.sendStatus(404))
     })
     // populdates DB
     app.post('/scrape', (req, res) => {
          getStacks()
               .then(r => {
                    Stack.deleteMany({ isSaved: false })
                         .then(_ => {
                              Stack.create(r)
                                   .then(_ => res.json(r))
                         })
               })
               .catch(e => res.send(e))
     })
     // deletes entry from DB
     app.delete('/stack/:id', (req, res) => {
          Stack.findByIdAndDelete(req.params.id)
               .then(r => res.sendStatus(200))
               .catch(e => res.sendStatus(404))
     })
}