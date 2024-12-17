import NewsLatterBox from "./NewsLatterBox";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    msg: "",
  });
  const Commit = () => {
    console.log(JSON.stringify(payload));
    fetch("/api/next/api/ticket", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          alert("Ok");
        } else {
          alert("Err");
        }
      })
      .catch((err) => {
        alert("Err: " + err);
      });
  };
  const { t } = useTranslation("Contact");
  return (
    <section id="contact" className="overflow-hidden pt-24 ">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="mb-12 rounded-[4px] bg-white px-8 py-11 shadow-three  sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black  sm:text-3xl lg:text-2xl xl:text-3xl">
                {t("NH")}
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                {t("CT")}
              </p>
              <form>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark "
                      >
                        {t("NM")}
                      </label>
                      <input
                        onChange={(x) => {
                          setPayload({
                            ...payload,
                            name: x.target.value,
                          });
                        }}
                        id="contact-name"
                        type="text"
                        placeholder="Enter your name"
                        className="border-stroke w-full rounded-[4px] border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary      "
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark "
                      >
                        {t("EML")}
                      </label>
                      <input
                        onChange={(x) => {
                          setPayload({
                            ...payload,
                            email: x.target.value,
                          });
                        }}
                        id="contact-email"
                        type="email"
                        placeholder="Enter your email"
                        className="border-stroke w-full rounded-[4px] border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark "
                      >
                        {t("MSG")}
                      </label>
                      <textarea
                        onChange={(x) => {
                          setPayload({
                            ...payload,
                            msg: x.target.value,
                          });
                        }}
                        name="message"
                        id="contact-msg"
                        rows={5}
                        placeholder="Enter your Message"
                        className="border-stroke w-full resize-none rounded-[4px] border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      type="button"
                      onClick={() => {
                        Commit();
                      }}
                      className="rounded-[4px] bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90"
                    >
                      {t("MSGBTN")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
