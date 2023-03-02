// const api keys /domain/path`
// localStorage.clear();
const apiKey = "d5e4056f097f2068ae5f44246666ab84"
const apiDomain = "https://api.themoviedb.org/3/"
const ytApi = "https://www.googleapis.com/youtube/v3/"
const ytKey = "AIzaSyBOigV8frVxDKWUBBrsgFkko-7_hw1vu1o"
const apiPath = {
    fetchAllCategories: `${apiDomain}genre/movie/list?api_key=${apiKey}`,
    fetchMovieList: (id) => `${apiDomain}discover/movie?api_key=${apiKey}&with_genres=${id}`,
    fetchTrending: `${apiDomain}trending/all/week?api_key=${apiKey}`,
    fetchYoutubeTrailerSearch:(search) => `${ytApi}search/?part=snippet&q=${search}&key=${ytKey}`,
}
const imgPath = "https://image.tmdb.org/t/p/original";

// step 1 fetching gernes and id
fetchingCategories = () => {
    fetch(apiPath.fetchAllCategories)
    .then(res => res.json())
    .then((res) => {
        const category = res.genres
        if(Array.isArray(category) && category.length){
            category.forEach((movieGerne)=>{
                fetchingMovieLink(apiPath.fetchMovieList(movieGerne.id),movieGerne.name)
            })
        }
    })
    .catch(err => console.log("error getting gernes & id"))
}

// step 2 fetching movie list with id and names
fetchingMovieLink = (movieUrl , category ) => {
    fetch(movieUrl)
    .then(res => res.json())
    .then((res) => {
        const movie = res.results
        if(Array.isArray(movie) && movie.length){
            buildingMovieSections(movie , category)
        }
    })
    .catch(err => console.log("error getting movie lists "))
}

// step 3 
buildingMovieSections = (movieList , category) => {
    const movieDetails = movieList.map((details) => {
        return `
            <div class="movieCont" id="movieCont">
                <div class="movieRow">
                    <a href="movieplay.html">
                        <div onclick="getMoviePlayInfo(event)" class="movieRowItem" id="movieRowItem">
                            <img src="${imgPath}${details.poster_path}" alt="${details.title}" id="${details.id}")>
                            <p>${details.overview}</p>
                        </div>
                    </a>
                    <div class="movieControlCont">
                        <div class="movieTitle">
                            <p>${details.title}</p>
                            <p>${details.vote_average}</p>
                        </div>
                        <div class="movieControl">
                            <i class="fa fa-plus" onclick="getParentElement(event)"></i>
                            <i  onclick="changeIfLikeorDislike(event)" class="fa fa-thumbs-up"></i>
                            <i  class="fa fa-thumbs-down"></i>
                        </div>
                        <div style="margin-top: 20px;margin-bottom: 4px;" class="releaseDate">
                            <p>Release | ${details.release_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join("");    

    const movieHTML = `
        <h2 class="gerneHeading">${category}
        <a href="exploreNow.html">
            <span class="exploreNow">Explore Now</span>
        </a>
        </h2>
        <div class = "movieHold">
            ${movieDetails}
        </div>`
    
    const movieSec = document.getElementById("movieSec"); 
    const div = document.createElement("div");
    div.innerHTML = movieHTML;
    div.className = "gerneCont";
    div.classList.add("container")
    movieSec.append(div)
}

// step 4 fetching tredning movies

fetchTrendingMovies = () =>{
    fetchingMovieLink(apiPath.fetchTrending,"Trending Now")
}

// step 5 building banner section
buildingBannerSection = () =>{
    fetch(apiPath.fetchTrending)
    .then(res => res.json())
    .then((res) => {
        const trendingList = res.results;
        // console.log(typeof(trendingList))
        // console.log(Array.isArray(trendingList))
        // console.log(trendingList)
        const randomIndex = Math.floor(Math.random() * trendingList.length);
        const bannerSec = document.getElementById("bannerSec")
        bannerSec.style.backgroundImage = `url(${imgPath}${trendingList[randomIndex].backdrop_path})`
        const div = document.createElement("div");
        div.innerHTML = `
            <h2 class="bannerTitle">${trendingList[randomIndex].title}</h2>
            <p class="bannerOverview">${trendingList[randomIndex].overview}</p>
            <p class="releaseBanner">Release | ${trendingList[randomIndex].release_date}</p>
            <p class="ratingBanner">IMDB | ${trendingList.vote_average}</p>
            <div class="btnCont">
                <button class="actionButton"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>&nbsp;&nbsp;&nbsp;Play</button>
                <button class="actionButton"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg>&nbsp;&nbsp;&nbsp;More info</button>
            </div>
        `
        div.className = "bannerCont";
        bannerSec.append(div);    
        })
        .catch(err => console.log(err))
    }

// step 6 movie main screen with playing controls
getMoviePlayInfo = (event)=>{
    let clicked = event.target;

    let fetchedImg = clicked.parentElement.firstElementChild.src;
    localStorage.setItem("movieImg",JSON.stringify(fetchedImg))

    let fetchedTitle = clicked.parentElement.firstElementChild.alt;
    localStorage.setItem("movieTitle",JSON.stringify(fetchedTitle))

    let fetchedMovieId = clicked.parentElement.firstElementChild.id;
    localStorage.setItem("movieId",JSON.stringify(fetchedMovieId))

    let fetchedOverview = clicked.parentElement.lastElementChild.innerHTML;
    localStorage.setItem("movieOverview",JSON.stringify(fetchedOverview))
}

// step 7 adding movie to list (not working properly)
let listArr = [];
getParentElement = (event) =>{
    let clicked = event.target  
    let listAdded = clicked.parentElement.parentElement.parentElement.parentElement.outerHTML
    listArr.push(listAdded)
    let newarr = [...listArr];
    console.log(newarr)
    localStorage.setItem("listAdded",JSON.stringify(newarr))
}

// step 8 hamburger menu

let menu_o = document.getElementById("menu");
menu_o.addEventListener("click",function(){
    menu_o.classList.toggle("toogle")
});


let menu = document.getElementById("menu")
// console.log(menu)
let hamburgerMenu = document.getElementById("hamburgerMenu")
// console.log(hamburgerMenu)
menu.addEventListener("click",()=>{
    if(hamburgerMenu.style.width != "190px"){
        hamburgerMenu.style.width = "190px"
    }
    else{
        hamburgerMenu.style.width = "0px"
    }
})







































init = () =>{
    fetchingCategories();
    fetchTrendingMovies();
    buildingBannerSection();
}

window.addEventListener("load",function(){
    init();
    window.addEventListener("scroll",function(){
        const header = this.document.getElementById("header");
        if(this.window.scrollY > 9){
            header.classList.add("bgcolor")
        }
        else{
            header.classList.remove("bgcolor")
        }
    })
})