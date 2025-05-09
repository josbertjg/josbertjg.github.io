import { BackgroundEffect } from "./components/BackgroundEffect"
import SkillIcon from "./components/SkillIcon"
import {useState} from 'react'

export default function LandingPage() {
  const [show, setShow] = useState(false)
  return (
    <div className='flex items-center justify-center h-full w-full relative'>
      <BackgroundEffect onBlackOut={() => {setShow(true)}} />
      {show && (
        <>
          <SkillIcon index={1}/>
          <SkillIcon index={2}/>
          <SkillIcon index={3}/>
          <SkillIcon index={4}/>
          <SkillIcon index={5}/>
          <SkillIcon index={6}/>
          <SkillIcon index={7}/>
        </>
      )}
    </div>
  )
}