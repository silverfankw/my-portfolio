interface GradientTextProps {
    text: string
}

const GradientText: React.FC<GradientTextProps> = ({ text }: GradientTextProps) => {
    return (
        <span className="text-transparent bg-clip-text bg-linear-[45deg,#ac1ffe,#f1a367_50%,#5ddd93_100%]">
            {text}
        </span>
    )
}

export default GradientText