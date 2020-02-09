'use strict';

var LENGTH_ARR_PHOTO = 25;
var LIKE_START = 15;
var LIKE_END = 200;
var LENGTH_ARR_PICTURE = 25;

var DESCRIPTION = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var NAME_AUTHOR = ['Лев', 'Александр', 'Игорь', 'Даниил', 'Владимир', 'Антон', 'Михаил', 'Екатерина', 'Варвара', 'София'];

document.querySelector('.pictures').classList.remove('hidden');
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

var pictures = [];
for (var k = 0; k < LENGTH_ARR_PICTURE; k++) {
  var randomPicture = {
    url: 'photos/' + numberPhoto[k] + '.jpg',
    like: likes[getRandomElement(likes)],
    comments: {
      avatar: 'img/avatar-' + numberAvatar[getRandomElement(numberAvatar)] + '.svg',
      message: DESCRIPTION[getRandomElement(DESCRIPTION)],
      name: NAME_AUTHOR[getRandomElement(NAME_AUTHOR)]
    }
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
document.querySelector('.pictures').classList.remove('hidden');
