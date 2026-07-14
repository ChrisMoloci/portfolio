import styles from './About.module.css'
import ContactLinks from "../../components/ContactLinks/ContactLinks.tsx";
import LanguageCard from "../../components/LanguageCard/LanguageCard.tsx";
import EducationCard from "../../components/EducationCard/EducationCard.tsx";

function About() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <h4>About Me</h4>
                        <h1>Christian Moloci</h1>
                        <ContactLinks />
                    </div>
                </div>

                <div className={styles.content}>
                    {/* Summary Section */}
                    <section>
                        <h1>Summary</h1>
                        <p>
                            Computer Programming graduate with a 4.0 GPA, recognized as the top-performing student in the program. Experienced in [developing React and Angular web applications using TypeScript, Node.js, and SQL databases]. Developed LLQR, a TypeScript QR Code generator library built from scratch, cleanly implementing low-level concepts including data encoding, Reed-Solomon error correction, data masking, and datastream optimization algorithms.
                        </p>
                    </section>

                    {/* Languages Section */}
                    <section className={styles.languages}>
                        <h1>Languages</h1>

                        {/* Front End */}
                        <div className={styles.langSection}>
                            <h2>Front-End:</h2>
                            <div className={styles.languageCards}>
                                <LanguageCard lang={"HTML"} langImg={"html"} />
                                <LanguageCard lang={"CSS"} langImg={"css"} />
                                <LanguageCard lang={"JavaScript"} langImg={"js"} />
                                <LanguageCard lang={"TypeScript"} langImg={"ts"} />
                                <LanguageCard lang={"React"} langImg={"react"} />
                                <LanguageCard lang={"Angular"} langImg={"angular"} />
                            </div>
                        </div>

                        {/* Back End */}
                        <div className={styles.langSection}>
                            <h2>Back-End:</h2>
                            <div className={styles.languageCards}>
                                <LanguageCard lang={"Node.js"} langImg={"nodejs"} />
                                <LanguageCard lang={"Fastify"} langImg={"fastify"} />
                                <LanguageCard lang={"PHP"} langImg={"php"} />
                            </div>
                        </div>

                        {/* OOP */}
                        <div className={styles.langSection}>
                            <h2>OOP:</h2>
                            <div className={styles.languageCards}>
                                <LanguageCard lang={"Java"} langImg={"java"} />
                                <LanguageCard lang={"C#"} langImg={"csharp"} />
                                <LanguageCard lang={"Kotlin"} langImg={"kotlin"} />
                                <LanguageCard lang={"Python"} langImg={"python"} />
                                <LanguageCard lang={"Swift"} langImg={"swift"} />
                            </div>
                        </div>

                        {/* Tools */}
                        <div className={styles.langSection}>
                            <h2>Tools:</h2>
                            <div className={styles.languageCards}>
                                <LanguageCard lang={"Git"} langImg={"git"} />
                                <LanguageCard lang={"GitHub"} langImg={"github"} />
                                <LanguageCard lang={"VS Code"} langImg={"vscode"} />
                                <LanguageCard lang={"Figma"} langImg={"figma"} />
                                <LanguageCard lang={"NPM"} langImg={"npm"} />
                                <LanguageCard lang={"JetBrains IDEs"} langImg={"jetbrains"} />
                            </div>
                        </div>
                    </section>

                    {/* Education and Certifications Section */}
                    <section className={styles.education}>
                        <h1>Education/Certifications</h1>
                        
                        <div className={styles.educationCards}>
                            <EducationCard institution={"St. Clair College"} course={"Computer Programming"} type={"Post-Secondary"} timeSpan={"2024-2026"} />
                            <EducationCard institution={"Scrimba"} course={"Into to React"} type={"Certification"} timeSpan={"2026"} />
                        </div>
                    </section>

                    <section>
                        <h1>Job History</h1>
                    </section>

                    <section>
                        <h1>Favorite Bible Verses</h1>
                    </section>
                </div>
            </main>
        </>
    )
}

export default About;