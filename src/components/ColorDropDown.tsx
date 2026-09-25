import React, { useState } from "react";
import styles from "./ColorDropDown.module.css";

interface ColorDropdownProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
}

const ColorDropdown: React.FC<ColorDropdownProps> = ({
  colors,
  selectedColor,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={styles.selected}
        onClick={() => setOpen(!open)}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div
          className={`${styles.colorBox} ${styles.selected}`}
          style={{ backgroundColor: selectedColor }}
          title={selectedColor}
        />
      </div>

      {open && (
        <div className={styles.list} role="listbox">
          {colors.map((color) => (
            <div
              key={color}
              className={`${styles.colorBox} ${color === selectedColor ? styles.selected : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => {
                onChange(color);
                setOpen(false);
              }}
              role="option"
              aria-selected={color === selectedColor}
              title={color}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorDropdown;
