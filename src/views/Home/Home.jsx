import React from "react"
import logo from "../../shared/assets/images/marvel_logo.svg"
import { useHistory } from "react-router-dom"
import "./home.css"
import styles from "../../shared/styles/shared.module.css"

const Home = () => {
  const history = useHistory()
  const clickHandler = () => {
    history.push("/characters")
  }

  return (
    <div className="wrapper home-container">
      <header>
        <img src={logo} alt="marvel logo" />
        <a
          href="https://developer.marvel.com/"
          target="_blank"
          className="link-text"
        >
          Check out the marvel api
        </a>
      </header>
      <main>
        <blockquote>marvel rest api webpage</blockquote>
        <button onClick={clickHandler} className={styles.cta}>
          view all characters
        </button>
        <p className="foot-text">
          simple webpage that displays a selection of marverl characters and
          some information about them.
        </p>
      </main>
    </div>
  )
}

export default Home
