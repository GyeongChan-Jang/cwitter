import AuthForm from 'components/AuthForm'
import { authService } from 'fBase'
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import React from 'react'

const Auth = () => {
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
    console.log(data.refreshToken)
    console.log(data.expiresIn)
    console.log(data.tokenExpiration)
  }

  return (
    <div>
      <AuthForm />
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
