import { useState, useEffect } from "react"
import { GetAllCharacters } from "../providers/AllCharactersProvider"
import CharacterCard from "../components/characterCard/CharacterCard"
import { useHistory } from "react-router-dom"

import logo from "../shared/assets/images/marvel_logo.svg"

import styles from "../shared/styles/characters.module.css"
import btnStyle from "../shared/styles/shared.module.css"
import Loader from "react-loader-spinner"
import { RiArrowDropUpLine } from "react-icons/ri"
import "./characters.css"

const Home = () => {
  const { loading, data, error } = GetAllCharacters()
  const [characters, setCharacters] = useState()
  const history = useHistory()

  useEffect(() => {
    data && setCharacters(data.data.results)
  }, [data])

  const searchHandler = ({ target }) => {
    const result = data.data.results.filter((character) =>
      character.name.toLowerCase().includes(target.value.toLowerCase())
    )
    setCharacters(result)
  }

  const clickHandler = () => {
    history.goBack()
  }

  const scrollHandlre = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const charactersList = () => {
    if (loading) {
      return (
        <>
          <Loader
            width={46}
            type="TailSpin"
            color="#951519"
            style={{ margin: "8rem 0rem" }}
          />
        </>
      )
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
    <div className="wrapper characters-container">
      <header>
        <img src={logo} alt="marvel logo" className="logo" />
        <p>filter character by name</p>
        <section className="ctas">
          <input
            type="text"
            placeholder="Hulk, Captain Amerika, Abomination . . ."
            onChange={(e) => searchHandler(e)}
          />
          <button onClick={clickHandler} className={btnStyle.cta}>
            go back
          </button>
        </section>
      </header>

      <main>{charactersList()}</main>
      <button className={btnStyle.cta + " back-to-top"} onClick={scrollHandlre}>
        <RiArrowDropUpLine size={32} />
      </button>
    </div>
  )
}
export default Home
