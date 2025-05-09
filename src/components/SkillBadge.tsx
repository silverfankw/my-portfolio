export interface SkillsetProps {
    src: string,
    name: string
}

export const SkillBadge: React.FC<SkillsetProps> = ({ src, name }: SkillsetProps) => {
    return (
        <div className="bg-slate-600/70 rounded-2xl flex flex-col justify-center items-center p-5 gap-5">
            <img className="w-[10rem] h-[10rem]" src={src}></img>
            <span className="text-lg">{name}</span>
        </div>
    )
}

