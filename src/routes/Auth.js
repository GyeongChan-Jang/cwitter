import { authService } from 'fBase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth'
import React, { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      let data
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        )
      } else {
        // log in
        data = await signInWithEmailAndPassword(authService, email, password)
      }
      console.log(data)
    } catch (error) {
      // 에러 발상시 message 프로퍼티를 보여줄 수 있음
      console.log(error.message)
      setError(error.message)
    }
  }

  const toggleAccount = () => setNewAccount((prev) => !prev)

  // 구글/깃헙 로그인
  const onSocialClick = async (event) => {
    const {
      target: { name }
    } = event
    let provider
    if (name === 'google') {
      provider = new GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new GithubAuthProvider()
    }
    const data = await signInWithPopup(authService, provider)
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log-In'} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign in' : 'Create Account'}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  )
}

export default Auth
