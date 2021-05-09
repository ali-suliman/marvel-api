import CryptoJS from "crypto-js"

const ts = new Date().getTime()
const hash = CryptoJS.MD5(
  ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_API_KEY
).toString()

export const fetchAllCharacters = async () => {
  const charactersURL = `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=1311&ts=${ts}&apikey=${process.env.REACT_APP_API_KEY}&hash=${hash}`

  const res = await fetch(charactersURL, { method: "GET" })
  const data = await res.json()

  return data
}

export const fetchCharacter = async (ID) => {
  const characterURL = `https://gateway.marvel.com:443/v1/public/characters/${ID}?ts=${ts}&apikey=${process.env.REACT_APP_API_KEY}&hash=${hash}`

  const res = await fetch(characterURL, { method: "GET" })
  const data = await res.json()

  return data
}
