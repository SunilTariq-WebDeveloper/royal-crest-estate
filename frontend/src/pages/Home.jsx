import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "./HeroSection";
import PropertyListing from "./PropertyListing";
import WhyChooseUs from "./Choose";
import About from "./About";
import ServicesSection from "./Services";
import FAQPage from "./FAQ";
import ContactPage from "./Contact";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsappButton";

const Home = () => {
  const [activeSection, setActiveSection] = useState("Home");

  const sectionData = {
    Home: {
      title: "Home - Royal Crest Estate ",
      description:
        "Find your dream home with us. Best properties in Lahore, Karachi, Islamabad. Buy, sell, or rent properties.",
    },
    Properties: {
      title: "Properties for Sale - Royal Crest Estate ",
      description:
        "Explore 100+ properties including 3 BHK, 4 BHK apartments, villas, and commercial plots. Updated prices and locations.",
    },
    "Why Choose Us": {
      title: "Why Choose Us - Royal Crest Estate ",
      description:
        "10+ years experience, 500+ happy clients, best property deals. We help you find the perfect home.",
    },
    About: {
      title: "About Us - Royal Crest Estate ",
      description:
        "Learn about our real estate journey. Professional agents dedicated to finding your dream property.",
    },
    Services: {
      title: "Our Services - Royal Crest Estate ",
      description:
        "Property valuation, legal assistance, mortgage help, and after-sales support. All real estate services under one roof.",
    },
    FAQ: {
      title: "FAQs - Royal Crest Estate ",
      description:
        "Common questions about property buying, selling, documentation, and investment answered by experts.",
    },
    Contact: {
      title: "Contact Us - Royal Crest Estate ",
      description:
        "Get in touch with our real estate agents. Call, WhatsApp, or visit our office for property inquiries.",
    },
  };

  useEffect(() => {
    const sections = [
      { id: "hero", name: "Home" },
      { id: "property-listing", name: "Properties" },
      { id: "choose", name: "Why Choose Us" },
      { id: "about", name: "About" },
      { id: "services", name: "Services" },
      { id: "faq", name: "FAQ" },
      { id: "contact", name: "Contact" },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            if (activeSection !== section.name) {
              setActiveSection(section.name);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const currentData = sectionData[activeSection] || sectionData.Home;

  return (
    <>
      <Helmet>
        <title>{currentData.title}</title>
        <meta name="description" content={currentData.description} />
        <meta property="og:title" content={currentData.title} />
        <meta property="og:description" content={currentData.description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div>
        <Hero />
        <PropertyListing />
        <WhyChooseUs />
        <About />
        <ServicesSection />
        <FAQPage />
        <ContactPage />
        <WhatsAppButton />
        <Footer />
      </div>
    </>
  );
};

export default Home;