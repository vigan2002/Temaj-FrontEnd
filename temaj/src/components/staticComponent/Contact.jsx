import React, {useRef, useState} from "react";
import emailjs from "@emailjs/browser";
import "./style.scss";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const form = useRef();
    const [activeLocation, setActiveLocation] = useState("Prishtine");

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "YOUR_SERVICE_ID",
                "YOUR_TEMPLATE_ID",
                form.current,
                "YOUR_USER_ID"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    console.log("message sent");
                    form.current.reset();
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    return (
        <div className="static-wrapper">
            <div className="static-title">
                <h1>{`${t("contactUs")}`}</h1>
                <p>{`${t("contactSub")}`}</p>
                <div className="selection">
                    <button
                        onClick={() => setActiveLocation("Prishtine")}
                        style={{
                            backgroundColor:
                                activeLocation === "Prishtine"
                                    ? "var(--primary-color)"
                                    : "transparent",
                        }}
                    >
                        Prishtinë
                    </button>
                    <button
                        onClick={() => setActiveLocation("Prizren")}
                        style={{
                            backgroundColor:
                                activeLocation === "Prizren"
                                    ? "var(--primary-color)"
                                    : "transparent",
                        }}
                    >
                        Prizren
                    </button>
                </div>
            </div>
            <div className="contact">
                <div className="header">
                    <div className="box">
                        {activeLocation === "Prishtine" ? (
                            <p>info@temaj.eu</p>
                        ) : (
                            <p>(+383) 44 123 123</p>
                        )}
                    </div>
                    <div className="box">
                        {activeLocation === "Prishtine" ? (
                            <p>(+383) 49 678 001</p>
                        ) : (
                            <p>prizren@temaj.eu</p>
                        )}
                    </div>
                    <div className="box">
                        {activeLocation === "Prishtine" ? (
                            <p>Çagllavicë 10000</p>
                        ) : (
                            <p>Prizren 10000</p>
                        )}
                    </div>
                </div>
                <div className="hero">
                    <div className="left">
                        <form ref={form} onSubmit={sendEmail}>
                            <input type="text" name="user_name" placeholder="Emri"/>
                            <input type="text" name="user_company" placeholder="Kompania"/>
                            <input type="email" name="user_email" placeholder="Email"/>
                            <input
                                type="tel"
                                id="phone"
                                name="user_phone"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                required
                                placeholder="Telefoni"
                            />
                            <textarea name="message" placeholder="Mesazhi"/>
                            <button type="submit" className="primary-btn">
                            {`${t("send")}`}
                            </button>
                        </form>
                    </div>
                    <div className="right">
                        {activeLocation === "Prishtine" ? (
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1235.0777001266824!2d21.13097262232907!3d42.586574312956415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549dd3d0291aa1%3A0xdb7fb81f22ff7262!2sTemaj%20Qeramike%20Prishtine!5e0!3m2!1sen!2s!4v1720737592217!5m2!1sen!2s"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        ) : (
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2954.296079374595!2d20.709716527359227!3d42.229487168877576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135395a547f6fe77%3A0x381965a9b95b341c!2sTemaj%20Qeramike!5e0!3m2!1sen!2s!4v1721595128191!5m2!1sen!2s"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
