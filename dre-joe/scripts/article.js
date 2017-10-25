'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// PUT YOUR RESPONSE HERE

// The name is capitalized because it is a constructor function and that is the convention it follows. The context of this within the function is self-referential in order to store data within itself in the correct place. rawDataObj represents the place where the data should be held

function Article (rawData) {
  // Done: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawData.title;
  this.category = rawData.category;
  this.author = rawData.author;
  this.authorUrl = rawData.authorUrl;
  this.publishedOn = rawData.publishedOn;
  this.body = rawData.body;
}

Article.prototype.toHtml = function() {
// COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
// from the docs: .clone() is a convenient way to store a deep copy of an element and duplicate them on a page.


  let $newArticle = $('article.template').clone();
  /* Done: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  $newArticle.removeClass('template');


  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);

  /* Done: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

  $newArticle.find('address a').text(this.author);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time').attr('datetime', this.publishedOn);



  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// Done: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(x){
  articles.push(new Article(x));
});

articles.forEach(function(x){
  $('#articles').append(x.toHtml());
});
