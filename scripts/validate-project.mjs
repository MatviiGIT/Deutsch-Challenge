import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const js = readFileSync("script.js", "utf8");
const css = readFileSync("style.css", "utf8");

const errors = [];
const ids = [...html.matchAll(/\\bid=["']([^"']+)["']/g)].map(match => match[1]);
const idSet = new Set(ids);

for (const id of ids) {
  if (ids.filter(candidate => candidate === id).length > 1) {
    errors.push(`Doppelte HTML-ID: ${id}`);
  }
}

const jsIds = [...js.matchAll(/getElementById\\(\\s*["'`]([^"'`]+)["'`]\\s*\\)/g)].map(match => match[1]);
for (const id of new Set(jsIds)) {
  if (!idSet.has(id)) errors.push(`JavaScript verweist auf fehlende HTML-ID: ${id}`);
}

const requiredIds = [
  "profile-screen", "start-screen", "path-screen",
  "lesson-screen", "quiz-screen", "result-screen",
  "lesson-start-button", "answer-grid", "next-button"
];
for (const id of requiredIds) {
  if (!idSet.has(id)) errors.push(`Erforderliche HTML-ID fehlt: ${id}`);
}

for (const screen of ["start", "path"]) {
  if (!html.includes(`data-screen="${screen}"`)) {
    errors.push(`Navigationseintrag fehlt: ${screen}`);
  }
}

for (const track of ["G", "M", "E"]) {
  if (!html.includes(`data-track="${track}"`)) {
    errors.push(`Lernniveau fehlt: ${track}`);
  }
}

if (!/auditAllTracks\\(\\);/.test(js)) {
  errors.push("Automatische Prüfung der Aufgaben beim Start fehlt.");
}
if (!/choices\\.length\\s*===\\s*3/.test(js)) {
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
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Projektprüfung erfolgreich:");
console.log(`- ${ids.length} HTML-IDs geprüft (keine Duplikate)`);
console.log(`- ${new Set(jsIds).size} JavaScript-ID-Verweise geprüft`);
console.log("- Home, Lernpfad, Lektion, Quiz und Ergebnisse vorhanden");
console.log("- G/M/E-Niveaus und Aufgaben-Grundregeln vorhanden");
