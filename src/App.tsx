import { useEffect } from 'react'
import Lenis from 'lenis'
import NavBar from './components/NavBar'
import ProfileCard from './components/ProfileCard'
import Projects from './components/ProjectCard'
import ContactCard from './components/ContactCard'
import CustomCursor from './components/CustomCursor'
import SpotlightSection from './components/SpotlightSection'
import ScrollBackground from './components/ScrollBackground'

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
      <ScrollBackground />
      <div className="relative flex flex-col gap-60">
        <NavBar />
        <ProfileCard />
        <Projects />
        <ContactCard />

        {/* <SpotlightSection className="pt-[110px]" darkness={0.88}>
          <ProfileCard />
        </SpotlightSection>

        <SpotlightSection darkness={0.84}>
          <Projects />
        </SpotlightSection>

        <SpotlightSection darkness={0.80}>
          <ContactCard />
        </SpotlightSection> */}
      </div>
    </>
  )
}

export default App
