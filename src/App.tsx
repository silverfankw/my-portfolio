import NavBar from './components/NavBar'
import ProfileCard from './components/ProfileCard'
import Projects from './components/ProjectCard'
import Album from './components/Album'

import './App.css'

function App() {

  return (
    <>
      <div className="flex flex-col select-none">
        <NavBar />

        <div className="bg-[url(/src/assets/bg1.jpg)] bg-cover flex flex-col gap-20">
          <div className="backdrop-blur-[6px]">
            <ProfileCard />
          </div>
        </div>

        <div className="bg-[url(/src/assets/bg2.jpg)] bg-cover">
          <div className="backdrop-blur-[6px]">
            <Projects />
          </div>
        </div>

        <div className="bg-[url(/src/assets/bg3.jpg)] bg-cover">
          <div className="backdrop-blur-[4px]">
            <Album />
          </div>
        </div >
      </div>
    </>
  )
}

export default App
