import { useState, useEffect } from "react"
import GradientText from "./GradientText";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import image1 from "/1.jpg"
import image2 from "/2.jpg"
import image3 from "/3.jpg"
import image4 from "/4.jpg"
import image5 from "/5.jpg"
import image6 from "/6.jpg"
import image7 from "/7.jpg"
import image8 from "/8.jpg"
import image9 from "/9.jpg"
import image10 from "/10.jpg"
import image11 from "/11.jpg"
import image12 from "/12.jpg"


const Album: React.FC = () => {

    const [index, setIndex] = useState<number>(-1);
    const [userCheatCode, setUserCheatCode] = useState<string[]>([])
    const [placeReveal, setPlaceReveal] = useState<boolean>(false)

    const validCheatCode = "silver"

    const validateCheatCode = (e: KeyboardEvent) => {
        const pressedKey: string = e.key.toLowerCase()

        if (userCheatCode.length >= 50)
            setUserCheatCode([pressedKey])
        else
            setUserCheatCode([...userCheatCode, pressedKey])
    }

    useEffect((): void => {
        // Validate if the exact user keypress matched the cheat code
        if (userCheatCode.join("").indexOf(validCheatCode) > -1)
            setPlaceReveal(true)
    }, [userCheatCode])

    useEffect(() => {
        document.addEventListener("keydown", validateCheatCode);
        return () => document.removeEventListener("keydown", validateCheatCode);
    }, [validateCheatCode]);

    const photos: { src: string, width: number, height: number, place: string }[] = [
        { src: image1, width: 1200, height: 800, place: "Kai Ching Estate, Kai Tak, Kowloon, HK" },
        { src: image2, width: 1200, height: 800, place: "Shek Pai Street, Kwai Chung, New Territories, HK" },
        { src: image3, width: 1200, height: 800, place: "Tung Chi Street, Kwai Chung, New Territories, HK" },
        { src: image4, width: 1200, height: 800, place: "Thousand Island Lake, Tai Lam Country Park, New Territories, HK" },
        { src: image5, width: 1200, height: 800, place: "Argyle Street, Mong Kok East, Kowloon, HK" },
        { src: image6, width: 1200, height: 800, place: "Wu Kai Sha Station Public Transport Interchange, New Territories, HK" },
        { src: image7, width: 1200, height: 800, place: "Man Lok House, Tai Hang Sai Estate, Kowloon, HK" },
        { src: image8, width: 1200, height: 800, place: "Junction of Woh Chai Street & Tai Hung Tung Road, Kowloon, HK" },
        { src: image9, width: 1200, height: 800, place: "Sea Ranch, Lantau Island, HK" },
        { src: image10, width: 1200, height: 800, place: "Sea Ranch, Lantau Island, HK" },
        { src: image11, width: 1200, height: 800, place: "Pui O, Lantau Island, HK" },
        { src: image12, width: 1200, height: 800, place: "Sea Ranch Beach, Lantau Island, HK" }
    ]

    return (
        <section tabIndex={0} id="album" className="outline-none text-center flex flex-col py-30 gap-10"
        >
            <h1 className="text-[4rem] leading-25 titillium-web-bold max-lg:leading-20">
                <GradientText text="Album Gallery" /> 🌆 📸
            </h1>

            <div className="px-10 flex flex-col gap-4 text-[1.75rem] leading-15 text-shadow-lg ">
                <span>The following photos are some that I took and I found them beautiful in different regions in HK.</span>
                <span>A little game, can you guess where is the original place in each photo?</span>
                <span>You can check the answer if you type my name now. 👻</span>
            </div>

            <RowsPhotoAlbum
                photos={photos}
                onClick={({ index }) => setIndex(index)}
                padding={20}
                render={{
                    extras: (_, { index }) => (
                        <span className={`${!placeReveal && `hidden`} max-md:text-lg text-sm `}>
                            {photos[index].place}
                        </span>
                    ),
                }}
                sizes={{
                    size: "1168px",
                    sizes: [
                        {
                            viewport: "(max-width: 1200px)",
                            size: "calc(100vw - 32px)",
                        },
                    ],
                }} />

            <Lightbox
                slides={photos}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Slideshow, Thumbnails, Zoom]}
            />
        </section>
    )
}

export default Album