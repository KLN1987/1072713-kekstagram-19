'use strict';
/* задаем постоянные значения*/
var LENGTH_ARR_PHOTO = 25;
var LIKE_START = 15;
var LIKE_END = 200;
var LENGTH_ARR_PICTURE = 25;
var COUNT_OF_COMMENTS = 5;

/* массив комментариев*/
var DESCRIPTION = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
/* имя автора комента */
var NAME_AUTHOR = ['Лев', 'Александр', 'Игорь', 'Даниил', 'Владимир', 'Антон', 'Михаил', 'Екатерина', 'Варвара', 'София'];


var similarListElement = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/* нахождение рандомного чила */
var getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

/* массив аватарок */
var numberAvatar = [];
for (var g = 1; g <= 6; g++) {
  numberAvatar.push(g);
}

/* массив номера фото */
var numberPhoto = [];
for (var i = 1; i <= LENGTH_ARR_PHOTO; i++) {
  numberPhoto.push(i);
}

/* массив лайков */
var likes = [];
for (var j = LIKE_START; j <= LIKE_END; j++) {
  likes.push(j);
}

/* массив со случайными комментариями */
var comments = [];
for (var t = 0; t < COUNT_OF_COMMENTS; t++) {
  var randomComment = {
    avatar: 'img/avatar-' + numberAvatar[getRandomElement(numberAvatar)] + '.svg',
    name: NAME_AUTHOR[getRandomElement(NAME_AUTHOR)],
    message: DESCRIPTION[getRandomElement(DESCRIPTION)]
  };
  comments.push(randomComment);
}

/* массив со случайными картнками */
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
/* функция добавляет в template, случайныt картиками, кол-вом лайков, и комментов  */
var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.like;
  // pictureElement.querySelector('.picture__comments').textContent = picture.message;

  return pictureElement;
};


/* закрытие и открытие большой картинки */

var pictureClose = document.querySelector('.big-picture__cancel');
var bigPicture = document.querySelector('.big-picture__img').getElementsByTagName('img');
var likesCount = document.querySelector('.likes-count');
var socialCaption = document.querySelector('.social__caption');
var socialPicture = document.querySelectorAll('.social__picture');
var socialText = document.querySelectorAll('.social__text');

var onBigPictureEscPress = function (evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

var openBigPicture = function () {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
};

var closeBigPicture = function () {
  document.querySelector('.big-picture').classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
};

pictureClose.addEventListener('click', closeBigPicture);

pictureClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closeBigPicture();
  }
});

/* отрытие окна с фото и комментариями */

var fragment = document.createDocumentFragment();

pictures.forEach(function (item) {
  var imger = fragment.appendChild(renderPicture(item));
  similarListElement.appendChild(imger);
  imger.addEventListener('click', function () {
    bigPicture[0].src = imger.getElementsByTagName('img')[0].src;
    socialCaption.textContent = comments[getRandomElement(comments)].message;
    socialText[getRandomElement(socialText)].innerHTML = comments[getRandomElement(comments)].message;
    likesCount.textContent = imger.querySelector('.picture__likes').textContent;
    for (var p = 0; p < socialPicture.length; p++) {
      socialPicture[p].src = comments[getRandomElement(comments)].avatar;
      socialPicture[p].alt = comments[getRandomElement(comments)].name;
    }
    openBigPicture();
  });
  imger.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openBigPicture();
    }
  });
});
