const message = document.getElementById("message");
const patterns = document.getElementById("patterns");
const redactedWords = document.getElementById("redacted-words");
const wordCount = document.getElementById("word-count");
const redactCount = document.getElementById("redact-count");
const refresh = document.getElementById("refresh");
const redactnowBtn = document.getElementById("redactnow-btn");
const patternError = document.getElementById("pattern-error");

// new result array
let newResult = [];

// Event for refreshing the form inputs
refresh?.addEventListener("click", refreshFun);
redactnowBtn?.addEventListener("click", redactWordFunc);

// redact logic
function redactWordFunc(e) {
  e.preventDefault();

  //   message value and storing it LocalStorage
  let messageWordData = message.value.toLowerCase();
  localStorage.setItem("messageWordData", messageWordData);

  //   redactedWord value and storing it LocalStorage
  let redactedWordsData = redactedWords.value.toLowerCase();
  localStorage.setItem("redactedWordsData", redactedWordsData);

  // patternData value
  let patternsData = patterns.value;
  // pattern value stored in locastorage
  localStorage.setItem("patternsData", patternsData);
  patternsValidation(patternsData);

  setTimeout(() => {
    patternError.innerText = "";
  }, 1500);

  /** For Message **/

  //   regex method to take out comma and fullstops
  let result = messageWordData.replace(/,/g, "").replace(/\./g, "");

  //   process happening and turning into an array
  let messageData = result
    .trim()
    .split(" ")
    .filter((item) => item);

  /** Action took place here **/
  messageData.map((data) => {
    redactFunc(data, redactedWordsData, patternsData);
  });

  // store the wordCount length in localstorage
  let messageCount = messageData.length;
  localStorage.setItem("messageCount", messageCount);

  /**End Here for Message **/

  /** For RedactedWord **/
  let redactResult = redactedWordsData.replace(/,/g, "").replace(/\./g, "");

  let redactData = redactResult
    .trim()
    .split(" ")
    .filter((item) => item);

  // store the RedactedCount length in localstorage
  let redactedCount = redactData.length;
  localStorage.setItem("redactedCount", redactedCount);
  /** End Here for Message **/
}

// Redact word function
function redactFunc(data, redactedWordsData, patternsData) {
  if (patternsData === "none") {
    return;
  }

  let redactResult = redactedWordsData
    .replace(/,/g, "")
    .replace(/\./g, "")
    .toLowerCase();

  let redactData = redactResult
    .trim()
    .split(" ")
    .filter((item) => item);

  for (i = 0; i < redactData.length; i++) {
    if (data == redactData[i]) {
      data = patternsData;
    }
  }

  newResult.push(data);
  // - join()  turns the array into a string
  let newData = newResult.join(" ");

  // store the data in localstorage
  localStorage.setItem("redactResult", newData);
  // re-route to the next page
  window.location.assign("resultpage.html");
}

// validate patterns
function patternsValidation(patternsData) {
  if (patternsData === "none") {
    patternError.innerText = "Choose a pattern";
    return;
  }
}

function displayAllDataForMessageCountRedactWord() {
  messageWordDataValue = localStorage.getItem("messageWordData");
  redactedWordsDataValue = localStorage.getItem("redactedWordsData");
  messageCountValue = localStorage.getItem("messageCount");
  redactedCountValue = localStorage.getItem("redactedCount");
  message.value = messageWordDataValue;
  redactedWords.value = redactedWordsDataValue;
  wordCount.innerText = messageCountValue;
  redactCount.innerText = redactedCountValue;
}
displayAllDataForMessageCountRedactWord();

// Refresh the Form inputs
function refreshFun(e) {
  e.preventDefault();
  message.value = "";
  redactedWords.value = "";
  patterns.value = "none";
  localStorage.setItem("messageCount", 0);
  localStorage.setItem("redactedCount", 0);
  localStorage.setItem("patternsData", 0);
  localStorage.removeItem("messageWordData");
  localStorage.removeItem("redactedWordsData");
  localStorage.removeItem("redactResult");
  window.location.reload();
}


// Hamvurger control
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-list");
const links = document.querySelectorAll(".nav__items");
hamburger.addEventListener('click', ()=>{
    //Animate Link
navLinks.classList.toggle("open");
navLinks.style.display='flex'
links.forEach( link => {
link.classList.toggle("fade");
link.addEventListener('click' , () => {
    navLinks.style.display='none';
});
});
// Hamburger Animation
hamburger.classList.toggle("toggle");
});

// this is my own function to test the loader
// redactnowBtn.onclick = function () {
//   this.innerHTML = "<div class=loader></div>"
// }

const date = new Date();
document.getElementById('year').innerHTML = date.getFullYear();