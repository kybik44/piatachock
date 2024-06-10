import { FC, ReactNode } from 'react';
import styles from './ContactsItem.module.css';
import Text from '/components/atoms/Text/Text';
import useMediaQuery from '/hooks/useMediaQuery';
import { FaInstagram } from 'react-icons/fa';

interface ContactsItemProps {
  name: string;
  description: string;
  contact: string | ReactNode;
}

const ContactsItem: FC<ContactsItemProps> = ({ name, contact, description }) => {
  const isMobile = useMediaQuery('(max-width:991px)');
  const textVariant = isMobile ? 'body6' : 'h3';

  const isInstagramContact = typeof contact === 'string' && contact.includes('instagram.com');

  const formatContactLink = (link: string) => {
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      return `https://${link}`;
    }
    return link;
  };

  return (
    <div className={styles.contactsItem}>
      <div className={styles.nameRow}>
        <div className={styles.nameContainer}>
          <Text variant={textVariant} className={styles.name}>
            {name}
          </Text>
        </div>
        {isMobile && description && (
          <Text variant={textVariant} className={styles.description}>
            {description}
          </Text>
        )}
      </div>
      {!isMobile && description && (
        <Text variant={textVariant} className={styles.description}>
          {description}
        </Text>
      )}
      {isInstagramContact ? (
        <a href={formatContactLink(contact as string)} target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <FaInstagram size={24} />
        </a>
      ) : (
        <Text variant={textVariant} className={styles.contact}>
          {contact}
        </Text>
      )}
    </div>
  );
};

export default ContactsItem;
