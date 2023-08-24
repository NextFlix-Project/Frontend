import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './VideoPlayer';
import VideoPlayer from './VideoPlayer';

function App() {
  const [count, setCount] = useState(0)

  const renderVideo = () => { 
    return (
    <>
      <VideoPlayer/>
    </>
    )
  }

  const renderButton = () => {
    return (
      <>
       <button onClick= {(e) =>setCount(1)}> Play </button>
    </>
    )
  }

      if (count === 0) return renderButton(); else return renderVideo();
    


  
}

export default App
