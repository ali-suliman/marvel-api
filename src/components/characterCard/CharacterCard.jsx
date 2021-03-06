import { useContext } from "react"
import { CharacterContext } from "../../providers/CharacterProvider"
import "./cardStyle.css"
import { useHistory } from "react-router-dom"

const CharacterCard = ({ name, thumbnail, id }) => {
  const { setCharacterId } = useContext(CharacterContext)
  const history = useHistory()

  const clickHandler = () => {
    setCharacterId(id)
    localStorage.setItem("id", id)
    history.push("character")
  }

  return (
    <div
      className="character-card"
      style={{
        backgroundImage: `url(${thumbnail.path}.${thumbnail.extension})`,
      }}
    >
      <p className="character-name">{name}</p>
      <button onClick={clickHandler}>more information</button>
    </div>
  )
}

export default CharacterCard
