import axios from "axios"

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

const theCard = document.createElement('div');
const theHeadline = document.createElement('div');
const theAuthor = document.createElement('div');
const imageContainer = document.createElement('div');
const image = document.createElement('img');
const theAuthorName = document.createElement('span');

theCard.appendChild(theHeadline);
theCard.appendChild(theAuthor);
theAuthor.appendChild(imageContainer);
imageContainer.appendChild(image);
theAuthor.appendChild(theAuthorName);

theCard.classList.add('card');
theHeadline.classList.add('headline');
theAuthor.classList.add('author');
imageContainer.classList.add('img-container');

theHeadline.textContent = article['headline'];
image.src = article['authorPhoto'];
theAuthorName.textContent = article['authorName']

theCard.addEventListener('click', event => {
  console.log(theHeadline)
})
return theCard;

}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  return axios.get('http://localhost:5000/api/articles')
    .then(res => {
      console.log(res.data.articles)
      const articleCategories = res.data.articles
      Object.keys(articleCategories).forEach(articleCategory => {
        articleCategories[articleCategory].forEach(article => {
          document.querySelector(selector).appendChild(Card(article))
        })

      })
    })
    .catch(err => {
      console.error(err)
    })

 
}

export { Card, cardAppender }
