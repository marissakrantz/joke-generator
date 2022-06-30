var fetchButton = document.getElementById('jokeGenLink');
var jokeResult = document.getElementById('joke-item');
var gifImage = document.getElementById('gif-image');
const submitEl = document.getElementById('submit');
const apiKey = '196449f4f1604e23823c2a17bf6ba22b';
const apiKeyGiphy = 'ZWjAKp5P86jpqRuDFI5NpQkLD4KIFrn0';
const baseURL = "https://v2.jokeapi.dev";
const searchJokeInput = document.getElementById('search-joke-input');
const searchHistory = document.getElementById('search-history');


function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';
  var jokeStr = "";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data != '') {
        console.log("Output" + data.joke);
      }

      jokeResult.textContent = ""

      var createDiv = document.createElement('div');
      createDiv.textContent = data.joke;
      jokeResult.appendChild(createDiv);
      jokeStr = data.category;

      generateGifImage(jokeStr);

    });
}

function generateGifImage(jokeInput) {
  var result = jokeInput.split(" ").join("+");
  console.log("Result " + result)
  var requestUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKeyGiphy}&q=${jokeInput}&limit=25&offset=0&rating=g&lang=en`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(json => {
      gifImage.textContent = ""
      console.log(json)
      console.log(json.data[0].images.original.url);

      var gifImgURL = json.data[0].images.original.url;
      var divTag = document.createElement('div');
      var imgTag = document.createElement('img');
      $(imgTag).attr("src", gifImgURL);
      $(divTag).append(imgTag);
      gifImage.append(divTag);
      // blue-text text-darken-2

    });

}
function showSearchJokeResult(event) {
  //alert("Inside showSearchJokeResult");
  // Prevent default action
  event.preventDefault();
  //console.log(event);

  var searchInput = searchJokeInput.value;
  console.log(searchInput);
  var requestUrl = `https://v2.jokeapi.dev/joke/Any?contains=${searchInput}`;
  console.log("requestUrl" + requestUrl)
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("search Joke " + data);
      if (data != '') {
        console.log("Output" + data.joke);
      }
      //jokeStr = data.joke;
      jokeResult.textContent = "";

      var createSearchDiv = document.createElement('div');
      //createDiv.addClass("blue-text text-darken-2");
      //createDiv.addClass("divText");
      createSearchDiv.textContent = data.joke;
      jokeResult.appendChild(createSearchDiv);

    });

  generateGifImage(searchInput);

  storeSearchJokeKeyword(searchInput);

}
function storeSearchJokeKeyword(searchJokeKeyword) {
  let savedSearchKey = localStorage.getItem('searchJokeKeyword');
  let searchJokeList;
  if (savedSearchKey === null) {
    searchJokeList = [];
  } else {
    searchJokeList = JSON.parse(searchJokeList);
  }
  var userSearchKey = {
    keyword: searchJokeKeyword
  };
  searchJokeList.push(userSearchKey);
  console.log("highScoresList" + searchJokeList);

  localStorage.setItem('jokeSearch', JSON.stringify(searchJokeList));
  console.log("calling populateHighScores");
  showSearchJokeKeyword();

}

function showSearchJokeKeyword() {
  let storedSearchKeyword = localStorage.getItem('jokeSearch');
  console.log("inside populateHighScores1" + storedSearchKeyword);
  if (storedSearchKeyword === null) {
    return;
  }
  var savedKeyword = JSON.parse(storedSearchKeyword);
  console.log("List Length" + savedKeyword.length);
  for (let i = 0; i < savedKeyword.length; i++) {
    var eachSearchDiv = document.createElement("div");
    eachSearchDiv.textContent = savedKeyword[i].keyword;
    searchHistory.appendChild(eachSearchDiv);
    console.log("local storage" + savedKeyword[i].keyword);
    //list.appendChild(eachSearch);
  }
}

fetchButton.addEventListener('click', getApi);
submitEl.addEventListener('click', showSearchJokeResult);

$("#clear").on("click", function (event) {
  event.preventDefault();
  jokeSearch = [];
  localStorage.removeItem("jokeSearch");
  document.location.reload();
});