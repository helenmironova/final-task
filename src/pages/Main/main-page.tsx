import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import Wrapper from "./main-page-styled"

const MainPage = () => {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate("/auth")
  }, [navigate])

  return (
    <Wrapper>
      <section>
        <h1>{"Q-1 Search"}</h1>
        <p>
          {
            "The world's leading high-quality, comprehensive and freely accessible resource of protein sequence and functional information."
          }
        </p>
        <button onClick={handleClick}>{"Login"}</button>
      </section>
    </Wrapper>
  )
}

export default MainPage
