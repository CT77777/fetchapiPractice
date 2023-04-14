const select = document.getElementById("breeds");
const card = document.querySelector(".card");
const form = document.querySelector("form");

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
    .then((response) => {
      return checkStatus(response);
    })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.log("something is wrong", error);
    });
}

Promise.all([
  fetchData("https://dog.ceo/api/breeds/image/random"),
  fetchData("https://dog.ceo/api/breeds/list"),
]).then((data) => {
  const randomImage = data[0];
  const breedList = data[1];
  generateImage(randomImage);
  generateOption(breedList);
});

// fetchData("https://dog.ceo/api/breeds/image/random").then((data) => {
//   generateImage(data);
// });

// fetchData("https://dog.ceo/api/breeds/list").then((data) => {
//   generateOption(data);
// });

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
  if (response.ok === true) {
    // console.log("okkkkk");
    return response; // Promise.resolve(response) ensure the returned value is always promise object
  } else {
    // console.log("noooooo");
    // console.log(response);
    // console.log(response.status);
    // console.log(Promise.reject(new Error(response.status)));
    return Promise.reject(new Error(response.status));
  }
}

function generateImage(data) {
  const html = `<img src="${data.message}">
  <p>Click to view ${select.value}</p>`;
  card.innerHTML = html;
}

function generateOption(data) {
  const html = data.message.map((item) => {
    return `<option value="${item}">${item}</option>`;
  });
  select.innerHTML = html.join(""); // turn into string with separating by ""
}

function generateBreedImage() {
  const breed = select.value;
  const img = document.querySelector("img");
  const p = document.querySelector("p");

  // if response don't use .then() to handle with, the data of the response will not be object format.
  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`).then((data) => {
    img.src = `${data.message}`;
    p.textContent = `Click to view ${breed}`;
  });
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener("change", () => {
  generateBreedImage();
});

card.addEventListener("click", () => {
  generateBreedImage();
});

form.addEventListener("submit", (event) => {
  postData(event);
}); // need one variable to receive the event object

// ------------------------------------------
//  POST DATA
// ------------------------------------------

function postData(event) {
  event.preventDefault(); //prevent browser from directly submitting the form and reloading the page
  const name = document.querySelector("#name").value;
  const comment = document.querySelector("#comment").value;

  fetch("https://jsonplaceholder.typicode.com/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // tell the server submitted data is json format
    body: JSON.stringify({ names: name, comments: comment }), // convert data to JSON string format
  })
    .then((response) => {
      return checkStatus(response);
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Return Data:", data);
    });
}
