import { useEffect, useRef, useState } from "react"

interface RevealTextProps {
    children: React.ReactNode
    className?: string
    /** Extra delay before the reveal starts (ms) */
    delay?: number
}

/**
 * Wraps children in an overflow-hidden clip container.
 * Content slides up from below when the element scrolls into view.
 */
const RevealText: React.FC<RevealTextProps> = ({ children, className = "", delay = 0 }) => {
    const [revealed, setRevealed] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = wrapperRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setRevealed(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.15 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={wrapperRef} className={`overflow-hidden ${className}`}>
            <div
                style={{
                    transform: revealed ? "translateY(0)" : "translateY(110%)",
                    transition: "transform 0.75s cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: `${delay}ms`,
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default RevealText
