import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { auth } from "../../firebase"
import { setCurrentUser, signIn, signUp } from "../../slices/search-slice"
import Wrapper from "./auth-page-styled"

const AuthPage = () => {
  const dispatch = useAppDispatch()

  const [isLogin, setIsLogin] = useState(true)
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const authError = useAppSelector((state) => state.search.error)

  const [isFormValid, setIsFormValid] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (location.state) {
          const { pathname, search } = location.state.from as any

          navigate(`${pathname}${search}`)
        } else {
          dispatch(setCurrentUser(user.email!))
          navigate("/search")
        }
      }
    })

    return () => {
      unsubscribe()
    }
  }, [auth.currentUser])

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  const checkFormValidity = () => {
    if (isLogin) {
      setIsFormValid(email !== "" && password !== "")
    } else {
      setIsFormValid(
        email !== "" && password !== "" && password === passwordConfirm,
      )
    }
  }

  useEffect(() => {
    checkFormValidity()
  }, [isLogin, email, password, passwordConfirm])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    const hasLowerCase = /[a-z]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasMinLength = password.length >= 6

    return hasLowerCase && hasUpperCase && hasNumber && hasMinLength
  }

  const handleSignInAsync = async (e: any) => {
    e.preventDefault()
    setError("")

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")

      return
    }

    if (!validatePassword(password)) {
      setError("Please enter a valid password")

      return
    }

    try {
      await dispatch(signIn({ email, password }))

      if (location.state) {
        const { pathname, search } = location.state.from as any

        navigate(`${pathname}${search}`)
      } else {
        dispatch(setCurrentUser(auth.currentUser!.email!))
        navigate("/search")
      }
    } catch (error_: any) {
      setError(error_.message)
    }
  }

  const handleSignUpAsync = async (e: any) => {
    e.preventDefault()
    setError("")

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")

      return
    }

    if (!validatePassword(password)) {
      setError(
        "Please enter a valid password (min. 6 characters and includes at least one lowercase letter, one uppercase letter, and one number)",
      )

      return
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match")

      return
    }

    try {
      await dispatch(signUp({ email, password }))
    } catch (error_: any) {
      setError(error_.message)
    }
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const handlePasswordConfirmChange = (e: any) => {
    setPasswordConfirm(e.target.value)
  }

  return (
    <Wrapper>
      <div>
        <h1>{isLogin ? "Login" : "Sign up"}</h1>
        <form onSubmit={isLogin ? handleSignInAsync : handleSignUpAsync}>
          <label>
            <p>{"Email"}</p>
            <input
              type="email"
              required
              onChange={handleEmailChange}
              placeholder="Enter your email"
              style={{ outline: error ? "1px solid var(--alert-red)" : "" }}
            />
          </label>
          <label>
            <p>{"Password"}</p>
            <input
              type="password"
              required
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              style={{ outline: error ? "1px solid var(--alert-red)" : "" }}
            />
          </label>
          {!isLogin && (
            <label>
              <p>{"Repeat Password"}</p>
              <input
                type="password"
                required
                onChange={handlePasswordConfirmChange}
                placeholder="Enter your password again"
                style={{ outline: error ? "1px solid var(--alert-red)" : "" }}
              />
            </label>
          )}

          <div className="btn-container">
            <button type="submit" disabled={!isFormValid}>
              {isLogin ? "Login" : "Create Account"}
            </button>
            {error && <p className="error-message">{error}</p>}
            <span>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError("")
                }}
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </span>
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

export default AuthPage
