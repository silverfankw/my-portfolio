import profile from "../assets/profile.png"
import react from "../assets/react.svg"
import html5 from "../assets/html5.svg"
import css3 from "../assets/css3.svg"
import jquery from "../assets/jquery.svg"
import vitejs from "../assets/vitejs.svg"
import tailwind from "../assets/tailwind.svg"
import typescript from "../assets/typescript.svg"

import { SkillsetProps, SkillBadge } from "./SkillBadge"
import GradientText from "./GradientText"

const ProfileCard: React.FC = () => {

    const skillsetGroup: SkillsetProps[] = [
        { src: react, name: "React" },
        { src: typescript, name: "Typescript" },
        { src: html5, name: "HTML 5" },
        { src: css3, name: "CSS 3" },
        { src: vitejs, name: "ViteJS" },
        { src: tailwind, name: "TailwindCSS" },
        { src: jquery, name: "jQuery" },
    ]

    return (
        <section id="profile" className="px-30 max-md:px-10 max-lg:px-15 
        pt-50 max-xl:pt-40 max-md:pt-30 items-center gap-5 text-white">

            {/* Profile Content */}
            <div className="flex gap-10">
                {/* Profile Image */}
                <img className="p-6 w-[20vw] h-[20vw] rounded-[50%] opacity-75 
                max-lg:w-[30vw] max-lg:h-[30vw] max-md:w-[40vw] max-md:h-[40vw]" src={profile} alt="Avatar" />

                <div className="text-center flex flex-col gap-10">
                    {/* Greetings */}
                    <h1 className="text-[3rem] leading-20 titillium-web-bold max-lg:leading-18">
                        <GradientText text="Hi I'm Silver" />
                        , a frontend developer based in Hong Kong 🇭🇰
                    </h1>

                    {/* Brief Intro */}
                    <div className="text-[1.5rem] tracking-wide">
                        <span className="py-10 leading-12 max-md:leading-4">
                            🎓 Graduated from HKUST in Computer Science Major, with 3 years frontend experience in in-house project and solution integrator (SI) company, ranging from e-commerce to property industry. While at the same time, I also worked on backend side with Go, MongoDB & Docker.
                        </span>
                    </div>
                </div>
            </div>

            {/* Skillset */}
            <div className="text-center py-20 text-2xl">
                <span className="font-semibold">Primary Skillset</span>
                <div className="flex flex-wrap gap-6 pt-10 justify-center">
                    {skillsetGroup.map((skill, key: number) => (
                        <SkillBadge key={`skillbadge-${key}`} {...skill} />
                    ))}
                </div>
            </div>

        </section>
    )
}

export default ProfileCard
