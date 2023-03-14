const img = document.querySelectorAll("img");
let myPNK = ""; // MY CHOICE
let aiPNK = ""; // AI CHOICE
const tab = [...img]; // ARRAY WITH 3 ARG. P,N,K
const papier = tab[0].dataset.option; // paper
const kamien = tab[1].dataset.option; // stone
const nozyczki = tab[2].dataset.option; // scissors
// GAME RESULTS
const iWin = "Wygrałem!";
const aiWin = "Przegrałem :(";
const draw = "Remis";
const win = document.querySelector("h2 span[data-summary='who-win']");

// COUNTERS:  PANEL-RIGHT
let countWin = 0;
let countLoss = 0;
let countDraw = 0;
let countGame = 0;

// MY CHOICE
function Choice() {
  img.forEach((item) =>
    item.addEventListener("click", () => {
      img.forEach((i) => {
        i.style.boxShadow = ""; // CLEAR BORDER
      });
      myPNK = item.dataset.option;
      item.style.boxShadow = "0 0 0 0" + 5 + "px chartreuse";
      // AI CHOICE
      const aiRnd = () => Math.floor(Math.random() * (3 - 0) + 0); // RANDOM 0-2
      img.forEach((i) => {
        tab[i] = i.dataset.option;
        aiPNK = tab[aiRnd()].dataset.option;
      });
    })
  );
}

// CHECK CONDITIONS WIN
function Check() {
  if (myPNK == aiPNK) {
    win.textContent = draw; // DRAW
    win.style.color = "orange";
    ++countDraw;
  } else if (
    (myPNK == papier && aiPNK == kamien) ||
    (myPNK == kamien && aiPNK == nozyczki) ||
    (myPNK == nozyczki && aiPNK == papier)
  ) {
    win.textContent = iWin; // USER WIN
    win.style.color = "lime";
    ++countWin;
  } else if (
    (myPNK == papier && aiPNK == nozyczki) ||
    (myPNK == kamien && aiPNK == papier) ||
    (myPNK == nozyczki && aiPNK == kamien)
  ) {
    win.textContent = aiWin; // AI WIN
    win.style.color = "#a00";
    ++countLoss;
  }
}

// FUNCTION PLAY
function Start() {
  const btn = document.querySelector("button");
  // PANEL LEFT
  const myChoice = document.querySelector("p span[data-summary='your-choice']");
  const aiChoice = document.querySelector("p span[data-summary='ai-choice']");

  btn.addEventListener("click", () => {
    if (myPNK == "") {
      alert("Wybierz Dłoń!");
      return; // STOP FUNCTION
    }
    img.forEach((i) => {
      i.style.boxShadow = "";
    });
    myChoice.textContent = myPNK; // SHOW MY CHOICE
    aiChoice.textContent = aiPNK; // SHOW AI CHOICE
    Check(); // CHECK WHO WIN
    document.querySelector("p.numbers span").textContent = ++countGame;
    document.querySelector("p.wins span").textContent = countWin;
    document.querySelector("p.losses span").textContent = countLoss;
    document.querySelector("p.draws span").textContent = countDraw;
    myPNK = "";
  });
}

Start();
Choice();

/* NAJPIERW W GŁOWIE 'CO TRZEBA ZROBIĆ', a POTEM ROZPISAĆ !!!

1. Przejąć (wartość) co zostało kliknięte i oznaczyć to
2. Obsłużyć przycisk 'LET'S PLAY' tj. ustalić:
     a. co wybrał komputer
     b. kto wygrał win/loss/draw (zbudować warunki porównujące)
3. Zaktualizować dane o grze (lewa + prawa kolumna)
*/
// 100% my work :)
