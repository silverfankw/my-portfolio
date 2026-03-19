import { useEffect, useRef } from "react"

const CustomCursor: React.FC = () => {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Skip on touch-primary devices (phones/tablets)
        if (window.matchMedia("(pointer: coarse)").matches) return

        const dot = dotRef.current!
        const ring = ringRef.current!

        document.body.style.cursor = "none"

        let mouseX = -300, mouseY = -300
        let ringX = -300, ringY = -300
        let rafId: number
        let prevMagnetic: HTMLElement | null = null

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            // Show cursors on first move
            dot.style.opacity = "1"
            ring.style.opacity = "1"

            // Magnetic: find current magnetic target
            const target = (e.target as HTMLElement).closest("[data-magnetic]") as HTMLElement | null

            // Reset previous target if changed
            if (prevMagnetic && prevMagnetic !== target) {
                prevMagnetic.style.transform = ""
                prevMagnetic.style.transition = "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)"
            }

            if (target) {
                const rect = target.getBoundingClientRect()
                const ox = (e.clientX - (rect.left + rect.width / 2)) * 0.3
                const oy = (e.clientY - (rect.top + rect.height / 2)) * 0.3
                target.style.transition = "transform 0.1s ease"
                target.style.transform = `translate(${ox}px, ${oy}px)`
            }

            prevMagnetic = target
        }

        const onMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest("[data-magnetic]")) {
                ring.style.width = "58px"
                ring.style.height = "58px"
                ring.style.borderColor = "rgba(250,204,21,0.75)"
            }
        }

        const onMouseOut = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("[data-magnetic]") as HTMLElement | null
            if (target && !target.contains(e.relatedTarget as Node)) {
                ring.style.width = "40px"
                ring.style.height = "40px"
                ring.style.borderColor = "rgba(255,255,255,0.4)"
                target.style.transform = ""
                target.style.transition = "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)"
                prevMagnetic = null
            }
        }

        const onMouseLeave = () => {
            mouseX = -300
            mouseY = -300
        }

        const animate = () => {
            ringX += (mouseX - ringX) * 0.12
            ringY += (mouseY - ringY) * 0.12
            dot.style.left = `${mouseX}px`
            dot.style.top = `${mouseY}px`
            ring.style.left = `${ringX}px`
            ring.style.top = `${ringY}px`
            rafId = requestAnimationFrame(animate)
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseover", onMouseOver)
        document.addEventListener("mouseout", onMouseOut)
        document.addEventListener("mouseleave", onMouseLeave)
        rafId = requestAnimationFrame(animate)

        return () => {
            document.body.style.cursor = ""
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseover", onMouseOver)
            document.removeEventListener("mouseout", onMouseOut)
            document.removeEventListener("mouseleave", onMouseLeave)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <>
            {/* Exact-position glowing dot */}
            <div
                ref={dotRef}
                style={{ opacity: 0, top: -300, left: -300 }}
                className="fixed pointer-events-none z-[9999] w-2 h-2
                    -translate-x-1/2 -translate-y-1/2 rounded-full bg-white
                    shadow-[0_0_8px_3px_rgba(255,255,255,0.65)]"
            />
            {/* Lerp-following ring */}
            <div
                ref={ringRef}
                style={{
                    opacity: 0,
                    top: -300,
                    left: -300,
                    width: "40px",
                    height: "40px",
                    transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
                }}
                className="fixed pointer-events-none z-[9998]
                    -translate-x-1/2 -translate-y-1/2 rounded-full
                    border border-white/90"
            />
        </>
    )
}

export default CustomCursor
