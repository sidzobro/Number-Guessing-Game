const start = document.getElementById("Start");
start.addEventListener("click", function() {
/*This is where user is taken after clicking the start button */

createPage();
});

function createPage(){
  const range = parseInt(document.querySelector('input[name="opt"]:checked').value);
  const pageHTML = document.createElement('section');
  /*This is where I have made a new HTML page as we were instructed not to
  make another text file.
  */
  pageHTML.innerHTML = `
    <div id="container">
          <h1> Guessing the number game</h1>
          <h2>Enter a number below</h2>
          <p><input type="number" id="userInput">
         <button id="button">Check</button></p>
          <h2 id = "message"></h2>
          <h3 id="guessingRecords">Guessing records <span id="guessesRem"></span></h3>
          <ul id="guessList"</ul>
    </div>
    <div id = "modal" class="modal">
    <div class"modal-content">
    <p id="modalMessage"></p>
    <button id="playAgain" style ="display:none;">Play again</button>
    </div>
    </div>
  `;
  /* This is where I add functions, after user is taken to the new page
  it creates a new HTML page where new designs and functions can be added.
  */ 
  
  document.body.innerHTML = '';
  document.body.appendChild(pageHTML);
  /* This is to clear the page so that you can update it with your designs and functions.
  */

  const message = document.getElementById('message');
  const button = document.getElementById('button');
  const modal =document.getElementById('modal');
  const guessList= document.getElementById('guessList');
  const guessesRem= document.getElementById('guessesRem');
  const modalMessage= document.getElementById('modalMessage');
  const randNum= Math.floor(Math.random()*(range+1)+1);
  const playAgain= document.getElementById('playAgain');

/* These are majority of my variables which I have declared using .getElementId.
These are all later used in the code down below.
It is important to know that I have declared it outside the methods.
*/
  console.log(randNum);

  const attempts= {
    10 : 3,
    100 : 7,
    1000 : 10
  };
  let counter= attempts[range];

  button.addEventListener('click', () => {
    guess = document.getElementById('userInput').value;
    guessList.innerHTML += `<li>${guess}</li>`;
    if(guess == randNum){
      message.innerHTML = "Correct. Well done!";
      showModal("Congratulations", true);
      button.disabled = true;
    }
    else if(guess < randNum && guess >= 1 && guess <= range){
     message.innerHTML ="Too low. Try again!";
     updateTheAttempts();
    }
    else if(guess > randNum && guess <= range){
      message.innerHTML = "Too high. Try again!";
      updateTheAttempts();
    }
    else if(guess <1 || guess > range){
      message.innerHTML= "Please enter the correct range";
      counter++;
    }
    /* These are all the functions which sets rules for the game.
    These also work after the certain clicks.
    */
    function updateTheAttempts(){
    if (counter > 0) {
        counter--;
        if (counter <= 0) {
          message.innerHTML = "You have no more attempts left!";
          showModal("No more guesses left!", true);
          button.disabled = true;
        } else {
          message.innerHTML += "<br>Attempts left: " + counter; 
        }
      }
    }
    /* This is where the counter is updated everytime the user guesses 
    a number*/
  });
  playAgain.addEventListener('click', () => {
    location.reload(); // Reload the page to restart the game
  });

  function showModal(msg, showButton) {
    const dialogBox = document.createElement("div");
    dialogBox.classList.add("dialog-box");
    const messagePara = document.createElement("p");
    messagePara.innerText = msg;
    dialogBox.appendChild(messagePara);
    if (showButton) {
      const playAgainButton = document.createElement("button");
      playAgainButton.innerText = "Play again";
      playAgainButton.addEventListener("click", () => {
        location.reload(); // Reload the page to restart the game
      });
      dialogBox.appendChild(playAgainButton);
    }
    modal.appendChild(dialogBox);
    modal.style.display = "block";
  /* This is where all the message displays are shown, either after
  the user has won the game or if counter limit is reached*/
  }
}

  /* Closes the modal when the user clicks anywhere outside of it*/
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
  }
}
