//Mr Seagull Wrote this - IT IS AWESOMMMMMMMEEEEEEEEEEE

document.getElementById("start").addEventListener("click", spin);
document.getElementById("reset").addEventListener("click", ()=> {
  window.location.reload(true)
});

//Set balance to 500
let balance = 500;
let bet = 1;

function loser() {
  document.getElementById("win").src = "images/Fail.png";
}

function winner() {
  document.getElementById("win").src = "images/BigWin.png";
}

function spin() {
  balance = balance - bet;
  let final = [];
  final.push(spinReel("r1"));
  final.push(spinReel("r2"));
  final.push(spinReel("r3"));
  //Check if the reels match up by checking 1 and 0 & 0 and 2
  if (final[0] == final[1] && final[0] == final[2]) {
    switch (true) {
      case final[0] == 0:
        balance+=bet*4
        break
      case final[0] == 1:
        balance+=bet*2
        break
      case final[0] == 2:
        balance+=bet*3
        break
      case final[0] == 3:
        balance+=bet*6
        break
      case final[0] == 4:
        balance+=bet*5
        break
      case final[0] == 5:
        balance+=bet
        break
      case final[0] == 6:
        balance+=bet*10
      break
    }
    winner()
  }else if (final[0] > 4 && final[1] > 4 && final[2] > 4) {
    balance+=bet*7
    winner()
  } else {
    loser();
  }
  update_theScrene();
}

function spinReel(reel) {
  let i = Math.floor(Math.random() * 7);
  if (i == 0) {
    document.getElementById(reel).src = "images/Watermelon.png";
  }
  if (i == 1) {
    document.getElementById(reel).src = "images/Grapes.png";
  }
  if (i == 2) {
    document.getElementById(reel).src = "images/Lemon.png";
  }
  if (i == 3) {
    document.getElementById(reel).src = "images/Orange.png";
  }
  if (i == 4) {
    document.getElementById(reel).src = "images/Strawberry.png";
  }
  if (i == 5) {
    document.getElementById(reel).src = "images/OneBar.png";
  }
  if (i == 6) {
    document.getElementById(reel).src = "images/ThreeBars.png";
  }
  return i;
}

const update_theScrene = () => {
  document.getElementById("balanceDisplay").innerHTML = balance;
  document.getElementsByTagName("p")[1].innerHTML = bet
  betChecker()
};

const betChecker = () => {
  if (bet >= balance) {
    document.getElementById("betUp").disabled = "true"
  }else{
    document.getElementById("betUp").disabled = ""
  }
  if (bet <= 0) {
    document.getElementById("betDown").disabled = "true"
  }else{
    document.getElementById("betDown").disabled = ""
  }
  if (bet > balance) {
    bet = balance
    update_theScrene()
  }
  if (balance <= 0) {
    document.getElementById("start").style.display = "none"
    console.log("test")
  }
}

//Event listeners
document.getElementById("betUp").addEventListener("click", ()=> {bet++;document.getElementsByTagName("p")[1].innerHTML = bet;betChecker()
})

document.getElementById("betDown").addEventListener("click", ()=> {bet--;document.getElementsByTagName("p")[1].innerHTML = bet;betChecker()
})

document.getElementById("start").addEventListener("click", spin);

document.getElementById("reset").addEventListener("click", ()=> {
  window.location.reload(true)
});