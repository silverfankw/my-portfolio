import kmbdpip from "../assets/project-kmb-dpip.jpg"
import pubtrec from "../assets/project-pubtrec.png"
import { ProjectDetail, ProjectInfoProps } from "./ProjectDetail"

const ProjectCard: React.FC = () => {

    const projectGroup: ProjectInfoProps[] = [
        {
            url: "https://silverf.dev/kmb-dpip/",
            title: "🔗 KMB DPIP (Dynamic Passenger Information Panel) simulator",
            thumbnail: kmbdpip,
            description: "🔹To simulate the Dynamic Passenger Information Panel (DPIP) inside the bus of Kowloon Motor Bus Company, displaying real-time bus route information and allowing users to navigate through stops.",
            remark1: "🔨 Developed with ViteJS, tailwindCSS v4, React Select & Material UI",
            remark2: "🌐 Source data from Transport Department open data API"
        },
                {
            url: "https://silverf.dev/pubtrec",
            title: "🔗 HK Public Transport Journey Recorder (Pubtrec) ",
            thumbnail: pubtrec,
            description: "🔹To provide a convenient tool to facilitate the recording of passenger / journey-related data for public transport journeys. Available for franchised bus / MTR / Green Minibus and ferry.",
            remark1: "🔨 Developed with ViteJS, Typescript",
            remark2: "🌐 Source data from hkbus/hk-bus-crawling"
        },
    ]

    return (
        <section id="projects" className="tracking-wide flex flex-col items-center p-30 text-center text-white">
            <div className="my-5 flex gap-10 max-xl:flex-wrap">
                {projectGroup.map((projectInfo: ProjectInfoProps, key: number) => {
                    return <ProjectDetail key={`project-${key}`} {...projectInfo} animationDelay={`${key * 4.5}s`} />
                })}
            </div>
        </section>
    )
}

export default ProjectCard