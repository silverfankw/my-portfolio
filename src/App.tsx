import { useEffect } from 'react'
import Lenis from 'lenis'
import NavBar from './components/NavBar'
import ProfileCard from './components/ProfileCard'
import Projects from './components/ProjectCard'
import ContactCard from './components/ContactCard'
import CustomCursor from './components/CustomCursor'
import SpotlightSection from './components/SpotlightSection'

import './App.css'

function App() {

  useEffect(() => {
    const lenis = new Lenis()
    let rafId: number
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)

    // Intercept anchor clicks so Lenis handles smooth scroll
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      e.preventDefault()
      lenis.scrollTo(anchor.getAttribute('href')!)
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', onAnchorClick)
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <div className="flex flex-col">
        <NavBar />

        <SpotlightSection className="bg-[url(/src/assets/bg1.jpg)] bg-cover flex flex-col gap-20" outerBlur="6px">
          <ProfileCard />
        </SpotlightSection>

        <SpotlightSection className="bg-[url(/src/assets/bg2.jpg)] bg-cover" outerBlur="4px">
          <Projects />
        </SpotlightSection>

        <SpotlightSection className="bg-[url(/src/assets/bg3.jpg)] bg-cover" outerBlur="1px">
          <ContactCard />
        </SpotlightSection>
      </div>
    </>
  )
}

export default App
