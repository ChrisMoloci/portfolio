import styles from "./Media.module.css"
import AdminMediaImage from "../../../components/AdminMediaImage/AdminMediaImage.tsx";
import {useEffect, useState} from "react";
import type {ApiState} from "../../../types/ApiState.ts";
import type {Media} from "../../../types/Media.ts";
import {api} from "../../../api/client.ts";
import transformMedia from "../../../transformers/transformMedia.ts";

function Media() {
    const [ images, setImages ] = useState<ApiState<Array<Media>>>({ status: "loading" });
    const [ selectedMedia, setSelectedMedia] = useState<Media | undefined>(undefined);

    const deleteImage = async (id: number) => {
        try {
            await api.delete(`/media/${id}`);
            fetchImages();
        } catch(error) {

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
                                imageURL={image.storageKey}
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
        </main>
    )
}

export default Media;