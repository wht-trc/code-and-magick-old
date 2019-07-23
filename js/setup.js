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
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden'); // показываем блок с похожими персонажами
};


showCharacterProfile();
renderCharacter();
