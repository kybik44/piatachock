import React, { useState } from "react";
import styles from "./Faq.module.css";
import Accordion from "/components/atoms/Accordion/Accordion";
import Text from "/components/atoms/Text/Text";

import { IFaqData, IFaqItem } from "/api/wordpressApi";

interface FaqProps {
  faqData: IFaqData;
}

const Faq: React.FC<FaqProps> = ({ faqData }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleAccordionToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq}>
      <Text variant="h2" className={styles.title}>
        {faqData.title}
      </Text>
      <div className={styles.faqContainer}>
        <div className={styles.faqColumn}>
          {faqData.items
            .slice(0, Math.ceil(faqData.items.length / 2))
            .map((faq, index) => (
              <Accordion
                key={index}
                title={faq.question}
                isOpenDefault={openIndex === index}
                onClick={() => handleAccordionToggle(index)}
              >
                {faq.answer}
              </Accordion>
            ))}
        </div>
        <div className={styles.faqColumn}>
          {faqData.items
            .slice(Math.ceil(faqData.items.length / 2))
            .map((faq, index) => (
              <Accordion
                key={index + Math.ceil(faqData.items.length / 2)}
                title={faq.question}
                isOpenDefault={
                  openIndex === index + Math.ceil(faqData.items.length / 2)
                }
                onClick={() =>
                  handleAccordionToggle(
                    index + Math.ceil(faqData.items.length / 2)
                  )
                }
              >
                {faq.answer}
              </Accordion>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
