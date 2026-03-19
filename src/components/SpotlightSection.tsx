import { useRef, useState, useCallback } from "react"

interface SpotlightSectionProps {
    children: React.ReactNode
    className?: string
    /** Spotlight radius in px */
    radius?: number
    /** Blur inside spotlight (lower = clearer reveal) */
    innerBlur?: string
    /** Blur outside spotlight */
    outerBlur?: string
}

/**
 * A section wrapper that reveals the background image under the cursor
 * by dynamically reducing backdrop-blur inside a radial gradient spotlight.
 */
const SpotlightSection: React.FC<SpotlightSectionProps> = ({
    children,
    className = "",
    radius = 260,
    innerBlur = "0px",
    outerBlur = "8px",
}) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = sectionRef.current!.getBoundingClientRect()
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }, [])

    const onMouseLeave = useCallback(() => setPos(null), [])

    // Two-layer technique:
    // 1. A full outer blur layer always present
    // 2. A spotlight-shaped layer with no blur, clipped by a radial mask — revealed only near cursor
    const spotlightMask = pos
        ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, black 60%, transparent 100%)`
        : "none"

    return (
        <div
            ref={sectionRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={`relative overflow-hidden ${className}`}
        >
            {/* Outer blur — always covers everything */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ backdropFilter: `blur(${outerBlur})` }}
            />

            {/* Inner spotlight — no blur, masked to cursor circle */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backdropFilter: `blur(${innerBlur})`,
                    WebkitMaskImage: spotlightMask,
                    maskImage: spotlightMask,
                    transition: pos ? "none" : "opacity 0.4s ease",
                    opacity: pos ? 1 : 0,
                }}
            />

            {/* Content sits on top of both blur layers */}
            <div className="relative">
                {children}
            </div>
        </div>
    )
}

export default SpotlightSection
