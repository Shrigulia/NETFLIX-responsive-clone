let title = document.getElementById("title");
    title.innerHTML = JSON.parse(localStorage.getItem("movieTitle"));
    console.log(title)
    let img = document.getElementById("Img");
    let fetchingImg = JSON.parse(localStorage.getItem("movieImg"))
    img.style.backgroundImage = `url(${fetchingImg})`
    let overview = document.getElementById("overview");
    overview.innerHTML = JSON.parse(localStorage.getItem("movieOverview"))
    const movieSimilarId = JSON.parse(localStorage.getItem("movieId"))

    const fetchSimilar = `https://api.themoviedb.org/3/movie/${movieSimilarId}/similar?api_key=d5e4056f097f2068ae5f44246666ab84`
    const imgPath = "https://image.tmdb.org/t/p/original";

    fetchingSimilarMovies = () =>{
        fetch(fetchSimilar)
        .then(res => res.json())
        .then((res) => {
            const movie = res.results
            if(Array.isArray(movie) && movie.length){
                buildingSimilarMovieSection(movie)
            }
            return movie;
            })
        }

        buildingSimilarMovieSection = (movie) =>{
            console.log(movie)
            const movieDetails = movie.map((details) => {
                return `
                <div class="movieCont" id="movieCont">
                    <div class="movieRow">
                        <div class="movieRowItem" id="movieRowItem">
                            <img  src="${imgPath}${details.poster_path}" alt="${details.title}">
                        </div>
                        <div class="movieControlCont">
                            <div class="movieTitle">
                                <p>${details.title}</p>
                                <p>${details.vote_average}</p>
                            </div>
                            <div class="movieControl">
                                <i class="fa fa-plus"></i>
                                <i class="fa fa-thumbs-up" id="addToList"></i>
                                <i class="fa fa-thumbs-down"></i>
                            </div>
                            <div style="margin-top: 20px;margin-bottom: 4px;" class="releaseDate">
                                Release | ${details.release_date}
                            </div>
                        </div>
                    </div>
                </div>
                `
            }).join("")
            // console.log(movieDetails)

            const movieSec = document.getElementById("movieSec");
            const div = document.createElement("div");
            div.innerHTML = movieDetails;
            div.className = "gerneCont";
            movieSec.append(div)
        }

        window.onload = fetchingSimilarMovies();

