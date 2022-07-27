import React from 'react'
import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { dbService } from 'fBase'

const Home = () => {
  const [cweet, setCweet] = useState('')

  const onChange = (event) => {
    const {
      target: { value }
    } = event
    setCweet(value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    await addDoc(collection(dbService, 'cweet'), {
      text: cweet,
      createdAt: Date.now()
    })
    setCweet('')
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={cweet}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Cweet" />
      </form>
    </div>
  )
}

export default Home
