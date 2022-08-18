const redactedResult = document.getElementById("redacted-result");
const messageWordNumber = document.getElementById("messageWordNumber");
const redactedWordNumber = document.getElementById("redactedWordNumber");
const sendbackBtn = document.getElementById("sendback-btn");
const matchWord = document.getElementById("matchword");
const sendBtn = document.getElementById("send-btn");
const sendContainer = document.getElementById("sendContainer");

sendbackBtn?.addEventListener("click", sendBackFunc);
sendBtn?.addEventListener("click", sendBtnFunc);

function getData() {
  const getItemData = localStorage.getItem("redactResult");
  const getMessageWordNumber = localStorage.getItem("messageCount");
  const getredactedWordNumber = localStorage.getItem("redactedCount");
  redactedResult.value = getItemData;
  messageWordNumber.innerText = getMessageWordNumber;
  redactedWordNumber.innerText = getredactedWordNumber;

  const patternsDataFromLocalStorage = localStorage.getItem("patternsData");

  const matchwordData = getItemData.split(" ");
  let matchwordarray = [];
  matchwordData.filter((word) => {
    if (word === patternsDataFromLocalStorage) {
      matchwordarray.push(word);
    }
  });
  const matchwordarrayLength = matchwordarray.length;
  matchWord.innerText = matchwordarrayLength;
}
getData();

function sendBackFunc() {
  window.location.assign("index.html");
}

// send message function
function sendBtnFunc() {
  sendContainer.style.display = "grid";
  // take the modal out after 2sec
  setTimeout(() => {
    sendContainer.style.display = "none";
  }, 2000);
}
