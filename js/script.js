'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    console.log(activeLinks);
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .post.active');
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
  
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector)
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for(let article of articles){
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* [DONE] insert link into html variable */
    html = html + linkHTML;
    console.log(html)
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
} 

const buttonHamburger = document.getElementById('hamburger');

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu.style.display === 'none') {
    mobileMenu.style.display = 'flex';
    buttonHamburger.classList.add('active');
  } 
  else {
    mobileMenu.style.display = 'none';
    buttonHamburger.classList.remove('active');
  }
}

const divAuthors = document.getElementById('mobile-authors');

function toggleAuthorList() {
  const divAuthorList = document.getElementById('mobile-author-list');
  if (divAuthorList.style.display === 'none') {
    divAuthorList.style.display = 'flex';
    divAuthors.classList.add('active');
  }
  else {
    divAuthorList.style.display = 'none';
    divAuthors.classList.remove('active');
  }
}

const divTitles = document.getElementById('mobile-titles');

function toggleTitleList() {
  const divTitleList = document.getElementById('mobile-title-list');
  if (divTitleList.style.display === 'none') {
    divTitleList.style.display = 'flex';
    divTitles.classList.add('active');
  }
  else {
    divTitleList.style.display = 'none';
    divTitles.classList.remove('active');
  }
}

generateTitleLinks();

buttonHamburger.addEventListener('click', function (){
  toggleMobileMenu();
});
divAuthors.addEventListener('click', function (){
  toggleAuthorList();
});
divTitles.addEventListener('click', function (){
  toggleTitleList();
});