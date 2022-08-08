import React, { useEffect } from 'react'
import { useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'

import { dbService } from 'fBase'
import Cweet from 'components/Cweet'
import CweetFactory from 'components/CweetFactory'

const Home = ({ userObj }) => {
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
  }, [])

  return (
    <div>
      <CweetFactory userObj={userObj} />
      <div>
        {cweets.map((cweet) => (
          <Cweet key={cweet.id} cweetObj={cweet} isOwner={cweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  )
}

export default Home
