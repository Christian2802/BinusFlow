import { useState, useEffect } from "react";
import styles from "./Configuration.module.css";
import Modal from "../components/Modal";

const Configuration = () => {
  const [colors, setColors] = useState<string[]>(() => {
    const storedColors = localStorage.getItem("colors");
    return storedColors ? JSON.parse(storedColors) : ["#f0f0f0", "#ff0000", "#00ff00", "#f6ff47", "#25df5a", "#ff3ad8", "#ff2c2c", "#32fbe3", "#4b4b4b"];
  });

  const [newColor, setNewColor] = useState<string>("#000000");
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

  const handleAddColor = () => {
    if (!colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setOpenAddModal(false);
    } else {
      alert("Color already exists!");
    }
  };

  const handleDeleteColor = (colorToDelete: string) => {
    setColors(colors.filter((c) => c !== colorToDelete));
  };

  const isValidColor = (strColor: string) => {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== "";
  }


  return (
    <div className={styles.content}>
      <div className={styles.configuration}>
        <h1 className={styles.title}>This is Configuration page</h1>

        <div className={styles.color}>
          Color list
          <div className={styles.colorContainer}>
            {colors.map((color) => (
              <div key={color} className={styles.colorItem} style={{ backgroundColor: color }}>
                <span>{color}</span>
                <button onClick={() => handleDeleteColor(color)} />
              </div>
            ))}
            <div className={styles.colorItemAdd} onClick={() => setOpenAddModal(true)}>
              + Add color
            </div>
          </div>
        </div>

        {openAddModal && (
          <Modal open={openAddModal}>
            <div className={styles.addColorModal}>
              <div className={styles.color}>
                Color
                <input
                  type="text"
                  placeholder="#562CF0"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className={styles.colorInput}
                />
              </div>

              <div className={styles.preview}>
                Preview
                <div
                  className={styles.colorPreview}
                  style={{
                    backgroundColor: isValidColor(newColor) ? newColor : "#f97316", // orange if invalid
                    color: isValidColor(newColor) ? "transparent" : "black",
                  }}
                >
                  {!isValidColor(newColor) && "No Preview Available"}
                </div>
              </div>

              <div className={styles.modalButtons}>
                <button className={styles.cancelBtn} onClick={() => setOpenAddModal(false)}>
                  Cancel
                </button>
                <button className={styles.saveBtn} onClick={handleAddColor} disabled={!isValidColor(newColor)}>
                  Save
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Configuration;
