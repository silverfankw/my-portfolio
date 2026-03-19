import { useEffect, useState, useRef } from "react"
import "../Effect.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const menuItem: string[] = ["profile", "projects", "contact"]

const NavBar: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [opacity, setOpacity] = useState<number>(1);

    const navBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const headerHeight: number = navBarRef?.current?.['clientHeight'] ?? 0; // 110
        const offset: number = headerHeight / 2; // 55

        const didScrollPage = (): void => {
            let calc = window.scrollY / offset
            if (calc > 1) {
                calc = 1;
            }
            else if (calc <= 1) {
                calc = 0;
            }

            setOpacity(calc);
        };

        window.addEventListener("scroll", didScrollPage);

        return () => {
            window.removeEventListener("scroll", didScrollPage);
        };
    }, []);

    useEffect(() => {
        const options: object = {
            root: null,
            rootMargin: "-50% 0px -50% 0px",
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        menuItem.forEach((menu: string) => {
            const element = document.getElementById(menu);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <header
            ref={navBarRef}
            style={{ backgroundColor: `rgba(0,0,0,${opacity})` }}
            className="fixed z-50 px-8 py-2 left-0 right-0 
        flex justify-between items-center bg-black">

            {/* Logo */}
            <h1 data-magnetic className="hover:cursor-pointer p-3 rounded-md 
             font-[Anta] text-white text-[2.25rem] 
             min-md:after:content-['_Fan'] capture-hover-effect">
                <a href="#profile">Silver</a>
            </h1>

            {/* Navigation items */}
            <ul className="flex items-center list-none gap-30 text-[1.375rem]
            max-xl:gap-20 max-lg:gap-12 max-md:gap-6">
                {
                    menuItem.map((item: string, key: number) => (
                        <li key={`list-${key}`} className={`p-3 rounded-md transition hover:cursor-pointer hover:scale-150
                        ${activeSection == item ? "bg-yellow-400/80 text-black shadow-md before:content-['✦']" : ""}`}>
                            <a key={`link-${key}`} href={`#${item}`}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </a>
                        </li>)
                    )}
            </ul>

            {/* Icons group */}
            <div className="flex justify-between gap-6">
                <a data-magnetic href="https://github.com/silverfankw" target="_blank" aria-label="GitHub profile">
                    <GitHubIcon fontSize="large" sx={{ transitionProperty: "scale", ":hover": { scale: 1.5 } }} />
                </a>
                <a data-magnetic href="https://www.linkedin.com/in/silverf/" target="_blank" aria-label="LinkedIn profile">
                    <LinkedInIcon fontSize="large" sx={{ transitionProperty: "scale", ":hover": { scale: 1.5 } }} />
                </a>
                <a data-magnetic href="mailto:silverfankw@gmail.com" aria-label="Send email">
                    <EmailIcon fontSize="large" sx={{ transitionProperty: "scale", ":hover": { scale: 1.5 } }} />
                </a>
            </div>
        </header>
    )
}

export default NavBar