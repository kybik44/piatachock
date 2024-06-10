import React from "react";
import Link from "next/link";
import styles from "./ContactForm.module.css";
import Text from "/components/atoms/Text/Text";
import Form from "/components/molecules/Form/Form";
import useMediaQuery from "/hooks/useMediaQuery";
import InstagramIcon from "/icons/InstagramIcon";
import { TextResponse } from "/api/wordpressApi";

interface IContactForm {
  isContactsPage?: boolean;
  contactData: TextResponse | null;
}

const ContactForm: React.FC<IContactForm> = ({
  isContactsPage = false,
  contactData,
}) => {
  const isTablet = useMediaQuery("(max-width: 991px)");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const renderContactDetails = () => (
    <>
      <Text variant="h2" className={styles.title}>
        Контакты
      </Text>
      <Text variant="subtitle1" className={styles.description} color="#F6F6F6">
        {contactData?.acf.text}
      </Text>
      <div className={styles.contactLinks}>
        <div className={styles.phoneNumbers}>
          {contactData?.acf.phone_1 && (
            <Link
              href={`tel:${contactData.acf.phone_1.replace(/\s+/g, "")}`}
              className={styles.link}
            >
              <Text variant={isMobile ? "subtitle1" : "h4"}>
                {contactData.acf.phone_1}
              </Text>
            </Link>
          )}
          {contactData?.acf.phone_2 && (
            <Link
              href={`tel:${contactData.acf.phone_2.replace(/\s+/g, "")}`}
              className={styles.link}
            >
              <Text variant={isMobile ? "subtitle1" : "h4"}>
                {contactData.acf.phone_2}
              </Text>
            </Link>
          )}
        </div>
        {contactData?.acf.mail && (
          <Link href={`mailto:${contactData.acf.mail}`} className={styles.link}>
            <Text
              variant={isMobile ? "subtitle1" : "h4"}
              className={styles.email}
            >
              {contactData.acf.mail}
            </Text>
          </Link>
        )}
        {contactData?.acf.instagram && (
          <Link
            href={contactData.acf.instagram}
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className={styles.icon} />
          </Link>
        )}
      </div>
      <Text
        variant="body1"
        color="#F6F6F6"
        className={styles.address}
        multiline
      >
        {contactData?.acf.address}
      </Text>
    </>
  );

  const renderFormIntro = () => (
    <>
      <Text
        variant="h2"
        color={isContactsPage ? "#fff" : "#472115"}
        className={`${styles.formTitle} ${
          isContactsPage && styles.contactsFormTitle
        }`}
      >
        Заинтересованы в сотрудничестве?
      </Text>
      <Text
        variant="subtitle1"
        className={`${styles.formDescription} ${
          isContactsPage && styles.contactsFormDescription
        }`}
      >
        Отправьте свои контакты и мы свяжемся с Вами в ближайшее время
      </Text>
    </>
  );

  return (
    <section className={styles.contacts} id="form">
      <div className={styles.container}>
        {isContactsPage && !isTablet ? (
          <div
            className={`${styles.contactInfo} ${
              isContactsPage && styles.contactsContactInfo
            }`}
          >
            {renderFormIntro()}
          </div>
        ) : (
          !isContactsPage && (
            <div
              className={`${styles.contactInfo} ${
                isContactsPage && styles.contactsContactInfo
              }`}
            >
              {renderContactDetails()}
            </div>
          )
        )}
        <div className={styles.contactForm}>
          {(!isContactsPage || isTablet) && renderFormIntro()}
          <Form isContactsPage={isContactsPage} />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
