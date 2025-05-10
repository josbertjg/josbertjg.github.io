import './App.css';
import LandingPage from "../pages/Landing/LandingPage";
import gsap from 'gsap';
import { MotionPathPlugin, MotionPathHelper } from 'gsap/all';

gsap.registerPlugin(MotionPathPlugin, MotionPathHelper);

function App() {
  return (
    <main className='overflow-hidden'>
      <LandingPage />
    </main>
  )
}

export default App
