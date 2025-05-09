import GradientText from "./GradientText"
import kmbdpip from "../assets/project-kmb-dpip.jpg"
import kmbvdcg from "../assets/project-bus-stop-chapter-description-generator.jpg"
import { ProjectDetail, ProjectInfoProps } from "./ProjectDetail"

const ProjectCard: React.FC = () => {

    const projectGroup: ProjectInfoProps[] = [
        {
            url: "https://silverfankw.github.io/kmb-dpip/",
            title: "🔗 KMB DPIP (Dynamic Passenger Information Panel) simulator",
            thumbnail: kmbdpip,
            description: "🔹To simulate the Dynamic Passenger Information Panel (DPIP) inside the bus of Kowloon Motor Bus Company, displaying real-time bus route information and allowing users to navigate through stops.",
            remark1: "🔨 Developed with ViteJS, tailwindCSS v4, React Select & Material UI",
            remark2: "🌐 Source data from Transport Department open data API"
        },
        {
            url: "https://silverfankw.github.io/hk-bus-route-video-section-desc-generator/",
            title: "🔗 HK Bus route video description chapter generator",
            thumbnail: kmbvdcg,
            description: "🔹To assist content creators who publish bus route videos on Youtube, simplifying the process of generating timestamps and stop names that can be directly copied into YouTube video descriptions.",
            remark1: "🔨 Developed with NextJS, tailwindCSS v3, Redux Toolkit & Font Awesome",
            remark2: "🌐 Source data from Transport Department open data API"
        },
    ]

    return (
        <section id="projects" className="tracking-wide flex flex-col items-center p-30 text-center text-white">
            <h1 className="text-[3.75rem] leading-25 titillium-web-bold 
                    max-xl:leading-20">
                <GradientText text="My projects" /> 👀</h1>
            <div className="my-20 flex gap-10 max-xl:flex-wrap">
                {projectGroup.map((projectInfo: ProjectInfoProps, key: number) => {
                    return <ProjectDetail key={`project-${key}`} {...projectInfo} />
                })}
            </div>
        </section>
    )
}

export default ProjectCard