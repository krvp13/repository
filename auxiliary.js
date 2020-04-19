function randomArray(N) {
  
  function shuffle(array) {
      while (array[0] === 0) {  
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      return array;
    }
  
  function randomFourDigitNumber() {
      const digits = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      let number = [digits[0], digits[1]]
      if ((digits[0] + digits[2])/2 === digits[1]) {
        number.push(String(digits[3]))
        number.push(String(digits[4]))
      }
      else if ((digits[1] + digits[3])/2 === digits[2]) {
        number.push(String(digits[2]))
        number.push(String(digits[4]))
      }
      else {
        number.push(String(digits[2]))
        number.push(String(digits[3]))
      }
      return Number(number.join(''));
  }

  let numbers = [];
  
  for (let i = 0; i < N; i++) {
    let number = randomFourDigitNumber()
    while (numbers.indexOf(number) !== -1) {
      number = randomFourDigitNumber()
    }
    numbers.push(number)
  }

  return numbers;
}

////////////////////////////////////////////////

function clickEffect(buttonId) {
  const button = document.getElementById(buttonId)
  button.style.fontSize = "14px";
  button.style.backgroundColor = "skyblue"; 
  setTimeout(function() {button.style.fontSize = "15px"; button.style.backgroundColor = "transparent"}, 100);
}

///////////////////////////////////////////////

function showResults(bad, good, perfect) {
  const prize = correct * reward
  main.className = 'results';
  if (correct === 0) {
    main.innerHTML = zeroResultNotification;
  }
  else if (correct < bad) {
    main.innerHTML = badResultNotification + ' <strong>' + prize + '</strong> ' + currency + '.';
  }
  else if (correct < good) {
    main.innerHTML = goodResultNotification + ' <strong>' + prize + '</strong> ' + currency + '.';
  }
  else if (correct < perfect) {
    main.innerHTML = excellentResultNotification + ' <strong>' + prize + '</strong> ' + currency + '.';
  }
  else if (correct === perfect) {
    main.innerHTML = perfectResultNotification + ' <strong>' + prize + '</strong> ' + currency + '.';
  }
}