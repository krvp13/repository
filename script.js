const startScreen = document.getElementById('startScreen');
const main = document.getElementById('main');
const rules = document.getElementById('rules')
const startButton = document.getElementById('startButton');
const startDelay = 1000;
const showNumberDuration = 2500;
const showFormDuration = 4000;


const randomNumber = (from = 0, to = 10000) => Math.floor(Math.random() * (to - from + 1) + from);

function generateRandomNumbers(options, callback) {
  const result = [];
  let init;
  if (typeof options === 'object') {
    init = () => options;
  } else {
    init = () => ({
      count: options,
    });
  }
  const {count, from, to} = init();

  for (let i = 0; i < count; i++) {
    const rndNum = callback ? callback() : randomNumber(from, to);
    result.push(rndNum);
  }

  return result;
}

function shuffle(array) {
  while (array[0] === 0) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  return array;
}

function randNum() {
  const digits = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let number = [digits[0], digits[1]];

  if ((digits[0] + digits[2]) / 2 === digits[1]) {
    number.push(digits[3]);
    number.push(digits[4]);
  } else if ((digits[1] + digits[3]) / 2 === digits[2]) {
    number.push(digits[2]);
    number.push(digits[4]);
  } else {
    number.push(digits[2]);
    number.push(digits[3]);
  }

  return Number(number.join(''))
}

let numbers = generateRandomNumbers(10, randNum);

startButton.addEventListener('click', function () {
  startScreen.style.display = 'none';
  setTimeout(function () {
    main.className = 'number';
    main.innerHTML = numbers[0];
  }, startDelay)
  setTimeout(start, startDelay + showNumberDuration)
});

let counter = 1;

function start() {
  if (counter === 10) {
    return null;
  } else {
    main.className = 'number';
    main.innerHTML = numbers[counter];

    setTimeout(showForm, showNumberDuration, 'save');
    if (counter === 9) {
      setTimeout(showForm, showFormDuration + showNumberDuration, 'finish');
    }

    counter++;
    setTimeout(start, showNumberDuration + showFormDuration)
  }
}

results = {}
numbers.forEach(number => results[number] = null);

function showForm(action) {
  main.className = 'form';
  main.innerHTML = '<input type="text" placeholder="' + (action === 'save' ? 'Введите число' : 'И последнее...') + '" pattern="[0-9]{0,4}"><button type="button" id="saveButton" onclick="' + action + '()">Сохранить</button>';
  const input = document.querySelector('input')
  input.focus();
  (function () {
    input.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        action === 'save' ? save() : finish();
      }
    });
  })();
}

function clickEffect(buttonId) {
  const button = document.getElementById(buttonId)
  button.style.fontSize = "14px";
  setTimeout(function () {
    button.style.fontSize = "15px"
  }, 100);
}

function save() {
  clickEffect("saveButton");
  results[numbers[counter - 2]] = document.getElementsByTagName("input")[0].value;
}

function finish() {
  clickEffect("saveButton");
  results[numbers[counter - 1]] = document.getElementsByTagName("input")[0].value;
  let prize = 0;
  for (key in results) {
    if (Number(key) === Number(results[key])) {
      prize += 10;
    }
  }

  main.className = 'results';
  if (prize === 0) {
    main.innerHTML = 'К сожалению, вы ничего не заработали.';
  } else if (prize < 50) {
    main.innerHTML = 'К сожалению, вы заработали только <strong>' + prize + '</strong> рублей.';
  } else if (prize < 80) {
    main.innerHTML = 'Неплохо! Вы заработали <strong>' + prize + '</strong> рублей.';
  } else if (prize < 100) {
    main.innerHTML = 'Отлично! Вы заработали <strong>' + prize + '</strong> рублей.';
  } else if (prize === 100) {
    main.innerHTML = 'Идеальный результат! Вполне заслуженные <strong>100</strong> рублей.';
  }
  console.log(results)
}

