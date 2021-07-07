const React = require('react')

const Home = props =>
     <html lang="en">
          <head>
               <meta charSet="UTF-8" />
               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
               <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
               <link href="../public/css/style.css" type="text/html" />
               <title>DJTT Scraper | Home Page</title>
               <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
          </head>

          <body>
               <nav className="blue darken-3">
                    <div className="nav-wrapper">
                         <a className="brand-logo center">DJTT News Scraper</a>
                         <ul id="nav-mobile" className="right hide-on-med-and-down">
                              <li><a id="scrapeData" href="#">Scrape Articles</a></li>
                              <li><a id="goToSaved" href="./saved">Saved Articles</a></li>
                         </ul>
                    </div>
               </nav>
               <div className="results">
               {
                    props.stacks.map(stack => (
                         <div className="container">
                              <div className="row">
                                   <div className="col s12">
                                        <div className="card">
                                             <div className="card-content">
                                                  <span className="card-title">{stack.title}</span>
                                                  <span>{stack.summary}</span>
                                             </div>
                                             <div className="card-action">
                                                  <a id="link" data-url={`${stack.url}`} href='#'>Article Link</a>
                                                  <a href='#' id='saveBTN' data-id={stack._id}>Save Article</a>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    ))
               }
               </div>
               <div id="no-art">
                    <p class="no-art"></p>
               </div>

               <script src="./js/app.js" />               
               <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" />
               
          </body>
     </html>

module.exports = Home
