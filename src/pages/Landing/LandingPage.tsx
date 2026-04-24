
import { useEffect, useState } from "react";
import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import Maintenance from "../../components/landing/Maintenance";
import Reports from "../../components/landing/Reports";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

export default function LandingPage() {
    const [active, setActive] = useState("home");

    useEffect(() => {
        const elements = document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right, .reveal-scale"
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-visible");
                    }
                });
            },
            { threshold: 0.2 }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Navbar active={active} setActive={setActive} />

            <main
                id="home"
                className="scroll-mt-24 relative min-h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50"
            >
                <Hero />
                <Features />
                <Maintenance />
                <Reports />
                <CTA />
                <Footer />
            </main>
        </div>
    );
}