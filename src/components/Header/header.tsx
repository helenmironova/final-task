import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

import { useAppDispatch } from "../../app/hooks"
import { auth } from "../../firebase"
import { signOut } from "../../slices/search-slice"
import Wrapper from "./header-styled"

const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignOut = () => {
    dispatch(signOut())
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/")
      }
    })

    return () => {
      unsubscribe()
    }
  }, [auth.currentUser])

  return (
    <Wrapper>
      <div>
        <p>{auth.currentUser?.email}</p>
        <button onClick={handleSignOut}>{"Log out"}</button>
      </div>
    </Wrapper>
  )
}

export default Header
