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

var openPopup = function () {
  uploadForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  uploadForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
    imgUploadPreview.querySelector('img').classList.remove('.effect-chrome', '.effect-sepia', '.effect-marvin', '.effect-phobos', '.effect-heat');
    imgUploadPreview.querySelector('img').classList.add('.effect-none');
  }
};

uploadFile.addEventListener('change', function () {
  openPopup();
});

uploadFile.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

uploadCancel.addEventListener('click', function () {
  closePopup();
  imgUploadPreview.querySelector('img').classList.remove('.effect-chrome', '.effect-sepia', '.effect-marvin', '.effect-phobos', '.effect-heat');
  imgUploadPreview.querySelector('img').classList.add('.effect-none');
});

uploadCancel.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
    imgUploadPreview.querySelector('img').classList.remove('.effect-chrome', '.effect-sepia', '.effect-marvin', '.effect-phobos', '.effect-heat');
    imgUploadPreview.querySelector('img').classList.add('.effect-none');
  }
});

scaleControlMinus.addEventListener('click', function () {
  if (DEFAULT_VALUE > DEFAULT_VALUE_MIN) {
    DEFAULT_VALUE = DEFAULT_VALUE - DEFAULT_VALUE_STEP;
    scaleControl.value = DEFAULT_VALUE + '%';
    var sizeImgUploadPreview = DEFAULT_VALUE / 100;
    imgUploadPreview.querySelector('img').style.transform = 'scale(' + sizeImgUploadPreview + ')';
  }
});

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
var MAX_BRIGHTNES = 3;
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelValue = document.querySelector('.effect-level__value');

/*
*получаем число из значения left
*/
var getValueStyleLeft = window.getComputedStyle(effectLevelPin, null);
var levelPinValueStyleLeftInt = parseInt(getValueStyleLeft.left, 10);
/*
добавляем его в value
*/
effectLevelValue.value = 'levelPinValueStyleLeftInt';

document.querySelector('#effect-none').addEventListener('click', function () {
  imgUploadPreview.querySelector('img').classList.remove('.effect-chrome', '.effect-sepia', '.effect-marvin', '.effect-phobos', '.effect-heat');
  imgUploadPreview.querySelector('img').classList.add('.effect-none');
  imgUploadPreview.querySelector('img').style.filter = 'none';
  imgUploadEffectLevel.classList.add('hidden');
});
document.querySelector('#effect-chrome').addEventListener('click', function () {
  imgUploadPreview.querySelector('img').classList.remove('.effect-none', '.effect-sepia', '.effect-marvin', '.effect-phobos', '.effect-heat');
  imgUploadPreview.querySelector('img').classList.add('.effect-chrome');
  imgUploadPreview.querySelector('img').style.filter = 'grayscale(' + MAX_GRAYSCALE * levelPinValueStyleLeftInt / MAX_VALUE_EFFECT + ')';
  imgUploadEffectLevel.classList.remove('hidden');
});
document.querySelector('#effect-sepia').addEventListener('click', function () {
  imgUploadPreview.querySelector('img').classList.remove('.effect-none', '.effect-chrome', '.effect-marvin', '.effect-phobos', '.effect-heat');
  imgUploadPreview.querySelector('img').classList.add('.effect-sepia');
  imgUploadPreview.querySelector('img').style.filter = 'sepia(' + MAX_SEPIA * levelPinValueStyleLeftInt / MAX_VALUE_EFFECT + ')';
  imgUploadEffectLevel.classList.remove('hidden');
});
document.querySelector('#effect-marvin').addEventListener('click', function () {
  imgUploadPreview.querySelector('img').classList.remove('.effect-none', '.effect-chrome', '.effect-sepia', '.effect-phobos', '.effect-heat');
  imgUploadPreview.querySelector('img').classList.add('.effect-marvin');
  imgUploadPreview.querySelector('img').style.filter = 'invert(' + MAX_INVERT * levelPinValueStyleLeftInt / MAX_VALUE_EFFECT + '%' + ')';
  imgUploadEffectLevel.classList.remove('hidden');
});
document.querySelector('#effect-phobos').addEventListener('click', function () {
  imgUploadPreview.querySelector('img').classList.remove('.effect-none', '.effect-chrome', '.effect-sepia', '.effect-marvin', '.effect-heat');
  imgUploadPreview.querySelector('img').classList.add('.effect-phobos');
  imgUploadPreview.querySelector('img').style.filter = 'blur(' + MAX_BLUR * levelPinValueStyleLeftInt / MAX_VALUE_EFFECT + 'px' + ')';
  imgUploadEffectLevel.classList.remove('hidden');
});
document.querySelector('#effect-heat').addEventListener('click', function () {
  imgUploadPreview.querySelector('img').classList.remove('.effect-chrome', '.effect-sepia', '.effect-marvin', '.effect-phobos', '.effect-none');
  imgUploadPreview.querySelector('img').classList.add('.effect-heat');
  imgUploadPreview.querySelector('img').style.filter = 'blur(' + MAX_BRIGHTNES * levelPinValueStyleLeftInt / MAX_VALUE_EFFECT + ')';
  imgUploadEffectLevel.classList.remove('hidden');
});
