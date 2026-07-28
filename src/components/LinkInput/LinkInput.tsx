import styles from "./LinkInput.module.css";
import {useEffect, useState} from "react";

export type Props = {
    delete: () => void,
    label: string,
    url: string,
    linkKey: string,
    linkListSetter: React.Dispatch<React.SetStateAction<Array<any>>>,
    setLink: (setList: React.Dispatch<React.SetStateAction<Partial<Array<any>>>>, url: string, label: string, key: string) => void
}

function LinkInput(props: Props) {
    const [ label, setLabel ] = useState<string>(() => props.label);
    const [ url, setUrl ] = useState<string>(() => props.url);

    useEffect(() => {
        const debounce = setTimeout(() => {
            props.setLink(props.linkListSetter, url, label, props.linkKey);
        }, 500);

        return () => {
            clearTimeout(debounce);
        }
    }, [label, url]);

    return (
        <div className={styles.linkInput}>
            <label htmlFor="">Label:
                <input
                    type="text"
                    name="label"
                    id="label"
                    placeholder={"link label..."}
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
            </label>

            <label htmlFor="">URL:
                <input
                    type="text"
                    name="url"
                    id="url"
                    placeholder={"https://example.com/"}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </label>

            <button onClick={() => props.delete()}>
                Remove
            </button>
        </div>
    )
}

export default LinkInput;