"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAddSubscribeMutation } from "../../../redux/features/connected/connected.api";

const NewsletterForm = () => {
    const [subscribe] = useAddSubscribeMutation();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await subscribe({ email }).unwrap();
            toast.success("Subscribed successfully!");
            setEmail("");
        } catch (error) {
            toast.error("Subscription failed.");
        }
    };

    return (
        <section className="w-full rounded-xl sm:p-[20px]">
            <div className="flex lg:flex-row flex-col items-center justify-between gap-[20px]">
                <div className="w-full sm:w-[80%] lg:w-[50%]">
                    <img src="https://i.ibb.co/sKzp64h/undraw-Newsletter-re-wrob-1.png" alt="Newsletter" className="w-full" />
                </div>

                <div className="w-full lg:w-[45%]">
                    <b className="text-[1.3rem] sm:text-[2rem]">Get our weekly</b>
                    <h1 className="text-[2.1rem] sm:text-[3.2rem] font-[800] uppercase text-[#FF354D] leading-[50px]">newsletter</h1>
                    <p className="text-[1rem] sm:text-[1.3rem] mt-5 sm:mt-8">
                        Get weekly updates on the newest design stories, case studies and tips right in your mailbox. <b>Subscribe now!</b>
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="relative mt-10 w-full sm:w-[85%] mx-auto">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="py-3 px-4 pr-[130px] border border-border rounded-md w-full focus:border-[#FF354D]"
                    required
                />
                <button
                    type="submit"
                    className="py-3 px-6 absolute top-0 right-0 bg-[#FF354D] text-white rounded-r-md hover:bg-[#ea253c]"
                >
                    Subscribe
                </button>
            </form>
        </section>
    );
};

export default NewsletterForm;
