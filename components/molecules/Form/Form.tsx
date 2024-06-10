import React, { FC, useState, useEffect } from "react";
import styles from "./Form.module.css";
import { sendForm, IFormResponse } from "/api/wordpressApi";
import Button from "/components/atoms/Button/Button";
import Input from "/components/atoms/Input/Input";
import Toast from "/components/atoms/Toast/Toast";
import { usePopup } from "/context/PopupContext";

interface IFormProps {
  isContactsPage?: boolean;
}

const Form: FC<IFormProps> = ({ isContactsPage = false }) => {
  const [formData, setFormData] = useState({
    formName: "",
    formPhone: "",
    formEmail: "",
    formMessage: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastSuccess, setToastSuccess] = useState<boolean>(true);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.formName) {
      newErrors.formName = "Обязательное для заполнения поле";
    }
    if (!formData.formPhone) {
      newErrors.formPhone = "Обязательное для заполнения поле";
    } else if (!/^[+()0-9]+$/.test(formData.formPhone)) {
      newErrors.formPhone = "Неккоректный номер телефона";
    }
    if (formData.formEmail && !/\S+@\S+\.\S+/.test(formData.formEmail)) {
      newErrors.formEmail = "Неккоректный email";
    }
    if (formData.formMessage && formData.formMessage.trim() === "") {
      newErrors.formMessage = "Message cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data = new FormData();
    data.append("_wpcf7", "181");
    data.append("_wpcf7_version", "5.9.5");
    data.append("_wpcf7_locale", "ru_RU");
    data.append("_wpcf7_unit_tag", "wpcf7-f181-p182-o1");
    data.append("_wpcf7_container_post", "182");
    data.append("_wpcf7_posted_data_hash", "");
    data.append("formName", formData.formName);
    data.append("formPhone", formData.formPhone);
    data.append("formEmail", formData.formEmail);
    data.append("formMessage", formData.formMessage);

    try {
      const response: IFormResponse = await sendForm(data);
      if (response.status === "mail_sent") {
        setToastMessage(
          "Спасибо, ваша заявка успешно отправлена! В ближайшее время наш менеджер свяжется с вами и ответит на все интересующие вас вопросы!"
        );
        setToastSuccess(true);
        setFormData({
          formName: "",
          formPhone: "",
          formEmail: "",
          formMessage: "",
        });
        setErrors({});
      } else if (response.status === "validation_failed") {
        const newErrors: { [key: string]: string } = {};
        response.invalid_fields.forEach((field) => {
          newErrors[field.field] = field.message;
        });
        setErrors(newErrors);
        setToastMessage(
          "Одно или несколько полей содержат ошибочные данные. Пожалуйста, проверьте их и попробуйте ещё раз."
        );
        setToastSuccess(false);
      }
    } catch (error) {
      console.error("Ошибка при отправке формы", error);
      setToastMessage("Ошибка при отправке формы");
      setToastSuccess(false);
    }
  };

  return (
    <>
      {toastMessage && <Toast message={toastMessage} success={toastSuccess} />}
      <form
        className={`${styles.form} ${isContactsPage && styles.contactsForm}`}
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Как к Вам обращаться?"
          className={`${styles.input} ${
            errors.formName ? styles.errorInput : ""
          }`}
          name="formName"
          value={formData.formName}
          onChange={handleChange}
          error={errors.formName}
        />
        <Input
          placeholder="Телефон"
          className={`${styles.input} ${
            errors.formPhone ? styles.errorInput : ""
          }`}
          name="formPhone"
          value={formData.formPhone}
          onChange={handleChange}
          error={errors.formPhone}
        />
        <Input
          placeholder="E-mail"
          className={`${styles.input} ${
            errors.formEmail ? styles.errorInput : ""
          }`}
          name="formEmail"
          value={formData.formEmail}
          onChange={handleChange}
          error={errors.formEmail}
        />
        <Input
          placeholder="Комментарий / Вопрос"
          className={`${styles.textarea} ${
            errors.formMessage ? styles.errorInput : ""
          }`}
          multiline
          name="formMessage"
          value={formData.formMessage}
          onChange={handleChange}
          rows={4}
          error={errors.formMessage}
        />
        <Button
          className={`${styles.submitButton} ${
            isContactsPage && styles.submitContactsButton
          }`}
          label="Отправить"
          type="submit"
        />
      </form>
    </>
  );
};

export default Form;
