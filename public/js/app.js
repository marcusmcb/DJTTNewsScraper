const fetch = window.fetch

// function to scrape data from the site
const scrapeData = () => {
     fetch('/scrape', {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({})
     })
          .then(_ => window.location.reload())
          .catch(e => console.error(e))
}

// function to save an article from the scrape to the DB
const saveStack = id => {
     fetch(`/stack/${id}`, {
          method: 'PUT',
          headers: {
               'Content-Type': 'application/json; charset=utf-8'
          }
     })
          .then(r => {
               window.location.reload()
          })
}

// function to delete a saved article from the DB
const deleteStack = id => {
     fetch(`/stack/${id}`, {
          method: 'DELETE',
          headers: {
               'Content-Type': 'application/json; charset=utf-8'
          }
     })
          .then(_ => window.location.reload())
          .catch(e => console.error(e))
}

// function to handle the various button functionalities
document.addEventListener('click', event => {
     event.preventDefault()
     if (event.target.id) {
          switch (event.target.id) {
               case 'scrapeData':
                    scrapeData()
                    break
               case 'link':
                    window.location = event.target.dataset.url 
                    break
               case 'saveBTN':
                    saveStack(event.target.dataset.id)
                    break
               case 'deleteBTN':
                    deleteStack(event.target.dataset.id)
                    break
               case 'goToSaved':
                    window.location = './saved'
                    break
               case 'goToHome':
                    window.location = './'
                    break
          }
     }     
})