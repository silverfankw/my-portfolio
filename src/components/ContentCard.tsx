import { useState } from "react";


const ContactCard: React.FC = () => {
    const [result, setResult] = useState<string>("");

    const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("🫸🏻 Sending your message....");
        const formData = new FormData(event.currentTarget);

        formData.append("access_key", "c92bca04-0e0c-4aef-8bd0-6f0d37b4b3e8");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("✅ Your message has been sent to Silver's mail box!");
            event.currentTarget.reset();

        } else {
            console.log("Error", data);
            setResult(`❌ Sorry, your message cannot be sent. Error reference: ${data.message}`);
        }
    };

    return (
        <section id="contact" className="p-15 flex flex-col items-center">

            <form className="flex flex-col gap-5 p-10 rounded-xl bg-black/40" onSubmit={onSubmit}>
                <span className="text-[2.5rem] font-bold">Get in touch 📩</span>
                <span className="text-[1.5rem]">Feel free to send me message, I'll reply to you soon.🐱</span>

                <input type="hidden" name="from_name" value="Silverf" />
                <input type="checkbox" name="botcheck" id="" style={{ "display": "none" }} />
                <input type="hidden" name="access_key" value="Yc92bca04-0e0c-4aef-8bd0-6f0d37b4b3e8" />
                <input type="hidden" name="subject" value={`New Message from Web3Forms -- silverf.dev`} />

                <div className="flex flex-col gap-2">
                    <label className="block text-[1rem] font-medium text-white">
                        Name
                    </label>
                    <input
                        className="bg-gray-50 border border-gray-300 
                text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        type="text" name="name" placeholder="Your Name" required />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="block text-[1rem] font-medium text-white">
                        Email
                    </label>
                    <input
                        className="bg-gray-50 border border-gray-300 
                text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        type="email" name="email" placeholder="Your Email" required />
                </div>


                <div className="flex flex-col gap-2">
                    <label className="block text-[1rem] font-medium text-white">
                        Message
                    </label>
                    <textarea
                        maxLength={1000}
                        className="h-[200px] bg-gray-50 border border-gray-300 
                text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block p-2.5" name="message" placeholder="Your Message" required></textarea>
                </div>


                <button className="bg-yellow-400 hover:bg-yellow-500/95
                text-black hover:cursor-pointer 
                font-medium rounded-lg text-sm py-3 text-center" type="submit">Submit Form</button>

                <span className="text-[1.25rem] p-3 text-center">{result}</span>
            </form>
        </section>
    );
}

export default ContactCard


