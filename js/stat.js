'use strict';

// константы
var GAP = 10; // отступы сверху и снизу, слева и справа
var CLOUD_X = 100; // начальная кордината
var CLOUD_Y = 10;
var FONT_GAP = 20; // высота строки
var COLUMN_GAP = 50; // отступ от левого и правого края, отступ между столбцами

// функция поиска максимального элемента в массиве
var getMaxElement = function(arr) {
  var maxElement =  Math.max.apply(null, arr);
  return maxElement;
};

// функция получения случайного числа в интервале
var getRandomInteger = function(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
};

// функция отрисовки облака
// ctx - контекст отрисовки, x и y - координаты, color - цвет облака
var renderCloud = function(ctx, x, y, color) {
  var CLOUD_WIDTH = 420; // ширина облака
  var CLOUD_HEIGHT = 270; // высота облака

  ctx.fillStyle = color;
  // рисуем восьмиугольник
  ctx.beginPath();
  ctx.moveTo(x + 20, y);
  ctx.lineTo(x + CLOUD_WIDTH - 20, y);
  ctx.lineTo(x + CLOUD_WIDTH, y + 20);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - 20);
  ctx.lineTo(x + CLOUD_WIDTH - 20, y + CLOUD_HEIGHT);
  ctx.lineTo(x + 20, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y + CLOUD_HEIGHT - 20);
  ctx.lineTo(x, y + 20);
  ctx.fill();
};

// функция отрисовки столбцов статистики
// ctx - контекст отрисовки, names - массив имен игроков, times - массив результатов игроков
var renderColumn = function(ctx, names, times) {
  var COLUMN_WIDTH = 40; // ширина столбца
  var COLUMN_HEIGHT = 150; // максимальная высота столбца

  var maxTime = getMaxElement(times);

  names.forEach( function(name, i, names) {
    var x = CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i;
    var currentHeight = (COLUMN_HEIGHT * times[i]) / maxTime; // высота текущего столбца

    ctx.fillText(Math.round(times[i]), x, CLOUD_Y + FONT_GAP * 3 + GAP * 2 + COLUMN_HEIGHT - currentHeight);

    var randomBlue = 'rgba(0, 0, ' + getRandomInteger(0, 255) + ', 1)'; // синий цвет случайного оттенка
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : randomBlue;

    ctx.fillRect(x, CLOUD_Y + FONT_GAP * 3 + GAP * 3 + COLUMN_HEIGHT - currentHeight, COLUMN_WIDTH, currentHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], x, CLOUD_Y + FONT_GAP * 4 + GAP * 3 + COLUMN_HEIGHT);
  });
};

// функция отрисовки поздравительного текста
// ctx - контекст отрисовки
var printCongratulation = function(ctx) {
  ctx.fillStyle = '#000';

  ctx.fillText('Ура, вы победили!', CLOUD_X + COLUMN_GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + COLUMN_GAP, CLOUD_Y + GAP + FONT_GAP * 2);
};

window.renderStatistics = function(ctx, names, times) {
  var CLOUD_GAP = 10; // отступ для тени

  // тень
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');

  // облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // отрисовка поздравительного текста
  printCongratulation(ctx);

  // отрисовка столбцов статистики
  renderColumn(ctx, names, times);
};
