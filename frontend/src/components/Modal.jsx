import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <button onClick={onClose} style={styles.close}>
          ✖
        </button>

        {children}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  box: {
    background: "white",
    padding: 20,
    borderRadius: 15,
    width: "400px",
    position: "relative",
  },

  close: {
    position: "absolute",
    top: 10,
    right: 10,
    border: "none",
    background: "transparent",
    fontSize: 18,
    cursor: "pointer",
  },
};