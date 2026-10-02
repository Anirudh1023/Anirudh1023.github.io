"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KO, F } from "@/lib/knockout-tokens";

export function HoverTerm({ term, definition }: { term: string; definition: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        cursor: "help",
        borderBottom: `1px dashed ${KO.accent}`,
        display: "inline-block",
      }}
    >
      <span style={{ color: isHovered ? KO.accent : "inherit", transition: "color 0.2s" }}>
        {term}
      </span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.2, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginBottom: 12,
              width: "max-content",
              maxWidth: 300,
              padding: 16,
              background: "rgba(34, 34, 34, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: 12,
              border: `1px solid rgba(255,255,255,0.1)`,
              boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
              color: "#F5F0E2", // KO.bgSec equivalent in light mode, ensures it's readable dark glass
              zIndex: 100,
              pointerEvents: "none",
            }}
          >
            <div style={{ ...F.eyebrow(9), color: KO.accent, marginBottom: 8 }}>DEFINITION</div>
            <div style={{ ...F.body(14), lineHeight: 1.5, textTransform: "none", letterSpacing: "normal" }}>
              {definition}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
