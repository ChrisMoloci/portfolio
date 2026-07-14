import styles from "./LanguageCard.module.css"
import languageImages from "../../constants/languageImages.ts";

type Props = {
    lang: string,
    langImg: string,
}

function LanguageCard(props: Props) {
    const img = languageImages[props.langImg];
    console.log(img);

    return (
        <div className={styles.languageCard}>
            <img className={styles.img} src={img} alt={props.lang}/>
            <span className={styles.lang}>{props.lang}</span>
        </div>
    )
}

export default LanguageCard;