'use strict';

var LENGTH_ARR_PHOTO = 25;
var LIKE_START = 15;
var LIKE_END = 200;
var LENGTH_ARR_PICTURE = 25;
var COUNT_OF_COMMENTS = 3;

var DESCRIPTION = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var NAME_AUTHOR = ['Лев', 'Александр', 'Игорь', 'Даниил', 'Владимир', 'Антон', 'Михаил', 'Екатерина', 'Варвара', 'София'];

var similarListElement = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


var getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var numberAvatar = [];
for (var g = 0; g <= 6; g++) {
  numberAvatar.push(g);
}

var numberPhoto = [];
for (var i = 1; i <= LENGTH_ARR_PHOTO; i++) {
  numberPhoto.push(i);
}

var likes = [];
for (var j = LIKE_START; j <= LIKE_END; j++) {
  likes.push(j);
}

var comments = [];
for (var t = 0; t < COUNT_OF_COMMENTS; t++) {
  var randomComment = {
    avatar: 'img/avatar-' + numberAvatar[getRandomElement(numberAvatar)] + '.svg',
    name: NAME_AUTHOR[getRandomElement(NAME_AUTHOR)],
    message: DESCRIPTION[getRandomElement(DESCRIPTION)]
  };
  comments.push(randomComment);
}

var pictures = [];
for (var k = 0; k < LENGTH_ARR_PICTURE; k++) {
  var randomPicture = {
    url: 'photos/' + numberPhoto[k] + '.jpg',
    like: likes[getRandomElement(likes)],
    description: 'описание фото',
    comments: comments
  };
  pictures.push(randomPicture);
}

var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.like;
  pictureElement.querySelector('.picture__comments').textContent = picture.message;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
pictures.forEach(function (l) {
  fragment.appendChild(renderPicture(l));
});

similarListElement.appendChild(fragment);

document.querySelector('.big-picture').classList.remove('hidden');
document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');
document.querySelector('.social__comments').innerHtml = '';


var bigPicture = document.querySelector('.big-picture__img');
var bigPictureLikes = document.querySelector('.likes-count');
var bigPictureComments = document.querySelector('.comments-count');
var bigPictureDescription = document.querySelector('.social__caption');
bigPicture.src = pictures[0].url;
bigPictureLikes.textContent = pictures[0].like;
bigPictureComments.textContent = pictures[0].comments.length;
bigPictureDescription.textContent = pictures[0].description;

var commentsList = document.querySelector('.social__comments');
commentsList.textContent = '';

for (var n = 0; n < pictures[0].comments.length; n++) {
  var commentsItem = document.createElement('li');
  commentsItem.classList.add('social__comment');
  commentsList.appendChild(commentsItem);
  var socialPicture = document.createElement('img');
  socialPicture.classList.add('social__picture');
  socialPicture.src = pictures[0].comments[n].avatar;
  socialPicture.alt = pictures[0].comments[n].name;
  commentsItem.appendChild(socialPicture);
  var textsComment = document.createElement('p');
  textsComment.textContent = pictures[0].comments[n].message;
  commentsItem.appendChild(textsComment);
}
