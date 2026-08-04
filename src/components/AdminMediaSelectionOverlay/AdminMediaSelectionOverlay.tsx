import styles from "./AdminMediaSelectionOverlay.module.css"
import {useEffect, useRef, useState} from "react";
import type {ApiState} from "../../types/ApiState.ts";
import type {Media} from "../../types/Media.ts";
import {api} from "../../api/client.ts";
import transformMedia from "../../transformers/transformMedia.ts";
import AdminMediaImage from "../AdminMediaImage/AdminMediaImage.tsx";

type Props = {
    selectMedia: (image: Media) => void,
    setShown: (shown: boolean) => void,
}

function AdminMediaSelectionOverlay(props: Props) {
    const [ images, setImages ] = useState<ApiState<Array<Media>>>(() => ({ status: "loading" }));
    const formRef = useRef<HTMLFormElement>(null);
    const [ imageFormErrorText, setImageFormErrorText ] = useState<string>(() => "");
    const [ selectedImage, setSelectedImage ] = useState<Media | null>(() => null);

    const deleteImage = async (id: number) => {
        try {
            await api.delete(`/media/${id}`);
            fetchImages();
        } catch(error) {

        }
    }

    const uploadImage = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            await api.post("/media", formData)

            setImageFormErrorText("")

            await fetchImages();

            formRef.current?.reset();
        } catch (error: any) {
            setImageFormErrorText(error.message)
        }
    }

    const fetchImages = async () => {
        try {
            const response = await api.get("/media");

            const data: ApiState<Array<Media>> = {
                status: "success",
                data: response.data.map((image: any) => transformMedia(image))
            }

            console.log(data);

            setImages(data);
        } catch(error: any) {
            setImages({
                status: "error",
                error: error.message
            });
        }
    }

    const selectImage = async () => {
        if (!selectedImage) return

        props.selectMedia(selectedImage);

        props.setShown(false);
    }

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                props.setShown(false);
            }
        }

        document.addEventListener("keydown", onKeyDown);

        fetchImages();

        return () => {
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [])

    return (
        <div className={styles.adminMediaSelectionOverlayContainer}>
            <div className={styles.adminMediaSelectionOverlay}>
                <div className={styles.header}>
                    <h1>Select and Image</h1>

                    <div className={styles.closeButton} onClick={() => props.setShown(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M5.76 13.5L9 10.26L12.24 13.5L13.5 12.24L10.26 9L13.5 5.76L12.24 4.5L9 7.74L5.76 4.5L4.5 5.76L7.74 9L4.5 12.24L5.76 13.5ZM9 18C7.755 18 6.585 17.7637 5.49 17.2912C4.395 16.8187 3.4425 16.1775 2.6325 15.3675C1.8225 14.5575 1.18125 13.605 0.70875 12.51C0.23625 11.415 0 10.245 0 9C0 7.755 0.23625 6.585 0.70875 5.49C1.18125 4.395 1.8225 3.4425 2.6325 2.6325C3.4425 1.8225 4.395 1.18125 5.49 0.70875C6.585 0.23625 7.755 0 9 0C10.245 0 11.415 0.23625 12.51 0.70875C13.605 1.18125 14.5575 1.8225 15.3675 2.6325C16.1775 3.4425 16.8187 4.395 17.2912 5.49C17.7637 6.585 18 7.755 18 9C18 10.245 17.7637 11.415 17.2912 12.51C16.8187 13.605 16.1775 14.5575 15.3675 15.3675C14.5575 16.1775 13.605 16.8187 12.51 17.2912C11.415 17.7637 10.245 18 9 18ZM9 16.2C11.01 16.2 12.7125 15.5025 14.1075 14.1075C15.5025 12.7125 16.2 11.01 16.2 9C16.2 6.99 15.5025 5.2875 14.1075 3.8925C12.7125 2.4975 11.01 1.8 9 1.8C6.99 1.8 5.2875 2.4975 3.8925 3.8925C2.4975 5.2875 1.8 6.99 1.8 9C1.8 11.01 2.4975 12.7125 3.8925 14.1075C5.2875 15.5025 6.99 16.2 9 16.2Z"/>
                        </svg>
                    </div>
                </div>

                <div className={styles.cards}>
                    {images.status === "success" &&
                        images.data.map((image) =>
                            <div
                                onClick={(e) => {
                                    e.preventDefault();

                                    setSelectedImage(selectedImage && selectedImage.id === image.id ? null : image);
                                }}
                                 className={selectedImage && selectedImage.id === image.id ? styles.selected : ""}
                            >
                                <AdminMediaImage
                                    storageKey={image.storageKey}
                                    alt={image.alt}
                                    delete={() => deleteImage(image.id)}
                                />
                            </div>
                        )
                    }
                </div>

                <div className={styles.buttons}>
                    <button className={"errorText"} onClick={() => props.setShown(false)}>Cancel</button>
                    {selectedImage &&
                        <button onClick={() => selectImage()}>Select Image</button>
                    }
                </div>

                <div className={styles.imageForm}>
                    <h2>Upload Image</h2>
                    <form onSubmit={uploadImage} ref={formRef}>
                        <div className={styles.formRow}>
                            <label htmlFor="image">Image:
                                <input type="file" name="image" id="image"/>
                            </label>

                            <label htmlFor="alt">Image Alt:
                                <input type="text" name="alt" id="alt" placeholder={"alt..."}/>
                            </label>
                        </div>

                        {imageFormErrorText &&
                            <p className={"errorText"}>{imageFormErrorText}</p>
                        }

                        <button type="submit">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminMediaSelectionOverlay;
