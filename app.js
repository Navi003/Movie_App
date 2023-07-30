const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const searchApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280/";
const main = document.querySelector(".main");
const form = document.querySelector(".form");
const search = document.querySelector(".search");
const modal = document.querySelector("#modal");
const modalImg = document.querySelector(".imgbox");
const movieInfo = document.querySelector(".info");
const image = document.querySelector(".img");
const iconClos = document.querySelector(".icon-close");

const getrating = function (rating) {
  return (
    (rating >= 8 && "green") ||
    (rating >= 5 && "yellow") ||
    (rating >= 3 && "orange")
  );
};

const creatMovie = function (mov) {
  // console.log(mov);
  const { poster_path, title, vote_average, overview } = mov;

  const movieEL = document.createElement("div");
  // console.log(overview);
  movieEL.classList.add("movie");

  movieEL.innerHTML = `
 
  <img
    src="${IMGPATH + poster_path}"
    alt="${title}"
    datainfo="${overview}"
    class="moviePoster"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class = "${getrating(vote_average)}">${vote_average}</span>
    </div>
  `;
  main.appendChild(movieEL);
};

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const searchTerm = search.value;
  const response = await fetch(searchApi + searchTerm);
  const searchMovieData = await response.json();

  console.log(searchApi + searchTerm);

  if (searchTerm) {
    main.innerHTML = "";
    searchMovieData.results?.forEach((movie) => {
      creatMovie(movie);
    });
  }
});

const movies = async function () {
  const res = await fetch(APILINK);
  const movieData = await res.json();
  movieData.results.forEach((movie) => {
    creatMovie(movie);
  });

  return movieData;
};

// const data = document.querySelector(".moviePoster");

main.addEventListener("click", function (e) {
  const infoData = e.target.getAttribute("datainfo");
  modal.classList.remove("hidden-modal");
  const imgsSrc = e.target.src;
  image.innerHTML = `
  <img clsss="imgbox" src="${imgsSrc}" alt="" />`;
  movieInfo.innerHTML = infoData;
});

iconClos.addEventListener("click", function (e) {
  modal.classList.add("hidden-modal");
});

movies();
