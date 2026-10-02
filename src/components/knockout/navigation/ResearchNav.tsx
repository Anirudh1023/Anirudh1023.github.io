"use client";

import React, { useEffect, useState } from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { PressButton } from "@/components/knockout/atoms/Atoms";
import { Icon2T } from "@/components/knockout/icons/Icons2T";

export function ResearchNav() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const sections = ["home", "work", "research", "about"];
    const observer = new IntersectionObserver((entries) => {
      let current = active;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          current = entry.target.id;
        }
      });
      setActive(current);
    }, { threshold: 0.3 });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [active]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      setActive(id);
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", `#`);
      setActive("home");
    }
  };

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      pointerEvents: 'auto', zIndex: 9999,
    }}>
      <div style={{
        background: "rgba(34, 34, 34, 0.75)", 
        backdropFilter: "blur(12px)", 
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 32, height: 56,
        display: 'flex', alignItems: 'center', padding: '0 6px',
        justifyContent: 'center', gap: 4,
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <CenterTab
          active={active === 'home'}
          onClick={() => handleScroll("home")}
          icon={<Icon2T name="result" size={16} primary={active === 'home' ? KO.surface : KO.bgSec} secondary={active === 'home' ? KO.surface : KO.bgSec} />}
          label="HOME"
        />
        <CenterTab
          active={active === 'work'}
          onClick={() => handleScroll("work")}
          icon={<Icon2T name="compute" size={16} primary={active === 'work' ? KO.surface : KO.bgSec} secondary={active === 'work' ? KO.surface : KO.bgSec} />}
          label="WORK"
        />
        <CenterTab
          active={active === 'research'}
          onClick={() => handleScroll("research")}
          icon={<Icon2T name="layer" size={16} primary={active === 'research' ? KO.surface : KO.bgSec} secondary={active === 'research' ? KO.surface : KO.bgSec} />}
          label="RESEARCH"
        />
        <CenterTab
          active={active === 'about'}
          onClick={() => handleScroll("about")}
          icon={<Icon2T name="parameter" size={16} primary={active === 'about' ? KO.surface : KO.bgSec} secondary={active === 'about' ? KO.surface : KO.bgSec} />}
          label="ABOUT"
        />
      </div>
    </div>
  );
}

function CenterTab({ active, onClick, icon, label }: any) {
  return (
    <PressButton onClick={onClick} style={{
      height: 44, borderRadius: 99,
      background: active ? KO.accent : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      padding: '0 16px',
      transition: "all 0.2s cubic-bezier(0.2, 1, 0.3, 1)"
    }}>
      {icon}
      <span className="mobile-hide" style={{ ...F.btn(11), color: active ? KO.surface : KO.bgSec }}>{label}</span>
    </PressButton>
  );
}
