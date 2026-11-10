import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const js = readFileSync("script.js", "utf8");
const css = readFileSync("style.css", "utf8");
const errors = [];

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
const counts = new Map();
for (const id of ids) counts.set(id, (counts.get(id) || 0) + 1);
for (const [id, count] of counts) {
  if (count > 1) errors.push("Doppelte HTML-ID: " + id);
}

const jsIds = [...js.matchAll(/getElementById\(\s*["'\x60]([^"'\x60]+)["'\x60]\s*\)/g)]
  .map(match => match[1]);
for (const id of new Set(jsIds)) {
  if (!counts.has(id)) errors.push("JavaScript verweist auf fehlende HTML-ID: " + id);
}

const requiredIds = [
  "profile-screen", "start-screen", "path-screen",
  "lesson-screen", "quiz-screen", "result-screen",
  "logout-button", "generate-name-button", "name-generator-status",
  "lesson-start-button", "stage-intro", "stage-intro-title",
  "stage-intro-description", "stage-intro-tip", "stage-intro-count", "stage-intro-start-button",
  "question-panel", "answer-grid", "next-button"
];
for (const id of requiredIds) {
  if (!counts.has(id)) errors.push("Erforderliche HTML-ID fehlt: " + id);
}

for (const screen of ["start", "path"]) {
  if (!html.includes('data-screen="' + screen + '"')) {
    errors.push("Navigationseintrag fehlt: " + screen);
  }
}
for (const track of ["G", "M", "E"]) {
  if (!html.includes('data-track="' + track + '"')) {
    errors.push("Lernniveau fehlt: " + track);
  }
}

if (!/auditAllTracks\(\);/.test(js)) {
  errors.push("Automatische Prüfung der Aufgaben beim Start fehlt.");
}
if (!/function generatePlayerName\(/.test(js) || !html.includes('id="generate-name-button"')) {
  errors.push("Generator für zufällige Spielnamen fehlt.");
}
if (!js.includes("function chooseAnswer(") || !js.includes("function selectAnswer(") ||
    !html.includes("Antwort prüfen") || !js.includes("selectAnswer(selectedAnswer)")) {
  errors.push("Zweistufige Antwortauswahl mit separater Prüfung fehlt.");
}
if (!css.includes(".track-option.is-selected::after") ||
    !css.includes(".track-option.is-selected{border-color:#e1e8de;background:white;box-shadow:none}")) {
  errors.push("Neutrale Markierung des gewählten Lernniveaus fehlt.");
}
if (!html.includes("logout-mark") || !css.includes(".session-exit-button .logout-mark")) {
  errors.push("Individuelles Quakoo-Symbol für Abmelden fehlt.");
}
if (!/function endSession\(/.test(js) || !html.includes('id="logout-button"')) {
  errors.push("Abmelden und Zurücksetzen der Sitzung fehlt.");
}
if (html.includes('id="course-chip"') || html.includes("DEUTSCH · KLASSE 5")) {
  errors.push("Veraltetes Klassenstufen-Label ist noch vorhanden.");
}
if (!html.includes("Hilfe &amp; Tipps") || !html.includes("Antwort prüfen") ||
    !html.includes("Weiterlernen") ||
    !css.includes(".track-chip{background:#fff;color:var(--ink-soft);letter-spacing:.04em}")) {
  errors.push("Neutrale Niveauanzeige oder aktualisierte Hilfe fehlt.");
}
if (!/screen\(courseStarted\?"start":"profile"\)/.test(js)) {
  errors.push("Das Quakoo-Logo führt nicht zur Home-Ansicht.");
}
for (const stage of ["Entdecken", "Erkennen", "Anwenden", "Kombinieren", "Meistern"]) {
  if (!js.includes('name:"' + stage + '"')) errors.push("Lernphase fehlt: " + stage);
}
for (const endQuestion of [3, 7, 12, 16, 18]) {
  if (!js.includes("endQuestion:" + endQuestion)) errors.push("Grenze einer Lernphase fehlt: Frage " + endQuestion);
}
if (!/function showStageIntro\(/.test(js) || !/stage-intro-start-button/.test(js)) {
  errors.push("Einführungen und Übergänge zwischen Lernphasen fehlen.");
}
if (!/choices\.length\s*===\s*3/.test(js)) {
  errors.push("Prüfung auf genau drei Antwortmöglichkeiten fehlt.");
}
if (!html.includes("style.css") || !html.includes("script.js")) {
  errors.push("CSS- oder JavaScript-Datei ist nicht eingebunden.");
}
if (!css.includes(".lesson-card") || !css.includes(".path-layout")) {
  errors.push("Zentrale Layout-Stile für Lektion oder Lernpfad fehlen.");
}

if (errors.length) {
  console.error("Projektprüfung fehlgeschlagen:");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}

console.log("Projektprüfung erfolgreich:");
console.log("- " + ids.length + " HTML-IDs geprüft (keine Duplikate)");
console.log("- " + new Set(jsIds).size + " JavaScript-ID-Verweise geprüft");
console.log("- Home, Lernpfad, Lektion, Quiz und Ergebnisse vorhanden");
console.log("- G/M/E-Niveaus und Aufgaben-Grundregeln vorhanden");
console.log("- Fünf Lernphasen, Phasengrenzen und Einführungsansichten vorhanden");
