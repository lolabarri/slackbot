const SlackBot = require("slackbots");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: "TestBot",
});

bot.on("start", () => {
  bot.postMessage("U01AW151LL9", "Get inspired while working with me");
});

bot.on("error", (err) => {
  console.log(err);
});

bot.on("message", (data) => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data.text);
});

function handleMessage(message) {
  if (message.includes("inspire me")) {
    inspireMe();
  } else if (message.includes("random joke")) {
    randomJoke();
  } else if (message.includes("help")) {
    runHelp();
  }
}

function inspireMe() {
  axios
    .get(
      "https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json"
    )
    .then((res) => {
      const quotes = res.data;
      const random = Math.floor(Math.random() * quotes.length);
      const quote = quotes[random].quote;
      const author = quotes[random].author;

      bot.postMessage("U01AW151LL9", `${quote} - *${author}*`);
    });
}

function randomJoke() {
  axios.get("https://api.chucknorris.io/jokes/random").then((res) => {
    const joke = res.data.value;

    bot.postMessage("U01AW151LL9", `${joke}`);
  });
}

function runHelp() {
  bot.postMessage(
    "U01AW151LL9",
    `Type *@inspirenuggets* with *inspire me* to get an inspiring techie quote, *random joke* to get a Chuck Norris random joke and *help* to get this instruction again`
  );
}
