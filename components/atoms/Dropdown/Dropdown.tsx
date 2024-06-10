import React, { useState, useCallback } from "react";
import styles from "./Dropdown.module.css";
import Text from "/components/atoms/Text/Text";
import ArrowIcon from "/icons/ArrowIcon";

interface DropdownMenuProps {
  options: string[];
  className?: string;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const Dropdown: React.FC<DropdownMenuProps> = ({
  options,
  className,
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleOptionClick = useCallback((option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  }, []);

  return (
    <div className={className}>
      <div className={styles.container}>
        <button className={styles.button} onClick={toggleMenu}>
          <Text variant="subtitle1" className={styles.optionText}>
            {selectedOption}
          </Text>
          <ArrowIcon className={`${styles.arrow} ${isOpen && styles.open}`} />
        </button>
        {isOpen && (
          <div className={styles.menu}>
            {options.map((option) => (
              <div
                key={option}
                className={styles.menuItem}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
