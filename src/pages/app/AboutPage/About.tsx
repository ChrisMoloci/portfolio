import styles from './About.module.css'
import ContactLinks from "../../../components/ContactLinks/ContactLinks.tsx";
import LanguageCard from "../../../components/LanguageCard/LanguageCard.tsx";
import EducationCard from "../../../components/EducationCard/EducationCard.tsx";
import Timeline from "../../../components/Timeline/Timeline.tsx";
import VerseCard from "../../../components/VerseCard/VerseCard.tsx";

function About() {
    return (
        <>
            <title>About</title>
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
                            Computer Programming graduate with a 4.0 GPA, recognized as the top-performing student in the program.
                            Experienced in developing React and Angular web applications using TypeScript, Node.js, and SQL databases.
                            Developed LLQR, a TypeScript QR Code generator library built from scratch, cleanly implementing low-level
                            concepts including data encoding, Reed-Solomon error correction, data masking, and datastream optimization
                            algorithms.
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
                        <h1>Education & Certifications</h1>

                        <div className={styles.educationCards}>
                            <EducationCard institution={"St. Clair College"} course={"Computer Programming"} type={"Post-Secondary"} timeSpan={"2024-2026"} />
                            <EducationCard institution={"Scrimba"} course={"Learn React"} type={"Certification"} timeSpan={"2026"} />
                            <EducationCard institution={"Scrimba"} course={"Learn Node.js"} type={"Certification"} timeSpan={"2026"} />
                        </div>
                    </section>

                    <section className={styles.jobHistory}>
                        <h1>Job History</h1>
                        <div className={styles.jobTimeline}>
                            <Timeline entries={[
                                {
                                    title: "Cowlick Studios",
                                    subtitle: "WordPress Developer",
                                    timeSpan: "2026"
                                },
                                {
                                    title: "Magna Integram",
                                    subtitle: "Assembly Line Worker",
                                    timeSpan: "2025"
                                },
                                {
                                    title: "Osella Technologies",
                                    subtitle: "Industrial Mechanic Apprentice",
                                    timeSpan: "2023-2024"
                                }
                            ]} />
                        </div>
                    </section>

                    <section className={styles.favoriteVerses}>
                        <h1>Favorite Bible Verses</h1>
                        <div className={styles.verseCards}>

                            <VerseCard
                                verseRef={"Colossians 3:17"}
                                text={"17 And whatever you do, in word or deed, do everything in the name of the Lord Jesus, giving thanks to God the Father through him."}
                                translation={"ESV"}
                            />

                            <VerseCard
                                verseRef={"Psalm 119:9-11"}
                                text={"9 How can a young man keep his way pure? By guarding it according to your word. 10 With my whole heart I seek you; let me not wander from your commandments!"}
                                translation={"ESV"}
                            />

                            <VerseCard
                                verseRef={"John 15:5"}
                                text={"5 I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing."}
                                translation={"ESV"}
                            />

                            <VerseCard
                                verseRef={"Galatians 5:16-17"}
                                text={"16 But I say, walk by the Spirit, and you will not gratify the desires of the flesh. 17 For the desires of the flesh are against the Spirit, and the desires of the Spirit are against the flesh, for these are opposed to each other, to keep you from doing the things you want to do."}
                                translation={"ESV"}
                            />

                            <VerseCard
                                verseRef={"Philippians 4:13"}
                                text={"13 Brothers, I do not consider that I have made it my own. But one thing I do: forgetting what lies behind and straining forward to what lies ahead"}
                                translation={"ESV"}
                            />

                            <VerseCard
                                verseRef={"Acts 4:13"}
                                text={"13 Now when they saw the boldness of Peter and John, and perceived that they were uneducated, common men, they were astonished. And they recognized that they had been with Jesus."}
                                translation={"ESV"}
                            />

                            <VerseCard
                                verseRef={"Philippians 4:4-7"}
                                text={"4 Rejoice in the Lord always; again I will say, rejoice. 5 Let your reasonableness be known to everyone. The Lord is at hand; 6 do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. 7 And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus."}
                                translation={"ESV"}
                            />

                            <VerseCard
                                verseRef={"John 1:1-3"}
                                text={"1 In the beginning was the Word, and the Word was with God, and the Word was God. 2 He was in the beginning with God. 3 All things were made through him, and without him was not any thing made that was made."}
                                translation={"ESV"}
                            />

                            <VerseCard
                                verseRef={"Colossians 3:15-16"}
                                text={"15 And let the peace of Christ rule in your hearts, to which indeed you were called in one body. And be thankful. 16 Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom, singing psalms and hymns and spiritual songs, with thankfulness in your hearts to God."}
                                translation={"ESV"}
                            />

                            <hr/>

                            <small>
                                Scripture quotations are from The ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.
                            </small>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default About;