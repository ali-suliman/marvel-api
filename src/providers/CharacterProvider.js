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
  const { characterState, setCharacterState, characterId } = useContext(
    CharacterContext
  )

  useEffect(() => fetchData(), [characterId])

  const fetchData = async () => {
    setCharacterState({
      loading: true,
      data: { id: null, character: null },
      error: null,
    })
    try {
      const res = await fetchCharacter(characterId)
      setCharacterState({
        loading: false,
        data: {
          id: characterId,
          data: res,
        },
        error: null,
      })
    } catch (error) {
      setCharacterState({
        loading: false,
        data: { id: null, data: null },
        error: error,
      })
    }
  }

  return characterState
}
