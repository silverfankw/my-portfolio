import { useState } from "react"
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

    const photos: { src: string, width: number, height: number }[] = [
        { src: image1, width: 1200, height: 800 },
        { src: image2, width: 1200, height: 800 },
        { src: image3, width: 1200, height: 800 },
        { src: image4, width: 1200, height: 800 },
        { src: image5, width: 1200, height: 800 },
        { src: image6, width: 1200, height: 800 },
        { src: image7, width: 1200, height: 800 },
        { src: image8, width: 1200, height: 800 },
        { src: image9, width: 1200, height: 800 },
        { src: image10, width: 1200, height: 800 },
        { src: image11, width: 1200, height: 800 },
        { src: image12, width: 1200, height: 800 }
    ]

    return (
        <section id="album" className="text-center flex flex-col py-30 gap-10">
            <h1 className="text-[4rem] leading-25 titillium-web-bold max-lg:leading-20">
                <GradientText text="Album Gallery" /> 🌆 📸
            </h1>

            <span className="p-10 text-[1.75rem] leading-15">I love photography, especially breathtaking scenery, unique building and special buses. Sometimes I will bring my camera to capture any great moment in my spare time. 😝</span>
            <span className="px-10 text-[1.75rem] leading-15">The following photos are some that I took and I found them beautiful, and would like to share with you.  🤩</span>

            <RowsPhotoAlbum
                photos={photos}
                onClick={({ index }) => setIndex(index)}
                padding={20}
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