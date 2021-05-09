import { useHistory } from "react-router-dom"
import { GetCharacter } from "../providers/CharacterProvider"
import Loader from "react-loader-spinner"

import "./character.css"
import styles from "../shared/styles/shared.module.css"
import logo from "../shared/assets/images/marvel_logo.svg"

const Character = () => {
  const { loading, data: { data } = {}, error } = GetCharacter()
  console.log({ loading, data, error })
  const history = useHistory()

  const CharacterSection = () => {
    if (loading) {
      return <Loader type="TailSpin" color="#ccc" />
    } else if (error) {
      return <p className="error-text">{error}</p>
    } else if (data.code != 200) {
      return <p className="status-text">{data.status}</p>
    } else {
      return (
        <>
          <div className="left">
            <img
              src={`${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension}`}
              alt=""
            />
            <h2>{data.data.results[0].name}</h2>
            <p className="modified-text">
              Last modification date for this character:
              <b>{data.data.results[0].modified}</b>
            </p>
          </div>

          {/* right section */}

          <div className="right">
            <article>
              <p className="title">description</p>
              <p className="character-description">
                {data.data.results[0].description
                  ? data.data.results[0].description
                  : "No description available for this character"}
              </p>
            </article>
            <article>
              <p className="title">comics</p>
              {data.data.results[0].comics.available != 0 ? (
                <ul>
                  {data.data.results[0].comics.items.map((item) => (
                    <li key={item.name}> {item.name} </li>
                  ))}
                </ul>
              ) : (
                <p>No comics available</p>
              )}
            </article>

            <a
              href={data.data.results[0].urls[0].url}
              target="_blank"
              className={styles.cta}
            >
              Full details on {data.data.results[0].name}
            </a>
          </div>
        </>
      )
    }
  }

  return (
    <div className="wrapper character-container">
      <header>
        <img src={logo} alt="marvel logo" className="logo" />
        <button onClick={() => history.goBack()} className={styles.cta}>
          go back
        </button>
      </header>
      <main>{CharacterSection()}</main>
    </div>
  )
}

export default Character
