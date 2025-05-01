import { useEffect, useState, useRef } from "react"
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const menuItem = ["profile", "projects", "album", "contact"]

const NavBar: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [opacity, setOpacity] = useState<number>(1);

    const navBarRef = useRef(null);

    useEffect(() => {
        const headerHeight: number = navBarRef?.current?.['clientHeight'] ?? 0; // 110
        const offset: number = headerHeight / 2; // 55

        const didScrollPage = () => {
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
            window.removeEventListener("keydown", didScrollPage);
        };
    }, []);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
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
    }, [menuItem]);

    return (
        <header
            ref={navBarRef}
            style={{ backgroundColor: `rgba(0,0,0,${opacity})` }}
            className="fixed z-50 p-4 left-0 right-0 
        flex justify-between items-center bg-black">

            {/* Logo */}
            <h1 className="hover:opacity-70 hover:cursor-pointer p-3 rounded-md 
             font-[Anta] text-white text-[2.25rem] 
             min-md:after:content-['_Fan']">
                <a href="#profile">Silver</a>
            </h1>

            {/* Navigation items */}
            <ul className="uppercase flex items-center list-none gap-30 text-[1.5rem]
            max-xl:gap-20 max-lg:gap-12 max-md:gap-6">
                {
                    menuItem.map((item: string, key: number) => (
                        <li key={`list-${key}`} className={`p-3 rounded-md transition hover:cursor-pointer hover:scale-150
                        ${activeSection == item ? "bg-yellow-400/80 text-black shadow-md" : ""}`}>
                            <a key={`link-${key}`} href={`#${item}`}>
                                {item}
                            </a>
                        </li>)
                    )}
            </ul>

            {/* Icons group */}
            <div className="flex justify-between gap-6">
                <a href="https://github.com/silverfankw" target="_blank">
                    <GitHubIcon fontSize="large" sx={{ transitionProperty: "scale", ":hover": { scale: 1.5 } }} />
                </a>
                <a href="mailto:silverfankw@gmail.com">
                    <EmailIcon fontSize="large" sx={{ transitionProperty: "scale", ":hover": { scale: 1.5 } }} />
                </a>
            </div>
        </header>
    )
}

export default NavBar