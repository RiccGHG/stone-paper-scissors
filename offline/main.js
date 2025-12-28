console.log("Script runs");
async function start(bot = false) {
    const h1 = document.querySelector("h1");
    h1.textContent = "Select your weapon";
  document.body.style.transition = "background 1s ease";
  document.body.style.background = "linear-gradient(135deg, blue, darkblue)";
  const player1 = await putChoices();
  //  console.log(selcted);
  document.body.style.background =
    "linear-gradient(135deg, rgb(218, 4, 4), rgb(89, 2, 2))";
  if (bot) {
    h1.textContent = "Wait for the bot";
    await botThinking();
    const botChoose = getOption();
    const playerImg = `../pictures/${player1}.png`;
    const botImg = `../pictures/${botChoose}.png`;
    const winner = decideWinner(player1, botChoose);
    h1.textContent = "Results!";
    results(playerImg, botImg, bot, winner)
  }
}
async function putChoices() {
  let choose;
  const modes = document.querySelector(".modes");
  modes.innerHTML = `
    <div>
        <label>Stone</label>
        <img src="../pictures/stone.png" data-choice="stone" alt="stone" />
      </div>
      <div>
        <label>Paper</label>
        <img src="../pictures/paper.png" data-choice="paper" alt="paper" />
      </div>
      <div>
       <label>Scissors</label>
       <img src="../pictures/scissors.png" data-choice="scissors" alt="scissors" />
      </div>
    `;
  document.querySelectorAll("img[data-choice]").forEach((img) => {
    img.addEventListener("click", () => (choose = img.dataset.choice));
  });
  await new Promise((res) => {
    const inter = setInterval(() => {
      if (choose) {
        clearInterval(inter);
        res(choose);
      }
    });
  });
  return choose;
}
async function botThinking() {
  const modes = document.querySelector(".modes");
  modes.innerHTML = "";
  modes.textContent = "Bot is thinking";
  const times = 2;
  const waitTime = 200;
  let timesDone = 0;
  await new Promise((res) => {
    const interval = setInterval(() => {
      if (timesDone >= times) {
        clearInterval(interval);
        res(timesDone);
        return;
      }
      if (modes.textContent.slice(-3, modes.textContent.length) === "...") {
        modes.textContent = "Bot is thinking";
        timesDone += 1;
      } else modes.textContent += ".";
    }, waitTime);
  });
  return timesDone;
}
function getOption() {
  const options = ["stone", "paper", "scissors"];
  const int = Math.floor(Math.random() * options.length);
  return options[int];
}

function decideWinner(player1Choice, player2Choice) {
  if (player1Choice === player2Choice) {
    return { player1: 'tied', player2: 'tied' };
  }
  const beats = {
    stone: 'scissors',
    paper: 'stone',
    scissors: 'paper',
  };
  if (beats[player1Choice] === player2Choice) {
    return { player1: 'win', player2: 'lose' };
  }
  return { player1: 'lose', player2: 'win' };
}
/**
 * 
 * @param {String} player1 
 * @param {string} player2 
 * @param {boolean} bot 
 * @param {{player1: string, player2: string}} winnerObj 
 */
function results(player1, player2, bot, winnerObj) {
    document.body.style.background = "linear-gradient(135deg, white, grey)"
  const modes = document.querySelector(".modes");
  const player2Txt = bot ? "Bot" : "Player 2";
  const player1Color = getColor(winnerObj.player1);
  const player2Color = getColor(winnerObj.player2);
  modes.innerHTML = `
    <div>
    <label style="color: ${player1Color}; font-weight: bold;">Player 1</label>
    <img src="${player1}">
    </div>
     <div>
    <label style="color: ${player2Color}; font-weight: bold;">${player2Txt}</label>
    <img src="${player2}">
    </div>
    `;
    document.querySelectorAll("img").forEach((img) => {
        img.style.cursor = "default"
    })
}
function getColor(resultType) {
    const obj = {
        win: "green",
        tied: "yellow",
        lose: "red"
    }
    return obj[resultType];
}