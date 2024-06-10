import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { memo } from "react";
import {
  IContactData,
  IHeadData,
  TextResponse,
  fetchContacts,
  fetchContactsPage,
  fetchMainPage,
} from "/api/wordpressApi";
import { PageTypes } from "/components/organisms/Head/Head";
import SeoHead from "/components/molecules/SeoHead/SeoHead";

const ContactForm = dynamic(
  () => import("/components/organisms/ContactForm/ContactForm"),
  { ssr: false }
);
const Contacts = dynamic(
  () => import("/components/organisms/Contacts/Contacts"),
  { ssr: false }
);
const PageHead = dynamic(() => import("/components/organisms/Head/Head"), {
  ssr: false,
});

interface ContactsPageProps {
  headData: IHeadData | null;
  contactsData: IContactData[];
  contactData: TextResponse | null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [contactsHeadData, mainPageData, contactsList] = await Promise.all([
      fetchContactsPage(),
      fetchMainPage(),
      fetchContacts(),
    ]);

    const contactSection =
      mainPageData.find((item) => item.slug === "footer") || null;

    const headData =
      contactsHeadData.length > 0
        ? {
            title: contactsHeadData[0]?.name,
            photo_1: contactsHeadData[0]?.acf.photo_1,
            description: contactsHeadData[0]?.description,
          }
        : null;

    return {
      props: {
        headData,
        contactsData: contactsList,
        contactData: contactSection,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        headData: null,
        contactsData: [],
        contactData: null,
      },
    };
  }
};

const ContactsPage = memo(
  ({ headData, contactsData, contactData }: ContactsPageProps) => {
    return (
      <>
        <SeoHead headData={headData} />
        {headData && (
          <PageHead pageType={PageTypes.CONTACTS} mainHeadData={headData} />
        )}
        <Contacts contactsData={contactsData} />
        {contactData && (
          <ContactForm contactData={contactData} isContactsPage />
        )}
      </>
    );
  }
);

ContactsPage.displayName = "ContactsPage";

export default ContactsPage;
