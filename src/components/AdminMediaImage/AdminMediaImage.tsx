import styles from "./AdminMediaImage.module.css"

type Props = {
    storageKey: string,
    alt: string,
    delete: () => void
}

function AdminMediaImage(props: Props) {
    const deleteImage = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();

        props.delete();
    }

    return (
        <div className={styles.adminMediaImage}>
            <img src={import.meta.env.VITE_MEDIA_DIR + "/" + props.storageKey + ".webp"} alt={props.alt} />

            <span className={styles.deleteButton} onClick={(e) => deleteImage(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 12" fill="none">
                  <path d="M2.0625 12C1.68437 12 1.36068 11.8694 1.09141 11.6083C0.822135 11.3472 0.6875 11.0333 0.6875 10.6667V2H0V0.666667H3.4375V0H7.5625V0.666667H11V2H10.3125V10.6667C10.3125 11.0333 10.1779 11.3472 9.90859 11.6083C9.63932 11.8694 9.31563 12 8.9375 12H2.0625ZM8.9375 2H2.0625V10.6667H8.9375V2ZM3.4375 9.33333H4.8125V3.33333H3.4375V9.33333ZM6.1875 9.33333H7.5625V3.33333H6.1875V9.33333Z"/>
                </svg>
            </span>
        </div>
    )
}

export default AdminMediaImage;