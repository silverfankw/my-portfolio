import { useRef, useState } from "react"

export interface ProjectInfoProps {
    url: string,
    thumbnail: string,
    title: string,
    description: string,
    remark1: string,
    remark2: string,
    animationDelay?: string
}

export const ProjectDetail: React.FC<ProjectInfoProps> = ({ url, thumbnail, title, description, remark1, remark2, animationDelay }: ProjectInfoProps) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)")
    const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 })

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current
        if (!card) return
        const { left, top, width, height } = card.getBoundingClientRect()
        const x = (e.clientX - left) / width   // 0..1
        const y = (e.clientY - top) / height   // 0..1
        const rotateY = (x - 0.5) * 22         // -11..+11 deg
        const rotateX = (0.5 - y) * 22
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`)
        setGlare({ opacity: 0.18, x: x * 100, y: y * 100 })
    }

    const onMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)")
        setGlare({ opacity: 0, x: 50, y: 50 })
    }

    return (
        <a href={url} target="_blank">
            <div
                ref={cardRef}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{ transform, transition: "transform 0.08s ease-out", transformStyle: "preserve-3d" }}
                className="relative flex flex-col overflow-hidden
                hover:border-1 hover:bg-yellow-400/80 hover:text-black
                bg-slate-900/80 p-6 rounded-xl cursor-pointer">

                {/* Glare layer */}
                <div
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{
                        opacity: glare.opacity,
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.75) 0%, transparent 65%)`,
                        transition: "opacity 0.08s ease-out",
                    }}
                />

                <h3 className="m-[0_auto] animate-typing border-r-[.15em] border-r-solid border-r-white 
        whitespace-nowrap tracking-tight overflow-hidden titillium-web-semibold text-[1.75rem]
        max-xl:text-2xl" style={{ animationDelay: animationDelay ?? '0s' }}>
                    {title}</h3>
                <img className="rounded-xl my-10" src={thumbnail} />
                <div className="flex flex-col gap-6">
                    <div className="px-4">
                        <div className="text-[1.375rem]">{description}</div>
                    </div>
                    <div className="text-[1rem]">{remark1}</div>
                    <div className="text-[1rem]">{remark2}</div>
                </div>
            </div>
        </a>
    )
}

