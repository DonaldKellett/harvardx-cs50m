'use strict'

const OMDB_API_KEY = 'xxxxxxxx' // TODO: change this to your OMDb API key
const OMDB_PAGE_SIZE = 10

export const getMoviesBySearchText = async (searchText, pageNo) => {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(searchText)}&page=${pageNo}`)
  const json = await res.json()
  return {
    results: json['Search'] || [],
    pages: Math.ceil(json['totalResults'] / OMDB_PAGE_SIZE) || 0
  }
}

export const getMovieDetailsByID = async imdbID => {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}`)
  const json = await res.json()
  return json
}
