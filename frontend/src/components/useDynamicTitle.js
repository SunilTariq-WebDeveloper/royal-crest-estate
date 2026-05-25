import { useEffect, useState } from 'react';

const useDynamicTitle = (sections) => {
    const [activeSection, setActiveSection] = useState('Home');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;

            for (let section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        if (activeSection !== section.title) {
                            setActiveSection(section.title);
                            document.title = `${section.title} - Royal Crest Estate`;
                        }
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); 

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections, activeSection]);

    return activeSection;
};

export default useDynamicTitle;