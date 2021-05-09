import { createContext, useContext, useState, useEffect } from "react"
import { fetchCharacter } from "../shared/api/MarvelAPI"

export const CharacterContext = createContext()

export const CharacterProvider = ({ children }) => {
  const [characterState, setCharacterState] = useState({
    loading: true,
    data: { id: null, character: null },
    error: null,
  })
  const [characterId, setCharacterId] = useState(null)
  return (
    <CharacterContext.Provider
      value={{ characterState, setCharacterState, characterId, setCharacterId }}
    >
      {children}
    </CharacterContext.Provider>
  )
}

export const GetCharacter = () => {
  const {
    characterState,
    setCharacterState,
    characterId,
    setCharacterId,
  } = useContext(CharacterContext)

  !characterId && setCharacterId(localStorage.getItem("id"))

  useEffect(() => fetchData(), [characterId])

  const fetchData = async () => {
    setCharacterState({
      loading: true,
      data: { id: null, character: null },
      error: null,
    })
    try {
      const res = await fetchCharacter(characterId)
      setCharacterState((prevState) => ({
        ...prevState,
        loading: false,
        data: {
          id: characterId,
          data: res,
        },
      }))
    } catch (error) {
      setCharacterState((prevState) => ({
        ...prevState,
        loading: false,
        error: error,
      }))
    }
  }

  return characterState
}
