import React from "react";
import styles from "./Input.module.css";
import Text from "/components/atoms/Text/Text";
interface InputProps {
  name: string;
  value: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className: string;
  multiline?: boolean;
  type?: "text" | "textarea";
  rows?: number;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  value,
  placeholder,
  onChange,
  className,
  multiline = false,
  type = "text",
  rows,
  error,
}) => {
  return (
    <>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`${styles.input} ${className} ${
            error ? styles.error : ""
          }`}
          rows={rows}
        />
      ) : (
        <input
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className={`${styles.input} ${className} ${
            error ? styles.error : ""
          }`}
        />
      )}
      {error && (
        <div className={styles.errorMessage}>
          <Text variant="body1">{error}</Text>
        </div>
      )}
    </>
  );
};

export default Input;
