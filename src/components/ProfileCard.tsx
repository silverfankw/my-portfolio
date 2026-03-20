import { useEffect, useRef, useState } from "react"
import react from "../assets/react.svg"
import html5 from "../assets/html5.svg"
import css3 from "../assets/css3.svg"
import jquery from "../assets/jquery.svg"
import vitejs from "../assets/vitejs.svg"
import tailwind from "../assets/tailwind.svg"
import typescript from "../assets/typescript.svg"

import { SkillsetProps, SkillBadge } from "./SkillBadge"
import GradientText from "./GradientText"

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&"

function useScrambleText(target: string, startDelay = 200) {
    const [display, setDisplay] = useState(() => target.replace(/[^ ]/g, "?"))
    const frameRef = useRef<number | null>(null)

    useEffect(() => {
        let resolved = 0
        const total = target.length
        const startAt = Date.now() + startDelay

        const tick = () => {
            const now = Date.now()
            if (now < startAt) { frameRef.current = requestAnimationFrame(tick); return }

            const elapsed = now - startAt
            resolved = Math.min(total, Math.floor(elapsed / 38))

            setDisplay(
                target.split("").map((char, i) => {
                    if (char === " ") return " "
                    if (i < resolved) return char
                    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
                }).join("")
            )

            if (resolved < total) frameRef.current = requestAnimationFrame(tick)
        }

        frameRef.current = requestAnimationFrame(tick)
        return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
    }, [target, startDelay])

    return display
}

const ProfileCard: React.FC = () => {
    const scrambled = useScrambleText("Hi I'm Silver")

    const skillsetGroup: SkillsetProps[] = [
        { src: react, name: "React" },
        { src: typescript, name: "Typescript" },
        { src: html5, name: "HTML 5" },
        { src: css3, name: "CSS 3" },
        { src: vitejs, name: "ViteJS" },
        { src: tailwind, name: "TailwindCSS" },
        { src: jquery, name: "jQuery" },
    ]

    return (
        <section id="profile" className="py-60 mx-10 md:mx-40 items-start gap-20 text-white flex flex-col xl:flex-row">

            <div className="flex-1 min-w-0 flex flex-col gap-10">
                <h2 className="text-[3rem] leading-20 titillium-web-bold max-lg:leading-18">
                    <GradientText text={scrambled} />
                    , a frontend developer based in Hong Kong 🇭🇰
                </h2>

                <div className="text-[1.5rem] tracking-wide">
                    <span className="py-10 leading-14 max-md:leading-12 block indent-6">
                        🎓 Graduated from HKUST in Computer Science Major, with 3 years frontend experience in in-house project and solution integrator (SI) company, ranging from e-commerce to property industry. I also have hand-on experience on backend and container skillset with Go, MongoDB & Docker.
                    </span>
                </div>
            </div>

            <div className="w-full md:w-auto md:shrink-0 flex flex-col items-center gap-20 max-md:gap-14 text-2xl">
                <span className="text-4xl font-semibold">Primary Skillset</span>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {skillsetGroup.map((skill, key: number) => (
                        <SkillBadge key={`skillbadge-${key}`} {...skill} />
                    ))}
                </div>
            </div>

        </section>
    )
}

export default ProfileCard
