'use strict';

// функция, которая возвращает случайный элемент массива
var getRandomElement = function (array) {
  var min = 0;
  var max = array.length - 1;
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return array[rand];
};


// функция создания объектов с похожими персонажами
var generateCharacters = function (charactersNumber) {
  var firstName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var secondName = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
  var characters = [];

  for (var i = 0; i < charactersNumber; i++) {
    var character = {};
    character.name = getRandomElement(firstName) + ' ' + getRandomElement(secondName);
    character.coatColor = getRandomElement(coatColor);
    character.eyesColor = getRandomElement(eyesColor);
    characters[i] = character;
  }
  return characters;
};


// функция создания DOM-элемента на основе JS-объекта
var createCharacter = function (character) {
  // находим шаблон, который будем копировать, находим элемент, в который будем вставлять похожих персонажей
  var similarCharacterTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var characterElement = similarCharacterTemplate.cloneNode(true);

  characterElement.querySelector('.setup-similar-label').textContent = character.name;
  characterElement.querySelector('.wizard-coat').style.fill = character.coatColor;
  characterElement.querySelector('.wizard-eyes').style.fill = character.eyesColor;

  return characterElement;
};


// функцию заполнения блока DOM-элементами на основе массива JS-объектов
var renderCharacter = function () {
  var CHARACTERS_NUMBER = 4; // количество похожих персонажей

  var similarListElement = document.querySelector('.setup-similar-list');

  var characters = generateCharacters(CHARACTERS_NUMBER);

  // отрисовка шаблона в документ
  var fragment = document.createDocumentFragment();

  characters.forEach(function (character) {
    fragment.appendChild(createCharacter(character));
  });

  similarListElement.appendChild(fragment);
};


var showCharacterProfile = function () {
  // показываем окно настроек пользователя
  var userDialog = document.querySelector('.setup');
  // userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden'); // показываем блок с похожими персонажами
};


showCharacterProfile(); // показываем страницу пользователя
renderCharacter(); // отрисовываем похожих персонажей

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};


setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});


userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});


var PROPERTY_NUMBERS = 3;
// var wizardCoat = setup.querySelector('.wizard-coat');
// var wizardEyes = setup.querySelector('.wizard-eyes');
// var wizardFireball = setup.querySelector('.setup-fireball-wrap');

// функция создания массива объектов, состоящего из свойств мага;
// всего в массиве три объекта: 1) свойства мантии, 2) свойства глазб 3) свойства файерболов
var generateWizardProperties = function (propertyNumbers) {
  var wizardClassNames = ['.wizard-coat', '.wizard-eyes', '.setup-fireball-wrap'];
  var wizardNames = ['coat-color', 'eyes-color', 'fireball-color'];

  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var colors = [coatColors, eyesColors, fireballColors];

  var types = [1, 1, 0]; // тип заливки цветом (background или fill)

  var properties = [];

  for (var i = 0; i < propertyNumbers; i++) {
    var property = {};
    property.property = setup.querySelector(wizardClassNames[i]);
    property.index = 0; // начальный индекс для переключения цветов
    property.type = types[i];
    property.name = document.getElementsByName(wizardNames[i]);
    property.colors = colors[i];
    properties[i] = property;
  }
  return properties;
};


var wizardProperties = generateWizardProperties(PROPERTY_NUMBERS);


// функция изменения цвета свойств мага (мантии, глаз, файеболов)
var changeColor = function (wizardProperty) {
  wizardProperty.index = (wizardProperty.index + 1) % wizardProperty.colors.length;

  if (wizardProperty.type) {
    wizardProperty.property.style.fill = wizardProperty.colors[wizardProperty.index];
  } else {
    wizardProperty.property.style.background = wizardProperty.colors[wizardProperty.index];
  }

  var propertyColor = wizardProperty.name;
  propertyColor[0].value = wizardProperty.colors[wizardProperty.index];
};


wizardProperties[0].property.addEventListener('click', function () {
  changeColor(wizardProperties[0]);
});

wizardProperties[1].property.addEventListener('click', function () {
  changeColor(wizardProperties[1]);
});

wizardProperties[2].property.addEventListener('click', function () {
  changeColor(wizardProperties[2]);
});
