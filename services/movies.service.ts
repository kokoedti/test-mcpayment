import axios from "axios";

const getTopRatedMovies = () => {
    return axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=d4ee404499fd3d2671c162d9d7d1d545`
        ).then((item) => {
        return item.data
    })
}

const getUpcomingMovies = () => {
    return axios.get(
        `https://api.themoviedb.org/3/upcoming/top_rated?api_key=d4ee404499fd3d2671c162d9d7d1d545`
        ).then((item) => {
        return item.data
    })
}

export {getTopRatedMovies, getUpcomingMovies}