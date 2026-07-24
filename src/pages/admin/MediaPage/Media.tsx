import styles from "./Media.module.css"
import AdminMediaImage from "../../../components/AdminMediaImage/AdminMediaImage.tsx";
import {useEffect, useRef, useState} from "react";
import type {ApiState} from "../../../types/ApiState.ts";
import type {Media} from "../../../types/Media.ts";
import {api} from "../../../api/client.ts";
import transformMedia from "../../../transformers/transformMedia.ts";

function Media() {
    const [ images, setImages ] = useState<ApiState<Array<Media>>>({ status: "loading" });
    const [ selectedMedia, setSelectedMedia] = useState<Media | undefined>(undefined);
    const formRef = useRef<HTMLFormElement>(null);
    const [ imageFormErrorText, setImageFormErrorText ] = useState<string>("");

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
            const response = await api.post("/media", formData)

            const data = transformMedia(response.data)

            fetchImages();

            setSelectedMedia(data);

            // Reset the form
            formRef.current?.reset();

            setImageFormErrorText("")
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

    useEffect(() => {
        fetchImages();
    }, [])

    return (
        <main className={styles.main}>
            <title>Admin Media</title>
            <div className={styles.header}>
                <h1>Media</h1>
            </div>

            <div className={styles.imageInfo}>
                <h2>Selected Image:</h2>
                <div className={styles.data}>
                    <small><strong>Storage Key:</strong> {selectedMedia?.storageKey}</small>
                    <small><strong>Type:</strong> {selectedMedia?.mimeType}</small>
                    <small><strong>Alt:</strong> {selectedMedia?.alt}</small>
                    <small><strong>URL:</strong> {selectedMedia && import.meta.env.VITE_MEDIA_DIR + "/" + selectedMedia?.storageKey + ".webp"}</small>
                </div>
            </div>

            <div className={styles.cards}>
                {images.status === "success" && images.data.length > 0 &&
                    images.data.map((image: Media) =>
                        <div
                            onClick={() => setSelectedMedia(prev => prev ? prev.id === image.id ? undefined : image : image)}
                            className={selectedMedia && selectedMedia.id === image.id ? styles.selected : ""}
                        >
                            <AdminMediaImage
                                alt={image.alt}
                                storageKey={image.storageKey}
                                delete={() => deleteImage(image.id)}
                            />
                        </div>
                    )
                }

                {images.status === "success" && images.data.length === 0 &&
                    <p>No results.</p>
                }
                {images.status === "error" &&
                    <p>{images.error}</p>
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
        </main>
    )
}

export default Media;