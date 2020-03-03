'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var DEFAULT_VALUE = 100;
var DEFAULT_VALUE_MAX = 100;
var DEFAULT_VALUE_MIN = 25;
var DEFAULT_VALUE_STEP = 25;
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var uploadForm = document.querySelector('.img-upload__overlay');
var scaleControlMinus = document.querySelector('.scale__control--smaller');
var scaleControlPlus = document.querySelector('.scale__control--bigger');
var scaleControl = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
// var spanEffect = document.querySelectorAll('.effects__preview');
var hashtagText = document.querySelector('.text__hashtags');
var uploadSubmit = document.querySelector('#upload-submit');

/* var MAX_VALUE_EFFECT = 456;
var MAX_GRAYSCALE = 1;
var MAX_SEPIA = 1;
var MAX_INVERT = 100;
var MAX_BLUR = 3;
var MIN_BRIGHTNES = 1;*/

/* функция открытия закрытого окна */
var openPopup = function () {
  uploadForm.classList.remove('hidden');
  imgUploadEffectLevel.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

/* функция закрытия открытого окна */
var closePopup = function () {
  uploadForm.classList.add('hidden');
  imgUploadPreview.querySelector('img').removeAttribute('class');
  imgUploadPreview.querySelector('img').classList.add('.effect-none');
  document.removeEventListener('keydown', onPopupEscPress);
};

/* закрытие на ESC и не закрытие, если курсор в поле ввода хэштега */
var onPopupEscPress = function (evt) {
  if (hashtagText === document.activeElement) {
    hashtagText.setCustomValidity('Введите хэштег или уберите курсор из поля ввода');
    return false;
  } else if (evt.key === ESC_KEY) {
    closePopup();
    // imgUploadPreview.querySelector('img').removeAttribute('class');
    // imgUploadPreview.querySelector('img').classList.add('.effect-none');
  }
  return true;
};

/* открытие формы */
uploadFile.addEventListener('change', function () {
  openPopup();
});

/* открытие с клавиатуры через Enter */
uploadFile.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

/* закрытие и сброс при этом до класса .effect-none */
uploadCancel.addEventListener('click', function () {
  closePopup();
  // imgUploadPreview.querySelector('img').removeAttribute('class');
  // imgUploadPreview.querySelector('img').classList.add('.effect-none');
});

/* закрытие и сброс при этом до класса .effect-noneпр нажатии на Enter*/
uploadCancel.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
    // imgUploadPreview.querySelector('img').removeAttribute('class');
    // imgUploadPreview.querySelector('img').classList.add('.effect-none');
  }
});

/* уменьшение фото при нажатии на минус до 25% */
scaleControlMinus.addEventListener('click', function () {
  if (DEFAULT_VALUE > DEFAULT_VALUE_MIN) {
    DEFAULT_VALUE = DEFAULT_VALUE - DEFAULT_VALUE_STEP;
    scaleControl.value = DEFAULT_VALUE + '%';
    var sizeImgUploadPreview = DEFAULT_VALUE / 100;
    imgUploadPreview.querySelector('img').style.transform = 'scale(' + sizeImgUploadPreview + ')';
  }
});

/* увеличение фото при нажатии на минус до 100% */
scaleControlPlus.addEventListener('click', function () {
  if (DEFAULT_VALUE < DEFAULT_VALUE_MAX && DEFAULT_VALUE >= DEFAULT_VALUE_MIN) {
    DEFAULT_VALUE = DEFAULT_VALUE + DEFAULT_VALUE_STEP;
    scaleControl.value = DEFAULT_VALUE + '%';
    var sizeImgUploadPreview = DEFAULT_VALUE / 100;
    imgUploadPreview.querySelector('img').style.transform = 'scale(' + sizeImgUploadPreview + ')';
  }
});

// var effectRadio = document.querySelectorAll('.effects__radio');
var effectLabel = document.querySelectorAll('.effects__label');
for (var j = 0; j < effectLabel.length; j++) {
  effectLabel[j].addEventListener('click', function () {
    imgUploadPreview.querySelector('img').removeAttribute('class');
    imgUploadEffectLevel.classList.remove('hidden');
    var effectRadioChecked = document.querySelector('.effects__radio:checked');
    imgUploadPreview.querySelector('img').classList.add('.effect-' + effectRadioChecked.value);
  });
}

/* var filter = '';
/* переключение стилей для фото и событие moseup
for (var j = 0; j < spanEffect.length; j++) {
  spanEffect[j].addEventListener('click', function (evt) {
    effectLevelPin.style.left = MAX_VALUE_EFFECT + 'px';
    effectLevelDepth.style.width = MAX_VALUE_EFFECT + 'px';
    effectLevelValue.value = MAX_VALUE_EFFECT;
    imgUploadPreview.querySelector('img').removeAttribute('class');
    imgUploadEffectLevel.classList.remove('hidden');
    if (evt.target.classList.contains('effects__preview--none')) {
      imgUploadPreview.querySelector('img').classList.add('.effect-none');
      imgUploadPreview.querySelector('img').style.filter = 'none';
      imgUploadEffectLevel.classList.add('hidden');
    } else if (evt.target.classList.contains('effects__preview--chrome')) {
      imgUploadPreview.querySelector('img').classList.add('.effect-chrome');
      filter = 'grayscale';
      imgUploadPreview.querySelector('img').style.filter = 'grayscale(' + (MAX_GRAYSCALE * effectLevelValue.value / MAX_VALUE_EFFECT) + ')';
    } else if (evt.target.classList.contains('effects__preview--sepia')) {
      imgUploadPreview.querySelector('img').classList.add('.effect-sepia');
      filter = 'sepia';
      imgUploadPreview.querySelector('img').style.filter = 'sepia(' + (MAX_SEPIA * effectLevelValue.value / MAX_VALUE_EFFECT) + ')';
    } else if (evt.target.classList.contains('effects__preview--marvin')) {
      imgUploadPreview.querySelector('img').classList.add('.effect-marvin');
      filter = 'invert';
      imgUploadPreview.querySelector('img').style.filter = 'invert(' + (MAX_INVERT * effectLevelValue.value / MAX_VALUE_EFFECT) + '%' + ')';
    } else if (evt.target.classList.contains('effects__preview--phobos')) {
      imgUploadPreview.querySelector('img').classList.add('.effect-phobos');
      filter = 'blur';
      imgUploadPreview.querySelector('img').style.filter = 'blur(' + (MAX_BLUR * effectLevelValue.value / MAX_VALUE_EFFECT) + 'px' + ')';
    } else if (evt.target.classList.contains('effects__preview--heat')) {
      imgUploadPreview.querySelector('img').classList.add('.effect-heat');
      filter = 'brightness';
      imgUploadPreview.querySelector('img').style.filter = 'brightness(' + (MIN_BRIGHTNES + effectLevelValue.value * 2 / MAX_VALUE_EFFECT) + ')';
    }
  });
} */


var effectLevel = document.querySelector('.effect-level');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    var shiftX = startCoordX - upEvt.clientX;

    startCoordX = upEvt.clientX;

    effectLevelPin.style.left = (effectLevelPin.offsetLeft - shiftX) + 'px';
    effectLevelDepth.style.width = effectLevelPin.style.left;
    effectLevelValue.setAttribute('value', parseFloat(effectLevelPin.style.left));
    /* if (filter === 'grayscale') {
      imgUploadPreview.querySelector('img').style.filter = 'grayscale(' + (MAX_GRAYSCALE * effectLevelValue.value / MAX_VALUE_EFFECT) + ')';
    } else if (filter === 'sepia') {
      imgUploadPreview.querySelector('img').style.filter = 'sepia(' + (MAX_SEPIA * effectLevelValue.value / MAX_VALUE_EFFECT) + ')';
    } else if (filter === 'invert') {
      imgUploadPreview.querySelector('img').style.filter = 'invert(' + (MAX_INVERT * effectLevelValue.value / MAX_VALUE_EFFECT) + '%' + ')';
    } else if (filter === 'blur') {
      imgUploadPreview.querySelector('img').style.filter = 'blur(' + (MAX_BLUR * effectLevelValue.value / MAX_VALUE_EFFECT) + 'px' + ')';
    } else if (filter === 'brightness') {
      imgUploadPreview.querySelector('img').style.filter = 'brightness(' + (MIN_BRIGHTNES + effectLevelValue.value * 2 / MAX_VALUE_EFFECT) + ')';
    }*/

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

/* проверка правильности ввода хэштегов */

var validateHashtag = function (hashtag) {
  if (hashtag[0] !== '#') {
    hashtagText.setCustomValidity('Хэш-тег начинается с символа #');
    return false;
  } else if (hashtag.length < 2) {
    hashtagText.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
    return false;
  } else if (hashtag.length > 20) {
    hashtagText.setCustomValidity('Максимальная длина одного хэш-тега 20 символов включая решетку');
    return false;
  } else if (hashtag.indexOf('#', 1) > 0) {
    hashtagText.setCustomValidity('Хэш-теги разделяются пробелами');
    return false;
  }
  return true;
};

var onInputInput = function () {
  hashtagText.setCustomValidity('');
};

uploadSubmit.addEventListener('click', function () {
  if (hashtagText.value !== '') {
    var hashtagArray = hashtagText.value.toLowerCase().split(' ');
    for (var i = 0; i < hashtagArray.length; i++) {
      var isHashtagValid = validateHashtag(hashtagArray[i]);
      if (!isHashtagValid) {
        break;
      }
      if (hashtagArray.indexOf(hashtagArray[i], i + 1) > 0) {
        hashtagText.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        break;
      }
    }
    if (hashtagArray.length > 5) {
      hashtagText.setCustomValidity('Хэштегов может быть максимум 5');
    }
  }
});

hashtagText.addEventListener('input', onInputInput);
