import { useHistory } from "react-router-dom"
import { GetCharacter } from "../providers/CharacterProvider"

const Character = () => {
  const { loading, data: { data } = {}, error } = GetCharacter()
  console.log({ loading, data, error })
  const history = useHistory()

  const characterSection = () => {
    if (loading) {
      return <p className="loading-text">loading . . .</p>
    } else if (error) {
      return <p className="error-text">{error}</p>
    } else if (data.code != 200) {
      return <p className="status-text">{data.status}</p>
    } else {
      return (
        <section className="character">
          <h2>{data.data.results[0].name}</h2>
          <img
            src={`${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension}`}
            alt=""
          />
          <p className="modified-text">
            Last modification date for this character:
            <b>{data.data.results[0].modified}</b>
          </p>
          <p className="character-description">
            {data.data.results[0].description
              ? data.data.results[0].description
              : "No description available for this character"}
          </p>
          <a href={data.data.results[0].urls[0].url} target="_blank">
            Full details on {data.data.results[0].name}
          </a>
        </section>
      )
    }
  }

  return (
    <div className="wrapper">
      <h1>This is the Character view</h1>
      <button onClick={() => history.goBack()}>back</button>
      <main>{characterSection()}</main>
    </div>
  )
}

export default Character
