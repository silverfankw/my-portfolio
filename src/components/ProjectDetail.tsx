export interface ProjectInfoProps {
    url: string,
    thumbnail: string,
    title: string,
    description: string,
    remark1: string,
    remark2: string
}

export const ProjectDetail: React.FC<ProjectInfoProps> = ({ url, thumbnail, title, description, remark1, remark2 }: ProjectInfoProps) => {
    return (
        <a href={url} target="_blank">

            <div className="flex flex-col 
            hover:scale-105 hover:border-1 hover:bg-yellow-400/80 hover:text-black duration-200 
            bg-slate-900/50 p-6 rounded-xl">
                <h1 className="m-[0_auto] animate-typing border-r-[.15em] border-r-solid border-r-white 
        whitespace-nowrap tracking-tight overflow-hidden titillium-web-semibold text-[1.75rem]
        max-xl:text-2xl underline">
                    {title}</h1>
                <img className="py-10" src={thumbnail} />
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

