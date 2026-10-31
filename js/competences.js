/* =========================================================
   COMPÉTENCES
   Chaque clé peut être utilisée dans le tableau "competences"
   d'un projet (voir js/projets.js).
   Pour en ajouter une : copie une ligne et change les valeurs.
     sym   = texte court affiché dans la pastille (3 caractères max)
     label = nom complet (FR). Optionnel : en = nom en anglais
     color = couleur de la pastille
   ========================================================= */
const COMPETENCES = {
  cpp:      { sym: "C++",  label: "C++",              color: "#00599c" },
  c:        { sym: "C",    label: "C",                color: "#4a5a8a" },
  java:     { sym: "Jv",   label: "Java",             color: "#b5532a" },
  web:      { sym: "</>",  label: "Web (HTML/CSS/JS)",color: "#c4621a" },
  arduino:  { sym: "Ar",   label: "Arduino",          color: "#008184" },
  rasp:    { sym: "RSP",  label: "Raspberry",            color: "#a3282b" },
  stm32:    { sym: "STM",  label: "STM32",            color: "#2b6cb0" },
  cir:      { sym: "CIR",  label: "Conception de circuits", en: "circuit design",  color: "#1d7a5b" },
  "3d":     { sym: "3D",   label: "Modélisation 3D",  en: "3D modelling", color: "#6b4fa0" },
  impression3d: { sym: "Imp", label: "Impression 3D", en: "3D printing",  color: "#8a5a2b" },
  pm: { sym: "PM",label: "Gestion de projet", en: "Project management",  color: "#b8860b" },
  analogique: { sym: "Ana",label: "Électronique analogique", en: "Analog electronics",  color: "#b8860b" },
  numerique:  { sym: "Num",label: "Électronique numérique",  en: "Digital electronics", color: "#2e4057" },
  vhdl:     { sym: "VHD",  label: "VHDL / FPGA",      color: "#7a3b69" },
  serv:     { sym: "SERV",  label: "Serveurs", en:"Servers",      color: "#7a3b69" },
  spice:    { sym: "SPC",  label: "Simulation SPICE", en: "SPICE simulation", color: "#3d7a3d" },
  matlab:   { sym: "Mat",  label: "MATLAB",           color: "#c0561b" },
  linux:    { sym: "Lx",   label: "Linux",            color: "#333b3d" },
  capteurs: { sym: "Cap",  label: "Capteurs",         en: "Sensors",      color: "#38798a" },
  radio:    { sym: "RF",   label: "Radio / RF",       color: "#9c3f5a" }
};
