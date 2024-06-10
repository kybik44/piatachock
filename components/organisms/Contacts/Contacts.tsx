import { FC } from "react";
import styles from "./Contacts.module.css";
import ContactsItem from "/components/molecules/ContactsItem/ContactsItem";
import { IContactData } from "/api/wordpressApi";

interface ContactsProps {
  contactsData: IContactData[];
}

const Contacts: FC<ContactsProps> = ({ contactsData }) => {
  return (
    <div className={styles.contacts}>
      {contactsData.map((item, index) => (
        <ContactsItem
          key={index}
          name={item.acf.name}
          description={item.acf.comment}
          contact={item.acf.value}
        />
      ))}
    </div>
  );
};

export default Contacts;
