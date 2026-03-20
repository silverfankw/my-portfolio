import { useEffect } from 'react'

type RGB = [number, number, number]
interface Palette { base: RGB; c1: RGB; c2: RGB; c3: RGB }

// Hero → Projects → Contact color palettes
const PALETTES: Palette[] = [
    { base: [13,  8,  20], c1: [120,  40, 200], c2: [200,  40, 120], c3: [ 80,  20, 180] },
    { base: [ 7, 15,  20], c1: [ 20, 150, 120], c2: [ 20, 100, 200], c3: [ 10, 180, 140] },
    { base: [ 8, 13,  26], c1: [ 30,  60, 200], c2: [ 80,  20, 180], c3: [ 20, 100, 220] },
]

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function lerpRGB(a: RGB, b: RGB, t: number): RGB {
    return [
        Math.round(lerp(a[0], b[0], t)),
        Math.round(lerp(a[1], b[1], t)),
        Math.round(lerp(a[2], b[2], t)),
    ]
}

export default function ScrollBackground() {
    useEffect(() => {
        let rafId: number

        const paint = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            const progress = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0

            const scaled = progress * (PALETTES.length - 1)
            const i = Math.min(Math.floor(scaled), PALETTES.length - 2)
            const t = scaled - i

            const p1 = PALETTES[i], p2 = PALETTES[i + 1]
            const base = lerpRGB(p1.base, p2.base, t)
            const c1   = lerpRGB(p1.c1,  p2.c1,  t)
            const c2   = lerpRGB(p1.c2,  p2.c2,  t)
            const c3   = lerpRGB(p1.c3,  p2.c3,  t)

            document.body.style.backgroundColor = `rgb(${base})`
            document.body.style.backgroundImage = [
                `radial-gradient(ellipse 80% 60% at 20% 30%, rgba(${c1},0.40), transparent 70%)`,
                `radial-gradient(ellipse 70% 70% at 80% 70%, rgba(${c2},0.28), transparent 70%)`,
                `radial-gradient(ellipse 60% 50% at 60% 10%, rgba(${c3},0.35), transparent 70%)`,
            ].join(',')
            document.body.style.backgroundAttachment = 'fixed'
        }

        const onScroll = () => {
            cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(paint)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        paint()

        return () => {
            window.removeEventListener('scroll', onScroll)
            cancelAnimationFrame(rafId)
            document.body.style.backgroundColor = ''
            document.body.style.backgroundImage = ''
            document.body.style.backgroundAttachment = ''
        }
    }, [])

    return null
}
