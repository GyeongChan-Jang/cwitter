import { authService } from 'fBase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
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
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth
