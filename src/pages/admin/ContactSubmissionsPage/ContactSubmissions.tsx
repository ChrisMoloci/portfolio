import styles from "./ContactSubmissions.module.css";
import ContactFormSubmissionCard from "../../../components/ContactFormSubmissionCard/ContactFormSubmissionCard.tsx";
import {api} from "../../../api/client.ts";
import {useEffect, useState} from "react";
import type {ApiState} from "../../../types/ApiState.ts";
import type {ContactFormSubmission} from "../../../types/ContactFormSubmission.ts";
import transformContactFormSubmission from "../../../transformers/transformContactFormSubmission.ts";

function ContactSubmissions() {
    const [ messages, setMessages ] = useState<ApiState<Array<ContactFormSubmission>>>({ status: "loading" });

    const fetchMessages = async () => {
        try {
            const response = await api.get("contact");

            const data: ApiState<Array<ContactFormSubmission>> = {
                status: "success",
                data: response.data.map((message: any) => transformContactFormSubmission(message))
            }

            setMessages(data);
        } catch (error: any) {
            setMessages({ status: "error", error: error.message });
        }
    }

    const deleteMessage = async (id: number): Promise<boolean> => {
        try {
            await api.delete(`contact/${id}`);

            await fetchMessages();

            return true;
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [])

    return (
        <main className={styles.main}>
            <h1>Contact Form Submissions</h1>

            <section className={styles.cards}>
                {messages.status === "success" && messages.data.length > 0 &&
                    messages.data.map((message: ContactFormSubmission) =>
                        <ContactFormSubmissionCard
                            id={message.id}
                            name={message.name}
                            email={message.email}
                            message={message.message}
                            date={message.createdAt}
                            onDelete={deleteMessage}
                        />
                    )
                }
                {messages.status === "success" && messages.data.length === 0 &&
                    <p>No results.</p>
                }
                {messages.status === "error" &&
                    <p className={"errorText"}>{messages.error}</p>
                }
            </section>
        </main>
    )
}

export default ContactSubmissions;