const img = document.querySelectorAll("img");
let myPNK = (aiPNK = ""); // MY CHOICE and AI CHOICE
const tab = [...img]; // ARRAY WITH 3 ARG. P,N,K
const paper = tab[0].dataset.option; // paper
const stone = tab[1].dataset.option; // stone
const scissors = tab[2].dataset.option; // scissors
// GAME RESULTS
const win = document.querySelector("h2 span[data-summary='who-win']");

// COUNTERS (PANEL-RIGHT)
countWin = countLoss = countDraw = countGame = 0;

// MY CHOICE
function Choice() {
  img.forEach((item) =>
    item.addEventListener("click", () => {
      img.forEach((i) => (i.style.boxShadow = "")); // CLEAR BORDER
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
    win.textContent = "Draw"; // DRAW
    win.style.color = "orange";
    ++countDraw;
  } else if ((myPNK == paper && aiPNK == stone) || (myPNK == stone && aiPNK == scissors) || (myPNK == scissors && aiPNK == paper)) {
    win.textContent = "I Won!"; // USER WON
    win.style.color = "green";
    ++countWin;
  } else if ((myPNK == paper && aiPNK == scissors) || (myPNK == stone && aiPNK == paper) || (myPNK == scissors && aiPNK == stone)) {
    win.textContent = "I Lost :("; // AI WON
    win.style.color = "#a00";
    ++countLoss;
  }
}

// FUNCTION PLAY
function Start() {
  // PANEL LEFT
  const myChoice = document.querySelector("p span[data-summary='your-choice']");
  const aiChoice = document.querySelector("p span[data-summary='ai-choice']");
  document.querySelector("button").addEventListener("click", () => {
    if (myPNK == "") {
      alert("Choose Hand");
      return; // STOP FUNCTION
    }
    img.forEach((i) => (i.style.boxShadow = ""));
    myChoice.textContent = myPNK; // SHOW MY CHOICE
    aiChoice.textContent = aiPNK; // SHOW AI CHOICE
    Check(); // CHECK WHO WON
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
