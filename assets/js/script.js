var fetchButton = document.getElementById('jokeGenLink');
var jokeResult = document.getElementById('joke-item');
var gifImage = document.getElementById('gif-image');
const apiKey = '196449f4f1604e23823c2a17bf6ba22b';
const apiKeyGiphy = 'ZWjAKp5P86jpqRuDFI5NpQkLD4KIFrn0';
const baseURL = "https://v2.jokeapi.dev";


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

fetchButton.addEventListener('click', getApi);

//window.localStorage.setItem('joke', JSON.stringify(this.id));
//window.localStorage.getItem('joke', JSON.stringify(this.id));

$("#clearHistory").on("click", function (event) {
  event.preventDefault();
  randomJokeList = [];
  localStorage.removeItem("randomJokeList");
  document.location.reload();
});
