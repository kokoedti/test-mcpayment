import axios from "axios";

const getTopRatedTvShows = () => {
    return axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=d4ee404499fd3d2671c162d9d7d1d545`
    ).then((item) => {
        return item.data
    })
}

const getPopularTvShows = () => {
    return axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=d4ee404499fd3d2671c162d9d7d1d545`
    ).then((item) => {
        return item.data
    })
}

export {getPopularTvShows, getTopRatedTvShows}