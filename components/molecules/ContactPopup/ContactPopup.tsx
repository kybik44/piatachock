import Form from "../Form/Form";
import styles from "./ContactPopup.module.css";
import Text from "/components/atoms/Text/Text";
import { usePopup } from "/context/PopupContext";

const ContactPopup = () => {
  const { isOpen, closePopup } = usePopup();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.contactForm}>
      <div className={`${styles.contactInfo} ${styles.contactsContactInfo}`}>
        <Text variant="h2" className={styles.formHeading}>
          Заинтересованы в сотрудничестве?
        </Text>
        <Text variant="subtitle1" className={styles.formDescription}>
          Отправьте свои контакты и мы свяжемся с Вами в ближайшее время
        </Text>
      </div>
      <Form isContactsPage={false} />
    </div>
  );
};

export default ContactPopup;
