import { createContext, useContext, useState, useEffect } from "react"
import { fetchAllCharacters } from "../shared/api/MarvelAPI"

const CharactersContext = createContext()

export const CharactersProvider = ({ children }) => {
  const [charactersState, setCharactersState] = useState({
    loading: true,
    data: null,
    error: null,
  })

  return (
    <CharactersContext.Provider value={{ charactersState, setCharactersState }}>
      {children}
    </CharactersContext.Provider>
  )
}

export const GetAllCharacters = () => {
  const { charactersState, setCharactersState } = useContext(CharactersContext)

  useEffect(() => fetchData(), [])

  const fetchData = async () => {
    try {
      const res = await fetchAllCharacters()
      setCharactersState({
        loading: false,
        data: res,
        error: null,
      })
    } catch (error) {
      setCharactersState({
        loading: false,
        data: null,
        error: error,
      })
    }
  }

  return charactersState
}
