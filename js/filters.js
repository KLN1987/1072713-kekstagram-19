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
/* var effectRadio = document.querySelector('.effects__radio');*/
var hashtagText = document.querySelector('.text__hashtags');
var uploadSubmit = document.querySelector('#upload-submit');

/* функция открытия закрытого окна */
var openPopup = function () {
  uploadForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

/* функция закрытия открытого окна */
var closePopup = function () {
  uploadForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

/* закрытие на ESC и не закрытие, если курсор в поле ввода хэштега */
var onPopupEscPress = function (evt) {
  if (hashtagText === document.activeElement) {
    hashtagText.setCustomValidity('Введите хэштег или уберите курсор из поля ввода');
    return false;
  } else if (evt.key === ESC_KEY) {
    closePopup();
    imgUploadPreview.querySelector('img').classList.remove('.effect-chrome', '.effect-sepia', '.effect-marvin', '.effect-phobos', '.effect-heat');
    imgUploadPreview.querySelector('img').classList.add('.effect-none');
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
  imgUploadPreview.querySelector('img').classList.remove('.effect-chrome', '.effect-sepia', '.effect-marvin', '.effect-phobos', '.effect-heat');
  imgUploadPreview.querySelector('img').classList.add('.effect-none');
});

/* закрытие и сброс при этом до класса .effect-noneпр нажатии на Enter*/
uploadCancel.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
    imgUploadPreview.querySelector('img').classList.remove('.effect-chrome', '.effect-sepia', '.effect-marvin', '.effect-phobos', '.effect-heat');
    imgUploadPreview.querySelector('img').classList.add('.effect-none');
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

var MAX_VALUE_EFFECT = 100;
var MAX_GRAYSCALE = 1;
var MAX_SEPIA = 1;
var MAX_INVERT = 100;
var MAX_BLUR = 3;
var MIN_BRIGHTNES = 1;
var effectLevelPin = document.querySelector('.effect-level__pin');
var getValueStyleLeft = window.getComputedStyle(effectLevelPin).left;
var levelPinValueStyleLeft = parseFloat(getValueStyleLeft);
// var levelPinValueStyleLeftInt = parseInt(getValueStyleLeft, 10);


/* переключение стилей для фото и событие moseup*/
document.querySelector('#effect-none').addEventListener('click', function () {
  // imgUploadPreview.querySelector('img').classList.remove('.effect-chrome', '.effect-sepia', '.effect-marvin', '.effect-phobos', '.effect-heat');
  imgUploadPreview.querySelector('img').removeAttribute('class');
  imgUploadPreview.querySelector('img').classList.add('.effect-none');
  imgUploadPreview.querySelector('img').style.filter = 'none';
  imgUploadEffectLevel.classList.add('hidden');
});
document.querySelector('#effect-chrome').addEventListener('click', function () {
  // imgUploadPreview.querySelector('img').classList.remove('.effect-none', '.effect-sepia', '.effect-marvin', '.effect-phobos', '.effect-heat');
  imgUploadPreview.querySelector('img').removeAttribute('class');
  imgUploadPreview.querySelector('img').classList.add('.effect-chrome');
  imgUploadPreview.querySelector('img').style.filter = 'grayscale(' + (MAX_GRAYSCALE * levelPinValueStyleLeft / MAX_VALUE_EFFECT) + ')';
  imgUploadEffectLevel.classList.remove('hidden');
  effectLevelPin.addEventListener('mouseup', function () {
    imgUploadPreview.querySelector('img').style.filter = 'grayscale(' + (MAX_GRAYSCALE * levelPinValueStyleLeft / MAX_VALUE_EFFECT) + ')';
  });
});
document.querySelector('#effect-sepia').addEventListener('click', function () {
  // imgUploadPreview.querySelector('img').classList.remove('.effect-none', '.effect-chrome', '.effect-marvin', '.effect-phobos', '.effect-heat');
  imgUploadPreview.querySelector('img').removeAttribute('class');
  imgUploadPreview.querySelector('img').classList.add('.effect-sepia');
  imgUploadPreview.querySelector('img').style.filter = 'sepia(' + (MAX_SEPIA * levelPinValueStyleLeft / MAX_VALUE_EFFECT) + ')';
  imgUploadEffectLevel.classList.remove('hidden');
  effectLevelPin.addEventListener('mouseup', function () {
    imgUploadPreview.querySelector('img').style.filter = 'sepia(' + (MAX_SEPIA * levelPinValueStyleLeft / MAX_VALUE_EFFECT) + ')';
  });
});
document.querySelector('#effect-marvin').addEventListener('click', function () {
  // imgUploadPreview.querySelector('img').classList.remove('.effect-none', '.effect-chrome', '.effect-sepia', '.effect-phobos', '.effect-heat');
  imgUploadPreview.querySelector('img').removeAttribute('class');
  imgUploadPreview.querySelector('img').classList.add('.effect-marvin');
  imgUploadPreview.querySelector('img').style.filter = 'invert(' + (MAX_INVERT * levelPinValueStyleLeft / MAX_VALUE_EFFECT) + '%' + ')';
  imgUploadEffectLevel.classList.remove('hidden');
  effectLevelPin.addEventListener('mouseup', function () {
    imgUploadPreview.querySelector('img').style.filter = 'invert(' + (MAX_INVERT * levelPinValueStyleLeft / MAX_VALUE_EFFECT) + '%' + ')';
  });
});
document.querySelector('#effect-phobos').addEventListener('click', function () {
  // imgUploadPreview.querySelector('img').classList.remove('.effect-none', '.effect-chrome', '.effect-sepia', '.effect-marvin', '.effect-heat');
  imgUploadPreview.querySelector('img').removeAttribute('class');
  imgUploadPreview.querySelector('img').classList.add('.effect-phobos');
  imgUploadPreview.querySelector('img').style.filter = 'blur(' + (MAX_BLUR * levelPinValueStyleLeft / MAX_VALUE_EFFECT) + 'px' + ')';
  imgUploadEffectLevel.classList.remove('hidden');
  effectLevelPin.addEventListener('mouseup', function () {
    imgUploadPreview.querySelector('img').style.filter = 'blur(' + (MAX_BLUR * levelPinValueStyleLeft / MAX_VALUE_EFFECT) + 'px' + ')';
  });
});
document.querySelector('#effect-heat').addEventListener('click', function () {
  // imgUploadPreview.querySelector('img').classList.remove('.effect-chrome', '.effect-sepia', '.effect-marvin', '.effect-phobos', '.effect-none');
  imgUploadPreview.querySelector('img').removeAttribute('class');
  imgUploadPreview.querySelector('img').classList.add('.effect-heat');
  imgUploadPreview.querySelector('img').style.filter = 'brightness(' + (MIN_BRIGHTNES + levelPinValueStyleLeft * 2 / MAX_VALUE_EFFECT) + ')';
  imgUploadEffectLevel.classList.remove('hidden');
  effectLevelPin.addEventListener('mouseup', function () {
    imgUploadPreview.querySelector('img').style.filter = 'brightness(' + (MIN_BRIGHTNES + levelPinValueStyleLeft * 2 / MAX_VALUE_EFFECT) + ')';
  });
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
