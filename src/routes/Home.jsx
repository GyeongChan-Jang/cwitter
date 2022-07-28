import React, { useEffect } from 'react'
import { useState } from 'react'
import { collection, addDoc, onSnapshot } from 'firebase/firestore'
import { dbService } from 'fBase'
import Cweet from 'components/Cweet'

const Home = ({ userObj }) => {
  const [cweet, setCweet] = useState('')

  const [cweets, setCweets] = useState([])

  // outdated 방식
  // const getCweets = async () => {
  //   const dbCweets = await getDocs(collection(dbService, 'cweet'))
  //   dbCweets.forEach((document) => {
  //     // cweet 데이터 하나 하나에 id 속성을 추가
  //     const cweetObject = {
  //       ...document.data(),
  //       id: document.id
  //     }
  //     setCweets((prev) => [cweetObject, ...prev])
  //   })
  // }

  useEffect(() => {
    onSnapshot(collection(dbService, 'cweet'), (snapshot) => {
      const cweetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setCweets(cweetArray)
    })
    console.log(cweets)
    console.log(userObj)
  }, [])

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
      createdAt: Date.now(),
      creatorId: userObj.uid
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
      <div>
        {cweets.map((cweet) => (
          <Cweet key={cweet.id} cweetObj={cweet} isOwner={cweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  )
}

export default Home
