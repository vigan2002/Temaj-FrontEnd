import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./style.scss";

const ContactWin = () => {
  const form = useRef();
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
    <div id="contact" className="contact-win">
      <div className="contact-win-title">
        <h1>Na kontaktoni</h1>
      </div>
      <div className="contact-win-container">
        <div className="left">
          <form ref={form} onSubmit={sendEmail}>
            <div>
              <label>Emri</label>
              <input type="text" name="user_name" placeholder="Emri" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="user_email" placeholder="Email" />
            </div>
            <div>
              <label>Numri i tel</label>
              <input
                type="tel"
                id="phone"
                name="user_phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                placeholder="Telefoni"
              />
            </div>
            <div>
              <label>Mesazhi</label>
              <textarea name="message" placeholder="Mesazhi" />
            </div>
            <button type="submit">
              Dërgo <img src="/assets/images/icons/arrowWh.png" alt="" />
            </button>
          </form>
        </div>
        <div className="right">
          {/* <img src="/assets/images/windoor/contact-map.png" alt="map"/> */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2954.296079374595!2d20.709716527359227!3d42.229487168877576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135395a547f6fe77%3A0x381965a9b95b341c!2sTemaj%20Qeramike!5e0!3m2!1sen!2s!4v1721595128191!5m2!1sen!2s"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactWin;
