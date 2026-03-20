import { useRef, useState, useCallback } from "react"

interface SpotlightSectionProps {
    children: React.ReactNode
    className?: string
    /** Spotlight radius in px */
    radius?: number
    /** Opacity of the dark overlay outside the spotlight (0–1) */
    darkness?: number
}

/**
 * A section wrapper that punches a transparent hole in a dark overlay at the
 * cursor position, revealing the vivid body background gradient beneath.
 * Works by compositing a radial-gradient overlay — no backdrop-filter needed.
 */
const SpotlightSection: React.FC<SpotlightSectionProps> = ({
    children,
    className = "",
    radius = 280,
    darkness = 0.84,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = sectionRef.current!.getBoundingClientRect()
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }, [])

    const onMouseLeave = useCallback(() => setPos(null), [])

    const overlayBackground = pos
        ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, transparent 0%, rgba(0,0,0,${darkness}) 65%)`
        : `rgba(0,0,0,${darkness})`

    return (
        <div
            ref={sectionRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={`relative ${className}`}
        >
            {/* Dark overlay with a transparent spotlight hole at the cursor */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: overlayBackground,
                    transition: pos ? "none" : "background 0.5s ease",
                }}
            />

            {/* Content sits above overlay */}
            <div className="relative">
                {children}
            </div>
        </div>
    )
}

export default SpotlightSection
