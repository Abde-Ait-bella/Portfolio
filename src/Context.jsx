import { useContext, createContext, useState } from "react"; 

export const ModeContext = createContext();

export const ModeProvider = ({children}) => {

    const [mode, setMode] = useState('dark');

    const data = [
        {
          id: 0,
          src: "./assets/videos/video2.mp4",
          title:"ArbiTre",
          duration: "6 Months",
          date: "May 10, 2024",
          title_description: "Football Referees' Administrative Match Questions Management Application .",
          description: "This application is designed to help football referees in managing match-related administrative matters efficiently. It provides a central platform where referees can record various administrative aspects of the match report and track match statistics, and even enable them to save all match reports and even print them in PDF format. \n Key Features \n Match Information Recording: Allows referees to input essential details such as date, time, stade, and competing teams etc ....\n Data Management: Facilitates adding, modifying, and removing (assistant referees, clubs, stades, cities ...).\n Match statistics: The number of matches in months and years, the number of warnings, charts.\n Reports: Generates detailed report and information about the matches and events that took place during the matches will be issued in the form of an official report that will be sent to the regional league....\n Print the report: The site provides the feature of printing the report and downloading it in a format PDF \n Technologies Used \n Frontend: HTML, CSS, JavaScript (React.js) \n Backend: Laravel \n Database: Mysql \n Authentication: JSON Web Tokens (JWT) \n Other Tools: Git, GitHub, Postman (for API development and testing), Bootstrap, SASS (for design).",
          url: "https://arbitre.ma",
          url_git: "https://github.com/Abde-Ait-bella/ArbiTre",
        },
        {
          id: 1,
          src: "/assets/videos/video2.mp4",
          title: "BECJ : Simplifying Content Editing",
          duration: "15 days",
          date: "May 04, 2023",
          title_description: "Simplifying Content Editing",
          info: "9,538 views 2 years ago",
          description: "The website serves as a homepage for an accounting office and provides a dashboard that allows the administrator to easily modify the site's content. It is developed using Laravel.",
          url: "https://becj.ma",
          url_git: "https://github.com/Abde-Ait-bella/BECJ",
        },
        {
          id: 2,
          src: "/assets/videos/video2.mp4",
          title: "Morocco : A Front-End Experience",
          duration: "15 days",
          date: "Jul 12, 2023",
          title_description: "Front-End Experience",
          description: "💡 This interface was created with passion to offer an immersive visual experience of Morocco’s cultural and natural richness. Using HTML for the structure, CSS for styling, and JavaScript for smooth interaction, the site allows virtual exploration of the different regions, showcasing their unique beauty. The responsive design ensures optimal accessibility on all devices 💻 📱 \n ⚒ Technologies used: HTML, Sass, Gulp, JavaScript",
          url: "https://morocco.becj.net/",
          url_git: "https://github.com/Abde-Ait-bella/Morocco_Template",
        },
        {
          id: 3,
          src: "/assets/videos/video2.mp4",
          title: "Auto_Site",
          duration: "14 days",
          date: "Aug 05, 2023",
          title_description: "Dynamic Content Management Made Simple",
          description: "This Auto site stands out for its innovative approach by utilizing a standard template, rather than a conventional WordPress theme. This custom integration allows for a dynamic connection to WordPress, enabling seamless content management. Users can easily modify and update the site’s content through a user-friendly form within the WordPress dashboard. This setup not only simplifies the editing process but also ensures that the site remains flexible and adaptable, catering to the evolving needs of its users.",
          url: "https://Auto.net/",
          url_git: "https://github.com/Abde-Ait-bella/Auto_Site",
        },
        {
          id: 4,
          src: "/assets/videos/video2.mp4",
          title: "Potfolio : YouTube-Inspired",
          duration: "14 days",
          date: "Aug 05, 2023",
          title_description: "YouTube-Inspired Portfolio",
          description: "This portfolio is a unique showcase of my ability to replicate the design and functionality of platforms like YouTube with precision. Built to highlight my front-end development skills, the site features an intuitive interface, interactive elements, and seamless navigation. Through this project, I demonstrate my expertise in web design and coding, ensuring a fully responsive and user-friendly experience across devices. This portfolio serves as both a technical showcase and an introduction to my capabilities as a developer \n Technologies Used  : \n ⚒️ HTML5 : For structuring the content \n CSS3 (SASS) : For styling and layout with enhanced control \n JavaScript : For interaction and dynamic content rendering \n React.js : To build reusable components and manage state \n GSAP : For animations and smooth transitions.",
          url: "https://Auto.net/",
          url_git: "https://github.com/Abde-Ait-bella/Portfolio",
        },
      ];

    const toggleMode = () => { 
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
     }

     return (
        <>
            <ModeContext.Provider value={{toggleMode, mode, data}}>
                {children}
            </ModeContext.Provider>
        </>
     )
}

export const UseMode = () => {
    return useContext(ModeContext);
};