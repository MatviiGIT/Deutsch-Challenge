const letters = ["A","B","C"];
const TRACKS = {
  G: {label:"G-Niveau",name:"Grundlegendes Niveau",short:"G"},
  M: {label:"M-Niveau",name:"Mittleres Niveau",short:"M"},
  E: {label:"E-Niveau",name:"Erweitertes Niveau",short:"E"}
};
const STAGES = [
  {name:"Entdecken",tag:"STUFE 1",hint:"Du lernst die Grundlagen kennen."},
  {name:"Erkennen",tag:"STUFE 2",hint:"Du erkennst Regeln in Beispielen."},
  {name:"Anwenden",tag:"STUFE 3",hint:"Du wendest dein Wissen selbstständig an."},
  {name:"Kombinieren",tag:"STUFE 4",hint:"Du verbindest mehrere Regeln miteinander."},
  {name:"Meistern",tag:"STUFE 5",hint:"Du löst anspruchsvollere Aufgaben im Zusammenhang."}
];
const stageIndex = n => STAGES[n-1];
function shuffle(items) {
  const copy=[...items];
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}
function makeQuestion(prompt,answer,wrongOptions,explanation,track,category,stage) {
  // Prefer distractors from the selected difficulty band, then fill from
  // the remaining pool without ever creating duplicate answer choices.
  const offset=track==="G"?0:track==="M"?2:4;
  const uniqueWrong=[...new Set(wrongOptions.map(option=>String(option).trim()).filter(option=>option&&option!==String(answer).trim()))];
  const preferred=uniqueWrong.slice(offset,offset+2);
  const distractors=[...new Set([...preferred,...uniqueWrong])].slice(0,2);
  if(distractors.length!==2){
    throw new Error("Aufgabe benötigt zwei unterschiedliche falsche Antworten: "+prompt);
  }
  const correct=String(answer).trim();
  const choices=shuffle([correct,...distractors]);
  return {
    category:category,
    stage:stage,
    track:track,
    prompt:prompt,
    choices:choices,
    answer:choices.indexOf(correct),
    explanation:explanation
  };
}
function qRows(rows,track,category,stage) {
  return rows.map(row=>makeQuestion(row[0],row[1],row[2],row[3],track,category,stage));
}
function ensureUniquePrompts(items,topicId) {
  const hints={
    wortarten:["Untersuche die Wortart genau.","Achte auf die Aufgabe des Wortes im Satz.","Prüfe, zu welcher Wortgruppe das Wort gehört."],
    wortschatz:["Achte auf die genaue Bedeutung.","Vergleiche die Bedeutungen der Wörter.","Nutze den Zusammenhang als Hinweis."],
    rechtschreibung:["Prüfe die Schreibweise genau.","Achte auf die Rechtschreibregel.","Untersuche die einzelnen Wortteile."],
    satzzeichen:["Achte genau auf die Zeichensetzung.","Prüfe, wo Satzteile voneinander getrennt werden.","Untersuche die Satzzeichen im ganzen Satz."],
    grammatik:["Achte auf den grammatischen Fall.","Prüfe die Beziehung zwischen den Satzteilen.","Untersuche die Form des Artikels oder Pronomens."],
    satzbau:["Achte auf die Stellung des finiten Verbs.","Prüfe die Reihenfolge der Satzglieder.","Untersuche die Struktur des Satzes."],
    lesen:["Suche die passenden Hinweise im Text.","Vergleiche die Informationen genau.","Leite deine Antwort aus dem Text ab."]
  }[topicId]||["Prüfe die Aufgabe genau.","Achte auf den Zusammenhang.","Vergleiche die Antwortmöglichkeiten."];
  const seen=new Set();
  let hintIndex=0;
  return items.map((question,index)=>{
    if(seen.has(question.prompt)){
      let candidate=question.prompt+" "+hints[hintIndex%hints.length];
      hintIndex++;
      while(seen.has(candidate)){candidate=question.prompt+" Hinweis "+(index+1)+".";}
      question.prompt=candidate;
    }
    seen.add(question.prompt);
    return question;
  });
}
function classWrongs(answer) {
  const easy=["Nomen","Verb","Adjektiv"].filter(x=>x!==answer);
  const medium=["Pronomen","Artikel","Adverb","Präposition","Konjunktion"].filter(x=>x!==answer);
  const hard=["Adverb","Präposition","Konjunktion","Pronomen","Artikel","Nomen","Verb","Adjektiv"].filter(x=>x!==answer);
  return [easy[0]||medium[0],easy[1]||medium[1],medium[0],medium[1],hard[0],hard[1]];
}
function makeClassQuestions(items,track,category,stage,withSentence) {
  return items.map(item=>{
    const wordClass=withSentence?item[2]:item[1];
    const explanation=withSentence?item[3]:item[2];
    const prompt=withSentence
      ?"Welche Wortart hat das Wort „"+item[0]+"“ im Satz: „"+item[1]+"“?"
      :"Welche Wortart ist „"+item[0]+"“?";
    return makeQuestion(prompt,wordClass,classWrongs(wordClass),"Das Wort „"+item[0]+"“ ist ein "+wordClass+". "+explanation,track,category,stage);
  });
}
function nounsQuestion(rows,track,category,stage) {
  return rows.map(r=>makeQuestion("Welcher bestimmte Artikel steht im Nominativ vor „"+r[0]+"“?",r[1],r[2],"Es heißt „"+r[1]+" "+r[0]+"“. Das grammatische Geschlecht bestimmt den Artikel.",track,category,stage));
}
function simpleRows(data,track,category,stage,makePrompt) {
  return data.map(r=>makeQuestion(makePrompt(r),r[1],r[2],r[3],track,category,stage));
}
function spellingRows(data,track,category,stage) {
  const alternatives=[
    "Welche Variante ist richtig geschrieben?",
    "Wähle die korrekt geschriebene Fassung.",
    "Welche Form ist orthografisch richtig?",
    "In welcher Version stimmt die Schreibweise?",
    "Welche Antwort hält die Rechtschreibregel ein?",
    "Welche Fassung enthält keinen Schreibfehler?",
    "Wie lautet die richtige Schreibweise?",
    "Welche der drei Varianten ist korrekt?",
    "Prüfe die Schreibweise: Welche Antwort stimmt?"
  ];
  const seen=new Map();
  return data.map(r=>{
    const count=seen.get(r[0])||0;seen.set(r[0],count+1);
    const prompt=count===0?r[0]:alternatives[(count-1)%alternatives.length];
    const answer=String(r[1]);
    return makeQuestion(prompt,answer,r[2],"Richtig ist: „"+answer+"“. "+r[3],track,category,stage);
  });
}
function readingRows(data,track,category,stage) {
  return data.map(r=>makeQuestion("Lies: „"+r[0]+"“ "+r[1],r[2],r[3],"Im Text steht: "+r[4],track,category,stage));
}
const topics = [
  {
    id:"wortarten",title:"Wortarten",subtitle:"Nomen, Verben, Adjektive und mehr",
    description:"Entdecke die Aufgaben der Wörter und untersuche, wie sie im Satz zusammenarbeiten.",
    icon:"Aa",
    lessons:[
      {title:"Wortdetektive",focus:"Nomen, Verben und Adjektive unterscheiden",build(track,stage){
        const items=[
          ["Schulranzen","Nomen","Der Schulranzen ist ein Ding und wird großgeschrieben."],
          ["flüstert","Verb","„Flüstert“ beschreibt, was jemand tut."],
          ["neugierig","Adjektiv","„Neugierig“ beschreibt eine Eigenschaft."],
          ["Freundschaft","Nomen","„Freundschaft“ bezeichnet ein Gefühl oder eine Beziehung."],
          ["springen","Verb","„Springen“ beschreibt eine Tätigkeit."],
          ["vorsichtig","Adjektiv","„Vorsichtig“ beschreibt, wie etwas geschieht oder jemand ist."],
          ["Abenteuer","Nomen","„Abenteuer“ ist ein Nomen und wird großgeschrieben."],
          ["glänzt","Verb","„Glänzt“ beschreibt eine Handlung oder einen Vorgang."],
          ["winzig","Adjektiv","„Winzig“ beschreibt die Größe."],
          ["Gedanke","Nomen","„Gedanke“ bezeichnet etwas, das man denkt."]
        ];
        return makeClassQuestions(items,track,"WORTARTEN",stage,false);
      }},
      {title:"Nomen und Begleiter",focus:"Artikel und grammatisches Geschlecht",build(track,stage){
        const rows=[
          ["Apfel","der",["die","das","den","dem","des","ein"]],
          ["Blume","die",["der","das","den","dem","eine","einer"]],
          ["Fenster","das",["der","die","dem","den","des","eines"]],
          ["Schlüssel","der",["die","das","den","dem","des","einen"]],
          ["Gabel","die",["der","das","den","dem","einer","der"]],
          ["Mädchen","das",["der","die","den","dem","des","einem"]],
          ["Abenteuer","das",["der","die","den","dem","des","eines"]],
          ["Geduld","die",["der","das","den","dem","eine","einer"]],
          ["Wettbewerb","der",["die","das","den","dem","des","einen"]],
          ["Ergebnis","das",["der","die","den","dem","des","einem"]]
        ];
        return nounsQuestion(rows,track,"NOMEN UND ARTIKEL",stage);
      }},
      {title:"Verben in Bewegung",focus:"Verbformen und Zeitformen",build(track,stage){
        const rows=[
          ["Welche Verbform passt? „Ich ___ jeden Abend ein Kapitel.“","lese",["liest","lesen","lest","las","lesest"],"Zu „ich“ gehört die Verbform „lese“."],
          ["Welche Verbform passt? „Du ___ heute besonders schnell.“","läufst",["läuft","laufen","laufst","liefst","lauft"],"Zu „du“ gehört „läufst“."],
          ["Welche Verbform passt? „Mila ___ ihre Hausaufgaben.“","macht",["machen","machst","machte","gemacht","machet"],"Zu „Mila“ (sie) passt „macht“."],
          ["Welche Verbform passt? „Wir ___ morgen ins Schwimmbad.“","gehen",["geht","gehst","gingen","gehe","gehet"],"Zu „wir“ gehört „gehen“."],
          ["Welche Verbform passt? „Ihr ___ die Lösung sofort.“","erkennt",["erkenne","erkennen","erkenntet","erkannte","erkannt"],"Zu „ihr“ gehört „erkennt“."],
          ["Welche Verbform passt? „Gestern ___ ich einen langen Brief.“","schrieb",["schreibe","schreibt","schreiben","geschrieben","schriebe"],"„Gestern“ zeigt die Vergangenheit. Die passende Form ist „schrieb“."],
          ["Welche Verbform passt? „Früher ___ wir oft im Hof.“","spielten",["spielen","spielt","spielst","gespielt","spieltet"],"Für „wir“ in der Vergangenheit passt „spielten“."],
          ["Welche Verbform passt? „Morgen ___ sie ihre Tante besuchen.“","wird",["werden","wirst","wurde","geworden","werdet"],"Bei „sie“ in der Einzahl heißt es „wird“."],
          ["Welche Verbform passt? „Du ___ den Weg schon gefunden.“","hast",["hat","haben","hatte","bist","seid"],"Das Subjekt „du“ verlangt die Form „hast“."],
          ["Welche Verbform passt? „Als Kind ___ er jeden Tag draußen.“","tobte",["tobt","toben","tobst","getobt","tobet"],"„Als Kind“ beschreibt hier eine regelmäßige Handlung in der Vergangenheit: „tobte“."]
        ];
        return qRows(rows,track,"VERBEN",stage);
      }},
      {title:"Adjektive beschreiben",focus:"Eigenschaften und Steigerung",build(track,stage){
        const rows=[
          ["Ergänze: „warm – wärmer – ___“","am wärmsten",["am warmsten","wärmste","wärmer","am wärmlicher","wärmsten"],"Die Höchststufe lautet „am wärmsten“."],
          ["Ergänze: „schnell – schneller – ___“","am schnellsten",["am schnellsten","schnellste","schneller","am schnelligsten","schnellsten"],"Die Höchststufe von „schnell“ heißt „am schnellsten“."],
          ["Ergänze: „gut – besser – ___“","am besten",["am gutesten","am besten","bessersten","am bestesten","am bestensten"],"„Gut“ wird unregelmäßig gesteigert: gut – besser – am besten."],
          ["Ergänze: „hoch – höher – ___“","am höchsten",["am hochsten","am höchsten","höchster","am höhesten","am höchstens"],"Die Höchststufe lautet „am höchsten“."],
          ["Welche Steigerungsform ist richtig? „nah – näher – ___“","am nächsten",["am nähesten","am nächsten","am nahsten","nächster","am nächstens"],"„Nah“ wird unregelmäßig gesteigert: nah – näher – am nächsten."],
          ["Ergänze: „teuer – teurer – ___“","am teuersten",["am teuersten","am teuerstensten","am teuerersten","teuerste","am teuern"],"Die Höchststufe von „teuer“ lautet „am teuersten“."],
          ["Welche Form passt? „Der Zug ist ___ als der Bus.“","schneller",["am schnellsten","schnell","schneller","schnellste","schnelleren"],"Nach „als“ verwendet man hier die Vergleichsform „schneller“."],
          ["Welche Form passt? „Das ist die ___ Aufgabe.“","schwierigste",["schwieriger","am schwierigsten","schwierigste","schwerigste","schwierig"],"Vor einem Nomen steht hier die gebeugte Höchstform „schwierigste“."],
          ["Welche Form passt? „Heute ist es ___ als gestern.“","kälter",["am kältesten","kalte","kälter","kälteste","kühlerste"],"Vergleicht man zwei Tage, braucht man die Vergleichsform „kälter“."],
          ["Welche Form passt? „Von allen Wegen ist dieser am ___.“","kürzesten",["kürzer","kurz","kürzesten","kurzesten","am kürzer"],"Nach „am“ steht die Höchstform: „am kürzesten“."]
        ];
        return qRows(rows,track,"ADJEKTIVE",stage);
      }},
      {title:"Wortarten im Satz",focus:"Wörter im Satzzusammenhang bestimmen",build(track,stage){
        const items=[
          ["trotzdem","Trotzdem gehen wir nach draußen.","Adverb","„Trotzdem“ verbindet den Gedanken mit dem vorherigen Satz."],
          ["neben","Der Ball liegt neben dem Regal.","Präposition","„Neben“ zeigt eine räumliche Beziehung."],
          ["sie","Mara sagt, dass sie später kommt.","Pronomen","„Sie“ ersetzt hier den Namen Mara."],
          ["aber","Ich wollte kommen, aber ich war krank.","Konjunktion","„Aber“ verbindet zwei Satzteile."],
          ["der","Der kleine Vogel singt.","Artikel","„Der“ begleitet das Nomen „Vogel“."],
          ["morgen","Morgen fahren wir ans Meer.","Adverb","„Morgen“ gibt an, wann etwas geschieht."],
          ["unser","Unser Hund schläft im Flur.","Pronomen","„Unser“ zeigt, zu wem der Hund gehört."],
          ["während","Während es regnet, lesen wir.","Konjunktion","„Während“ leitet hier einen Nebensatz ein."],
          ["zwischen","Das Fahrrad steht zwischen den Bäumen.","Präposition","„Zwischen“ beschreibt die Lage."],
          ["plötzlich","Plötzlich wurde es ganz still.","Adverb","„Plötzlich“ beschreibt, wie unerwartet etwas geschieht."]
        ];
        return makeClassQuestions(items,track,"WORTARTEN IM SATZ",stage,true);
      }}
    ]
  },
  {
    id:"wortschatz",title:"Wortschatz",subtitle:"Bedeutungen, Wortfelder und Ausdruck",
    description:"Finde passende Wörter, erkenne Bedeutungen und drücke Gedanken genauer aus.",
    icon:"W",
    lessons:[
      {title:"Wörter mit ähnlicher Bedeutung",focus:"Synonyme erkennen",build(track,stage){
        const rows=[
          ["Welches Wort bedeutet ungefähr dasselbe wie „fröhlich“?","heiter",["wütend","müde","überrascht","ängstlich","ernst","unruhig"],"„Heiter“ und „fröhlich“ haben eine ähnliche Bedeutung."],
          ["Welches Wort passt als Synonym zu „beginnen“?","anfangen",["beenden","warten","üben","verlieren","aufhören","zögern"],"„Anfangen“ bedeutet dasselbe wie „beginnen“."],
          ["Was bedeutet ungefähr dasselbe wie „riesig“?","gewaltig",["winzig","schmal","hoch","klein","niedrig","eng"],"„Gewaltig“ kann eine sehr große Sache beschreiben."],
          ["Welches Wort passt zu „leise“?","still",["laut","hell","beweglich","lärmend","grell","aufgeregt"],"„Still“ ist ein passendes Synonym für „leise“."],
          ["Welches Wort bedeutet ähnlich wie „mutig“?","tapfer",["ängstlich","vorsichtig","neugierig","schüchtern","feige","zaghaft"],"„Tapfer“ und „mutig“ beschreiben Furchtlosigkeit."],
          ["Welches Wort passt zu „schnell“?","rasch",["langsam","spät","zögerlich","träge","gemächlich","schwerfällig"],"„Rasch“ bedeutet „schnell“."],
          ["Welches Wort ist ein Synonym für „nachdenken“?","überlegen",["vergessen","erzählen","zweifeln","rennen","schweigen","ruhen"],"„Überlegen“ bedeutet, über etwas nachzudenken."],
          ["Welches Wort passt zu „erstaunt“?","überrascht",["gelangweilt","besorgt","verärgert","müde","gleichgültig","unbeeindruckt"],"„Überrascht“ und „erstaunt“ sind bedeutungsähnlich."],
          ["Welches Wort passt zu „schützen“?","bewahren",["zerstören","verstecken","beobachten","verlieren","angreifen","wegwerfen"],"„Bewahren“ kann bedeuten, etwas zu schützen oder zu erhalten."],
          ["Welches Wort bedeutet ähnlich wie „sorgfältig“?","gewissenhaft",["flüchtig","laut","nachlässig","unachtsam","zufällig","bequem"],"„Gewissenhaft“ beschreibt sorgfältiges Arbeiten."]
        ];
        return qRows(rows,track,"SYNONYME",stage);
      }},
      {title:"Gegenteile finden",focus:"Antonyme verstehen",build(track,stage){
        const rows=[
          ["Was ist das Gegenteil von „hell“?","dunkel",["leuchtend","klar","düster","weiß","strahlend"],"„Dunkel“ ist das Gegenteil von „hell“."],
          ["Was ist das Gegenteil von „großzügig“?","geizig",["freundlich","hilfsbereit","kleinlich","offen","spendabel"],"„Geizig“ beschreibt jemanden, der ungern etwas abgibt."],
          ["Welches Wort ist das Gegenteil von „erlauben“?","verbieten",["gestatten","genehmigen","untersagen","zulassen","freigeben"],"„Verbieten“ bedeutet das Gegenteil von „erlauben“."],
          ["Was ist das Gegenteil von „sich erinnern“?","vergessen",["merken","behalten","verdrängen","wissen","erkennen"],"„Vergessen“ bedeutet, sich nicht mehr zu erinnern."],
          ["Welches Wort ist das Gegenteil von „geduldig“?","ungeduldig",["ruhig","ausdauernd","hektisch","gelassen","wartend"],"„Ungeduldig“ ist das direkte Gegenteil von „geduldig“."],
          ["Was ist das Gegenteil von „häufig“?","selten",["oft","regelmäßig","gelegentlich","meistens","ständig"],"„Selten“ bedeutet, dass etwas nur wenige Male vorkommt."],
          ["Welches Wort ist das Gegenteil von „kompliziert“?","einfach",["schwierig","verwickelt","leicht","anspruchsvoll","rätselhaft"],"„Einfach“ ist das Gegenteil von „kompliziert“."],
          ["Was ist das Gegenteil von „optimistisch“?","pessimistisch",["hoffnungsvoll","zuversichtlich","negativ","fröhlich","erwartungsvoll"],"„Pessimistisch“ bedeutet, eher mit einem schlechten Ausgang zu rechnen."],
          ["Welches Wort ist das Gegenteil von „Zustimmung“?","Ablehnung",["Einverständnis","Beifall","Widerspruch","Bestätigung","Unterstützung"],"„Ablehnung“ ist das Gegenteil von „Zustimmung“."],
          ["Was ist das Gegenteil von „vorläufig“?","endgültig",["kurzzeitig","zeitweise","abschließend","unbestimmt","provisorisch"],"„Endgültig“ bedeutet, dass etwas nicht nur vorübergehend gilt."]
        ];
        return qRows(rows,track,"GEGENTEILE",stage);
      }},
      {title:"Wortfelder entdecken",focus:"Wörter nach Themen ordnen",build(track,stage){
        const rows=[
          ["Welches Wort gehört zum Wortfeld „Wetter“?","Nebel",["Schreibtisch","Pausenglocke","Schulheft","Ranzen","Kochtopf","Teppich"],"Nebel ist eine Erscheinung des Wetters."],
          ["Welches Wort gehört zum Wortfeld „sagen“?","berichten",["laufen","essen","springen","bauen","rechnen","malen"],"„Berichten“ gehört zum Wortfeld des Sprechens."],
          ["Welches Wort gehört zum Wortfeld „gehen“?","schlendern",["singen","flüstern","malen","kochen","rechnen","schreiben"],"„Schlendern“ beschreibt eine Art zu gehen."],
          ["Welches Wort passt zum Wortfeld „Wald“?","Moos",["Lenkrad","Kreide","Fenster","Tastatur","Handy","Teller"],"Moos wächst häufig im Wald."],
          ["Welches Wort gehört zum Wortfeld „Gefühle“?","Erleichterung",["Lineal","Rucksack","Fahrstuhl","Fahrkarte","Bleistift","Schraubenzieher"],"Erleichterung ist ein Gefühl."],
          ["Welches Wort passt zum Wortfeld „Schule“?","Stundenplan",["Wolke","Pinsel","Schornstein","Schnecke","Kochtopf","Gießkanne"],"Ein Stundenplan gehört zum Schulalltag."],
          ["Welches Wort gehört zum Wortfeld „sehen“?","beobachten",["horchen","kochen","schmecken","fühlen","riechen","hören"],"„Beobachten“ bedeutet, etwas aufmerksam anzusehen."],
          ["Welches Wort passt zum Wortfeld „Wasser“?","Strömung",["Schraube","Weste","Buchseite","Wolldecke","Schlüssel","Teppich"],"Eine Strömung ist eine Bewegung des Wassers."],
          ["Welches Wort gehört zum Wortfeld „streiten“?","widersprechen",["zustimmen","weglaufen","zuhören","loben","begrüßen","malen"],"„Widersprechen“ kann Teil eines Streits sein."],
          ["Welches Wort passt zum Wortfeld „Reise“?","Gepäck",["Tafel","Teppich","Heizung","Pinsel","Schneeball","Schlüssel"],"Gepäck nimmt man auf eine Reise mit."]
        ];
        return qRows(rows,track,"WORTFELDER",stage);
      }},
      {title:"Wortfamilien bauen",focus:"Wortstämme und Ableitungen",build(track,stage){
        const rows=[
          ["Welches Wort gehört zur Wortfamilie von „spielen“?","Spieler",["Spiegel","Spinat","Spirale","Sperre","Spur","spitz"],"„Spieler“ gehört zur Wortfamilie „spiel-“."],
          ["Welches Wort gehört zur Wortfamilie von „fahren“?","Fahrer",["Farbe","Fahne","Faden","Falle","Farn","Fabel"],"„Fahrer“ ist von „fahren“ abgeleitet."],
          ["Welches Wort ist direkt von „freundlich“ abgeleitet?","Freundlichkeit",["Fremdheit","Freitag","Freizeit","Frühling","Freiheit","Freiwillige"],"„Freundlichkeit“ entsteht aus dem Adjektiv „freundlich“ und gehört zur selben Wortfamilie."],
          ["Welches Wort gehört zur Wortfamilie von „lesen“?","Leser",["Leiter","Leiste","Lehre","Leere","Laster","Leder"],"„Leser“ ist von „lesen“ abgeleitet."],
          ["Welches Wort ist direkt von „sichtbar“ abgeleitet?","Sichtbarkeit",["Sicherheit","Sitte","Sichel","Sieg","Sinn","Sitzung"],"„Sichtbarkeit“ ist ein Nomen, das aus „sichtbar“ gebildet wird."],
          ["Welches Wort ist mit „bauen“ verwandt?","Baustelle",["Baum","Bauch","Bauer","Bogen","Börse","Boden"],"„Baustelle“ gehört zur Wortfamilie von „bauen“."],
          ["Welches Wort gehört zur Wortfamilie von „denken“?","Gedanke",["Decke","Dunkel","Ding","Dach","Dampf","Dunst"],"„Gedanke“ gehört zur Wortfamilie von „denken“."],
          ["Welches Wort gehört zur Wortfamilie von „singen“?","Gesang",["Sache","Saison","Sinn","Sichel","Sieg","Seite"],"„Gesang“ gehört zur Wortfamilie von „singen“."],
          ["Welches Wort gehört zur Wortfamilie von „Mut“?","mutig",["Mutter","Muster","müde","Minute","Muskel","Mütze"],"„Mutig“ ist von „Mut“ abgeleitet."],
          ["Welches Wort gehört zur Wortfamilie von „ordnen“?","Ordnung",["Ohr","Ort","Orkan","Orange","Orden","Orgel"],"„Ordner“ und „Ordnung“ gehören zur Wortfamilie von „ordnen“."]
        ];
        return qRows(rows,track,"WORTFAMILIEN",stage);
      }},
      {title:"Wörter im Zusammenhang",focus:"Bedeutungen aus dem Kontext erschließen",build(track,stage){
        const rows=[
          ["Im Satz „Nach dem langen Lauf war Ben völlig erschöpft“ bedeutet „erschöpft“ …","sehr müde",["sehr stolz","sehr hungrig","kraftlos","aufgeregt","unaufmerksam"],"Der lange Lauf ist ein Hinweis darauf, dass Ben keine Kraft mehr hat."],
          ["Im Satz „Mira zögerte, bevor sie die Tür öffnete“ bedeutet „zögerte“ …","sie war unsicher",["sie war sehr schnell","sie handelte ohne zu überlegen","sie lachte laut","sie rannte weg","sie öffnete sofort","sie war völlig sicher"],"„Zögern“ bedeutet, etwas nicht sofort zu tun, weil man unsicher ist."],
          ["Im Satz „Der Hinweis war entscheidend“ bedeutet „entscheidend“ …","besonders wichtig",["unbedeutend","zufällig","ungewöhnlich","unverständlich","überflüssig","belanglos"],"Ein entscheidender Hinweis beeinflusst das Ergebnis stark."],
          ["Im Satz „Die Gruppe arbeitete gemeinsam“ bedeutet „gemeinsam“ …","zusammen",["getrennt","heimlich","miteinander","allein","nacheinander"],"„Gemeinsam“ bedeutet, dass mehrere etwas zusammen tun."],
          ["Im Satz „Der Weg war schmal“ bedeutet „schmal“ …","nicht breit",["nicht lang","eng","sehr hoch","breit","steil"],"Ein schmaler Weg hat wenig Breite."],
          ["Im Satz „Paul reagierte gelassen“ bedeutet „gelassen“ …","ruhig",["nervös","ruhig und sicher","wütend","hektisch","überrascht"],"Wer gelassen reagiert, bleibt ruhig."],
          ["Im Satz „Die Lösung war naheliegend“ bedeutet „naheliegend“ …","leicht zu erkennen",["weit entfernt","schwer zu finden","unpassend","unmöglich","zufällig","unwahrscheinlich"],"Eine naheliegende Lösung liegt gedanklich nahe und ist gut zu erkennen."],
          ["Im Satz „Der Plan scheiterte“ bedeutet „scheiterte“ …","hatte keinen Erfolg",["wurde verbessert","war erfolgreich","misslang","wurde begonnen","blieb geheim"],"„Scheitern“ bedeutet, dass etwas keinen Erfolg hat."],
          ["Im Satz „Die Erklärung war überzeugend“ bedeutet „überzeugend“ …","gut begründet",["unglaubwürdig","unbelegt","verwirrend","unvollständig","zufällig","widersprüchlich"],"Eine überzeugende Erklärung liefert gute Gründe."],
          ["Im Satz „Sie fasste den Entschluss“ bedeutet „Entschluss“ …","Entscheidung",["Frage","Entscheidung","Vermutung","Wunsch","Zufall"],"Ein Entschluss ist eine Entscheidung, die man getroffen hat."]
        ];
        return qRows(rows,track,"WÖRTER IM KONTEXT",stage);
      }}
    ]
  },
  {
    id:"rechtschreibung",title:"Rechtschreibung",subtitle:"Wörter sicher und richtig schreiben",
    description:"Trainiere Großschreibung, Vokale, Wortbausteine und schwierige Schreibweisen.",
    icon:"✎",
    lessons:[
      {title:"Groß oder klein?",focus:"Satzanfänge und Nomen erkennen",build(track,stage){
        const rows=[
          ["Welcher Satz ist richtig geschrieben?","Am Montag besucht Emma ihre Oma.",["am Montag besucht Emma ihre Oma.","Am montag besucht Emma ihre Oma.","Am Montag besucht Emma ihre oma.","am montag besucht emma ihre Oma.","Am Montag Besucht Emma ihre Oma.","Am Montag besucht emma ihre Oma."],"Satzanfänge und Nomen werden großgeschrieben."],
          ["Welcher Satz ist richtig geschrieben?","Der Hund schläft neben dem Fenster.",["der Hund schläft neben dem Fenster.","Der hund schläft neben dem Fenster.","Der Hund schläft neben dem fenster.","Der Hund schläft Neben dem Fenster.","der hund schläft neben dem Fenster.","Der Hund schläft neben Dem Fenster."],"„Hund“ und „Fenster“ sind Nomen."],
          ["Welche Schreibweise ist richtig?","Wir treffen uns am Freitag.",["Wir treffen uns am freitag.","wir treffen uns am Freitag.","Wir Treffen uns am Freitag.","Wir treffen Uns am Freitag.","wir Treffen uns am freitag.","Wir treffen uns Am Freitag."],"Wochentage sind Nomen und werden großgeschrieben."],
          ["Welcher Satz ist richtig geschrieben?","Im Garten wachsen viele Blumen.",["im Garten wachsen viele Blumen.","Im garten wachsen viele Blumen.","Im Garten wachsen viele blumen.","Im Garten Wachsen viele Blumen.","Im garten wachsen viele Blumen.","im garten wachsen viele Blumen."],"„Garten“ und „Blumen“ sind Nomen."],
          ["Welcher Satz ist richtig geschrieben?","Meine Schwester liest eine spannende Geschichte.",["Meine schwester liest eine spannende Geschichte.","Meine Schwester liest eine spannende geschichte.","meine Schwester liest eine spannende Geschichte.","Meine Schwester Liest eine spannende Geschichte.","Meine Schwester liest eine Spannende Geschichte.","meine schwester liest eine spannende geschichte."],"„Schwester“ und „Geschichte“ werden großgeschrieben."],
          ["Welche Schreibweise ist richtig?","Wir wünschen dir viel Glück.",["Wir wünschen dir viel glück.","wir wünschen dir viel Glück.","Wir Wünschen dir viel Glück.","Wir wünschen Dir viel Glück.","wir Wünschen dir viel glück.","Wir wünschen dir Viel Glück."],"„Glück“ ist ein Nomen."],
          ["Welcher Satz ist richtig?","Nach dem Essen gehen wir spazieren.",["Nach dem essen gehen wir spazieren.","nach dem Essen gehen wir spazieren.","Nach dem Essen gehen wir Spazieren.","Nach Dem Essen gehen wir spazieren.","nach dem essen gehen wir spazieren.","Nach dem Essen Gehen wir spazieren."],"„Essen“ ist hier ein nominalisiertes Verb und wird großgeschrieben."],
          ["Welcher Satz ist richtig?","Das Beste kommt zum Schluss.",["Das beste kommt zum Schluss.","Das Beste kommt zum schluss.","das Beste kommt zum Schluss.","Das Beste Kommt zum Schluss.","Das beste kommt zum Schluß.","das beste kommt zum schluss."],"„Beste“ ist hier als Nomen gebraucht und wird großgeschrieben."],
          ["Welche Schreibweise ist korrekt?","Beim Lesen lerne ich neue Wörter.",["Beim lesen lerne ich neue Wörter.","beim Lesen lerne ich neue Wörter.","Beim Lesen lerne ich neue wörter.","Beim Lesen Lerne ich neue Wörter.","beim lesen lerne ich neue wörter.","Beim lesen lerne ich Neue Wörter."],"„Lesen“ ist nominalisiert und „Wörter“ ist ein Nomen."],
          ["Welcher Satz ist richtig geschrieben?","Etwas Schönes zu erleben macht Spaß.",["Etwas schönes zu erleben macht Spaß.","etwas Schönes zu erleben macht Spaß.","Etwas Schönes zu erleben macht spaß.","Etwas Schönes Zu erleben macht Spaß.","etwas schönes zu erleben macht spaß.","Etwas schönes zu erleben macht Spaß."],"„Schönes“ wird nach „etwas“ nominalisiert und großgeschrieben."]
        ];
        return spellingRows(rows,track,"GROSS- UND KLEINSCHREIBUNG",stage);
      }},
      {title:"Kurze und lange Vokale",focus:"Vokallänge und Doppelkonsonanten",build(track,stage){
        const rows=[
          ["Welche Schreibweise ist richtig?","Sonne",["Sone","Sonnne","Sonne","Sonnee","Sohne","Sonee"],"Der kurze betonte Vokal o wird in „Sonne“ durch nn angezeigt."],
          ["Welche Schreibweise ist richtig?","Mutter",["Muter","Mutter","Mutterr","Muttere","Muutter","Muttar"],"„Mutter“ schreibt man mit Doppel-t."],
          ["Welche Schreibweise ist richtig?","Kissen",["Kisen","Kissen","Kissenn","Kiesenn","Kiesn","Kisenh"],"Der kurze Vokal i wird in „Kissen“ durch ss abgeschlossen."],
          ["Welche Schreibweise ist richtig?","kommen",["komen","komenn","kommen","kohmen","komeen","kommenn"],"Nach dem kurzen o steht in „kommen“ mm."],
          ["Welche Schreibweise ist richtig?","rennen",["renen","rennen","rennnen","rehnnen","renenn","renen"],"„Rennen“ wird mit Doppel-n geschrieben."],
          ["Welche Schreibweise ist richtig?","Hütte",["Hüte","Hütte","Hütteh","Hütee","Hütten","Hüttte"],"Der kurze Vokal ü wird durch tt abgeschlossen."],
          ["Welche Schreibweise ist richtig?","Bett",["Bet","Bett","Beett","Bettte","Bett","Bätt"],"„Bett“ hat einen kurzen Vokal und wird mit tt geschrieben."],
          ["Welche Schreibweise ist richtig?","Wasser",["Waser","Wasser","Wassser","Waßer","Wasserer","Wasser"],"„Wasser“ schreibt man mit ss."],
          ["Welche Schreibweise ist richtig?","Schatten",["Schaten","Schatten","Schattn","Schahatten","Schattteen","Schaten"],"„Schatten“ enthält nach dem kurzen a ein Doppel-t."],
          ["Welche Schreibweise ist richtig?","Koffer",["Kofer","Koffer","Kofffer","Kofferh","Koferr","Koffar"],"„Koffer“ wird mit Doppel-f geschrieben."]
        ];
        return spellingRows(rows,track,"VOKALE UND DOPPELKONSONANTEN",stage);
      }},
      {title:"ie, h, ck und tz",focus:"Häufige Rechtschreibmuster",build(track,stage){
        const rows=[
          ["Welche Schreibweise ist richtig?","spielen",["schpielen","spielen","spihlen","spieln","spiehlen","spilen"],"In „spielen“ schreibt man den langen i-Laut mit ie."],
          ["Welche Schreibweise ist richtig?","Zwiebel",["Zwiebel","Zübel","Zwibel","Zwihbel","Zwiebl","Zwiehbel"],"„Zwiebel“ wird mit ie geschrieben."],
          ["Welche Schreibweise ist richtig?","nehmen",["nemen","nehmen","nehmenn","nehemen","neemen","nemmen"],"Das h in „nehmen“ kennzeichnet einen langen Vokal."],
          ["Welche Schreibweise ist richtig?","Fahrrad",["Farad","Fahrrad","Farrad","Fahrat","Farrat","Fahrraad"],"„Fahrrad“ enthält ein Dehnungs-h und rr."],
          ["Welche Schreibweise ist richtig?","backen",["baken","backen","backken","bahken","bakken","backen"],"Nach kurzem Vokal steht vor k oft ck: „backen“."],
          ["Welche Schreibweise ist richtig?","Katze",["Kaze","Katze","Katzze","Kattze","Katse","Katzte"],"Der kurze Vokal vor dem z wird mit tz angezeigt."],
          ["Welche Schreibweise ist richtig?","Blitz",["Bliz","Blitz","Blittz","Bliez","Blitzs","Blizt"],"„Blitz“ schreibt man mit tz."],
          ["Welche Schreibweise ist richtig?","ziehen",["zihen","ziehen","zieen","ziehn","zihenn","ziehen"],"„Ziehen“ schreibt man mit ie und h."],
          ["Welche Schreibweise ist richtig?","Küche",["Küche","Küsche","Küsche","Kühche","Küchhe","Kuche"],"„Küche“ wird mit ch geschrieben."],
          ["Welche Schreibweise ist richtig?","Platz",["Plaz","Platz","Plattz","Plazt","Platzs","Plaatz"],"„Platz“ endet auf tz."]
        ];
        return spellingRows(rows,track,"SCHREIBMUSTER",stage);
      }},
      {title:"s, ss oder ß?",focus:"S-Laute unterscheiden",build(track,stage){
        const rows=[
          ["Welche Schreibweise ist richtig?","Straße",["Strasse","Straße","Strase","Straßee","Straße","Strahße"],"Nach langem a steht in „Straße“ ß."],
          ["Welche Schreibweise ist richtig?","Wasser",["Waßer","Wasser","Waser","Wassser","Wasser","Wahsser"],"Nach kurzem a schreibt man ss."],
          ["Welche Schreibweise ist richtig?","Fußball",["Fussball","Fußball","Fusball","Fußbal","Fußsball","Fuhßball"],"Nach langem u steht in „Fuß“ ß."],
          ["Welche Schreibweise ist richtig?","müssen",["müßen","müssen","müsen","müssenn","müssen","mühssen"],"Nach kurzem ü steht ss."],
          ["Welche Schreibweise ist richtig?","heißen",["heissen","heißen","heisen","heißenn","heißen","heihßen"],"Nach dem Doppellaut ei steht ß."],
          ["Welche Schreibweise ist richtig?","wissen",["wißen","wissen","wisen","wisssen","wissen","wihssen"],"Nach kurzem i steht ss."],
          ["Welche Schreibweise ist richtig?","groß",["gross","groß","gros","großs","groß","grohs"],"Nach langem o steht ß."],
          ["Welche Schreibweise ist richtig?","lassen",["laßen","lassen","lasen","lasssen","lassen","lahssen"],"Nach kurzem a steht ss."],
          ["Welche Schreibweise ist richtig?","Gruß",["Gruss","Gruß","Grus","Gruuß","Grüß","Gruhs"],"Nach langem u steht ß."],
          ["Welche Schreibweise ist richtig?","Fluss",["Fluß","Fluss","Flus","Flusss","Flüss","Fluhs"],"„Fluss“ wird nach kurzem u mit ss geschrieben."]
        ];
        return spellingRows(rows,track,"S-LAUTE",stage);
      }},
      {title:"Wörter zusammensetzen",focus:"Zusammensetzungen und Nominalisierungen",build(track,stage){
        const rows=[
          ["Wie schreibt man „Regen + Jacke“ richtig?","Regenjacke",["Regen Jacke","Regenjake","Regenjacke","Regen-Jacke","Regenjacke","Regenjacken"],"Zusammengesetzte Nomen schreibt man normalerweise zusammen."],
          ["Welche Schreibweise ist richtig?","Schulhof",["Schul Hof","Schulhoff","Schulhof","Schul-Hof","Schulhoff","Schulhóf"],"„Schulhof“ ist ein zusammengesetztes Nomen."],
          ["Wie schreibt man „Fahrrad + Helm“?","Fahrradhelm",["Fahrrad Helm","Farradhelm","Fahrradhelm","Fahrrad-Helm","Fahrradhelmm","Fahradhelm"],"Das zusammengesetzte Nomen lautet „Fahrradhelm“."],
          ["Welche Form ist richtig?","das Schwimmen",["das schwimmen","Das Schwimmen","das Schwimmen","das Schwim-men","das Schwimen","das Schwimmen"],"Nach dem Artikel „das“ wird das nominalisierte Verb großgeschrieben."],
          ["Welche Schreibweise ist richtig?","Lieblingsbuch",["Lieblings Buch","Lieblingsbuch","Lieblingsbuh","Lieblings-Buch","Lieblingsbuchh","Lieblingbuch"],"„Lieblingsbuch“ wird zusammengeschrieben."],
          ["Welche Form ist richtig?","beim Essen",["beim essen","Beim essen","beim Essen","beim Eßen","beim-essen","beim Esssen"],"Nach „beim“ wird das nominalisierte Verb großgeschrieben."],
          ["Wie schreibt man „Geburtstag + Karte“?","Geburtstagskarte",["Geburtstag Karte","Geburtstags Karte","Geburtstagskarte","Geburtstag-Karte","Geburtstagskartte","Geburtstagskahrte"],"„Geburtstagskarte“ ist ein zusammengesetztes Nomen."],
          ["Welche Schreibweise ist richtig?","das Gute",["das gute","Das Gute","das Gute","das Guute","das Guhte","das Gutes"],"„Gute“ wird hier als Nomen gebraucht."],
          ["Wie schreibt man „Fußball + Spiel“?","Fußballspiel",["Fußball Spiel","Fußbalspiel","Fußballspiel","Fußball-Spiel","Fußballspiehl","Fußballspiel"],"Zusammengesetzte Nomen werden zusammengeschrieben."],
          ["Welche Form ist richtig?","im Dunkeln",["im dunkeln","Im dunkeln","im Dunkeln","im Dunkelnen","im-Dunkeln","im Dunkelln"],"„Dunkeln“ ist hier nominalisiert und wird großgeschrieben."]
        ];
        return spellingRows(rows,track,"WORTBILDUNG",stage);
      }}
    ]
  },
  {
    id:"satzzeichen",title:"Satzzeichen",subtitle:"Punkt, Komma und wörtliche Rede",
    description:"Setze Satzzeichen gezielt ein und erkenne, wie sie den Sinn eines Textes ordnen.",
    icon:"?!",
    lessons:[
      {title:"Wie endet der Satz?",focus:"Aussage, Frage und Ausruf unterscheiden",build(track,stage){
        const rows=[
          ["Welches Satzzeichen passt? „Wo ist mein Heft___“","?",[".","!","?",";",":","…"],"Eine direkte Frage endet mit einem Fragezeichen."],
          ["Welches Satzzeichen passt? „Heute scheint die Sonne___“",".",["?","!",".","; ",":","…"],"Ein Aussagesatz endet normalerweise mit einem Punkt."],
          ["Welches Satzzeichen passt? „Pass auf___“","!",[".","?","!",":",";","…"],"Ein Warnruf kann mit einem Ausrufezeichen enden."],
          ["Welches Satzzeichen passt? „Wann beginnt der Film___“","?",[".","!", "?",":",";","…"],"Eine Frage verlangt ein Fragezeichen."],
          ["Welches Satzzeichen passt, wenn der Satz als begeisterter Ausruf gemeint ist? „Das hast du toll gemacht___“","!",[".","?","!",":",";","…"],"Der Satz soll starke Freude ausdrücken; deshalb passt hier das Ausrufezeichen."],
          ["Welches Satzzeichen passt? „Morgen fahren wir nach Berlin___“",".",["?","!",".",":",";","…"],"Der Satz informiert über etwas und endet mit einem Punkt."],
          ["Welches Satzzeichen passt? „Hast du den Schlüssel gesehen___“","?",[".","!","?",":",";","…"],"Die Satzform ist eine direkte Frage."],
          ["Welches Satzzeichen passt, wenn die Warnung besonders deutlich ausgerufen wird? „Vorsicht, der Boden ist nass___“","!",[".","?","!",":",";","…"],"Die Aufgabe verlangt ausdrücklich einen deutlichen Warnruf; deshalb passt das Ausrufezeichen."],
          ["Welches Satzzeichen passt? „Ich weiß nicht, ob es klappt___“",".",["?","!",".",":",";","…"],"Der ganze Satz ist eine Aussage, keine direkte Frage."],
          ["Welches Satzzeichen passt, wenn die Freude besonders stark ausgedrückt wird? „Wie schön das aussieht___“","!",[".","?","!",":",";","…"],"Der Satz soll starke Freude ausdrücken; deshalb passt hier das Ausrufezeichen."]
        ];
        return qRows(rows,track,"SATZENDE",stage);
      }},
      {title:"Kommas in Aufzählungen",focus:"Gleichrangige Wörter und Satzteile trennen",build(track,stage){
        const rows=[
          ["Welcher Satz ist richtig?","Ich kaufe Äpfel, Birnen und Bananen.",["Ich kaufe Äpfel Birnen und Bananen.","Ich kaufe Äpfel, Birnen, und Bananen.","Ich kaufe Äpfel, Birnen und Bananen.","Ich kaufe, Äpfel Birnen und Bananen.","Ich kaufe Äpfel; Birnen und Bananen.","Ich kaufe Äpfel Birnen, und Bananen."],"Die einzelnen Teile einer Aufzählung werden mit Kommas getrennt. Vor „und“ steht hier kein Komma."],
          ["Welcher Satz ist richtig?","Im Rucksack liegen Hefte, Stifte und ein Buch.",["Im Rucksack liegen Hefte Stifte und ein Buch.","Im Rucksack liegen Hefte, Stifte, und ein Buch.","Im Rucksack liegen Hefte, Stifte und ein Buch.","Im Rucksack liegen, Hefte, Stifte und ein Buch.","Im Rucksack liegen Hefte; Stifte und ein Buch.","Im Rucksack liegen Hefte Stifte, und ein Buch."],"Bei einer einfachen Aufzählung trennt man die Teile durch Kommas."],
          ["Welcher Satz ist richtig?","Wir brauchen Mehl, Eier, Milch und Zucker.",["Wir brauchen Mehl Eier, Milch und Zucker.","Wir brauchen Mehl, Eier, Milch und Zucker.","Wir brauchen Mehl, Eier, Milch, und Zucker.","Wir brauchen, Mehl, Eier, Milch und Zucker.","Wir brauchen Mehl; Eier, Milch und Zucker.","Wir brauchen Mehl Eier Milch und Zucker."],"Die Aufzählung wird zwischen den gleichrangigen Elementen mit Kommas gegliedert."],
          ["Welcher Satz ist richtig?","Der Himmel war grau, windig und kalt.",["Der Himmel war grau windig und kalt.","Der Himmel war grau, windig und kalt.","Der Himmel war grau, windig, und kalt.","Der Himmel, war grau, windig und kalt.","Der Himmel war grau; windig und kalt.","Der Himmel war grau windig, und kalt."],"Die Eigenschaften werden als Aufzählung durch Kommas getrennt."],
          ["Welcher Satz ist richtig?","Mia spielt gern Fußball, Tennis und Volleyball.",["Mia spielt gern Fußball Tennis und Volleyball.","Mia spielt gern Fußball, Tennis und Volleyball.","Mia spielt gern Fußball, Tennis, und Volleyball.","Mia spielt, gern Fußball, Tennis und Volleyball.","Mia spielt gern Fußball; Tennis und Volleyball.","Mia spielt gern Fußball Tennis, und Volleyball."],"Die Sportarten sind gleichrangige Teile einer Aufzählung."],
          ["Welcher Satz ist richtig?","Auf dem Tisch stehen Teller, Gläser und Tassen.",["Auf dem Tisch stehen Teller Gläser und Tassen.","Auf dem Tisch stehen Teller, Gläser und Tassen.","Auf dem Tisch stehen Teller, Gläser, und Tassen.","Auf dem Tisch stehen, Teller, Gläser und Tassen.","Auf dem Tisch stehen Teller; Gläser und Tassen.","Auf dem Tisch stehen Teller Gläser, und Tassen."],"Kommas trennen die aufgezählten Gegenstände."],
          ["Welcher Satz ist richtig?","Der Film war spannend, lustig und überraschend.",["Der Film war spannend lustig und überraschend.","Der Film war spannend, lustig und überraschend.","Der Film war spannend, lustig, und überraschend.","Der Film war spannend; lustig und überraschend.","Der Film, war spannend, lustig und überraschend.","Der Film war spannend lustig, und überraschend."],"Die drei Eigenschaften werden durch Kommas getrennt."],
          ["Welcher Satz ist richtig?","Am Wochenende möchte ich lesen, malen und Rad fahren.",["Am Wochenende möchte ich lesen malen und Rad fahren.","Am Wochenende möchte ich lesen, malen und Rad fahren.","Am Wochenende möchte ich lesen, malen, und Rad fahren.","Am Wochenende, möchte ich lesen, malen und Rad fahren.","Am Wochenende möchte ich lesen; malen und Rad fahren.","Am Wochenende möchte ich lesen malen, und Rad fahren."],"Die Tätigkeiten bilden eine Aufzählung."],
          ["Welcher Satz ist richtig?","Im Zoo sahen wir Elefanten, Giraffen und Pinguine.",["Im Zoo sahen wir Elefanten Giraffen und Pinguine.","Im Zoo sahen wir Elefanten, Giraffen und Pinguine.","Im Zoo sahen wir Elefanten, Giraffen, und Pinguine.","Im Zoo sahen wir, Elefanten, Giraffen und Pinguine.","Im Zoo sahen wir Elefanten; Giraffen und Pinguine.","Im Zoo sahen wir Elefanten Giraffen, und Pinguine."],"Die drei Tiere werden in einer Aufzählung genannt."],
          ["Welcher Satz ist richtig?","Sie packte Brot, Wasser, Obst und eine Jacke ein.",["Sie packte Brot Wasser, Obst und eine Jacke ein.","Sie packte Brot, Wasser, Obst und eine Jacke ein.","Sie packte Brot, Wasser, Obst, und eine Jacke ein.","Sie packte, Brot, Wasser, Obst und eine Jacke ein.","Sie packte Brot; Wasser, Obst und eine Jacke ein.","Sie packte Brot Wasser Obst und eine Jacke ein."],"Kommas trennen die aufgezählten Dinge; vor „und“ steht hier kein Komma."]
        ];
        return spellingRows(rows,track,"AUFZÄHLUNGEN",stage);
      }},
      {title:"Wörtliche Rede",focus:"Anführungszeichen und Begleitsätze",build(track,stage){
        const rows=[
          ["Welche Zeichensetzung ist richtig?","Mia sagt: „Ich bin fertig.“",["Mia sagt: Ich bin fertig.“","Mia sagt: „Ich bin fertig“.","Mia sagt: „Ich bin fertig.“","Mia sagt „Ich bin fertig.“","Mia sagt; „Ich bin fertig.“","Mia sagt: „Ich bin fertig“."],"Vor der wörtlichen Rede steht hier ein Doppelpunkt. Der Punkt steht innerhalb der Anführungszeichen."],
          ["Welche Zeichensetzung ist richtig?","„Kommst du mit?“, fragt Ben.",["„Kommst du mit?“ fragt Ben.","„Kommst du mit?“, fragt Ben.","„Kommst du mit“, fragt Ben?","Kommst du mit?“, fragt Ben.","„Kommst du mit?;“ fragt Ben.","„Kommst du mit?“, fragt Ben."],"Die Frage steht in Anführungszeichen; danach folgt der Begleitsatz mit Komma."],
          ["Welche Zeichensetzung ist richtig?","Lena ruft: „Warte auf mich!“",["Lena ruft „Warte auf mich!“","Lena ruft: „Warte auf mich!“","Lena ruft: „Warte auf mich“!","Lena ruft; „Warte auf mich!“","Lena ruft: Warte auf mich!“","Lena ruft: „Warte auf mich!“"],"Der Doppelpunkt kündigt die wörtliche Rede an; das Ausrufezeichen gehört zum gesprochenen Satz."],
          ["Welche Zeichensetzung ist richtig?","„Das weiß ich nicht“, antwortet Tom.",["„Das weiß ich nicht“ antwortet Tom.","„Das weiß ich nicht“, antwortet Tom.","„Das weiß ich nicht,“ antwortet Tom.","Das weiß ich nicht“, antwortet Tom.","„Das weiß ich nicht“; antwortet Tom.","„Das weiß ich nicht“, antwortet Tom."],"Bei einem nachgestellten Begleitsatz trennt ein Komma die wörtliche Rede vom Begleitsatz."],
          ["Welche Zeichensetzung ist richtig?","„Wir gewinnen das Spiel!“, sagt die Trainerin.",["„Wir gewinnen das Spiel!“, sagt die Trainerin.","„Wir gewinnen das Spiel“, sagt die Trainerin!","Wir gewinnen das Spiel!“, sagt die Trainerin.","„Wir gewinnen das Spiel!“ sagt die Trainerin.","„Wir gewinnen das Spiel!,“ sagt die Trainerin.","„Wir gewinnen das Spiel!“, sagt die Trainerin."],"Das Ausrufezeichen gehört zur wörtlichen Rede; anschließend folgt das Komma."],
          ["Welche Zeichensetzung ist richtig?","Paul fragt: „Wann fährt der Bus?“",["Paul fragt „Wann fährt der Bus?“","Paul fragt: „Wann fährt der Bus?“","Paul fragt: „Wann fährt der Bus“.","Paul fragt; „Wann fährt der Bus?“","Paul fragt: Wann fährt der Bus?“","Paul fragt: „Wann fährt der Bus?“"],"Der Doppelpunkt leitet die wörtliche Rede ein; das Fragezeichen steht innen."],
          ["Welche Zeichensetzung ist richtig?","„Ich komme später“, erklärt Sara.",["„Ich komme später“ erklärt Sara.","„Ich komme später“, erklärt Sara.","„Ich komme später.“ erklärt Sara.","Ich komme später“, erklärt Sara.","„Ich komme später“: erklärt Sara.","„Ich komme später“, erklärt Sara."],"Der Begleitsatz wird durch ein Komma angeschlossen; bei einem Aussagesatz steht hier kein Punkt vor dem Komma."],
          ["Welche Zeichensetzung ist richtig?","Der Lehrer sagt: „Öffnet bitte eure Bücher.“",["Der Lehrer sagt „Öffnet bitte eure Bücher.“","Der Lehrer sagt: „Öffnet bitte eure Bücher.“","Der Lehrer sagt: „Öffnet bitte eure Bücher“.","Der Lehrer sagt; „Öffnet bitte eure Bücher.“","Der Lehrer sagt: Öffnet bitte eure Bücher.“","Der Lehrer sagt: „Öffnet bitte eure Bücher.“"],"Der Doppelpunkt steht vor der wörtlichen Rede."],
          ["Welche Zeichensetzung ist richtig?","„Wirklich?“, wundert sich Amir.",["„Wirklich?“ wundert sich Amir.","„Wirklich?“, wundert sich Amir.","„Wirklich,“ wundert sich Amir?","Wirklich?“, wundert sich Amir.","„Wirklich?;“ wundert sich Amir.","„Wirklich?“, wundert sich Amir."],"Das Fragezeichen schließt die wörtliche Rede; danach folgt das Komma."],
          ["Welche Zeichensetzung ist richtig?","„Das war knapp!“, ruft Lea.",["„Das war knapp!“ ruft Lea.","„Das war knapp!“, ruft Lea.","„Das war knapp“, ruft Lea!","„Das war knapp!,“ ruft Lea.","Das war knapp!“, ruft Lea.","„Das war knapp!“, ruft Lea."],"Das Ausrufezeichen steht innerhalb der Anführungszeichen, danach folgt das Komma."]
        ];
        return spellingRows(rows,track,"WÖRTLICHE REDE",stage);
      }},
      {title:"Kommas bei Nebensätzen",focus:"Haupt- und Nebensatz abgrenzen",build(track,stage){
        const rows=[
          ["Welcher Satz ist richtig?","Ich bleibe zu Hause, weil ich krank bin.",["Ich bleibe zu Hause weil ich krank bin.","Ich bleibe, zu Hause weil ich krank bin.","Ich bleibe zu Hause, weil ich krank bin.","Ich bleibe zu Hause weil, ich krank bin.","Ich, bleibe zu Hause weil ich krank bin.","Ich bleibe zu Hause; weil ich krank bin."],"Der Nebensatz mit „weil“ wird durch ein Komma vom Hauptsatz getrennt."],
          ["Welcher Satz ist richtig?","Wenn es regnet, bleiben wir drinnen.",["Wenn es regnet bleiben wir drinnen.","Wenn es regnet, bleiben wir drinnen.","Wenn, es regnet bleiben wir drinnen.","Wenn es, regnet bleiben wir drinnen.","Wenn es regnet; bleiben wir drinnen.","Wenn es regnet bleiben, wir drinnen."],"Steht der Nebensatz am Anfang, folgt danach ein Komma."],
          ["Welcher Satz ist richtig?","Wir warten, bis der Bus kommt.",["Wir warten bis der Bus kommt.","Wir warten, bis der Bus kommt.","Wir warten bis, der Bus kommt.","Wir, warten bis der Bus kommt.","Wir warten; bis der Bus kommt.","Wir warten bis der Bus, kommt."],"Der mit „bis“ eingeleitete Nebensatz wird mit Komma abgetrennt."],
          ["Welcher Satz ist richtig?","Obwohl sie müde war, las sie weiter.",["Obwohl sie müde war las sie weiter.","Obwohl sie müde war, las sie weiter.","Obwohl, sie müde war las sie weiter.","Obwohl sie, müde war las sie weiter.","Obwohl sie müde war; las sie weiter.","Obwohl sie müde war las, sie weiter."],"Ein vorangestellter Nebensatz wird durch ein Komma abgeschlossen."],
          ["Welcher Satz ist richtig?","Ich glaube, dass du recht hast.",["Ich glaube dass du recht hast.","Ich glaube, dass du recht hast.","Ich, glaube dass du recht hast.","Ich glaube dass, du recht hast.","Ich glaube; dass du recht hast.","Ich glaube, dass du, recht hast."],"Der dass-Satz ist ein Nebensatz und wird durch ein Komma eingeleitet."],
          ["Welcher Satz ist richtig?","Sobald die Schule endet, fahren wir nach Hause.",["Sobald die Schule endet fahren wir nach Hause.","Sobald die Schule endet, fahren wir nach Hause.","Sobald, die Schule endet fahren wir nach Hause.","Sobald die Schule, endet fahren wir nach Hause.","Sobald die Schule endet; fahren wir nach Hause.","Sobald die Schule endet fahren, wir nach Hause."],"Der Nebensatz steht vorne; zwischen ihm und dem Hauptsatz steht ein Komma."],
          ["Welcher Satz ist richtig?","Sie fragte, ob wir morgen Zeit haben.",["Sie fragte ob wir morgen Zeit haben.","Sie fragte, ob wir morgen Zeit haben.","Sie, fragte ob wir morgen Zeit haben.","Sie fragte ob, wir morgen Zeit haben.","Sie fragte; ob wir morgen Zeit haben.","Sie fragte, ob wir, morgen Zeit haben."],"Der ob-Satz ist ein Nebensatz und wird mit Komma abgetrennt."],
          ["Welcher Satz ist richtig?","Bevor wir losgehen, prüfen wir den Weg.",["Bevor wir losgehen prüfen wir den Weg.","Bevor wir losgehen, prüfen wir den Weg.","Bevor, wir losgehen prüfen wir den Weg.","Bevor wir, losgehen prüfen wir den Weg.","Bevor wir losgehen; prüfen wir den Weg.","Bevor wir losgehen prüfen, wir den Weg."],"Der Nebensatz mit „bevor“ wird durch ein Komma abgeschlossen."],
          ["Welcher Satz ist richtig?","Der Junge, der dort spielt, ist mein Bruder.",["Der Junge der dort spielt ist mein Bruder.","Der Junge, der dort spielt, ist mein Bruder.","Der Junge, der dort spielt ist mein Bruder.","Der Junge der dort spielt, ist mein Bruder.","Der Junge; der dort spielt; ist mein Bruder.","Der Junge, der dort spielt ist, mein Bruder."],"Ein eingeschobener Relativsatz wird vorne und hinten durch Kommas abgegrenzt."],
          ["Welcher Satz ist richtig?","Wir wissen nicht, warum der Zug Verspätung hat.",["Wir wissen nicht warum der Zug Verspätung hat.","Wir wissen nicht, warum der Zug Verspätung hat.","Wir wissen, nicht warum der Zug Verspätung hat.","Wir wissen nicht warum, der Zug Verspätung hat.","Wir wissen nicht; warum der Zug Verspätung hat.","Wir wissen nicht, warum der Zug, Verspätung hat."],"Der warum-Satz ist ein Nebensatz und wird mit Komma angeschlossen."]
        ];
        return spellingRows(rows,track,"KOMMAS BEI NEBENSÄTZEN",stage);
      }},
      {title:"Zeichensetzung im Mix",focus:"Mehrere Satzzeichen sicher kombinieren",build(track,stage){
        const rows=[
          ["Welche Zeichensetzung stimmt?","Lena fragt: „Kommst du mit, wenn es aufhört zu regnen?“",["Lena fragt „Kommst du mit, wenn es aufhört zu regnen?“","Lena fragt: „Kommst du mit wenn es aufhört zu regnen?“","Lena fragt: „Kommst du mit, wenn es aufhört zu regnen?“","Lena fragt: „Kommst du mit, wenn es aufhört zu regnen“.","Lena fragt; „Kommst du mit, wenn es aufhört zu regnen?“","Lena fragt: „Kommst du mit, wenn es aufhört zu regnen?“"],"Der Doppelpunkt leitet die wörtliche Rede ein; im Fragesatz steht ein Komma vor dem Nebensatz."],
          ["Welche Zeichensetzung stimmt?","„Ich bleibe hier“, sagt Tom, „bis du zurückkommst.“",["„Ich bleibe hier“ sagt Tom „bis du zurückkommst.“","„Ich bleibe hier“, sagt Tom, „bis du zurückkommst.“","„Ich bleibe hier“, sagt Tom „bis du zurückkommst.“","„Ich bleibe hier;“ sagt Tom, „bis du zurückkommst.“","„Ich bleibe hier“, sagt Tom „bis du zurückkommst.“","„Ich bleibe hier“, sagt Tom, „bis du zurückkommst.“"],"Der Begleitsatz wird mit Kommas eingeschoben; der Nebensatz wird ebenfalls durch ein Komma abgetrennt."],
          ["Welche Zeichensetzung stimmt?","Wenn du fertig bist, leg bitte Stift, Heft und Buch weg.",["Wenn du fertig bist leg bitte Stift, Heft und Buch weg.","Wenn du fertig bist, leg bitte Stift, Heft und Buch weg.","Wenn, du fertig bist leg bitte Stift, Heft und Buch weg.","Wenn du fertig bist; leg bitte Stift, Heft und Buch weg.","Wenn du fertig bist, leg bitte Stift Heft und Buch weg.","Wenn du fertig bist, leg bitte Stift, Heft und Buch weg."],"Der Nebensatz wird durch ein Komma abgetrennt; die Gegenstände bilden eine Aufzählung."],
          ["Welche Zeichensetzung stimmt?","„Achtung!“, ruft Mia, „der Ball kommt zurück!“",["„Achtung!“ ruft Mia „der Ball kommt zurück!“","„Achtung!“, ruft Mia, „der Ball kommt zurück!“","„Achtung“, ruft Mia! „Der Ball kommt zurück!“","„Achtung!,“ ruft Mia, „der Ball kommt zurück!“","„Achtung!“, ruft Mia „der Ball kommt zurück!“","„Achtung!“, ruft Mia, „der Ball kommt zurück!“"],"Die wörtliche Rede wird durch den Begleitsatz unterbrochen; die Kommas grenzen ihn ab."],
          ["Welche Zeichensetzung stimmt?","Ich weiß, dass du kommst, und freue mich darauf.",["Ich weiß dass du kommst und freue mich darauf.","Ich weiß, dass du kommst, und freue mich darauf.","Ich weiß, dass du kommst und, freue mich darauf.","Ich weiß; dass du kommst, und freue mich darauf.","Ich weiß dass, du kommst und freue mich darauf.","Ich weiß, dass du kommst, und freue mich darauf."],"Der dass-Nebensatz wird durch ein Komma abgetrennt."],
          ["Welche Zeichensetzung stimmt?","Mara packte Brot, Obst und Wasser ein, bevor sie losfuhr.",["Mara packte Brot Obst und Wasser ein bevor sie losfuhr.","Mara packte Brot, Obst und Wasser ein, bevor sie losfuhr.","Mara packte Brot, Obst, und Wasser ein bevor sie losfuhr.","Mara packte Brot, Obst und Wasser ein bevor, sie losfuhr.","Mara packte Brot; Obst und Wasser ein, bevor sie losfuhr.","Mara packte Brot, Obst und Wasser ein, bevor sie losfuhr."],"Die Aufzählung und der vorangestellte Nebensatz werden mit Kommas gegliedert."],
          ["Welche Zeichensetzung stimmt?","Der Hund, der laut bellte, lief zum Tor.",["Der Hund der laut bellte lief zum Tor.","Der Hund, der laut bellte, lief zum Tor.","Der Hund, der laut bellte lief zum Tor.","Der Hund der laut bellte, lief zum Tor.","Der Hund; der laut bellte; lief zum Tor.","Der Hund, der laut bellte, lief zum Tor."],"Der eingeschobene Relativsatz braucht ein Komma am Anfang und am Ende."],
          ["Welche Zeichensetzung stimmt?","„Warum“, fragt Ben, „steht hier ein Komma?“",["„Warum“ fragt Ben „steht hier ein Komma?“","„Warum“, fragt Ben, „steht hier ein Komma?“","„Warum?“, fragt Ben „steht hier ein Komma?“","„Warum,“ fragt Ben, „steht hier ein Komma?“","„Warum“, fragt Ben „steht hier ein Komma?“","„Warum“, fragt Ben, „steht hier ein Komma?“"],"Der Begleitsatz ist eingeschoben und wird durch Kommas abgegrenzt."],
          ["Welche Zeichensetzung stimmt?","Sie nahm eine Jacke mit, obwohl die Sonne schien.",["Sie nahm eine Jacke mit obwohl die Sonne schien.","Sie nahm eine Jacke mit, obwohl die Sonne schien.","Sie nahm eine Jacke, mit obwohl die Sonne schien.","Sie nahm eine Jacke mit; obwohl die Sonne schien.","Sie nahm, eine Jacke mit obwohl die Sonne schien.","Sie nahm eine Jacke mit, obwohl die Sonne schien."],"Der obwohl-Nebensatz wird durch ein Komma vom Hauptsatz getrennt."],
          ["Welche Zeichensetzung stimmt?","„Wir treffen uns um drei“, sagte Lea, „wenn der Bus pünktlich ist.“",["„Wir treffen uns um drei“ sagte Lea „wenn der Bus pünktlich ist.“","„Wir treffen uns um drei“, sagte Lea, „wenn der Bus pünktlich ist.“","„Wir treffen uns um drei“, sagte Lea „wenn der Bus pünktlich ist.“","„Wir treffen uns um drei;“ sagte Lea, „wenn der Bus pünktlich ist.“","„Wir treffen uns um drei“, sagte Lea „wenn der Bus pünktlich ist.“","„Wir treffen uns um drei“, sagte Lea, „wenn der Bus pünktlich ist.“"],"Der eingeschobene Begleitsatz und der Nebensatz werden mit Kommas abgegrenzt."]
        ];
        return spellingRows(rows,track,"ZEICHENSETZUNG IM MIX",stage);
      }}
    ]
  },
  {
    id:"grammatik",title:"Grammatik",subtitle:"Artikel, Fälle und Satzglieder",
    description:"Untersuche, wie Artikel, Pronomen, Verben und Satzglieder zusammenpassen.",
    icon:"§",
    lessons:[
      {title:"Artikel und Nomen",focus:"Genus und Numerus bestimmen",build(track,stage){
        const rows=[
          ["Welcher Artikel passt? „___ Sonne scheint.“","Die",["Der","Das","Dem","Den","Des"],"„Sonne“ ist feminin: die Sonne."],
          ["Welcher Artikel passt? „___ Kind spielt.“","Das",["Der","Die","Dem","Den","Des"],"„Kind“ ist neutral: das Kind."],
          ["Welcher Artikel passt? „___ Lehrer erklärt die Aufgabe.“","Der",["Die","Das","Dem","Den","Des"],"„Lehrer“ ist maskulin: der Lehrer."],
          ["Welcher Artikel passt? „___ Bücher liegen auf dem Tisch.“","Die",["Der","Das","Den","Dem","Des"],"Der Plural von „das Buch“ lautet „die Bücher“."],
          ["Welcher Artikel passt? „___ Mädchen lacht.“","Das",["Der","Die","Dem","Den","Des"],"Auch „Mädchen“ ist grammatisch neutral."],
          ["Welcher Artikel passt? „___ Tür ist offen.“","Die",["Der","Das","Den","Dem","Des"],"„Tür“ ist feminin: die Tür."],
          ["Welcher Artikel passt? „___ Ergebnis überrascht uns.“","Das",["Der","Die","Den","Dem","Des"],"„Ergebnis“ endet auf -nis und ist neutral: das Ergebnis."],
          ["Welcher Artikel passt? „___ Geduld hilft oft.“","Die",["Der","Das","Den","Dem","Des"],"„Geduld“ ist feminin: die Geduld."],
          ["Welcher Artikel passt? „___ Stern leuchtet.“","Der",["Die","Das","Den","Dem","Des"],"„Stern“ ist maskulin: der Stern."],
          ["Welcher Artikel passt? „___ Freundinnen kommen später.“","Die",["Der","Das","Den","Dem","Des"],"Bei Nomen im Plural steht im Nominativ „die“."]
        ];
        return qRows(rows,track,"ARTIKEL",stage);
      }},
      {title:"Nominativ und Akkusativ",focus:"Wer handelt und wen betrifft es?",build(track,stage){
        const rows=[
          ["Welcher Satz enthält den richtigen Akkusativ?","Ich sehe den Hund.",["Ich sehe der Hund.","Ich sehe dem Hund.","Ich sehe den Hund.","Ich sehe des Hundes.","Ich sehe ein Hund.","Ich sehe die Hund."],"Das Verb „sehen“ verlangt hier den Akkusativ: wen sehe ich? den Hund."],
          ["Ergänze: „Mara besucht ___ Onkel.“","ihren",["ihr","ihrem","ihren","ihres","ihre","ihn"],"„Besuchen“ verlangt den Akkusativ: ihren Onkel."],
          ["Ergänze: „Wir kaufen ___ Ball.“","einen",["ein","einem","einen","eines","der","den"],"„Ball“ ist maskulin; im Akkusativ heißt es „einen Ball“."],
          ["Ergänze: „Der Lehrer lobt ___ Schülerin.“","die",["der","das","die","den","dem","des"],"„Schülerin“ ist feminin; der Artikel bleibt im Akkusativ „die“."],
          ["Welches Wort ist das Subjekt? „Den Kuchen backt heute mein Vater.“","mein Vater",["Den Kuchen","heute","mein Vater","backt","Kuchen","heute mein Vater"],"Wer backt den Kuchen? Mein Vater. Das Subjekt steht im Nominativ."],
          ["Welches Satzglied ist das Objekt? „Lina liest einen spannenden Roman.“","einen spannenden Roman",["Lina","liest","einen spannenden Roman","spannenden","Roman","Lina liest"],"Was liest Lina? Einen spannenden Roman. Das ist das Akkusativobjekt."],
          ["Ergänze: „Der Hund sucht ___ Ball.“","den",["der","dem","den","des","die","das"],"„Ball“ ist maskulin und steht nach „suchen“ im Akkusativ: den Ball."],
          ["Ergänze: „Ich höre ___ Musik.“","die",["der","das","die","den","dem","des"],"„Musik“ ist feminin; im Akkusativ steht „die Musik“."],
          ["Welche Frage hilft beim Finden des Akkusativobjekts?","Wen oder was?",["Wer oder was?","Wem?","Wen oder was?","Wessen?","Wo?","Wann?"],"Das Akkusativobjekt beantwortet die Frage „Wen oder was?“."],
          ["Welches Wort steht im Nominativ? „Dem Kind schenkt die Tante ein Buch.“","die Tante",["Dem Kind","ein Buch","die Tante","schenkt","Kind","Buch"],"Wer schenkt? Die Tante. Sie ist das Subjekt im Nominativ."]
        ];
        return qRows(rows,track,"NOMINATIV UND AKKUSATIV",stage);
      }},
      {title:"Der Dativ",focus:"Dativformen und passende Präpositionen",build(track,stage){
        const rows=[
          ["Ergänze: „Ich helfe ___ Nachbarin.“","der",["die","den","der","das","des","dem"],"„Helfen“ steht mit Dativ: der Nachbarin."],
          ["Ergänze: „Das Geschenk gehört ___ Kind.“","dem",["das","den","dem","der","des","die"],"„Gehören“ verlangt den Dativ: dem Kind."],
          ["Welche Form passt? „Wir sprechen mit ___ Lehrer.“","dem",["der","den","dem","des","die","das"],"Nach „mit“ steht der Dativ: mit dem Lehrer."],
          ["Welche Form passt? „Sie fährt mit ___ Freunden.“","den",["die","der","den","dem","des","das"],"Im Dativ Plural heißt es „mit den Freunden“; oft kommt ein -n hinzu."],
          ["Ergänze: „Ich danke ___ Trainer.“","dem",["den","der","dem","des","die","das"],"„Danken“ verlangt den Dativ: dem Trainer."],
          ["Welche Frage passt zum Dativobjekt?","Wem?",["Wer?","Wen?","Wem?","Wessen?","Wo?","Wann?"],"Das Dativobjekt beantwortet die Frage „Wem?“."],
          ["Ergänze: „Der Ball gehört ___ Mädchen.“","dem",["das","den","dem","der","des","die"],"„Gehören“ steht mit Dativ; „Mädchen“ ist neutral: dem Mädchen."],
          ["Ergänze: „Die Lehrerin erklärt ___ Kindern die Regel.“","den",["die","der","den","dem","des","das"],"Im Dativ Plural steht „den Kindern“."],
          ["Welche Form passt? „Neben ___ Haus steht ein Baum.“","dem",["das","den","dem","des","die","der"],"Bei einer Ortsangabe auf die Frage „Wo?“ steht hier der Dativ: neben dem Haus."],
          ["Ergänze: „Er gibt ___ Freundin das Heft.“","der",["die","den","der","dem","des","das"],"Wem gibt er das Heft? Der Freundin. Das ist der Dativ."]
        ];
        return qRows(rows,track,"DATIV",stage);
      }},
      {title:"Pronomen und Verbformen",focus:"Bezüge und Personalformen erkennen",build(track,stage){
        const rows=[
          ["Welches Pronomen ersetzt „Mia“? „Mia liest. ___ liest leise.“","Sie",["Er","Es","Sie","Ihr","Ihnen","Wir"],"„Mia“ ist eine weibliche Person; das passende Personalpronomen ist „sie“."],
          ["Welches Pronomen passt? „Der Hund wedelt mit ___ Schwanz.“","seinem",["seine","seinem","seinen","ihr","ihrem","ihren"],"„Schwanz“ steht hier im Dativ; zu „der Hund“ passt „seinem“."],
          ["Welches Pronomen ersetzt „das Buch“?","es",["er","sie","es","ihn","ihm","ihr"],"„Das Buch“ ist neutral; das passende Pronomen lautet „es“."],
          ["Welche Verbform passt? „Ihr ___ sehr aufmerksam.“","seid",["bist","ist","seid","sind","war","sein"],"Zu „ihr“ gehört die Verbform „seid“."],
          ["Welche Verbform passt? „Meine Freunde ___ im Hof.“","spielen",["spielt","spiele","spielen","spielst","spielte","gespielt"],"„Meine Freunde“ steht im Plural; deshalb heißt es „spielen“."],
          ["Welches Pronomen passt? „Ich gebe ___ den Schlüssel.“ (zu Tom)","ihm",["ihn","ihm","er","sie","es","sein"],"Wem gebe ich den Schlüssel? Ihm. Hier steht der Dativ."],
          ["Welches Pronomen passt? „Ich sehe ___ im Park.“ (Mara)","sie",["ihr","sie","ihm","er","es","sein"],"Wen sehe ich? Sie. Das Pronomen steht im Akkusativ."],
          ["Welche Verbform passt? „Du und ich ___ ein Team.“","sind",["bin","bist","ist","sind","seid","war"],"„Du und ich“ entspricht „wir“; deshalb heißt es „sind“."],
          ["Worauf bezieht sich „sie“? „Lena nimmt die Hefte. Danach legt sie sie in die Tasche.“","auf die Hefte",["auf Lena","auf die Hefte","auf die Tasche","auf den Tisch","auf die Schule","auf den Ranzen"],"Das zweite „sie“ ersetzt „die Hefte“."],
          ["Welche Form passt? „Jeder von euch ___ eine eigene Aufgabe.“","hat",["haben","hast","hat","habt","hatte","hattet"],"„Jeder“ steht grammatisch in der Einzahl: jeder hat."]
        ];
        return qRows(rows,track,"PRONOMEN UND VERBEN",stage);
      }},
      {title:"Grammatik im Zusammenhang",focus:"Fälle, Satzglieder und Bezüge kombinieren",build(track,stage){
        const rows=[
          ["Bestimme das Subjekt: „Morgen bringt der Vater die Kinder zur Schule.“","der Vater",["Morgen","die Kinder","der Vater","zur Schule","bringt","die Schule"],"Wer bringt die Kinder? Der Vater ist das Subjekt im Nominativ."],
          ["Bestimme das Akkusativobjekt: „Die Klasse besucht das Museum.“","das Museum",["Die Klasse","besucht","das Museum","die","Museum","die Klasse besucht"],"Was besucht die Klasse? Das Museum."],
          ["Bestimme das Dativobjekt: „Die Mutter schenkt dem Kind ein Buch.“","dem Kind",["Die Mutter","ein Buch","dem Kind","schenkt","Buch","die Mutter"],"Wem schenkt die Mutter ein Buch? Dem Kind."],
          ["Welche Form ist richtig? „Wegen ___ Regens blieb das Spiel aus.“","des",["der","dem","des","den","die","das"],"„Wegen“ wird in der Standardsprache häufig mit Genitiv verwendet: wegen des Regens."],
          ["Welche Aussage stimmt? „Der Hund folgt dem Jungen.“","„dem Jungen“ steht im Dativ.",["„Der Hund“ ist das Akkusativobjekt.","„dem Jungen“ steht im Dativ.","„folgt“ ist ein Adjektiv.","„dem Jungen“ steht im Nominativ.","„Der Hund“ ist das Prädikat.","Der Satz hat kein Verb."],"„Folgen“ verlangt den Dativ: Wem folgt der Hund? Dem Jungen."],
          ["Welches Pronomen passt? „Die Kinder nehmen ___ Jacken mit.“","ihre",["ihr","ihre","ihren","ihrem","ihres","ihn"],"„Jacken“ ist feminin Plural; das Possessivpronomen lautet „ihre“."],
          ["Welcher Satz enthält ein korrektes Subjekt und Prädikat?","Nach dem Unterricht fährt Lea nach Hause.",["Nach dem Unterricht fährt Lea nach Hause.","Nach dem Unterricht Lea nach Hause fährt.","Lea nach Hause nach dem Unterricht fahren.","Nach dem Unterricht fahren Lea nach Hause.","Lea nach Hause fährt nach dem Unterricht.","Nach dem Unterricht fährt nach Hause Lea."],"„Lea“ ist das Subjekt und „fährt“ das Prädikat; das Verb ist richtig gebeugt."],
          ["Welche Frage passt zum Genitiv?","Wessen?",["Wer?","Wen?","Wem?","Wessen?","Wohin?","Womit?"],"Der Genitiv beantwortet die Frage „Wessen?“."],
          ["Welche Form passt? „Das ist das Fahrrad ___ Bruders.“","meines",["mein","meinen","meinem","meines","meiner","meins"],"„Bruders“ steht im Genitiv; das Possessivpronomen lautet „meines“."],
          ["Welches Satzglied ist „am Nachmittag“? „Am Nachmittag trainiert die Mannschaft.“","Temporalangabe",["Subjekt","Prädikat","Akkusativobjekt","Temporalangabe","Dativobjekt","Genitivattribut"],"„Am Nachmittag“ beantwortet die Frage „Wann?“ und ist eine Zeitangabe."]
        ];
        return qRows(rows,track,"GRAMMATIK IM ZUSAMMENHANG",stage);
      }}
    ]
  },
  {
    id:"satzbau",title:"Satzbau",subtitle:"Satzglieder, Satzstellung und Nebensätze",
    description:"Ordne Satzteile, verändere Satzanfänge und baue klare Haupt- und Nebensätze.",
    icon:"↗",
    lessons:[
      {title:"Subjekt und Prädikat",focus:"Wer handelt und was geschieht?",build(track,stage){
        const rows=[
          ["Welcher Satz hat ein korrektes Prädikat?","Die Kinder spielen im Garten.",["Die Kinder spielen im Garten.","Die Kinder im Garten spielen.","Die Kinder gespielt im Garten.","Die Kinder Spiel im Garten.","Die Kinder ist im Garten.","Die Kinder spielen Garten im."],"„Spielen“ ist das Prädikat und steht passend zum Subjekt „die Kinder“."],
          ["Wer ist das Subjekt? „Der kleine Vogel singt laut.“","Der kleine Vogel",["singt laut","Der kleine Vogel","laut","der kleine","Vogel singt","Der"],"Wer singt? Der kleine Vogel."],
          ["Was ist das Prädikat? „Am Morgen öffnet die Bäckerin den Laden.“","öffnet",["Am Morgen","die Bäckerin","öffnet","den Laden","Morgen","Laden"],"Das Prädikat sagt, was geschieht: „öffnet“."],
          ["Welcher Satz ist richtig?","Meine Schwester liest ein Buch.",["Meine Schwester liest ein Buch.","Meine Schwester lesen ein Buch.","Meine Schwester ein Buch liest.","Meine Schwester liest Buch ein.","Meine Schwester lest ein Buch.","Meine Schwester gelesen ein Buch."],"Das Subjekt „meine Schwester“ verlangt die Verbform „liest“."],
          ["Wer ist das Subjekt? „Nach dem Essen räumten die Kinder auf.“","die Kinder",["Nach dem Essen","aufräumen","die Kinder","das Essen","auf","räumten"],"Wer räumte auf? Die Kinder."],
          ["Was ist das Prädikat? „Der Bus kommt heute später an.“","kommt ... an",["Der Bus","heute","später","kommt ... an","heute später","Bus"],"Das trennbare Verb „ankommen“ bildet das Prädikat: kommt ... an."],
          ["Welcher Satz enthält ein vollständiges Prädikat?","Die Katze ist auf das Dach geklettert.",["Die Katze auf das Dach.","Die Katze ist auf das Dach geklettert.","Die Katze auf das Dach geklettert.","Die Katze geklettert auf das Dach.","Die Katze klettert auf das Dach gewesen.","Die Katze ist das Dach."],"Das Prädikat ist hier mehrteilig: „ist geklettert“."],
          ["Welcher Satz ist richtig?","Heute trainiert die Mannschaft in der Halle.",["Heute die Mannschaft trainiert in der Halle.","Heute trainiert die Mannschaft in der Halle.","Heute trainieren die Mannschaft in der Halle.","Heute trainiert in der Halle die Mannschaften.","Heute trainiert die Mannschaft in der Halle.","Heute trainiert Mannschaft die in Halle."],"Das finite Verb „trainiert“ steht an zweiter Stelle."],
          ["Was ist das Subjekt? „Dem Jungen gefällt das neue Spiel.“","das neue Spiel",["Dem Jungen","gefällt","das neue Spiel","neue","Spiel","Jungen"],"Was gefällt dem Jungen? Das neue Spiel ist das Subjekt."],
          ["Was ist das Prädikat? „Die Gäste haben lange gewartet.“","haben gewartet",["Die Gäste","lange","haben gewartet","gewartet","Gäste","lange gewartet"],"Das Prädikat besteht aus „haben“ und „gewartet“."]
        ];
        return qRows(rows,track,"SUBJEKT UND PRÄDIKAT",stage);
      }},
      {title:"Das Verb an zweiter Stelle",focus:"Aussagesätze richtig ordnen",build(track,stage){
        const rows=[
          ["Welcher Aussagesatz hat die richtige Wortstellung?","Am frühen Morgen kontrolliert Sara ihren Stundenplan.",["Am frühen Morgen Sara kontrolliert ihren Stundenplan.","Sara ihren Stundenplan kontrolliert am frühen Morgen.","Am frühen Morgen kontrolliert Sara ihren Stundenplan.","Am frühen Morgen kontrolliert ihren Stundenplan Sara.","Kontrolliert am frühen Morgen Sara ihren Stundenplan.","Am frühen Morgen ihren Stundenplan Sara kontrolliert."],"Im Aussagesatz steht das finite Verb an zweiter Stelle."],
          ["Welcher Satz ist richtig?","Nach dem Training fährt Ben mit dem Bus nach Hause.",["Nach dem Training Ben fährt mit dem Bus nach Hause.","Nach dem Training fährt Ben mit dem Bus nach Hause.","Nach dem Training mit dem Bus fährt Ben nach Hause.","Nach dem Training fährt mit dem Bus Ben nach Hause.","Ben mit dem Bus nach Hause fährt nach dem Training.","Nach dem Training nach Hause Ben fährt."],"Nach der Zeitangabe steht das finite Verb „fährt“ an zweiter Stelle."],
          ["Welcher Satz ist richtig?","Im Sommer besuchen wir unsere Großeltern.",["Im Sommer wir besuchen unsere Großeltern.","Im Sommer besuchen wir unsere Großeltern.","Im Sommer unsere Großeltern wir besuchen.","Im Sommer besuchen unsere Großeltern wir.","Besuchen im Sommer wir unsere Großeltern.","Im Sommer unsere Großeltern besuchen wir."],"Das Verb „besuchen“ steht an zweiter Stelle."],
          ["Welcher Satz ist richtig?","Plötzlich fiel der Strom im ganzen Haus aus.",["Plötzlich der Strom fiel im ganzen Haus aus.","Plötzlich fiel der Strom im ganzen Haus aus.","Plötzlich im ganzen Haus der Strom fiel aus.","Plötzlich fiel im ganzen Haus aus der Strom.","Der Strom im ganzen Haus aus fiel plötzlich.","Plötzlich im ganzen Haus fiel aus der Strom."],"Das finite Verb „fiel“ steht direkt nach dem Vorfeld."],
          ["Welcher Satz ist richtig?","Mit großer Freude öffnete Lea das Geschenk.",["Mit großer Freude Lea öffnete das Geschenk.","Mit großer Freude öffnete Lea das Geschenk.","Mit großer Freude das Geschenk Lea öffnete.","Mit großer Freude öffnete das Geschenk Lea.","Öffnete mit großer Freude Lea das Geschenk.","Mit großer Freude das Geschenk öffnete Lea."],"Das Verb „öffnete“ steht an zweiter Stelle."],
          ["Welcher Satz ist richtig?","Am Wochenende möchte ich meine Freunde treffen.",["Am Wochenende ich möchte meine Freunde treffen.","Am Wochenende möchte ich meine Freunde treffen.","Am Wochenende meine Freunde ich möchte treffen.","Möchte am Wochenende ich meine Freunde treffen.","Am Wochenende möchte meine Freunde ich treffen.","Am Wochenende meine Freunde treffen ich möchte."],"Das finite Verb „möchte“ steht an zweiter Stelle."],
          ["Welcher Satz ist richtig?","Im Schulhof spielen die Kinder Fangen.",["Im Schulhof die Kinder spielen Fangen.","Im Schulhof spielen die Kinder Fangen.","Im Schulhof Fangen die Kinder spielen.","Spielen im Schulhof die Kinder Fangen.","Im Schulhof spielen Fangen die Kinder.","Im Schulhof die Kinder Fangen spielen."],"Das finite Verb „spielen“ steht an zweiter Stelle."],
          ["Welcher Satz ist richtig?","Wegen des Regens blieb das Spiel im Stadion aus.",["Wegen des Regens das Spiel blieb im Stadion aus.","Wegen des Regens blieb das Spiel im Stadion aus.","Wegen des Regens blieb im Stadion aus das Spiel.","Blieb wegen des Regens das Spiel im Stadion aus.","Wegen des Regens im Stadion das Spiel blieb aus.","Wegen des Regens aus blieb das Spiel im Stadion."],"Das finite Verb „blieb“ steht an zweiter Stelle."],
          ["Welcher Satz ist richtig?","Gestern Abend hat mein Bruder lange gelesen.",["Gestern Abend mein Bruder hat lange gelesen.","Gestern Abend hat mein Bruder lange gelesen.","Gestern Abend lange gelesen hat mein Bruder.","Hat gestern Abend mein Bruder lange gelesen.","Gestern Abend hat lange mein Bruder gelesen.","Gestern Abend mein Bruder lange hat gelesen."],"Das finite Hilfsverb „hat“ steht an zweiter Stelle."],
          ["Welcher Satz ist richtig?","Zum Schluss erklärte die Lehrerin die Lösung.",["Zum Schluss die Lehrerin erklärte die Lösung.","Zum Schluss erklärte die Lehrerin die Lösung.","Zum Schluss die Lösung erklärte die Lehrerin.","Erklärte zum Schluss die Lehrerin die Lösung.","Zum Schluss erklärte die Lösung die Lehrerin.","Zum Schluss die Lehrerin die Lösung erklärte."],"Das finite Verb „erklärte“ steht an zweiter Stelle."]
        ];
        return spellingRows(rows,track,"VERBPOSITION",stage);
      }},
      {title:"Satzglieder verschieben",focus:"Umstellungen und Satzanfänge",build(track,stage){
        const rows=[
          ["Welche Umstellung ist grammatisch richtig?","Morgen fährt Paul mit dem Fahrrad zur Schule.",["Morgen Paul fährt mit dem Fahrrad zur Schule.","Morgen fährt Paul mit dem Fahrrad zur Schule.","Morgen mit dem Fahrrad Paul fährt zur Schule.","Morgen fährt mit dem Fahrrad zur Schule Paul.","Morgen zur Schule Paul mit dem Fahrrad fährt.","Morgen Paul mit dem Fahrrad zur Schule fährt."],"Die Zeitangabe kann vorne stehen; das finite Verb bleibt an zweiter Stelle."],
          ["Welcher Satz beginnt mit einer Ortsangabe und bleibt richtig?","Im Park spielen die Kinder Fußball.",["Im Park die Kinder spielen Fußball.","Im Park spielen die Kinder Fußball.","Im Park Fußball die Kinder spielen.","Im Park spielen Fußball die Kinder.","Spielen im Park die Kinder Fußball.","Im Park die Kinder Fußball spielen."],"Nach der Ortsangabe „Im Park“ folgt das finite Verb."],
          ["Welche Umstellung ist richtig?","Nach dem Essen liest die Familie gemeinsam.",["Nach dem Essen die Familie liest gemeinsam.","Nach dem Essen liest die Familie gemeinsam.","Nach dem Essen gemeinsam die Familie liest.","Liest nach dem Essen die Familie gemeinsam.","Nach dem Essen liest gemeinsam die Familie.","Nach dem Essen die Familie gemeinsam liest."],"Das Verb bleibt an zweiter Stelle, auch wenn ein anderer Satzteil vorne steht."],
          ["Welcher Satz ist grammatisch richtig?","Mit dem Zug reisen wir nach München.",["Mit dem Zug wir reisen nach München.","Mit dem Zug reisen wir nach München.","Mit dem Zug nach München wir reisen.","Mit dem Zug reisen nach München wir.","Reisen mit dem Zug wir nach München.","Mit dem Zug wir nach München reisen."],"Die Präpositionalgruppe steht im Vorfeld; danach folgt das Verb."],
          ["Welche Umstellung ist richtig?","Heute schenkt Lea ihrer Freundin ein Buch.",["Heute Lea schenkt ihrer Freundin ein Buch.","Heute schenkt Lea ihrer Freundin ein Buch.","Heute ihrer Freundin Lea schenkt ein Buch.","Heute ein Buch ihrer Freundin Lea schenkt.","Heute schenkt ihrer Freundin Lea ein Buch.","Heute Lea ihrer Freundin ein Buch schenkt."],"„Heute“ steht im Vorfeld, „schenkt“ an zweiter Stelle."],
          ["Welcher Satz ist richtig?","Auf dem Tisch liegt ein roter Stift.",["Auf dem Tisch ein roter Stift liegt.","Auf dem Tisch liegt ein roter Stift.","Auf dem Tisch liegt ein roter Stift ist.","Auf dem Tisch ein roter Stift liegen.","Liegt auf dem Tisch ein roter Stift.","Auf dem Tisch ein Stift rot liegt."],"Nach der Ortsangabe folgt das finite Verb „liegt“."],
          ["Welche Umstellung ist richtig?","Aus Vorsicht schloss der Hausmeister das Tor.",["Aus Vorsicht der Hausmeister schloss das Tor.","Aus Vorsicht schloss der Hausmeister das Tor.","Aus Vorsicht das Tor der Hausmeister schloss.","Aus Vorsicht schloss das Tor der Hausmeister.","Schloss aus Vorsicht der Hausmeister das Tor.","Aus Vorsicht der Hausmeister das Tor schloss."],"Das Verb „schloss“ steht direkt nach der vorangestellten Angabe."],
          ["Welcher Satz ist richtig?","Mit viel Geduld erklärte der Trainer die Übung.",["Mit viel Geduld der Trainer erklärte die Übung.","Mit viel Geduld erklärte der Trainer die Übung.","Mit viel Geduld die Übung erklärte der Trainer.","Erklärte mit viel Geduld der Trainer die Übung.","Mit viel Geduld erklärte die Übung der Trainer.","Mit viel Geduld der Trainer die Übung erklärte."],"Das finite Verb steht an zweiter Stelle."],
          ["Welche Umstellung ist richtig?","Im letzten Kapitel löst die Hauptfigur das Rätsel.",["Im letzten Kapitel die Hauptfigur löst das Rätsel.","Im letzten Kapitel löst die Hauptfigur das Rätsel.","Im letzten Kapitel das Rätsel die Hauptfigur löst.","Löst im letzten Kapitel die Hauptfigur das Rätsel.","Im letzten Kapitel löst das Rätsel die Hauptfigur.","Im letzten Kapitel die Hauptfigur das Rätsel löst."],"Nach der Zeit-/Ortsangabe steht „löst“ an zweiter Stelle."],
          ["Welcher Satz ist grammatisch richtig?","Vor dem Eingang warteten bereits viele Gäste.",["Vor dem Eingang viele Gäste warteten bereits.","Vor dem Eingang warteten bereits viele Gäste.","Vor dem Eingang bereits viele Gäste warteten.","Warteten vor dem Eingang bereits viele Gäste.","Vor dem Eingang warteten viele Gäste bereits waren.","Vor dem Eingang viele Gäste bereits warteten."],"Das finite Verb „warteten“ steht an zweiter Stelle."]
        ];
        return spellingRows(rows,track,"SATZGLIEDER VERSCHIEBEN",stage);
      }},
      {title:"Hauptsätze verbinden",focus:"Konjunktionen und Satzverbindungen",build(track,stage){
        const rows=[
          ["Welche Verbindung drückt einen Grund aus?","Ich bleibe drinnen, denn es regnet.",["Ich bleibe drinnen, aber es regnet.","Ich bleibe drinnen, denn es regnet.","Ich bleibe drinnen, oder es regnet.","Ich bleibe drinnen, trotzdem es regnet.","Ich bleibe drinnen, sondern es regnet.","Ich bleibe drinnen, während es regnet."],"„Denn“ leitet eine Begründung ein; im Hauptsatz bleibt die normale Wortstellung."],
          ["Welche Verbindung zeigt einen Gegensatz?","Ich bin müde, aber ich mache die Aufgabe fertig.",["Ich bin müde, denn ich mache die Aufgabe fertig.","Ich bin müde, oder ich mache die Aufgabe fertig.","Ich bin müde, aber ich mache die Aufgabe fertig.","Ich bin müde, weil ich mache die Aufgabe fertig.","Ich bin müde, und ich mache die Aufgabe fertig.","Ich bin müde, deshalb ich mache die Aufgabe fertig."],"„Aber“ verbindet zwei gegensätzliche Aussagen."],
          ["Welche Verbindung passt? „Du kannst Tee trinken ___ Wasser nehmen.“","oder",["und","aber","denn","sondern","deshalb","obwohl"],"„Oder“ verbindet zwei Möglichkeiten und bietet eine Auswahl an."],
          ["Welche Verbindung passt für eine Folge?","Es regnete stark, deshalb blieb das Spiel aus.",["obwohl","deshalb","während","bevor","falls","damit"],"„Deshalb“ leitet eine Folge oder Konsequenz ein."],
          ["Welche Verbindung ergänzt den Satz? „Sie lernte viel, ___ bestand sie den Test.“","deshalb",["obwohl","denn","deshalb","während","bevor","falls"],"„Deshalb“ zeigt die Folge des vielen Lernens."],
          ["Welche Konjunktion passt? „Er wollte spielen, ___ musste er zuerst lernen.“","aber",["denn","oder","aber","weil","damit","sobald"],"„Aber“ drückt einen Gegensatz aus."],
          ["Welche Verbindung passt? „Wir beeilen uns, ___ wir den Zug erreichen.“","damit",["obwohl","damit","denn","aber","sondern","während"],"„Damit“ nennt ein Ziel oder einen Zweck."],
          ["Welche Verbindung passt? „Nicht Tom, ___ Lea hat den Schlüssel.“","sondern",["aber","denn","sondern","oder","weil","obwohl"],"„Nicht ..., sondern ...“ stellt eine Korrektur oder einen Gegensatz her."],
          ["Welche Verbindung passt? „Ich packe den Rucksack, ___ du die Flasche füllst.“","während",["deshalb","während","denn","aber","oder","sondern"],"„Während“ beschreibt zwei gleichzeitig ablaufende Handlungen."],
          ["Welche Verbindung passt? „Wir gehen los, ___ alle bereit sind.“","sobald",["obwohl","sobald","denn","sondern","aber","deshalb"],"„Sobald“ zeigt, wann die Handlung beginnt."]
        ];
        return qRows(rows,track,"KONJUNKTIONEN",stage);
      }},
      {title:"Nebensätze bilden",focus:"Einleitewörter, Komma und Verbposition",build(track,stage){
        const rows=[
          ["Welcher Nebensatz ist richtig?","Ich bleibe hier, weil ich noch lernen muss.",["Ich bleibe hier, weil ich muss noch lernen.","Ich bleibe hier weil, ich noch lernen muss.","Ich bleibe hier, weil ich noch lernen muss.","Ich bleibe hier, weil noch lernen ich muss.","Ich bleibe hier; weil ich noch lernen muss.","Ich bleibe hier, weil ich noch muss lernen."],"Im weil-Nebensatz steht das finite Verb am Ende: „muss“."],
          ["Welcher Satz ist richtig?","Wenn der Wecker klingelt, stehe ich auf.",["Wenn der Wecker klingelt stehe ich auf.","Wenn der Wecker klingelt, stehe ich auf.","Wenn, der Wecker klingelt stehe ich auf.","Wenn der Wecker, klingelt stehe ich auf.","Wenn der Wecker klingelt; stehe ich auf.","Wenn der Wecker klingelt stehe, ich auf."],"Der Nebensatz steht vorne und wird durch ein Komma abgeschlossen."],
          ["Welche Wortstellung ist im dass-Satz richtig?","Ich hoffe, dass du morgen Zeit hast.",["Ich hoffe, dass du hast morgen Zeit.","Ich hoffe dass, du morgen Zeit hast.","Ich hoffe, dass du morgen Zeit hast.","Ich hoffe, dass du morgen hast Zeit.","Ich hoffe; dass du morgen Zeit hast.","Ich hoffe, dass morgen du hast Zeit."],"Im dass-Nebensatz steht das finite Verb am Ende: „hast“."],
          ["Welche Wortstellung ist im obwohl-Satz richtig?","Obwohl es kalt ist, spielt Ben draußen.",["Obwohl es ist kalt, spielt Ben draußen.","Obwohl es kalt ist, spielt Ben draußen.","Obwohl, es kalt ist spielt Ben draußen.","Obwohl es kalt, ist spielt Ben draußen.","Obwohl es kalt ist; spielt Ben draußen.","Obwohl es ist kalt spielt Ben draußen."],"Im obwohl-Nebensatz steht „ist“ am Ende."],
          ["Welche Ergänzung ist ein richtiger Nebensatz? „Sie fragte, ob …“","ob der Bus schon angekommen sei",["ob ist der Bus schon angekommen","ob der Bus schon angekommen sei","ob der Bus sei schon angekommen","ob der Bus angekommen schon ist","ob der Bus schon sei angekommen","ob schon angekommen der Bus sei"],"Im ob-Nebensatz steht die finite Verbform am Ende."],
          ["Welche Wortstellung passt? „Wir warten, bis …“","der Zug endlich kommt",["der Zug kommt endlich","kommt der Zug endlich","der Zug endlich kommt","endlich der Zug kommt","der Zug kommen endlich","der Zug ist kommen endlich"],"Im bis-Nebensatz steht das Verb „kommt“ am Ende."],
          ["Welcher Satz ist richtig?","Bevor wir starten, kontrollieren wir die Karten.",["Bevor wir starten kontrollieren wir die Karten.","Bevor wir starten, kontrollieren wir die Karten.","Bevor, wir starten kontrollieren wir die Karten.","Bevor wir, starten kontrollieren wir die Karten.","Bevor wir starten; kontrollieren wir die Karten.","Bevor wir starten kontrollieren, wir die Karten."],"Vor dem Hauptsatz stehender Nebensatz und Hauptsatz werden durch Komma getrennt."],
          ["Welche Wortstellung passt? „Er lächelt, obwohl …“","er den Fehler bemerkt hat",["er hat den Fehler bemerkt","er den Fehler bemerkt hat","hat er den Fehler bemerkt","er den Fehler hat bemerkt","den Fehler er bemerkt hat","er bemerkt den Fehler hat"],"Das finite Verb steht im Nebensatz am Ende."],
          ["Welcher Satz ist richtig?","Ich weiß, warum die Tür offen steht.",["Ich weiß warum die Tür offen steht.","Ich weiß, warum die Tür offen steht.","Ich weiß, warum steht die Tür offen.","Ich weiß warum, die Tür offen steht.","Ich weiß; warum die Tür offen steht.","Ich weiß, warum die Tür steht offen."],"Der warum-Nebensatz hat das Verb am Ende und wird durch Komma abgetrennt."],
          ["Welche Wortstellung ist richtig? „Wir gehen hinein, sobald …“","der Regen aufgehört hat",["der Regen hat aufgehört","hat der Regen aufgehört","der Regen aufgehört hat","der Regen ist aufgehört hat","der Regen hat aufgehören","der Regen aufgehört haben"],"Im sobald-Nebensatz stehen die finiten Verbteile am Ende."]
        ];
        return qRows(rows,track,"NEBENSÄTZE",stage);
      }}
    ]
  },
  {
    id:"lesen",title:"Lesen & Verstehen",subtitle:"Informationen finden, deuten und verbinden",
    description:"Lies kurze Texte genau, unterscheide Fakten von Vermutungen und ziehe passende Schlüsse.",
    icon:"▤",
    lessons:[
      {title:"Informationen finden",focus:"Wichtige Einzelheiten im Text erkennen",build(track,stage){
        const data=[
          ["Mila leiht am Montag ein Buch aus. Sie soll es am Freitag zurückgeben.","Wann muss Mila das Buch zurückgeben?","Am Freitag",["am Montag","am Mittwoch","am Freitag","nächste Woche","am Samstag","am Dienstag"],"Im Text steht ausdrücklich, dass Mila das Buch am Freitag zurückgeben soll."],
          ["Der Bus ändert seine Abfahrt: Statt 8:10 Uhr fährt er heute um 8:25 Uhr.","Wann fährt der Bus heute ab?","Um 8:25 Uhr",["um 8:10 Uhr","um 8:15 Uhr","um 8:25 Uhr","um 8:30 Uhr","um 8:00 Uhr","um 8:50 Uhr"],"Die neue Abfahrtszeit ist 8:25 Uhr."],
          ["Auf dem Sportfest nimmt Jonas am Weitsprung und am Staffellauf teil.","Bei welchen Wettbewerben macht Jonas mit?","Weitsprung und Staffellauf",["Hochsprung und Sprint","Weitsprung und Staffellauf","nur beim Staffellauf","Weitwurf und Fußball","Schwimmen und Lauf","nur beim Weitsprung"],"Der Text nennt genau Weitsprung und Staffellauf."],
          ["Die Bibliothek ist dienstags bis 16 Uhr geöffnet. An den anderen Werktagen schließt sie um 13 Uhr.","Bis wann ist die Bibliothek dienstags geöffnet?","Bis 16 Uhr",["bis 13 Uhr","bis 14 Uhr","bis 15 Uhr","bis 16 Uhr","bis 17 Uhr","bis 18 Uhr"],"Die Öffnungszeit am Dienstag endet um 16 Uhr."],
          ["Nora packt zwei Hefte, einen Füller und ihr Wörterbuch in die Tasche.","Wie viele Hefte packt Nora ein?","Zwei",["eins","zwei","drei","vier","fünf","keines"],"Im Text steht „zwei Hefte“."],
          ["Der Zug nach Stuttgart fährt von Gleis 4. Der Zug nach Ulm fährt von Gleis 7.","Von welchem Gleis fährt der Zug nach Ulm?","Gleis 7",["Gleis 2","Gleis 4","Gleis 5","Gleis 6","Gleis 7","Gleis 8"],"Für Ulm ist Gleis 7 angegeben."],
          ["Luca trainiert montags und donnerstags Fußball. Am Samstag hat er ein Spiel.","An welchen Tagen trainiert Luca?","Montag und Donnerstag",["Dienstag und Freitag","Montag und Samstag","Montag und Donnerstag","Mittwoch und Donnerstag","Donnerstag und Sonntag","nur am Samstag"],"Die beiden Trainingstage sind Montag und Donnerstag."],
          ["Im Rezept stehen 200 Gramm Mehl, zwei Eier und 150 Milliliter Milch.","Wie viel Milch wird benötigt?","150 Milliliter",["100 Milliliter","120 Milliliter","150 Milliliter","200 Milliliter","250 Milliliter","300 Milliliter"],"Die Zutatenliste nennt 150 Milliliter Milch."],
          ["Der Ausflug beginnt um 9 Uhr am Haupteingang. Die Rückkehr ist für 14:30 Uhr geplant.","Wo treffen sich alle?","Am Haupteingang",["am Busbahnhof","am Haupteingang","an der Sporthalle","am Parkplatz","im Klassenzimmer","am Bahnhof"],"Der Treffpunkt ist der Haupteingang."],
          ["Im April sammelte die Klasse 18 Kilogramm Papier, im Mai waren es 24 Kilogramm.","In welchem Monat wurde mehr Papier gesammelt?","Im Mai",["im April","im Mai","in beiden gleich viel","im März","im Juni","das lässt sich nicht erkennen"],"24 Kilogramm im Mai sind mehr als 18 Kilogramm im April."]
        ];
        return readingRows(data,track,"INFORMATIONEN FINDEN",stage);
      }},
      {title:"Abläufe verstehen",focus:"Reihenfolgen und zeitliche Hinweise",build(track,stage){
        const data=[
          ["Zuerst wusch Ben die Äpfel. Danach schnitt er sie klein. Zum Schluss gab er sie in eine Schüssel.","Was machte Ben als Zweites?","Er schnitt die Äpfel klein.",["Er gab sie in eine Schüssel.","Er kaufte die Äpfel.","Er schnitt die Äpfel klein.","Er wusch die Schüssel.","Er aß die Äpfel.","Er kochte Wasser."],"Nach dem Waschen schnitt Ben die Äpfel klein."],
          ["Bevor Mia das Haus verließ, überprüfte sie ihre Tasche. Anschließend ging sie zur Bushaltestelle.","Was tat Mia direkt vor dem Verlassen des Hauses?","Sie überprüfte ihre Tasche.",["Sie stieg in den Bus.","Sie überprüfte ihre Tasche.","Sie ging zur Schule.","Sie rief eine Freundin an.","Sie packte ihre Tasche erst später.","Sie kaufte ein Ticket."],"Die Taschenkontrolle geschah direkt vor dem Verlassen des Hauses."],
          ["Zuerst las die Gruppe die Anleitung. Dann bauten die Kinder das Modell. Am Ende testeten sie es.","Was geschah zuletzt?","Sie testeten das Modell.",["Sie lasen die Anleitung.","Sie bauten das Modell.","Sie testeten das Modell.","Sie kauften Material.","Sie räumten das Zimmer auf.","Sie schrieben die Anleitung."],"Der letzte Schritt war der Test des Modells."],
          ["Der Film begann um 17 Uhr und dauerte 95 Minuten. Danach gingen die Freunde nach Hause.","Wann endete der Film?","Um 18:35 Uhr",["um 18:05 Uhr","um 18:15 Uhr","um 18:25 Uhr","um 18:35 Uhr","um 18:45 Uhr","um 19:05 Uhr"],"95 Minuten nach 17 Uhr ist 18:35 Uhr."],
          ["Nachdem der Regen aufgehört hatte, trocknete Lea die Bank ab. Erst danach setzte sie sich.","Wann setzte sich Lea?","Nachdem sie die Bank abgetrocknet hatte.",["Noch während des Regens.","Bevor sie die Bank abtrocknete.","Nachdem sie die Bank abgetrocknet hatte.","Gleichzeitig mit dem Regen.","Schon vor dem Spaziergang.","Während sie die Bank abtrocknete."],"Sie setzte sich erst nach dem Abtrocknen auf die Bank."],
          ["Der Zug fuhr um 10:12 Uhr los. Die Fahrt dauerte 48 Minuten.","Wann kam der Zug an?","Um 11:00 Uhr",["um 10:48 Uhr","um 10:50 Uhr","um 11:00 Uhr","um 11:10 Uhr","um 11:12 Uhr","um 11:18 Uhr"],"48 Minuten nach 10:12 Uhr ist 11:00 Uhr."],
          ["Zuerst sammelten die Kinder Blätter. Zu Hause sortierten sie diese nach Formen und klebten sie danach in ein Heft.","Was taten die Kinder nach dem Sortieren?","Sie klebten die Blätter in ein Heft.",["Sie sammelten weitere Blätter.","Sie gingen nach Hause.","Sie sortierten nach Farben.","Sie klebten die Blätter in ein Heft.","Sie warfen die Blätter weg.","Sie zeichneten einen Baum."],"Nach dem Sortieren klebten sie die Blätter in ein Heft."],
          ["Der Wettbewerb hat drei Runden. Nach Runde zwei gibt es eine Pause; danach folgt das Finale.","Welche Runde findet nach der Pause statt?","Das Finale",["Runde eins","Runde zwei","eine zusätzliche Vorrunde","das Finale","die Siegerehrung","die Anmeldung"],"Im Text folgt nach der Pause das Finale."],
          ["Als die Glocke läutete, packten die Schülerinnen ihre Sachen. Kurz darauf begann die nächste Unterrichtsstunde.","Was geschah unmittelbar nach dem Klingeln?","Sie packten ihre Sachen.",["Die nächste Stunde endete.","Sie packten ihre Sachen.","Sie gingen nach Hause.","Die Pause begann.","Sie schrieben einen Test.","Die Lehrkraft verließ die Schule."],"Direkt nach dem Klingeln packten sie ihre Sachen."],
          ["Der Kuchen muss 30 Minuten backen und danach 15 Minuten abkühlen.","Wie lange dauert es vom Backbeginn bis zum Ende des Abkühlens?","45 Minuten",["15 Minuten","30 Minuten","35 Minuten","40 Minuten","45 Minuten","50 Minuten"],"30 Minuten Backzeit plus 15 Minuten Abkühlzeit ergeben 45 Minuten."]
        ];
        return readingRows(data,track,"ABFOLGEN ERKENNEN",stage);
      }},
      {title:"Zwischen den Zeilen lesen",focus:"Hinweise verbinden und Schlüsse ziehen",build(track,stage){
        const data=[
          ["Nils zieht eine Regenjacke an und nimmt einen Schirm mit. Auf dem Weg bilden sich Pfützen.","Was lässt sich am besten vermuten?","Es regnet oder hat gerade geregnet.",["Die Sonne scheint sehr stark.","Es regnet oder hat gerade geregnet.","Es ist sehr heiß.","Nils geht schwimmen.","Es schneit seit Stunden.","Der Boden ist staubtrocken."],"Regenjacke, Schirm und Pfützen sind Hinweise auf Regen."],
          ["Im Zimmer ist es dunkel. Auf dem Tisch steht eine halb leere Teetasse, und das Buch liegt offen daneben.","Was könnte passiert sein?","Jemand hat gerade gelesen und eine Pause gemacht.",["Niemand war im Zimmer.","Jemand hat gerade gelesen und eine Pause gemacht.","Das Buch ist neu und ungeöffnet.","Der Tee wurde noch nicht eingeschenkt.","Jemand hat das Zimmer gestrichen.","Das Licht ist kaputt."],"Die offene Buchseite und die Teetasse deuten auf eine Lesepause hin."],
          ["Aylin schaut mehrfach auf die Uhr und wartet am Bahnhof. Sie hält eine Fahrkarte in der Hand.","Worauf wartet Aylin wahrscheinlich?","Auf einen Zug.",["Auf ein Fußballspiel.","Auf einen Zug.","Auf den Unterricht.","Auf ein Taxi zu Hause.","Auf eine Theaterprobe.","Auf das Mittagessen."],"Bahnhof und Fahrkarte sind Hinweise auf eine Zugfahrt."],
          ["Der Hund sitzt vor der Tür und wedelt mit dem Schwanz. Als der Schlüssel im Schloss klingt, springt er auf.","Wie fühlt sich der Hund wahrscheinlich?","Er freut sich, dass jemand kommt.",["Er hat Angst vor dem Schlüssel.","Er freut sich, dass jemand kommt.","Er möchte schlafen.","Er ist hungrig und sucht Futter.","Er ist krank.","Er möchte allein bleiben."],"Das Schwanzwedeln und Aufspringen sprechen für Freude."],
          ["Sofia übt jeden Nachmittag Klavier. Beim Vorspiel spielt sie das Stück ohne Unterbrechung.","Was hat wahrscheinlich zu ihrem Auftritt beigetragen?","Regelmäßiges Üben.",["Zufall allein.","Regelmäßiges Üben.","Eine kürzere Aufgabe.","Ein anderes Instrument.","Dass sie nicht geübt hat.","Dass sie das Stück nicht kennt."],"Das tägliche Üben ist ein plausibler Grund für den sicheren Auftritt."],
          ["Auf dem Pausenhof liegen viele nasse Blätter. Die Kinder gehen vorsichtig und langsam.","Warum gehen die Kinder langsam?","Der Boden könnte rutschig sein.",["Sie haben es besonders eilig.","Der Boden könnte rutschig sein.","Sie wollen ein Wettrennen starten.","Es ist zu dunkel zum Sehen.","Sie tragen schwere Taschen.","Sie warten auf den Bus."],"Nasse Blätter können den Boden rutschig machen."],
          ["Der Laden ist geschlossen. An der Tür hängt ein Schild: „Wir sind heute wegen Inventur nicht erreichbar.“","Warum ist der Laden geschlossen?","Weil die Waren gezählt und überprüft werden.",["Weil alle Waren verkauft sind.","Weil die Waren gezählt und überprüft werden.","Weil ein Feiertag beginnt.","Weil der Laden umzieht.","Weil es draußen regnet.","Weil die Tür repariert wird."],"Eine Inventur ist eine Bestandsaufnahme der Waren."],
          ["Ben hat seine Sportschuhe, eine Trinkflasche und ein Handtuch gepackt. Er verlässt das Haus mit seiner Sporttasche.","Wohin geht Ben wahrscheinlich?","Zum Sport oder Training.",["Zur Bibliothek.","Zum Sport oder Training.","Zum Bäcker.","Zum Musikunterricht.","Zum Arzttermin.","Zum Einkaufen."],"Sportschuhe, Trinkflasche und Handtuch deuten auf Sport hin."],
          ["Die Klasse spricht leise, während die Lehrerin ein Experiment vorbereitet. Alle schauen auf den Tisch.","Was erwarten die Kinder wahrscheinlich?","Dass gleich ein Experiment beginnt.",["Dass die Stunde vorbei ist.","Dass gleich ein Experiment beginnt.","Dass sie nach Hause gehen.","Dass ein Film startet.","Dass sie die Pause machen.","Dass sie Sport treiben."],"Die Vorbereitung am Tisch und die Aufmerksamkeit deuten auf ein bevorstehendes Experiment."],
          ["Jana nimmt einen dicken Schal und Handschuhe mit. Auf dem Wetterbericht wurden niedrige Temperaturen angekündigt.","Wie ist das Wetter wahrscheinlich?","Es ist kalt.",["Es ist sehr heiß.","Es ist kalt.","Es ist windstill und warm.","Es regnet stark bei 25 Grad.","Es ist tropisch.","Es gibt eine Hitzewelle."],"Schal, Handschuhe und niedrige Temperaturen sprechen für kaltes Wetter."]
        ];
        return readingRows(data,track,"SCHLUSSFOLGERUNGEN",stage);
      }},
      {title:"Hauptaussagen erkennen",focus:"Texte zusammenfassen und Absichten verstehen",build(track,stage){
        const data=[
          ["Die Klasse legte einen kleinen Schulgarten an. Die Kinder pflanzten Kräuter, gossen die Beete und beobachteten das Wachstum.","Welche Aussage fasst den Text am besten zusammen?","Die Klasse pflegt gemeinsam einen Schulgarten.",["Die Klasse besucht einen großen Bauernhof.","Die Klasse pflegt gemeinsam einen Schulgarten.","Die Kinder kaufen fertige Kräuter.","Die Schule baut ein neues Gebäude.","Die Klasse untersucht Tiere im Wald.","Die Kinder verzichten auf Pflanzen."],"Alle Tätigkeiten zeigen, dass die Klasse einen Schulgarten anlegt und pflegt."],
          ["Morgens fährt Amir mit dem Rad zur Schule. Dadurch bewegt er sich an der frischen Luft und kommt oft wacher im Unterricht an.","Was ist die Hauptaussage?","Amir nutzt das Fahrrad für seinen Schulweg und profitiert davon.",["Amir fährt nur am Wochenende Rad.","Amir nutzt das Fahrrad für seinen Schulweg und profitiert davon.","Amir fährt mit dem Bus zur Schule.","Amir möchte nicht am Unterricht teilnehmen.","Amir repariert Fahrräder.","Amir wohnt direkt neben der Schule."],"Der Text verbindet Amirs Schulweg mit den positiven Folgen des Radfahrens."],
          ["Ein Verein organisiert jeden Samstag eine Müllsammelaktion am Fluss. Freiwillige bringen Handschuhe mit und trennen den Abfall.","Worum geht es hauptsächlich?","Um gemeinsames Aufräumen am Fluss.",["Um einen Schwimmwettbewerb.","Um gemeinsames Aufräumen am Fluss.","Um den Bau einer Brücke.","Um eine Wanderung in den Bergen.","Um das Fischen am See.","Um den Verkauf von Handschuhen."],"Die Hauptinformation ist die regelmäßige Müllsammelaktion."],
          ["Viele Tiere suchen im Herbst einen geschützten Platz. Einige sammeln Vorräte, andere ziehen in wärmere Gebiete.","Welche Überschrift passt am besten?","Wie Tiere sich auf den Winter vorbereiten",["Tiere im Sommerurlaub","Wie Tiere sich auf den Winter vorbereiten","Die schnellsten Tiere der Welt","Warum Pflanzen Wasser brauchen","Ein Tag im Zoo","Das Leben im Meer"],"Der Text beschreibt verschiedene Vorbereitungen von Tieren auf den Winter."],
          ["Die Schülerin las den Text zweimal. Beim zweiten Lesen markierte sie wichtige Aussagen und schrieb danach eine kurze Zusammenfassung.","Welche Lernstrategie wird beschrieben?","Wichtige Informationen erkennen und zusammenfassen.",["Den Text nur überfliegen.","Wichtige Informationen erkennen und zusammenfassen.","Alle Sätze auswendig lernen.","Nur die Überschrift lesen.","Unbekannte Wörter überspringen.","Den Text ohne Lesen abschreiben."],"Das Markieren und Zusammenfassen hilft, Hauptinformationen zu erkennen."],
          ["Ein neues Radwegstück verbindet zwei Wohngebiete mit der Schule. Die Stadt hofft, dass mehr Kinder sicher mit dem Fahrrad fahren.","Welche Absicht verfolgt die Stadt?","Den Schulweg mit dem Fahrrad sicherer machen.",["Den Autoverkehr vor der Schule erhöhen.","Den Schulweg mit dem Fahrrad sicherer machen.","Die Schule an einen anderen Ort verlegen.","Fahrräder aus dem Wohngebiet entfernen.","Den Busfahrplan abschaffen.","Mehr Parkplätze bauen."],"Der Radweg soll sichere Wege schaffen und das Radfahren fördern."],
          ["Im Theaterstück verlässt eine Figur ihre Heimat, um ein neues Leben zu beginnen. Unterwegs trifft sie Menschen, die ihr helfen.","Welche Aussage passt am besten?","Die Geschichte handelt von einem Neuanfang und Begegnungen.",["Die Geschichte handelt nur von einem Sportturnier.","Die Geschichte handelt von einem Neuanfang und Begegnungen.","Die Figur bleibt die ganze Zeit zu Hause.","Es geht um eine wissenschaftliche Erfindung.","Die Handlung spielt ausschließlich in einer Schule.","Die Figur sucht ein verlorenes Fahrrad."],"Die Handlung dreht sich um Aufbruch und unterstützende Begegnungen."],
          ["Die Schule bietet eine Tauschbörse für Bücher an. Schülerinnen und Schüler können gelesene Bücher mitbringen und andere Bücher mitnehmen.","Was ist das Ziel der Aktion?","Bücher weiterzugeben und neue Lesestoffe zu finden.",["Neue Bücher teuer zu verkaufen.","Bücher weiterzugeben und neue Lesestoffe zu finden.","Alle Bücher aus der Bibliothek zu entfernen.","Nur Schulbücher zu sammeln.","Die Zahl der Hausaufgaben zu erhöhen.","Bücher nach Farben zu sortieren."],"Die Tauschbörse ermöglicht, gelesene Bücher weiterzugeben und andere zu entdecken."],
          ["Ein Bericht erklärt, wie Bienen Blüten besuchen und dabei Pollen übertragen. Dadurch helfen sie vielen Pflanzen bei der Fortpflanzung.","Welche Überschrift passt?","Warum Bienen für Pflanzen wichtig sind",["Warum Bienen nachts schlafen","Warum Bienen für Pflanzen wichtig sind","Wie man Honig einkauft","Welche Farben Blumen haben","Ein Bericht über Schmetterlinge","Wie Pflanzen im Winter aussehen"],"Der Text erklärt die Rolle der Bienen bei der Bestäubung."],
          ["Die Mannschaft verlor das erste Spiel. Sie analysierte ihre Fehler, trainierte gezielt und gewann die nächsten beiden Begegnungen.","Was zeigt der Text besonders?","Aus Fehlern lernen und sich verbessern.",["Dass Training keinen Unterschied macht.","Aus Fehlern lernen und sich verbessern.","Dass die Mannschaft aufgibt.","Dass nur Glück zum Sieg führt.","Dass das erste Spiel unwichtig war.","Dass die Gegner nicht mitspielten."],"Die Mannschaft nutzt die Niederlage, um zu lernen und sich zu verbessern."]
        ];
        return readingRows(data,track,"HAUPTAUSSAGEN",stage);
      }},
      {title:"Informationen kombinieren",focus:"Mehrere Hinweise vergleichen und bewerten",build(track,stage){
        const data=[
          ["Die Ausstellung ist Mo–Fr von 9 bis 17 Uhr geöffnet. Am Samstag öffnet sie von 10 bis 13 Uhr. Ben kann erst nach 15 Uhr kommen.","An welchem Tag kann Ben die Ausstellung besuchen?","An einem Werktag von Montag bis Freitag.",["am Samstag","an einem Werktag von Montag bis Freitag","am Sonntag","nur vor 9 Uhr","nur zwischen 10 und 13 Uhr","an keinem Tag"],"An Werktagen ist die Ausstellung nach 15 Uhr noch geöffnet."],
          ["Bus A fährt um 8:05 Uhr ab, Bus B um 8:20 Uhr. Der Unterricht beginnt um 8:45 Uhr. Die Fahrt dauert 20 Minuten.","Welcher Bus kommt rechtzeitig an?","Beide Busse",["nur Bus A","nur Bus B","beide Busse","keiner der Busse","Bus A nur bei Verspätung","das ist nicht berechenbar"],"Bus A kommt um 8:25 Uhr an, Bus B um 8:40 Uhr. Beide sind vor 8:45 Uhr da."],
          ["Mira hat 12 Euro. Ein Heft kostet 3 Euro, ein Stift 2 Euro und ein Buch 8 Euro. Sie braucht ein Buch und ein Heft.","Wie viel Geld bleibt Mira?","1 Euro",["0 Euro","1 Euro","2 Euro","3 Euro","4 Euro","5 Euro"],"Buch und Heft kosten zusammen 11 Euro. Von 12 Euro bleibt 1 Euro."],
          ["Der Zug nach Ulm fährt von Gleis 2 um 14:10 Uhr. Der Zug nach Tübingen fährt von Gleis 5 um 14:25 Uhr. Lea möchte nach Tübingen.","Wann und von welchem Gleis fährt Lea?","14:25 Uhr von Gleis 5",["14:10 Uhr von Gleis 2","14:25 Uhr von Gleis 5","14:10 Uhr von Gleis 5","14:25 Uhr von Gleis 2","14:35 Uhr von Gleis 5","14:25 Uhr von Gleis 4"],"Ziel Tübingen gehört zur Verbindung um 14:25 Uhr auf Gleis 5."],
          ["Team Rot gewann 3 Spiele und verlor 1. Team Blau gewann 2 Spiele und verlor keines. Ein Sieg zählt 3 Punkte.","Welches Team hat mehr Punkte?","Team Rot",["Team Rot","Team Blau","Beide gleich viele Punkte","Keines der Teams","Das lässt sich nicht berechnen","Team Blau nur bei einem Unentschieden"],"Team Rot hat 9 Punkte; Team Blau 6 Punkte."],
          ["Ein Buch hat 180 Seiten. Am Montag las Nia 45 Seiten, am Dienstag 50 und am Mittwoch 35.","Wie viele Seiten muss Nia noch lesen?","50 Seiten",["35 Seiten","40 Seiten","45 Seiten","50 Seiten","55 Seiten","60 Seiten"],"45 + 50 + 35 = 130 Seiten. 180 − 130 = 50 Seiten."],
          ["Für den Ausflug braucht jede Person ein Ticket für 4 Euro. Es fahren 18 Kinder und 2 Lehrkräfte mit. Im Budget liegen 100 Euro.","Reicht das Budget für alle Tickets?","Ja, genau 80 Euro werden benötigt.",["Nein, es fehlen 20 Euro.","Ja, genau 80 Euro werden benötigt.","Ja, es bleiben 20 Euro übrig.","Nein, es fehlen 10 Euro.","Es werden 100 Euro benötigt.","Das Budget reicht nur für die Kinder."],"20 Personen zahlen je 4 Euro. Das sind 80 Euro und damit weniger als 100 Euro."],
          ["Die Wetterkarte zeigt: Stuttgart 18 °C und Regen, Ulm 21 °C und Sonne, Freiburg 20 °C und Wolken. Die Familie möchte den wärmsten sonnigen Ort besuchen.","Welcher Ort passt?","Ulm",["Stuttgart","Ulm","Freiburg","Alle drei Orte","Keiner der Orte","Freiburg und Stuttgart"],"Ulm ist mit 21 °C am wärmsten und dort ist Sonne angegeben."],
          ["Ein Kurs findet dienstags und donnerstags statt. Die Anmeldung endet am 12. Mai. Der 12. Mai ist ein Montag. Sam möchte sich am Dienstag danach anmelden.","Kann Sam sich noch anmelden?","Nein, die Frist ist bereits abgelaufen.",["Ja, die Anmeldung endet am Dienstag.","Nein, die Frist ist bereits abgelaufen.","Ja, die Anmeldung läuft bis Donnerstag.","Ja, die Frist endet am Monatsende.","Nein, weil der Kurs nur montags stattfindet.","Das steht nicht im Text."],"Am Dienstag nach dem 12. Mai ist die Anmeldefrist schon vorbei."],
          ["Ein Experiment dauert 25 Minuten. Die Gruppe beginnt um 10:35 Uhr. Danach braucht sie 15 Minuten zum Aufräumen. Die nächste Stunde startet um 11:20 Uhr.","Hat die Gruppe genug Zeit?","Ja, sie ist um 11:15 Uhr fertig.",["Nein, sie ist erst um 11:25 Uhr fertig.","Ja, sie ist um 11:15 Uhr fertig.","Nein, das Experiment endet erst um 11:20 Uhr.","Ja, aber ohne Aufräumen.","Nein, es fehlen 15 Minuten.","Ja, sie ist um 11:05 Uhr fertig."],"Das Experiment endet um 11:00 Uhr; mit 15 Minuten Aufräumen ist die Gruppe um 11:15 Uhr fertig."]
        ];
        return readingRows(data,track,"INFORMATIONEN VERKNÜPFEN",stage);
      }}
    ]
  }
];
let selectedTrack=null,playerName="",courseStarted=false;
let units=[],questions=[],currentUnit=null,queue=[],currentIndex=0,score=0,answered=false,wrongAnswers=[],stats={correct:0,total:0};
let completed=new Set();
const totalUnits=35,questionsPerUnit=10,totalQuestions=totalUnits*questionsPerUnit;
const profileScreen=document.getElementById("profile-screen");
const startScreen=document.getElementById("start-screen");
const quizScreen=document.getElementById("quiz-screen");
const resultScreen=document.getElementById("result-screen");
const answerGrid=document.getElementById("answer-grid");
const feedbackPanel=document.getElementById("feedback-panel");
const nextButton=document.getElementById("next-button");
function screen(name){
  profileScreen.hidden=name!=="profile";
  startScreen.hidden=name!=="start";
  quizScreen.hidden=name!=="quiz";
  resultScreen.hidden=name!=="result";
  if(name==="start")renderPath();
  window.scrollTo({top:0,behavior:"smooth"});
}
function completedCount(){return completed.size*questionsPerUnit;}
function nextUnit(){return units.find(u=>!completed.has(u.id))||null;}
function validateUnitQuestions(topic,lesson,questions,track){
  if(questions.length!==questionsPerUnit){
    throw new Error(topic.title+" / "+lesson.title+": erwartet werden 10 Fragen, gefunden "+questions.length);
  }
  questions.forEach((question,index)=>{
    const validChoices=Array.isArray(question.choices)&&question.choices.length===3
      &&new Set(question.choices).size===3
      &&question.choices.every(choice=>typeof choice==="string"&&choice.trim().length>0);
    const validAnswer=Number.isInteger(question.answer)&&question.answer>=0&&question.answer<3;
    if(!validChoices||!validAnswer||!question.prompt?.trim()||!question.explanation?.trim()){
      throw new Error(topic.title+" / "+lesson.title+" / Frage "+(index+1)+": ungültige Frage oder Antwortoptionen.");
    }
    if(question.track!==track||question.choices[question.answer]===undefined){
      throw new Error(topic.title+" / "+lesson.title+" / Frage "+(index+1)+": Kursniveau oder Antwortindex stimmt nicht.");
    }
  });
}
function auditAllTracks(){
  Object.keys(TRACKS).forEach(track=>{
    topics.forEach(topic=>{
      topic.lessons.forEach((lesson,index)=>{
        const questions=ensureUniquePrompts(lesson.build(track,index+1),topic.id);
        validateUnitQuestions(topic,lesson,questions,track);
      });
    });
  });
}
function buildCourse(track){
  selectedTrack=track;units=[];questions=[];
  topics.forEach(topic=>{
    topic.lessons.forEach((lesson,index)=>{
      const stage=index+1;
      const unit={id:topic.id+"-"+stage,topic:topic,lesson:lesson,stage:stage,title:lesson.title,focus:lesson.focus,stageInfo:stageIndex(stage)};
      unit.questions=ensureUniquePrompts(lesson.build(track,stage),topic.id);
      validateUnitQuestions(topic,lesson,unit.questions,track);
      units.push(unit);questions.push(...unit.questions);
    });
  });
  if(units.length!==totalUnits||questions.length!==totalQuestions)throw new Error("Kursumfang stimmt nicht.");
}
function updateHeader(){
  document.getElementById("topbar-player").textContent=playerName;
  document.getElementById("topbar-player").hidden=false;
  document.getElementById("track-chip").textContent=TRACKS[selectedTrack].label.toUpperCase();
  document.getElementById("track-chip").hidden=false;
  document.getElementById("topbar-progress").innerHTML="0 / "+totalQuestions+" <span>FRAGEN</span>";
  document.getElementById("course-player-name").textContent=playerName;
  document.getElementById("course-track-note").textContent=TRACKS[selectedTrack].name+" · Dein Kurs enthält 35 Lektionen mit je 10 Fragen.";
  document.getElementById("course-progress").setAttribute("aria-valuemax",String(totalQuestions));
  document.getElementById("course-progress-count").textContent="0 / "+totalQuestions;
  document.getElementById("course-progress-title").textContent="Dein Kurs beginnt hier";
  document.getElementById("course-progress-note").textContent="Schließe deine erste Lektion ab, um den Lernpfad Schritt für Schritt freizuschalten.";
  document.getElementById("course-chip").innerHTML='<span class="chip-dot"></span> DEUTSCH · KLASSE 5';
}
function beginCourse(){
  const input=document.getElementById("player-name");
  playerName=input.value.trim().replace(/\s+/g," ").slice(0,18);
  if(!playerName||!selectedTrack)return;
  buildCourse(selectedTrack);courseStarted=true;completed=new Set();
  updateHeader();screen("start");
}
function renderPath(){
  if(!courseStarted)return;
  const done=completedCount(),pct=Math.round(done/totalQuestions*100),next=nextUnit();
  const bar=document.getElementById("course-progress");
  bar.setAttribute("aria-valuemax",String(totalQuestions));bar.setAttribute("aria-valuenow",String(done));
  document.getElementById("course-progress-fill").style.width=pct+"%";
  document.getElementById("course-progress-count").textContent=done+" / "+totalQuestions;
  document.getElementById("topbar-progress").innerHTML=done+" / "+totalQuestions+" <span>FRAGEN</span>";
  document.getElementById("course-progress-title").textContent=done===totalQuestions?"Du hast den Kurs geschafft!":done?"Du bist auf deinem Weg!":"Dein Kurs beginnt hier";
  document.getElementById("course-progress-note").textContent=done===totalQuestions
    ?"Alle 350 Fragen abgeschlossen. Du kannst jede Lektion erneut spielen."
    :done?"Noch "+(totalQuestions-done)+" Fragen bis zum Kursabschluss."
    :"Schließe deine erste Lektion ab, um den Lernpfad Schritt für Schritt freizuschalten.";
  const path=document.getElementById("learning-path");path.replaceChildren();
  topics.forEach(topic=>{
    const topicUnits=units.filter(u=>u.topic.id===topic.id);
    const topicDone=topicUnits.filter(u=>completed.has(u.id)).length*questionsPerUnit;
    const topicTotal=topicUnits.length*questionsPerUnit;
    const section=document.createElement("section");section.className="topic-section";section.dataset.topic=topic.id;
    const head=document.createElement("div");head.className="topic-header";
    const icon=document.createElement("div");icon.className="topic-icon";icon.textContent=topic.icon;
    const copy=document.createElement("div");copy.className="topic-copy";
    const title=document.createElement("h3");title.textContent=topic.title;
    const sub=document.createElement("p");sub.textContent=topic.subtitle;copy.append(title,sub);
    const count=document.createElement("span");count.className="topic-count";count.textContent=topicDone+"/"+topicTotal;
    head.append(icon,copy,count);
    const track=document.createElement("div");track.className="topic-progress-track";
    track.setAttribute("role","progressbar");track.setAttribute("aria-label",topic.title+": "+topicDone+" von "+topicTotal);
    track.setAttribute("aria-valuemin","0");track.setAttribute("aria-valuemax",String(topicTotal));track.setAttribute("aria-valuenow",String(topicDone));
    const fill=document.createElement("span");fill.style.width=Math.round(topicDone/topicTotal*100)+"%";track.append(fill);
    const nodes=document.createElement("div");nodes.className="topic-nodes";
    topicUnits.forEach(unit=>{
      const doneUnit=completed.has(unit.id),open=doneUnit||next&&next.id===unit.id;
      const button=document.createElement("button");button.type="button";
      button.className="lesson-node "+(doneUnit?"is-done":open?"is-open":"is-locked");
      button.disabled=!open;
      button.setAttribute("aria-label",topic.title+", "+unit.title+", "+(doneUnit?"abgeschlossen":open?"starten":"gesperrt"));
      const orb=document.createElement("span");orb.className="node-orb";orb.textContent=doneUnit?"✓":open?"▶":String(unit.stage);
      const label=document.createElement("span");label.className="node-label";label.textContent=""+unit.stage+". "+unit.title;
      const meta=document.createElement("span");meta.className="node-meta";meta.textContent="10 Fragen";
      button.append(orb,label,meta);button.addEventListener("click",()=>startUnit(unit));nodes.append(button);
    });
    const description=document.createElement("p");description.className="topic-description";description.textContent=topic.description;
    section.append(head,track,nodes,description);path.append(section);
  });
  document.getElementById("next-icon").textContent=next?next.topic.icon:"✓";
  document.getElementById("next-title").textContent=next?next.topic.title+" · "+next.title:"Alles geschafft!";
  document.getElementById("next-description").textContent=next?next.focus:"Der ganze Lernpfad ist abgeschlossen. Du kannst Lektionen wiederholen.";
  document.getElementById("next-meta").textContent=next?next.stageInfo.tag+" · 10 FRAGEN":"350 / 350 FRAGEN";
  const button=document.getElementById("next-unit-button");button.disabled=!next;
  button.innerHTML=next?'Weiterlernen <span aria-hidden="true">→</span>':'Kurs geschafft <span aria-hidden="true">✓</span>';
}
function prepare(items,unit=null){
  currentUnit=unit;queue=items;currentIndex=0;score=0;answered=false;wrongAnswers=[];stats={correct:0,total:items.length};
  document.getElementById("score-value").textContent="0 Punkte";
  document.getElementById("quiz-topic").textContent=unit?unit.topic.title.toUpperCase(): "FREIES TRAINING";
  screen("quiz");renderQuestion();
}
function startUnit(unit){prepare(shuffle(unit.questions),unit);}
function startFree(){prepare(shuffle(questions),null);}
function renderQuestion(){
  const q=queue[currentIndex],number=currentIndex+1,percent=Math.round(number/queue.length*100);
  answered=false;
  document.getElementById("question-counter").textContent=number+" / "+queue.length;
  document.getElementById("progress-level").textContent=currentUnit
    ?TRACKS[selectedTrack].label.toUpperCase()+" · "+currentUnit.stageInfo.tag+" · "+currentUnit.title.toUpperCase()
    :TRACKS[selectedTrack].label.toUpperCase()+" · FREIES TRAINING";
  document.getElementById("progress-percent").textContent=percent+" %";
  document.getElementById("progress-fill").style.width=percent+"%";
  const progress=document.getElementById("quiz-progress");
  progress.setAttribute("aria-valuemax",String(queue.length));progress.setAttribute("aria-valuenow",String(number));
  document.getElementById("question-number").textContent="FRAGE "+String(number).padStart(2,"0");
  document.getElementById("question-category").textContent=q.category;
  document.getElementById("question-text").textContent=q.prompt;
  document.getElementById("score-value").textContent=score+" Punkte";
  answerGrid.replaceChildren();
  q.choices.forEach((choice,index)=>{
    const button=document.createElement("button");button.type="button";button.className="answer-option";
    const letter=document.createElement("span");letter.className="answer-letter";letter.textContent=letters[index];
    const text=document.createElement("span");text.textContent=choice;button.append(letter,text);
    button.addEventListener("click",()=>selectAnswer(index));answerGrid.append(button);
  });
  feedbackPanel.hidden=true;feedbackPanel.className="feedback-panel";
  document.getElementById("feedback-title").textContent="";
  document.getElementById("feedback-text").textContent="";
  nextButton.disabled=true;
  nextButton.innerHTML=currentIndex===queue.length-1
    ?'Ergebnis ansehen <span aria-hidden="true">→</span>':'Weiter <span aria-hidden="true">→</span>';
}
function selectAnswer(selected){
  if(answered)return;answered=true;
  const q=queue[currentIndex],correct=selected===q.answer;
  [...answerGrid.querySelectorAll(".answer-option")].forEach((button,index)=>{
    button.disabled=true;
    if(index===q.answer)button.classList.add("is-correct");
    if(index===selected&&!correct)button.classList.add("is-wrong");
  });
  if(correct){
    score++;stats.correct++;feedbackPanel.classList.add("feedback-good");
    document.getElementById("feedback-title").textContent="Richtig! +1 Punkt";
  }else{
    wrongAnswers.push({question:q,selectedIndex:selected});
    feedbackPanel.classList.add("feedback-bad");
    document.getElementById("feedback-title").textContent="Noch nicht ganz. Richtig ist: "+q.choices[q.answer];
  }
  document.getElementById("feedback-text").textContent=q.explanation;
  feedbackPanel.hidden=false;document.getElementById("score-value").textContent=score+" Punkte";
  nextButton.disabled=false;
}
function renderResults(){
  screen("result");
  const total=queue.length,pct=Math.round(score/total*100),wrong=total-score;
  if(currentUnit)completed.add(currentUnit.id);
  document.getElementById("score-fraction").textContent=score+"/"+total;
  document.getElementById("score-percent").textContent=pct+" %";
  document.getElementById("result-correct").textContent=score;
  document.getElementById("result-wrong").textContent=wrong;
  document.getElementById("result-progress-fill").style.width=pct+"%";
  document.getElementById("result-progress-track").setAttribute("aria-valuemax",String(total));
  document.getElementById("result-progress-track").setAttribute("aria-valuenow",String(score));
  document.getElementById("result-subheading").textContent=currentUnit
    ?playerName+" · "+currentUnit.topic.title+" · "+currentUnit.title+" abgeschlossen."
    :playerName+" · Du hast "+score+" von "+total+" Fragen richtig beantwortet.";
  document.querySelector(".result-header .eyebrow").textContent=currentUnit?"EINHEIT ABGESCHLOSSEN":"FREIES TRAINING BEENDET";
  let heading=pct>=90?"Hervorragend!":pct>=70?"Gut gemacht!":pct>=50?"Weiter so!":"Guter Anfang!";
  if(currentUnit&&completedCount()===totalQuestions)heading="Lernpfad geschafft!";
  document.getElementById("result-heading").textContent=heading;
  document.getElementById("result-medal").textContent=pct>=90?"★":pct>=50?"✦":"◆";
  const resultList=document.getElementById("level-results");resultList.replaceChildren();
  const card=document.createElement("div");card.className="level-result";
  const row=document.createElement("div");row.className="level-result-head";
  const name=document.createElement("span");name.textContent=currentUnit?currentUnit.title:"Freies Training";
  const value=document.createElement("strong");value.textContent=score+" / "+total;
  const percent=document.createElement("span");percent.className="level-result-percent";percent.textContent=pct+" %";
  row.append(name,value,percent);
  const track=document.createElement("div");track.className="level-result-track";
  track.setAttribute("role","progressbar");track.setAttribute("aria-valuemin","0");track.setAttribute("aria-valuemax",String(total));track.setAttribute("aria-valuenow",String(score));
  const fill=document.createElement("span");fill.className="level-result-fill";fill.style.width=pct+"%";track.append(fill);
  card.append(row,track);resultList.append(card);
  document.getElementById("recommendation-title").textContent=pct>=90?"Das sitzt richtig gut!":pct>=70?"Eine starke Runde!":pct>=50?"Du bist auf dem Weg.":"Übung macht sicher.";
  document.getElementById("recommendation-text").textContent=
    (pct>=90?"Du hast fast alle Aufgaben richtig gelöst. "
    :pct>=70?"Viele Antworten waren richtig. "
    :pct>=50?"Lies die Erklärungen in Ruhe durch. "
    :"Fehler sind Teil des Lernens. Lies die Erklärungen und probiere es weiter. ")+
    (currentUnit?"Du hast "+currentUnit.title+" in "+currentUnit.topic.title+" abgeschlossen.":"Du kannst jetzt eine Lektion im Lernpfad starten.");
  const list=document.getElementById("mistakes-list");list.replaceChildren();
  document.getElementById("mistakes-section").hidden=wrongAnswers.length===0;
  wrongAnswers.forEach(({question:q,selectedIndex})=>{
    const item=document.createElement("article");item.className="mistake-item";
    const meta=document.createElement("div");meta.className="mistake-meta";meta.textContent=TRACKS[selectedTrack].label+" · "+q.category;
    const prompt=document.createElement("h3");prompt.className="mistake-question";prompt.textContent=q.prompt;
    const selected=document.createElement("p");selected.className="mistake-selected";selected.textContent="Deine Antwort: "+q.choices[selectedIndex];
    const answer=document.createElement("p");answer.className="mistake-answer";answer.textContent="Richtige Antwort: "+q.choices[q.answer];
    const explanation=document.createElement("p");explanation.className="mistake-explanation";explanation.textContent=q.explanation;
    item.append(meta,prompt,selected,answer,explanation);list.append(item);
  });
  const following=nextUnit(),nextLevelButton=document.getElementById("next-level-button");
  nextLevelButton.hidden=!currentUnit||!following;
  if(following)nextLevelButton.innerHTML="Weiter: "+following.topic.title+" · "+following.title+' <span aria-hidden="true">→</span>';
  document.getElementById("retry-button").textContent=currentUnit?"Lektion wiederholen ↻":"Training wiederholen ↻";
  renderPath();
}
const playerInput=document.getElementById("player-name");
const trackOptions=[...document.querySelectorAll(".track-option")];
const beginButton=document.getElementById("begin-course-button");
function updateSetupButton(){
  const valid=playerInput.value.trim().length>0&&selectedTrack!==null;
  beginButton.disabled=!valid;
}
playerInput.addEventListener("input",()=>{
  playerInput.value=playerInput.value.slice(0,18);
  updateSetupButton();
});
trackOptions.forEach(button=>button.addEventListener("click",()=>{
  selectedTrack=button.dataset.track;
  trackOptions.forEach(option=>{
    const chosen=option===button;
    option.classList.toggle("is-selected",chosen);
    option.setAttribute("aria-pressed",String(chosen));
  });
  updateSetupButton();
}));
document.getElementById("profile-form").addEventListener("submit",event=>{
  event.preventDefault();if(!beginButton.disabled)beginCourse();
});
document.getElementById("free-practice-button").addEventListener("click",startFree);
document.getElementById("next-unit-button").addEventListener("click",()=>{const next=nextUnit();if(next)startUnit(next);});
document.getElementById("next-level-button").addEventListener("click",()=>{const next=nextUnit();if(next)startUnit(next);});
nextButton.addEventListener("click",()=>{
  if(!answered)return;
  if(currentIndex<queue.length-1){currentIndex++;renderQuestion();}else renderResults();
});
document.getElementById("back-to-menu").addEventListener("click",()=>screen("start"));
document.getElementById("result-menu-button").addEventListener("click",()=>screen("start"));
document.getElementById("retry-button").addEventListener("click",()=>currentUnit?startUnit(currentUnit):startFree());
document.getElementById("brand-home").addEventListener("click",event=>{
  event.preventDefault();if(courseStarted)screen("start");
});
auditAllTracks();
renderPath();