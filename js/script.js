'use strict';

const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
    articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
  },
  opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTitleSelector: '.titles a',
    activeTitleSelector: '.titles a.active',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    activeArticleSelector: '.posts .post.active',
    tagsListSelector: '.tags.list',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.authors.list'
  },
  buttonHamburger = document.getElementById('hamburger'),
  divAllTags = document.getElementById('all-tags'),
  tagList = document.getElementById('tag-list'),
  divAllAuthors = document.getElementById('all-authors'),
  authorList = document.getElementById('author-list'),
  divAllPosts = document.getElementById('all-titles'),
  postList = document.getElementById('title-list');

function titleClickHandler(event){
  const clickedElement = this,
    activeLinks = document.querySelectorAll(opt.activeTitleSelector);

  event.preventDefault();

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll(opt.activeArticleSelector);
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href'),
    targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');
}
function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(opt.titleListSelector),
    articles = document.querySelectorAll(opt.articleSelector + customSelector);
  titleList.innerHTML = '';
  let html = '';

  for(let article of articles){
    const articleId = article.getAttribute('id'),
      articleTitle = article.querySelector(opt.titleSelector).innerHTML;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    html += linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll(opt.articleTitleSelector);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
function calculateParams(argAllLinks){
  const params = {max: 0, min: 999999};

  for(let argLink in argAllLinks){
    params.max = argAllLinks[argLink] > params.max ? argAllLinks[argLink] : params.max;
    params.min = argAllLinks[argLink] < params.min ? argAllLinks[argLink] : params.min;
  }
  return params;
}
function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1 );
  const tagClass = opt.cloudClassPrefix + classNumber;

  return tagClass;
}
function generateTags(){
  const articles = document.querySelectorAll(opt.articleSelector);
  let allTags = {};

  for(let article of articles){
    const articleTagList = article.querySelector(opt.articleTagsSelector),
      articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    let html = '';

    for(let tag of articleTagsArray){
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.articleTagLink(linkHTMLData);

      html += linkHTML;

      if(!Object.prototype.hasOwnProperty.call(allTags, tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    articleTagList.innerHTML = html;
  }
  const tagList = document.querySelector(opt.tagsListSelector),
    tagsParams = calculateParams(allTags),
    allTagsData = {tags: []};

  for(let tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
function tagClickHandler(event){
  event.preventDefault();

  const clickedElement = this,
    href = clickedElement.getAttribute('href'),
    tag = href.replace('#tag-', ''),
    activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTagLink of activeTagLinks){
    activeTagLink.classList.remove('active');
  }

  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let foundTagLink of foundTagLinks){
    foundTagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags(){
  const articleTagLinks = document.querySelectorAll('a[href^="#tag-"]');

  for (let articleTagLink of articleTagLinks){
    articleTagLink.addEventListener('click', tagClickHandler);
  }
}
function generateAuthors(){
  const allAuthors = {},
    articles = document.querySelectorAll(opt.articleSelector);

  for (let article of articles){
    const articleAuthor = article.querySelector(opt.articleAuthorSelector),
      articleAuthorName = article.getAttribute('data-author');
    const linkHTMLData = {id: articleAuthorName, title: articleAuthorName};
    const linkHTML = templates.articleAuthorLink(linkHTMLData);
    let html = '';

    html += linkHTML;
    articleAuthor.innerHTML = 'by ' + html;

    if(!Object.prototype.hasOwnProperty.call(allAuthors, articleAuthorName)){
      allAuthors[articleAuthorName] = 1;
    } else {
      allAuthors[articleAuthorName]++;
    }
  }
  const authorList = document.querySelector(opt.authorsListSelector),
    allAuthorsData = {author: []};
  //const authorParams = calculateParams(allAuthors);

  for(let author in allAuthors){
    allAuthorsData.author.push({
      author: author,
      count: allAuthors[author]
    });
  }
  authorList.innerHTML = templates.authorListLink(allAuthorsData);
}
function authorClickHandler(event){
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  event.preventDefault();

  for (let activeAuthorLink of activeAuthorLinks){
    activeAuthorLink.classList.remove('active');
  }
  const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let foundAuthorLink of foundAuthorLinks){
    foundAuthorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}

function hamburgerClickHandler(){
  if (window.innerWidth > 768){
    return;
  }
  if (getComputedStyle(divAllTags).display === 'none' && getComputedStyle(divAllAuthors).display === 'none' && getComputedStyle(divAllPosts).display === 'none') {
    buttonHamburger.classList.add('active');
    divAllTags.style.display = 'flex';
    divAllAuthors.style.display = 'flex';
    divAllPosts.style.display = 'flex';
  } else {
    buttonHamburger.classList.remove('active');
    divAllTags.style.display = 'none';
    divAllAuthors.style.display = 'none';
    divAllPosts.style.display = 'none';
  }
}
function allTagsClickHandler(){
  if (window.innerWidth > 768){
    return;
  }
  if (getComputedStyle(tagList).display === 'none') {
    divAllTags.classList.add('active');
    tagList.style.display = 'inline-block';
  } else {
    divAllTags.classList.remove('active');
    tagList.style.display = 'none';
  }
}
function allAuthorsClickHandler(){
  if (window.innerWidth > 768){
    return;
  }
  if (getComputedStyle(authorList).display === 'none'){
    divAllAuthors.classList.add('active');
    authorList.style.display = 'block';
  } else {
    divAllAuthors.classList.remove('active');
    authorList.style.display = 'none';
  }
}
function allPostsClickHandler(){
  if (window.innerWidth > 768){
    return;
  }
  if (getComputedStyle(postList).display === 'none'){
    divAllPosts.classList.add('active');
    postList.style.display = 'block';
  } else {
    divAllPosts.classList.remove('active');
    postList.style.display = 'none';
  }
}

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();

buttonHamburger.addEventListener('click', function (){
  hamburgerClickHandler();
});
divAllTags.addEventListener('click', function (){
  allTagsClickHandler();
});
divAllAuthors.addEventListener('click', function (){
  allAuthorsClickHandler();
});
divAllPosts.addEventListener('click', function (){
  allPostsClickHandler();
});


