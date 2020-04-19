function launch(option) {
    let N, rulesText;
    if (option === 'first') {
      N = 10;
      rulesText = firstRulesText;
    }
    else if (option === 'second') {
      N = 20;
      rulesText = secondRulesText;
    }
    
    const main = document.getElementById('main');
    const firstButton = document.getElementById('firstButton');
    const secondButton = document.getElementById('secondButton');
    const thirdButton = document.getElementById('thirdButton');
    const rules = document.getElementById('rules')
    const startButton = document.getElementById('startButton');

    main.style.display = 'none';
    firstButton.style.display = 'none';
    secondButton.style.display = 'none';
    thirdButton.style.display = 'none';
    rules.style.display = 'block';
    startButton.style.display = 'block';
    rules.innerHTML = rulesText;

    let numbers = randomArray(N);

    startButton.addEventListener('click', function() {
      rules.style.display = 'none';
      startButton.style.display = 'none';
      main.style.display = 'block';
      //console.log(numbers)
      setTimeout(function () {
        main.className = 'number';
        main.innerHTML = numbers[0];
      }, startDelay)
      setTimeout(start, startDelay + showNumberDuration)
    });

    let counter = 1; 
    function start() {
      if (counter === N) {
        return null;
      }
      else {
        main.className = 'number';
        main.innerHTML = numbers[counter];
          
        setTimeout(showForm, showNumberDuration, 'save');
        if (counter === N-1) {
            setTimeout(showForm, showFormDuration + showNumberDuration, 'finish');
        }
          
        counter++;
        setTimeout(start, showNumberDuration + showFormDuration)
      }
    }
    
    function showForm(action) {
      main.className = 'form';
      main.innerHTML = '<input type="text" placeholder="' + (action === 'save' ? 'Введите предыдущее число' : 'И последнее...') + '" pattern="[0-9]{0,4}"><button type="button" id="saveButton" onclick="' + action + '()">Сохранить</button>';
      const input = document.querySelector('input')
      input.focus();
      (function() {
        input.addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
          action === 'save' ? save() : finish();
        }
        });
      })();
    }
    
    let correct = 0;
    let results = {};
    numbers.forEach(number => results[number] = null);
    
    function save() {
      clickEffect("saveButton");
      results[numbers[counter - 2]] = document.getElementsByTagName("input")[0].value;
    }

    function finish() {
      clickEffect("saveButton");
      results[numbers[counter - 1]] = document.getElementsByTagName("input")[0].value;
      for (key in results) {
        if (Number(key) === Number(results[key])) {
          correct++;
        }
      }
      showResults(N/2, Math.floor(3*N/4 + 1), N, correct, reward);
      //console.log(results)
      //console.log(correct)
    }
}