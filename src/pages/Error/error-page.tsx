import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Wrapper from "./error-page"
import Header from "../../components/Header/header"
import { auth } from "../../firebase"

const ErrorPage = () => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        console.log("no user")
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Wrapper>
      {currentUser && <Header />}
      <section>
        <h1>{"404"}</h1>
        <h3>{"Page not found"}</h3>
        <Link to="/search" className="btn">
          {"Back to Search"}
        </Link>
      </section>
    </Wrapper>
  )
}

export default ErrorPage
