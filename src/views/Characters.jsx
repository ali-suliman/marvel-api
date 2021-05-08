import { useState, useEffect } from "react"
import { GetAllCharacters } from "../providers/AllCharactersProvider"
import CharacterCard from "../components/characterCard/CharacterCard"
import styles from "../shared/styles/home.module.css"

const Home = () => {
  const { loading, data, error } = GetAllCharacters()
  const [characters, setCharacters] = useState()

  useEffect(() => {
    data && setCharacters(data.data.results)
  }, [data])

  const searchHandler = ({ target }) => {
    const result = data.data.results.filter((character) =>
      character.name.toLowerCase().includes(target.value)
    )
    setCharacters(result)
  }

  const charactersList = () => {
    if (loading) {
      return <p className="loading-text">loading . . .</p>
    } else if (error) {
      return <p className="error-text">{error}</p>
    } else if (data.code != 200) {
      return <p className="status-text">{data.status}</p>
    } else if (characters) {
      return (
        <ul className={styles.list}>
          {characters.map((character) => (
            <li key={character.id} className={styles.listItem}>
              <CharacterCard
                id={character.id}
                name={character.name}
                thumbnail={character.thumbnail}
              />
            </li>
          ))}
        </ul>
      )
    }
  }

  return (
    <div className="wrapper">
      <header>
        <h1>This is the home coponents</h1>
        <input
          type="text"
          placeholder="Hulk, Captain Amerika, Abomination . . ."
          onChange={(e) => searchHandler(e)}
        />
        <button onClick={searchHandler}>search</button>
      </header>

      <main>
        <h3>CharactersList</h3>
        {charactersList()}
      </main>
    </div>
  )
}
export default Home
