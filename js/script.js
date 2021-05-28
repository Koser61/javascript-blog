'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
};

const opt = {
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
};

const buttonHamburger = document.getElementById('hamburger'),
  divAllTags = document.getElementById('all-tags'),
  tagList = document.getElementById('tag-list'),
  divAllAuthors = document.getElementById('all-authors'),
  authorList = document.getElementById('author-list'),
  divAllPosts = document.getElementById('all-titles'),
  postList = document.getElementById('title-list');

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log(event);
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(opt.activeTitleSelector);
  console.log(activeLinks);
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(opt.activeArticleSelector);
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
function generateTitleLinks(customSelector = ''){
  console.log(customSelector);
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';
  /* [DONE] find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  console.log(articles);
  let html = '';

  for(let article of articles){
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
    /* [DONE] create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);
    /* [DONE] insert link into html variable */
    html += linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll(opt.articleTitleSelector);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
  console.log(titleList);
}
function calculateParams(argAllLinks){
  const params = {max: 0, min: 999999};

  for(let argLink in argAllLinks){
    params.max = argAllLinks[argLink] > params.max ? argAllLinks[argLink] : params.max;
    params.min = argAllLinks[argLink] < params.min ? argAllLinks[argLink] : params.min;

    console.log(argLink + ' is used ' + argAllLinks[argLink] + ' times');
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
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  console.log(articles);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find tags wrapper */
    const articleTagList = article.querySelector(opt.articleTagsSelector);
    console.log(articleTagList);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag);
      /* [DONE] generate HTML of the link */
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.articleTagLink(linkHTMLData);
      console.log(linkHTML);
      /* [DONE] add generated code to html variable */
      html += linkHTML;
      console.log(html);
      /* [NEW] check if this link is NOT already in allTags */
      if(!Object.prototype.hasOwnProperty.call(allTags, tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    articleTagList.innerHTML = html;
  /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opt.tagsListSelector);
  /* [NEW] execute calculateParams function with allTags as argument */
  const tagsParams = calculateParams(allTags);
  console.log('tagsParams:', tagsParams);
  /* [NEW] create constant for all links data */
  const allTagsData = {tags: []};
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] add data of a link to allTagsData object */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    console.log(allTagsData);
  /* [NEW] END LOOP: for each tag in allTags: */
  }
  /* [NEW] generate html using to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  console.log(event);
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);
  /* [DONE] START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks){
    /* [DONE] remove class active */
    activeTagLink.classList.remove('active');
  /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(foundTagLinks);
  /* [DONE] START LOOP: for each found tag link */
  for (let foundTagLink of foundTagLinks){
    /* [DONE] add class active */
    foundTagLink.classList.add('active');
  /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const articleTagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log(articleTagLinks);
  /* [DONE] START LOOP: for each link */
  for (let articleTagLink of articleTagLinks){
    console.log(articleTagLink);
    /* [DONE] add tagClickHandler as event listener for that link */
    articleTagLink.addEventListener('click', tagClickHandler);
  /* [DONE] END LOOP: for each link */
  }
}
function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an object */
  const allAuthors = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  console.log(articles);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles){
    /* [DONE] find author wrapper */
    const articleAuthor = article.querySelector(opt.articleAuthorSelector);
    console.log(articleAuthor);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get author name from data-author attribute */
    const articleAuthorName = article.getAttribute('data-author');
    console.log(articleAuthorName);
    /* [DONE] generate HTML of the link */
    const linkHTMLData = {id: articleAuthorName, title: articleAuthorName};
    const linkHTML = templates.articleAuthorLink(linkHTMLData);
    console.log(linkHTML);
    /* [DONE] add generated code to html variable */
    html += linkHTML;
    console.log(html);
    /* [DONE] insert HTML of the link into the author wrapper */
    articleAuthor.innerHTML = 'by ' + html;
    /* [NEW] check if this link is NOT already in allAuthors */
    if(!Object.prototype.hasOwnProperty.call(allAuthors, articleAuthorName)){
      /* [NEW] add tag to allAuthors object */
      allAuthors[articleAuthorName] = 1;
    } else {
      allAuthors[articleAuthorName]++;
    }
  /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(opt.authorsListSelector);
  /* [NEW] execute calculateAuthorParams function with allAuthors as argument */
  const authorParams = calculateParams(allAuthors);
  console.log('authorParams:', authorParams);
  /* [NEW] create constant for all links data */
  const allAuthorsData = {author: []};
  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){
    /* [NEW] generate data of a link and add it to allAuthorsData */
    allAuthorsData.author.push({
      author: author,
      count: allAuthors[author]
    });
  /* [NEW] END LOOP: for each tag in allAuthors: */
  }
  /* [NEW] generate html using allAuthorsData to authorList */
  authorList.innerHTML = templates.authorListLink(allAuthorsData);
  console.log(allAuthorsData);
}
function authorClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  console.log(event);
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* [DONE] make a new constant "author" and extract name from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* [DONE] find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* [DONE] START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks){
    /* [DONE] remove class active */
    activeAuthorLink.classList.remove('active');
  /* [DONE] END LOOP: for each active author link */
  }
  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(foundAuthorLinks);
  /* [DONE] START LOOP: for each found author link */
  for (let foundAuthorLink of foundAuthorLinks){
    /* [DONE] add class active */
    foundAuthorLink.classList.add('active');
  /* [DONE] END LOOP: for each found author link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors(){
  /* [DONE] find all links to authors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  console.log(authorLinks);
  /* [DONE] START LOOP: for each link */
  for (let authorLink of authorLinks){
    console.log(authorLink);
    /* [DONE] add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  /* [DONE] END LOOP: for each link */
  }
}

function hamburgerClickHandler(){
  if (window.innerWidth > 768){
    console.log(window.innerWidth);
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
    console.log(window.innerWidth);
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
    console.log(window.innerWidth);
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
    console.log(window.innerWidth);
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


