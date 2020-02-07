//Refactored by Michael Clare

//Set balance to 500 and initial bet to 1
let balance = 500;
let bet = 1;
let win = false

//Sets no image at game start
document.getElementsByClassName("winLose")[0].style.display = "none"

//Functions
//This is the master function and the main engine of the entire game.
const spin = () => {
  //Function declarations and bet deduction
  let final = [];
  balance = balance - bet;
  //Runs the spinReel() funcion three times and pushes the results into the "final" array
  final.push(spinReel("r1"));   
  final.push(spinReel("r2"));
  final.push(spinReel("r3"));
  //Check for the normal win condition, three of the same items, by comparing the array elements agains one another
  if (final[0] == final[1] && final[0] == final[2]) {
    switch (true) {
      case final[0] == 0:                                             //watermelon win and reward
        balance+=bet*4
        break
      case final[0] == 1:                                             //grapes win and reward
        balance+=bet*2
        break
      case final[0] == 2:                                             //lemon win and reward
        balance+=bet*3
        break
      case final[0] == 3:                                             //orange win and reward
        balance+=bet*6
        break
      case final[0] == 4:                                             //strawberry win and reward
        balance+=bet*5
        break
      case final[0] == 5:                                             //one bar win and reward
        balance+=bet
        break
      case final[0] == 6:                                             //three bar win and reward
        balance+=bet*10
      break
    }
    win = true                              
  //Check for mixed bars win condition and if applicable, sets the prize    
  }else if (final[0] > 4 && final[1] > 4 && final[2] > 4) {
    balance+=bet*7
    win = true
  }else{
    win = false
  }
  //Decides whether to display "Win" or "Lose"
  document.getElementsByClassName("winLose")[0].style.display = ""
  win = (true) ? document.getElementById("win").src = "images/BigWin.png" : document.getElementById("win").src = "images/Fail.png";
  updateScreen();
}

//Spins a reel and generate a random image from a list. This is ran three times as part of "spin()."
const spinReel = (reel) => {
  let i = Math.floor(Math.random() * 7);
  document.getElementById(reel).src = `images/slot${i}.png`;
  return i;
}

//Updates the html that is displayed on screen, if it needs to
const updateScreen = () => {
  document.getElementById("balanceDisplay").innerHTML = balance;
  document.getElementsByTagName("p")[1].innerHTML = bet
  betChecker()
};

//Subsebsection of the updateScreen that disables buttons based on the current bet and balance values
const betChecker = () => {
  //Prevents the Raise Bet button from being set higher than the current balance.
  if (bet >= balance) {
    document.getElementById("betUp").disabled = "true"
  }else{
    document.getElementById("betUp").disabled = ""
  }
  //Prevents the bet from going below zero by disabling the Lower Bet button
  if (bet <= 0) {
    document.getElementById("betDown").disabled = "true"
  }else{
    document.getElementById("betDown").disabled = ""
  }
  //Makes sure that the bet value automatically lowers to be no higher than the current balance
  if (bet > balance) {
    bet = balance
    updateScreen()
  }
  //Removes the start button if the current balance hits zero
  if (balance <= 0) {
    document.getElementById("start").style.display = "none"
    console.log("test")
  }
}

//Event listeners
//Increases the bet value when clicked
document.getElementById("betUp").addEventListener("click", () => {
  bet++;
  document.getElementsByTagName("p")[1].innerHTML = bet;
  betChecker();
});

//Decreases the bet value when clicked
document.getElementById("betDown").addEventListener("click", () => {
  bet--;
  document.getElementsByTagName("p")[1].innerHTML = bet;
  betChecker();
});

//Runs the master function and starts the game when clicked
document.getElementById("start").addEventListener("click", spin);

//Resets the game when clicked
document.getElementById("reset").addEventListener("click", ()=> {
  window.location.reload(true)
});