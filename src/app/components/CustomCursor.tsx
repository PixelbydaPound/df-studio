import { motion } from "motion/react";

export function CustomCursor() {
  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      initial={{ x: 0, y: 0 }}
      animate={{
        x: [0, 30, 60, 30, 0],
        y: [0, -20, 0, 20, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        right: "120px",
        top: "180px",
      }}
    >
      {/* Tooltip with triangle pointer */}
      <div className="relative">
        {/* Main tooltip box */}
        <div
          className="px-4 py-2 rounded"
          style={{
            backgroundColor: "#EB5097",
            fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
            color: "white",
            fontSize: "14px",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          DanielF
        </div>
        {/* Triangle pointer */}
        <div
          className="absolute"
          style={{
            left: "8px",
            bottom: "-6px",
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "6px solid #EB5097",
          }}
        />
      </div>
    </motion.div>
  );
}
