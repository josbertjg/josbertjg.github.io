import './App.css';
import LandingPage from "../pages/Landing/LandingPage";
import gsap from 'gsap';
import { MotionPathPlugin, MotionPathHelper, SplitText, DrawSVGPlugin } from 'gsap/all';
import { Suspense } from 'react';

gsap.registerPlugin(MotionPathPlugin, MotionPathHelper, SplitText, DrawSVGPlugin);

function App() {
  return (
    <main className='overflow-hidden'>
      <Suspense fallback="loading...">
        <LandingPage />
      </Suspense>
    </main>
  )
}

export default App
