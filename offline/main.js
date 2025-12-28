console.log("Script runs");
async function start(bot = false) {
  document.body.style.transition = "background 1s ease";
  document.body.style.background = "linear-gradient(135deg, blue, darkblue)";
  const player1 = await putChoices();
  //  console.log(selcted);
  document.body.style.background =
    "linear-gradient(135deg, rgb(218, 4, 4), rgb(89, 2, 2))";
  if (bot) {
   await botThinking();
    console.log("done");
    
  }
}
async function putChoices() {
  let choose;
  const modes = document.querySelector(".modes");
  modes.innerHTML = `
    <div>
        <label>Stone</label>
        <img src="../pictures/people.png" data-choice="stone" alt="stone" />
      </div>
      <div>
        <label>Paper</label>
        <img src="../pictures/robot.png" data-choice="paper" alt="paper" />
      </div>
      <div>
       <label>Scissors</label>
       <img src="../pictures/people.png" data-choice="scissors" alt="scissors" />
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
  const times = 3;
  const waitTime = 300;
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
