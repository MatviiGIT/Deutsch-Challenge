const questions = [
  // LEICHT — WISSEN
  {
    level: "Leicht", category: "WORTARTEN",
    prompt: "Welches Wort ist ein Nomen?",
    choices: ["springen", "Freund", "freundlich"],
    answer: 1,
    explanation: "„Freund“ ist ein Nomen. Nomen bezeichnen zum Beispiel Menschen, Tiere, Dinge oder Gefühle und werden großgeschrieben."
  },
  {
    level: "Leicht", category: "WORTARTEN",
    prompt: "Welches Wort ist das Verb im Satz: „Der Hund bellt laut.“?",
    choices: ["Hund", "bellt", "laut"],
    answer: 1,
    explanation: "„Bellt“ ist das Verb. Es sagt, was der Hund tut."
  },
  {
    level: "Leicht", category: "WORTARTEN",
    prompt: "Welches Wort ist ein Adjektiv?",
    choices: ["kleine", "Maus", "findet"],
    answer: 0,
    explanation: "„Kleine“ ist ein Adjektiv. Adjektive beschreiben, wie jemand oder etwas ist."
  },
  {
    level: "Leicht", category: "RECHTSCHREIBUNG",
    prompt: "Welcher Satz ist richtig geschrieben?",
    choices: [
      "Am Montag besucht Emma ihre Oma.",
      "Am montag besucht Emma ihre Oma.",
      "Am Montag besucht Emma ihre oma."
    ],
    answer: 0,
    explanation: "Am Satzanfang schreibt man groß. Auch Nomen wie „Montag“ und „Oma“ werden großgeschrieben."
  },
  {
    level: "Leicht", category: "WORTSCHATZ",
    prompt: "Wie lautet die Mehrzahl von „das Buch“?",
    choices: ["die Buchs", "die Bücher", "die Buche"],
    answer: 1,
    explanation: "Die Mehrzahl von „das Buch“ lautet „die Bücher“."
  },
  {
    level: "Leicht", category: "GRAMMATIK",
    prompt: "Welcher Artikel passt? „___ Sonne scheint.“",
    choices: ["Der", "Das", "Die"],
    answer: 2,
    explanation: "Es heißt „die Sonne“. Das Nomen „Sonne“ ist weiblich."
  },
  {
    level: "Leicht", category: "RECHTSCHREIBUNG",
    prompt: "Welches Wort ist richtig geschrieben?",
    choices: ["Sone", "Sonne", "Sonnee"],
    answer: 1,
    explanation: "„Sonne“ schreibt man mit doppeltem n. Der betonte Vokal o wird kurz gesprochen; das doppelte n zeigt die Kürze an."
  },
  {
    level: "Leicht", category: "SATZZEICHEN",
    prompt: "Welches Satzzeichen fehlt? „Wo ist mein Heft___“",
    choices: [".", "?", "!"],
    answer: 1,
    explanation: "Bei einer direkten Frage steht am Ende ein Fragezeichen."
  },
  {
    level: "Leicht", category: "WORTSCHATZ",
    prompt: "Welches Wort bedeutet ungefähr dasselbe wie „fröhlich“?",
    choices: ["flink", "glücklich", "müde"],
    answer: 1,
    explanation: "„Glücklich“ und „fröhlich“ haben eine ähnliche Bedeutung."
  },
  {
    level: "Leicht", category: "RECHTSCHREIBUNG",
    prompt: "Welcher Satz ist richtig?",
    choices: ["Wir spielen im garten.", "Wir spielen im Gartten.", "Wir spielen im Garten."],
    answer: 2,
    explanation: "„Garten“ ist ein Nomen und wird großgeschrieben. Außerdem schreibt man es nur mit einem t."
  },

  // MITTEL — ANWENDEN
  {
    level: "Mittel", category: "GRAMMATIK",
    prompt: "Welches Verb passt? „Du ___ sehr schnell.“",
    choices: ["läufst", "läuft", "laufen"],
    answer: 0,
    explanation: "Zu „du“ gehört die Verbform „läufst“: du läufst."
  },
  {
    level: "Mittel", category: "GRAMMATIK",
    prompt: "Welcher Artikel passt? „Ich sehe ___ Vogel.“",
    choices: ["der", "dem", "den"],
    answer: 2,
    explanation: "„Sehen“ fragt hier nach dem Akkusativ: Wen sehe ich? Den Vogel."
  },
  {
    level: "Mittel", category: "SATZGLIEDER",
    prompt: "Wer fährt im Satz mit dem Bus? „Morgen fährt Paul mit dem Bus zur Schule.“",
    choices: ["Morgen", "Paul", "mit dem Bus"],
    answer: 1,
    explanation: "Paul ist die Person, die fährt. „Paul“ ist das Subjekt des Satzes."
  },
  {
    level: "Mittel", category: "RECHTSCHREIBUNG",
    prompt: "Wie schreibt man „Regen + Jacke“ als zusammengesetztes Nomen?",
    choices: ["Regen Jacke", "Regenjacke", "Regenjake"],
    answer: 1,
    explanation: "Zusammengesetzte Nomen schreibt man im Deutschen normalerweise zusammen: die Regenjacke."
  },
  {
    level: "Mittel", category: "ADJEKTIVE",
    prompt: "Welche Form ergänzt die Steigerungsreihe richtig? „warm – wärmer – ___“",
    choices: ["am wärmsten", "wärmste", "wärmer"],
    answer: 0,
    explanation: "Die drei Steigerungsstufen lauten: warm (Grundform), wärmer (Vergleichsform), am wärmsten (Höchstform)."
  },
  {
    level: "Mittel", category: "WORTSCHATZ",
    prompt: "Welches Wort gehört zum Wortfeld „sagen“?",
    choices: ["erzählen", "laufen", "essen"],
    answer: 0,
    explanation: "„Erzählen“ gehört zum Wortfeld „sagen“. Beide Wörter haben mit dem Sprechen zu tun."
  },
  {
    level: "Mittel", category: "GRAMMATIK",
    prompt: "Welche Verbform passt? „Gestern ___ wir einen Ausflug.“",
    choices: ["machen", "macht", "machten"],
    answer: 2,
    explanation: "„Gestern“ zeigt, dass es um die Vergangenheit geht. Die passende Form lautet hier „machten“."
  },
  {
    level: "Mittel", category: "LESEVERSTEHEN",
    prompt: "Tom stellt seine Schuhe vor die Tür, nimmt einen Regenschirm und zieht eine Jacke an. Wie ist das Wetter wahrscheinlich?",
    choices: ["Es regnet.", "Es ist sehr heiß.", "Es schneit stark."],
    answer: 0,
    explanation: "Regenschirm und Jacke sind Hinweise darauf, dass es wahrscheinlich regnet."
  },
  {
    level: "Mittel", category: "SATZGLIEDER",
    prompt: "Welches Wort ist das Prädikat? „Die Kinder spielen nach der Schule im Park.“",
    choices: ["Die Kinder", "spielen", "im Park"],
    answer: 1,
    explanation: "Das Prädikat sagt, was jemand tut oder was geschieht. Hier ist es „spielen“."
  },
  {
    level: "Mittel", category: "SATZZEICHEN",
    prompt: "Welcher Satz setzt die Satzzeichen der wörtlichen Rede richtig?",
    choices: [
      "Mia sagt: „Ich bin fertig.“",
      "Mia sagt: Ich bin fertig.“",
      "Mia sagt: „Ich bin fertig“."
    ],
    answer: 0,
    explanation: "Vor der wörtlichen Rede steht hier ein Doppelpunkt. Der gesprochene Satz wird von Anführungszeichen eingerahmt; sein Punkt steht innerhalb des schließenden Anführungszeichens."
  },

  // SCHWER — ANALYSIEREN
  {
    level: "Schwer", category: "LESEVERSTEHEN",
    prompt: "Lies den Text: „Lena leiht sich jede Woche ein Buch aus der Schulbibliothek. Zu Hause liest sie jeden Abend ein paar Seiten. Am Monatsende hat sie drei Bücher beendet.“ Welche Aussage fasst den Text am besten zusammen?",
    choices: [
      "Lena liest regelmäßig und beendet mehrere Bücher.",
      "Lena sammelt Bücher, ohne sie zu lesen.",
      "Lena liest nur in der Schule."
    ],
    answer: 0,
    explanation: "Die drei Sätze zeigen gemeinsam, dass Lena regelmäßig liest und mehrere Bücher schafft. Eine Hauptaussage fasst die wichtigsten Informationen zusammen."
  },
  {
    level: "Schwer", category: "SATZBAU",
    prompt: "Welche Satzstellung ist in einem Aussagesatz richtig?",
    choices: [
      "Am frühen Morgen Sara kontrolliert ihren Stundenplan.",
      "Sara ihren Stundenplan kontrolliert am frühen Morgen.",
      "Am frühen Morgen kontrolliert Sara ihren Stundenplan."
    ],
    answer: 2,
    explanation: "In einem Aussagesatz steht das gebeugte Verb an zweiter Stelle. „Am frühen Morgen“ steht hier im Vorfeld, danach folgt das Verb „kontrolliert“."
  },
  {
    level: "Schwer", category: "NEBENSÄTZE",
    prompt: "Welche Aussage zum Satz „Der Hund bellte laut, weil jemand an der Tür stand.“ ist richtig?",
    choices: [
      "Der Nebensatz beginnt mit „weil“ und das Verb „stand“ steht am Ende.",
      "Im Nebensatz muss das Verb an erster Stelle stehen.",
      "Ein Nebensatz hat kein Verb."
    ],
    answer: 0,
    explanation: "„Weil jemand an der Tür stand“ ist ein Nebensatz. Das Wort „weil“ leitet ihn ein; das gebeugte Verb „stand“ steht am Ende."
  },
  {
    level: "Schwer", category: "SATZGLIEDER",
    prompt: "Bestimme das Subjekt: „Die Kinder brachte der Vater nach Hause.“",
    choices: ["Die Kinder", "der Vater", "nach Hause"],
    answer: 1,
    explanation: "Wer brachte die Kinder nach Hause? Der Vater. „Die Kinder“ steht zwar am Satzanfang, ist hier aber das Akkusativobjekt."
  },
  {
    level: "Schwer", category: "PRONOMEN",
    prompt: "Lena legt das Heft auf den Tisch. Danach öffnet sie es. Worauf bezieht sich „es“?",
    choices: ["auf Lena", "auf das Heft", "auf den Tisch"],
    answer: 1,
    explanation: "„Es“ bezieht sich auf „das Heft“. Das erkennt man am grammatischen Geschlecht: „das Heft“ ist sächlich. „Lena“ ist weiblich und „der Tisch“ männlich."
  },
  {
    level: "Schwer", category: "KONJUNKTIONEN",
    prompt: "Welche Umformung gibt denselben Grund wieder? „Nora nimmt eine Trinkflasche mit, denn es ist sehr warm.“",
    choices: [
      "Weil es sehr warm ist, nimmt Nora eine Trinkflasche mit.",
      "Obwohl es sehr warm ist, nimmt Nora eine Trinkflasche mit.",
      "Bevor es sehr warm wird, nimmt Nora eine Trinkflasche mit."
    ],
    answer: 0,
    explanation: "„Denn“ und „weil“ drücken einen Grund aus. Im Nebensatz mit „weil“ steht das gebeugte Verb am Ende: „ist“."
  },
  {
    level: "Schwer", category: "RECHTSCHREIBUNG",
    prompt: "Welcher Satz ist richtig geschrieben?",
    choices: [
      "Das Haus ist gros.",
      "Das Haus ist groß.",
      "Das Haus ist grooss."
    ],
    answer: 1,
    explanation: "„Groß“ schreibt man mit ß. Nach dem langen betonten Vokal o steht in diesem Wort ß."
  },
  {
    level: "Schwer", category: "LESEVERSTEHEN",
    prompt: "Nach dem Regen glänzten die Steine auf dem Weg. Amir ging langsam und hielt sich am Geländer fest. Was lässt sich daraus am besten schließen?",
    choices: [
      "Der Weg könnte glatt sein.",
      "Amir hat es besonders eilig.",
      "Die Steine sind sehr warm."
    ],
    answer: 0,
    explanation: "Nasse Steine können glatt sein. Amirs vorsichtige Bewegung ist ein Hinweis darauf, dass er nicht ausrutschen möchte."
  },
  {
    level: "Schwer", category: "TEXTVERSTÄNDNIS",
    prompt: "Lies: „Lea liest zuerst alle Aufgaben. Danach markiert sie wichtige Wörter und beantwortet die Fragen.“ Welche Lernstrategie nutzt Lea?",
    choices: [
      "Sie beginnt sofort mit dem Schreiben, ohne zu lesen.",
      "Sie sucht wichtige Informationen und nutzt sie für ihre Antworten.",
      "Sie lässt schwierige Aufgaben einfach aus."
    ],
    answer: 1,
    explanation: "Lea liest genau und markiert wichtige Wörter. So findet sie Informationen, die ihr beim Beantworten helfen."
  },
  {
    level: "Schwer", category: "INFORMATIONEN AUSWERTEN",
    prompt: "Im Aushang steht: Montag 8–12 Uhr, Dienstag 8–16 Uhr, Mittwoch 8–12 Uhr. Ben kann nur nach 13 Uhr in die Schulbibliothek. An welchem Tag kann er sie besuchen?",
    choices: [
      "Am Montag.",
      "Am Dienstag.",
      "Am Mittwoch."
    ],
    answer: 1,
    explanation: "Nur am Dienstag ist die Bibliothek nach 13 Uhr noch geöffnet. Der Aushang nennt dafür die Öffnungszeit bis 16 Uhr."
  }
];




const levelLabels = {
  Leicht: {title:"Grundlagen", short:"LEICHT"},
  Mittel: {title:"Anwenden", short:"MITTEL"},
  Schwer: {title:"Knobeln", short:"SCHWER"}
};
const topics = [
  {id:"wortarten",title:"Wortarten",subtitle:"Nomen, Verben und Adjektive",description:"Entdecke, welche Aufgaben Wörter in einem Satz haben.",icon:"Aa",cats:["WORTARTEN","ADJEKTIVE"]},
  {id:"wortschatz",title:"Wortschatz",subtitle:"Bedeutung, Wortfelder und Mehrzahl",description:"Finde passende Wörter und erweitere deinen Wortschatz.",icon:"W",cats:["WORTSCHATZ"]},
  {id:"rechtschreibung",title:"Rechtschreibung",subtitle:"Wörter richtig schreiben",description:"Trainiere Großschreibung, Doppelkonsonanten und Wortbildung.",icon:"✎",cats:["RECHTSCHREIBUNG"]},
  {id:"satzzeichen",title:"Satzzeichen",subtitle:"Punkt, Fragezeichen und Redezeichen",description:"Setze Satzzeichen dort ein, wo sie hingehören.",icon:"?!",cats:["SATZZEICHEN"]},
  {id:"grammatik",title:"Grammatik",subtitle:"Artikel, Fälle und Satzglieder",description:"Untersuche, wie Wörter und Satzteile zusammenpassen.",icon:"§",cats:["GRAMMATIK","SATZGLIEDER","PRONOMEN"]},
  {id:"satzbau",title:"Satzbau",subtitle:"Satzstellung und Nebensätze",description:"Bringe Ordnung in Sätze und entdecke ihre Struktur.",icon:"↗",cats:["SATZBAU","NEBENSÄTZE","KONJUNKTIONEN"]},
  {id:"lesen",title:"Lesen & Verstehen",subtitle:"Informationen finden und kombinieren",description:"Lies genau, erkenne Hinweise und ziehe Schlüsse.",icon:"▤",cats:["LESEVERSTEHEN","TEXTVERSTÄNDNIS","INFORMATIONEN AUSWERTEN"]}
];
const units = topics.flatMap(topic => ["Leicht","Mittel","Schwer"].flatMap(level => {
  const qs = questions.filter(q => topic.cats.includes(q.category) && q.level===level);
  return qs.length ? [{id:topic.id+"-"+level,topic,level,questions:qs}] : [];
}));
const totalQuestions = questions.length;
const letters = ["A","B","C"];
const completed = new Set();
let currentUnit = null, queue = [], currentIndex = 0, score = 0, answered = false, wrongAnswers = [], stats = {};
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const answerGrid = document.getElementById("answer-grid");
const feedbackPanel = document.getElementById("feedback-panel");
const nextButton = document.getElementById("next-button");

function screen(name) {
  startScreen.hidden = name!=="start";
  quizScreen.hidden = name!=="quiz";
  resultScreen.hidden = name!=="result";
  if(name==="start") renderPath();
  window.scrollTo({top:0,behavior:"smooth"});
}
function completedCount() {
  return units.filter(u=>completed.has(u.id)).reduce((n,u)=>n+u.questions.length,0);
}
function nextUnit() { return units.find(u=>!completed.has(u.id)) || null; }

function renderPath() {
  const done=completedCount(), pct=Math.round(done/totalQuestions*100), next=nextUnit();
  const bar=document.getElementById("course-progress");
  bar.setAttribute("aria-valuemax",String(totalQuestions));
  bar.setAttribute("aria-valuenow",String(done));
  document.getElementById("course-progress-fill").style.width=pct+"%";
  document.getElementById("course-progress-count").textContent=done+" / "+totalQuestions;
  document.getElementById("topbar-progress").innerHTML=done+" / "+totalQuestions+" <span>ÜBUNGEN</span>";
  document.getElementById("course-progress-title").textContent=done===totalQuestions?"Du hast den Kurs geschafft!":done?"Du bist auf deinem Weg!":"Dein Kurs beginnt hier";
  document.getElementById("course-progress-note").textContent=done===totalQuestions
    ?"Alle 30 Übungen abgeschlossen. Du kannst jede Einheit erneut spielen."
    :done?"Noch "+(totalQuestions-done)+" Übungen bis zum Kursabschluss."
    :"Schließe deine erste Einheit ab, um den Weg freizuschalten.";
  const path=document.getElementById("learning-path");
  path.replaceChildren();
  topics.forEach(topic=>{
    const topicUnits=units.filter(u=>u.topic.id===topic.id);
    const topicDone=topicUnits.filter(u=>completed.has(u.id)).reduce((n,u)=>n+u.questions.length,0);
    const topicTotal=topicUnits.reduce((n,u)=>n+u.questions.length,0);
    const section=document.createElement("section"); section.className="topic-section";
    const head=document.createElement("div"); head.className="topic-header";
    const icon=document.createElement("div"); icon.className="topic-icon"; icon.textContent=topic.icon;
    const copy=document.createElement("div"); copy.className="topic-copy";
    const title=document.createElement("h3"); title.textContent=topic.title;
    const sub=document.createElement("p"); sub.textContent=topic.subtitle; copy.append(title,sub);
    const count=document.createElement("span"); count.className="topic-count"; count.textContent=topicDone+"/"+topicTotal;
    head.append(icon,copy,count);
    const track=document.createElement("div"); track.className="topic-progress-track";
    track.setAttribute("role","progressbar"); track.setAttribute("aria-label",topic.title+": "+topicDone+" von "+topicTotal);
    track.setAttribute("aria-valuemin","0"); track.setAttribute("aria-valuemax",String(topicTotal)); track.setAttribute("aria-valuenow",String(topicDone));
    const fill=document.createElement("span"); fill.style.width=Math.round(topicDone/topicTotal*100)+"%"; track.append(fill);
    const nodes=document.createElement("div"); nodes.className="topic-nodes";
    topicUnits.forEach((unit,i)=>{
      const doneUnit=completed.has(unit.id), open=doneUnit || next?.id===unit.id;
      const button=document.createElement("button"); button.type="button";
      button.className="lesson-node "+(doneUnit?"is-done":open?"is-open":"is-locked")+" node-position-"+(i%3);
      button.disabled=!open;
      button.setAttribute("aria-label",topic.title+", "+levelLabels[unit.level].title+", "+(doneUnit?"abgeschlossen":open?"starten":"gesperrt"));
      const orb=document.createElement("span"); orb.className="node-orb"; orb.textContent=doneUnit?"✓":open?"▶":"⌑";
      const label=document.createElement("span"); label.className="node-label"; label.textContent=levelLabels[unit.level].title;
      const meta=document.createElement("span"); meta.className="node-meta"; meta.textContent=unit.questions.length+(unit.questions.length===1?" Frage":" Fragen");
      button.append(orb,label,meta); button.addEventListener("click",()=>startUnit(unit)); nodes.append(button);
    });
    const description=document.createElement("p"); description.className="topic-description"; description.textContent=topic.description;
    section.append(head,track,nodes,description); path.append(section);
  });
  document.getElementById("next-icon").textContent=next?next.topic.icon:"✓";
  document.getElementById("next-title").textContent=next?next.topic.title+" · "+levelLabels[next.level].title:"Alles geschafft!";
  document.getElementById("next-description").textContent=next?next.topic.description:"Der ganze Lernpfad ist abgeschlossen. Wiederhole eine Einheit oder starte das freie Training.";
  document.getElementById("next-meta").textContent=next
    ?levelLabels[next.level].short+" · "+next.questions.length+(next.questions.length===1?" FRAGE":" FRAGEN")
    :"30 / 30 ÜBUNGEN";
}

function prepare(items, unit=null) {
  currentUnit=unit; queue=items; currentIndex=0; score=0; answered=false; wrongAnswers=[]; stats={};
  queue.forEach(q=>{ if(!stats[q.level]) stats[q.level]={correct:0,total:0}; stats[q.level].total++; });
  document.getElementById("score-value").textContent="0 Punkte";
  document.getElementById("quiz-topic").textContent=unit?unit.topic.title.toUpperCase():"FREIES TRAINING";
  screen("quiz"); renderQuestion();
}
function startUnit(unit) {
  prepare([...unit.questions].sort(()=>Math.random()-.5),unit);
}
function startFree() {
  const all=["Leicht","Mittel","Schwer"].flatMap(level=>
    questions.filter(q=>q.level===level).sort(()=>Math.random()-.5));
  prepare(all,null);
}

function renderQuestion() {
  const q=queue[currentIndex], number=currentIndex+1, percent=Math.round(number/queue.length*100);
  answered=false;
  document.getElementById("question-counter").textContent=number+" / "+queue.length;
  document.getElementById("progress-level").textContent=currentUnit
    ?levelLabels[q.level].title.toUpperCase()+" · "+currentUnit.topic.title.toUpperCase()
    :q.level.toUpperCase()+" · FREIES TRAINING";
  document.getElementById("progress-percent").textContent=percent+" %";
  document.getElementById("progress-fill").style.width=percent+"%";
  const progress=document.getElementById("quiz-progress");
  progress.setAttribute("aria-valuemax",String(queue.length)); progress.setAttribute("aria-valuenow",String(number));
  document.getElementById("question-number").textContent="FRAGE "+String(number).padStart(2,"0");
  document.getElementById("question-category").textContent=q.category;
  document.getElementById("question-text").textContent=q.prompt;
  document.getElementById("score-value").textContent=score+" Punkte";
  answerGrid.replaceChildren();
  q.choices.forEach((choice,index)=>{
    const button=document.createElement("button"); button.type="button"; button.className="answer-option";
    const letter=document.createElement("span"); letter.className="answer-letter"; letter.textContent=letters[index];
    const text=document.createElement("span"); text.textContent=choice;
    button.append(letter,text); button.addEventListener("click",()=>selectAnswer(index)); answerGrid.append(button);
  });
  feedbackPanel.hidden=true; feedbackPanel.className="feedback-panel";
  document.getElementById("feedback-title").textContent="";
  document.getElementById("feedback-text").textContent="";
  nextButton.disabled=true;
  nextButton.innerHTML=currentIndex===queue.length-1
    ?'Ergebnis ansehen <span aria-hidden="true">→</span>':'Weiter <span aria-hidden="true">→</span>';
}
function selectAnswer(selected) {
  if(answered) return; answered=true;
  const q=queue[currentIndex], correct=selected===q.answer;
  [...answerGrid.querySelectorAll(".answer-option")].forEach((button,index)=>{
    button.disabled=true;
    if(index===q.answer) button.classList.add("is-correct");
    if(index===selected&&!correct) button.classList.add("is-wrong");
  });
  if(correct) {
    score++; stats[q.level].correct++; feedbackPanel.classList.add("feedback-good");
    document.getElementById("feedback-title").textContent="Richtig! +1 Punkt";
  } else {
    wrongAnswers.push({question:q,selectedIndex:selected});
    feedbackPanel.classList.add("feedback-bad");
    document.getElementById("feedback-title").textContent="Noch nicht ganz. Richtig ist: "+q.choices[q.answer];
  }
  document.getElementById("feedback-text").textContent=q.explanation;
  feedbackPanel.hidden=false; document.getElementById("score-value").textContent=score+" Punkte";
  nextButton.disabled=false;
}

function renderResults() {
  screen("result");
  const total=queue.length, pct=Math.round(score/total*100), wrong=total-score;
  if(currentUnit) completed.add(currentUnit.id);
  document.getElementById("score-fraction").textContent=score+"/"+total;
  document.getElementById("score-percent").textContent=pct+" %";
  document.getElementById("result-correct").textContent=score;
  document.getElementById("result-wrong").textContent=wrong;
  document.getElementById("result-progress-fill").style.width=pct+"%";
  document.getElementById("result-progress-track").setAttribute("aria-valuemax",String(total));
  document.getElementById("result-progress-track").setAttribute("aria-valuenow",String(score));
  document.getElementById("result-subheading").textContent=currentUnit
    ?currentUnit.topic.title+" · "+levelLabels[currentUnit.level].title+" abgeschlossen."
    :"Du hast "+score+" von "+total+" Fragen richtig beantwortet.";
  document.querySelector(".result-header .eyebrow").textContent=currentUnit?"EINHEIT ABGESCHLOSSEN":"FREIES TRAINING BEENDET";
  let heading=pct>=90?"Hervorragend!":pct>=70?"Gut gemacht!":pct>=50?"Weiter so!":"Guter Anfang!";
  if(currentUnit&&completedCount()===totalQuestions) heading="Lernpfad geschafft!";
  document.getElementById("result-heading").textContent=heading;
  document.getElementById("result-medal").textContent=pct>=90?"★":pct>=50?"✦":"◆";
  const resultList=document.getElementById("level-results"); resultList.replaceChildren();
  ["Leicht","Mittel","Schwer"].filter(level=>stats[level]).forEach(level=>{
    const s=stats[level], ratio=Math.round(s.correct/s.total*100);
    const card=document.createElement("div"); card.className="level-result";
    const row=document.createElement("div"); row.className="level-result-head";
    const name=document.createElement("span"); name.textContent=currentUnit?currentUnit.topic.title:level;
    const value=document.createElement("strong"); value.textContent=s.correct+" / "+s.total;
    const percent=document.createElement("span"); percent.className="level-result-percent"; percent.textContent=ratio+" %";
    row.append(name,value,percent);
    const track=document.createElement("div"); track.className="level-result-track";
    track.setAttribute("role","progressbar"); track.setAttribute("aria-valuemin","0"); track.setAttribute("aria-valuemax",String(s.total)); track.setAttribute("aria-valuenow",String(s.correct));
    const fill=document.createElement("span"); fill.className="level-result-fill"; fill.style.width=ratio+"%"; track.append(fill);
    card.append(row,track); resultList.append(card);
  });
  document.getElementById("recommendation-title").textContent=pct>=90?"Das sitzt richtig gut!":pct>=70?"Eine starke Runde!":pct>=50?"Du bist auf dem Weg.":"Übung macht sicher.";
  document.getElementById("recommendation-text").textContent=
    (pct>=90?"Du hast fast alle Aufgaben richtig gelöst. "
    :pct>=70?"Viele Antworten waren richtig. "
    :pct>=50?"Lies die Erklärungen in Ruhe durch. "
    :"Fehler sind Teil des Lernens. Lies die Erklärungen und probiere es weiter. ")+
    (currentUnit?"Thema: "+currentUnit.topic.title+".":"Du kannst jetzt ein Thema wiederholen oder eine Einheit im Lernpfad starten.");
  const list=document.getElementById("mistakes-list"); list.replaceChildren();
  document.getElementById("mistakes-section").hidden=wrongAnswers.length===0;
  wrongAnswers.forEach(({question:q,selectedIndex})=>{
    const item=document.createElement("article"); item.className="mistake-item";
    const meta=document.createElement("div"); meta.className="mistake-meta"; meta.textContent=q.level+" · "+q.category;
    const prompt=document.createElement("h3"); prompt.className="mistake-question"; prompt.textContent=q.prompt;
    const selected=document.createElement("p"); selected.className="mistake-selected"; selected.textContent="Deine Antwort: "+q.choices[selectedIndex];
    const answer=document.createElement("p"); answer.className="mistake-answer"; answer.textContent="Richtige Antwort: "+q.choices[q.answer];
    const explanation=document.createElement("p"); explanation.className="mistake-explanation"; explanation.textContent=q.explanation;
    item.append(meta,prompt,selected,answer,explanation); list.append(item);
  });
  const following=nextUnit(), nextButton=document.getElementById("next-level-button");
  nextButton.hidden=!currentUnit||!following;
  if(following) nextButton.innerHTML="Weiter: "+following.topic.title+" · "+levelLabels[following.level].title+' <span aria-hidden="true">→</span>';
  document.getElementById("retry-button").textContent=currentUnit?"Einheit wiederholen ↻":"Training wiederholen ↻";
  renderPath();
}

document.getElementById("free-practice-button").addEventListener("click",startFree);
document.getElementById("next-level-button").addEventListener("click",()=>{const next=nextUnit();if(next)startUnit(next);});
nextButton.addEventListener("click",()=>{
  if(!answered)return;
  if(currentIndex<queue.length-1){currentIndex++;renderQuestion();}else{renderResults();}
});
document.getElementById("back-to-menu").addEventListener("click",()=>screen("start"));
document.getElementById("result-menu-button").addEventListener("click",()=>screen("start"));
document.getElementById("retry-button").addEventListener("click",()=>currentUnit?startUnit(currentUnit):startFree());
document.getElementById("brand-home").addEventListener("click",event=>{event.preventDefault();screen("start");});

const mapped=topics.reduce((n,t)=>n+questions.filter(q=>t.cats.includes(q.category)).length,0);
if(mapped!==totalQuestions||units.length<7) console.error("Lernpfad: Fragenzuordnung prüfen.");
renderPath();
