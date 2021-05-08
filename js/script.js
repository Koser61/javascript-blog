'use strict';

const buttonHamburger = document.getElementById('hamburger'),
  allTags = document.getElementById('all-tags'),
  tagList = document.getElementById('tag-list'),
  allAuthors = document.getElementById('all-authors'),
  authorList = document.getElementById('author-list'),
  allPosts = document.getElementById('all-titles'),
  postList = document.getElementById('title-list'),
  optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

let screenWidth = window.innerWidth;

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

function generateTitleLinks(){
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
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
    console.log(titleList);
} 

function hamburgerClickHandler(){ 
  if (getComputedStyle(allTags).display === 'none' && getComputedStyle(allAuthors).display === 'none' && getComputedStyle(allPosts).display === 'none') {
    buttonHamburger.classList.add('active');
    allTags.style.display = 'flex';
    allAuthors.style.display = 'flex';
    allPosts.style.display = 'flex';
  } else {
    buttonHamburger.classList.remove('active');
    allTags.style.display = 'none';
    allAuthors.style.display = 'none';
    allPosts.style.display = 'none';
  }
}
function allTagsClickHandler(){
  if (getComputedStyle(tagList).display === 'none') {
    allTags.classList.add('active');
    tagList.style.display = 'block';
  } else {
    allTags.classList.remove('active');
    tagList.style.display = 'none';
  }
}
function allAuthorsClickHandler(){
  if (getComputedStyle(authorList).display === 'none'){
    allAuthors.classList.add('active');
    authorList.style.display = 'block';
  } else {
    allAuthors.classList.remove('active');
    authorList.style.display = 'none';
  }
}
function allPostsClickHandler(){
  if (getComputedStyle(postList).display === 'none'){
    allPosts.classList.add('active');
    postList.style.display = 'block';
  } else {
    allPosts.classList.remove('active');
    postList.style.display = 'none';
  }
}

generateTitleLinks();

buttonHamburger.addEventListener('click', function (){
  hamburgerClickHandler()
});

if (screenWidth <= 768) {
  allTags.addEventListener('click', function (){
    allTagsClickHandler()
  });
  allAuthors.addEventListener('click', function (){
    allAuthorsClickHandler()
  });
  allPosts.addEventListener('click', function (){
    allPostsClickHandler()
  });
} else {
  tagList.style.display = 'block';
  authorList.style.display = 'block';
  postList.style.display = 'block';
}