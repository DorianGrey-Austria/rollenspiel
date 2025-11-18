/**
 * Mock Data for Demo Mode
 * Pre-generated stories that work without API
 */

import { AgeMode, Variant } from '../types/shared'

interface MockStory {
  text: string
  choices: string[]
}

// Medieval Mock Stories
const MEDIEVAL_STORIES: Record<AgeMode, MockStory[]> = {
  kids: [
    {
      text: `Ihr steht vor der majestätischen Burg Hohenwerfen. Die hohen Mauern ragen empor wie die Finger eines Riesen. Ein freundlicher Wachmann mit einem prächtigen Federhut grüßt Euch.

"Willkommen, junger Reisender! Heute ist ein besonderer Tag. Der Burgherr sucht nach klugen Köpfen, die ihm bei einem Rätsel helfen können."

Er deutet auf drei Türen in der Burgmauer.

WAHL DER HANDLUNG:
1. Begebet Euch zur goldenen Tür, die mit Sternen verziert ist
2. Sprechet mit dem Wachmann über das Rätsel
3. Untersucht die alten Schriften an der Burgmauer`,
      choices: [
        'Begebet Euch zur goldenen Tür, die mit Sternen verziert ist',
        'Sprechet mit dem Wachmann über das Rätsel',
        'Untersucht die alten Schriften an der Burgmauer',
      ],
    },
  ],
  teen: [
    {
      text: `Die Festung Hohensalzburg thront über der Stadt. Ihr seid ein junger Gelehrter, entsandt vom Herzog, um ein mysteriöses Dokument zu untersuchen.

In der Bibliothek erwartet Euch Bruder Augustinus, ein alter Mönch mit durchdringendem Blick. "Das Dokument, das Ihr sucht, birgt ein Geheimnis der Fürsten. Doch Vorsicht - nicht alle hier sind Euch wohlgesonnen."

Politische Intrigen durchziehen die Burg wie ein Spinnennetz.

WAHL DER HANDLUNG:
1. Untersucht das Dokument sofort, um keine Zeit zu verlieren
2. Befraget den Mönch über die politischen Machtverhältnisse
3. Erkundet die Burg heimlich, um mehr zu erfahren`,
      choices: [
        'Untersucht das Dokument sofort, um keine Zeit zu verlieren',
        'Befraget den Mönch über die politischen Machtverhältnisse',
        'Erkundet die Burg heimlich, um mehr zu erfahren',
      ],
    },
  ],
  adult: [
    {
      text: `Anno 1525. Die Bauernaufstände erschüttern das Salzburger Land. Ihr seid ein Chronist, der Zeuge eines historischen Moments wird.

In der Festung Hohensalzburg verschanzt sich Erzbischof Matthäus Lang, während unten in der Stadt die aufgebrachten Bauern versammelt sind. Die Spannung ist greifbar - jede Entscheidung könnte Blut vergießen oder Frieden schaffen.

Ein Bote des Erzbischofs und ein Anführer der Bauern erwarten Eure Vermittlung. Die Geschichte wird sich an diesem Tag entscheiden.

WAHL DER HANDLUNG:
1. Vermittelt zwischen den Parteien und sucht einen Kompromiss
2. Dokumentiert die Ereignisse neutral, ohne Partei zu ergreifen
3. Untersucht die wahren Motive beider Seiten durch Gespräche`,
      choices: [
        'Vermittelt zwischen den Parteien und sucht einen Kompromiss',
        'Dokumentiert die Ereignisse neutral, ohne Partei zu ergreifen',
        'Untersucht die wahren Motive beider Seiten durch Gespräche',
      ],
    },
  ],
}

// Gamer Mock Stories
const GAMER_STORIES: Record<AgeMode, MockStory[]> = {
  kids: [
    {
      text: `🎮 QUEST START: Stephansdom Wien

Du spawns vor dem riesigen Dom. Dein Quest-Log poppt auf: "Finde das versteckte Level!"

Ein NPC (eine nette alte Dame) winkt dir zu: "Hey Abenteurer! Im Dom gibt es ein geheimes Level, das nur Kids finden können. Drei Wege führen dorthin!"

+25 XP für Quest-Start!

DEINE WAHL:
1. Checke die bunten Glasfenster - sehen aus wie Easter Eggs!
2. Rede mit dem NPC für mehr Quest-Infos
3. Scanne die Umgebung nach versteckten Hinweisen`,
      choices: [
        'Checke die bunten Glasfenster - sehen aus wie Easter Eggs!',
        'Rede mit dem NPC für mehr Quest-Infos',
        'Scanne die Umgebung nach versteckten Hinweisen',
      ],
    },
  ],
  teen: [
    {
      text: `⚔️ MAIN QUEST UPDATED: Prater Wien

Location discovered: Wiener Prater [Legendary Tier]

Du stehst vor dem alten Riesenrad - aber das ist kein normaler Freizeitpark mehr. In deiner Realität ist das hier ein Portal zu einer anderen Dimension.

Ein mysteriöser Stranger in schwarzem Hoodie lehnt an der Gondel: "Du hast das Achievement 'Dimension Walker' freigeschaltet. Drei Portale, drei Choices. Wähl weise, Gamer."

Boss-Fight ahead? 🎯

DEINE WAHL:
1. Steig ins Riesenrad ein - High Risk, High Reward!
2. Interrogiere den Stranger - Info-Gathering ist Key
3. Erkunde den Prater für Side-Quests und Loot`,
      choices: [
        'Steig ins Riesenrad ein - High Risk, High Reward!',
        'Interrogiere den Stranger - Info-Gathering ist Key',
        'Erkunde den Prater für Side-Quests und Loot',
      ],
    },
  ],
  adult: [
    {
      text: `🌃 DARK QUEST: Mauthausen Memorial

[Content Warning: Heavy themes]

Location: Mauthausen Concentration Camp Memorial
Quest Type: Historical Horror / Educational

Du bist ein Investigator der "Memory Keepers" - eine Faction, die dafür sorgt, dass vergangene Gräuel nicht vergessen werden. Hier, an diesem düsteren Ort, spürst du die Schatten der Geschichte.

Ein alter Mann, ein Survivor, erscheint als Ghost-NPC: "Die Geschichten müssen erzählt werden. Aber wie? Durch Fakten? Durch Emotionen? Oder durch Warnung?"

Deine Wahl hat Consequences. 💀

DEINE WAHL:
1. Dokumentiere die Fakten - Objective Storytelling
2. Interview den Ghost-NPC - Emotional Route
3. Untersuche die Gedenkstätte als Warning für die Zukunft`,
      choices: [
        'Dokumentiere die Fakten - Objective Storytelling',
        'Interview den Ghost-NPC - Emotional Route',
        'Untersuche die Gedenkstätte als Warning für die Zukunft',
      ],
    },
  ],
}

// Museum Mock Stories
const MUSEUM_STORIES: Record<AgeMode, MockStory[]> = {
  kids: [
    {
      text: `Sie befinden sich vor dem Naturhistorischen Museum Wien.

Ein freundlicher Museumsführer begrüßt Sie: "Willkommen! Heute lernen wir über Dinosaurier, die vor 65 Millionen Jahren hier lebten. Können Sie sich das vorstellen? So lange ist das her!"

Er zeigt Ihnen drei Ausstellungsräume.

📚 HISTORISCHER KONTEXT: Das Naturhistorische Museum Wien wurde 1889 eröffnet und beherbergt über 30 Millionen Objekte.

HANDLUNGSOPTIONEN:
1. Besuchen Sie den Dinosaurier-Saal und lernen Sie über Fossilien
2. Fragen Sie den Museumsführer, wie Wissenschaftler Dinosaurier erforschen
3. Schauen Sie sich an, wie die Dinosaurier-Knochen gefunden wurden`,
      choices: [
        'Besuchen Sie den Dinosaurier-Saal und lernen Sie über Fossilien',
        'Fragen Sie den Museumsführer, wie Wissenschaftler Dinosaurier erforschen',
        'Schauen Sie sich an, wie die Dinosaurier-Knochen gefunden wurden',
      ],
    },
  ],
  teen: [
    {
      text: `Ihre Exkursion führt Sie zum Technischen Museum Wien.

Dr. Schmidt, die Kuratorin, empfängt Ihre Schulklasse: "Die Industrielle Revolution veränderte Österreich fundamental. Die Dampfmaschine, die Sie hier sehen, repräsentiert einen technologischen Quantensprung des 19. Jahrhunderts."

Sie stehen vor verschiedenen Exponaten der Industriegeschichte.

📚 HISTORISCHER KONTEXT: Die Industrialisierung in Österreich begann verzögert um 1830, transformierte aber bis 1900 die gesamte Gesellschaftsstruktur. Die Landflucht und Urbanisierung waren direkte Folgen.

HANDLUNGSOPTIONEN:
1. Analysieren Sie die sozialen Auswirkungen der Industrialisierung
2. Untersuchen Sie die technischen Innovationen im Detail
3. Vergleichen Sie die damalige Situation mit heutigen technologischen Revolutionen`,
      choices: [
        'Analysieren Sie die sozialen Auswirkungen der Industrialisierung',
        'Untersuchen Sie die technischen Innovationen im Detail',
        'Vergleichen Sie die damalige Situation mit heutigen technologischen Revolutionen',
      ],
    },
  ],
  adult: [
    {
      text: `Ihre akademische Forschung führt Sie zur Gedenkstätte Mauthausen.

Als Historiker*in stehen Sie vor der Herausforderung, diesen Ort zu interpretieren. Die KZ-Gedenkstätte Mauthausen ist nicht nur ein Museum, sondern ein Mahnmal gegen die dunkelsten Kapitel der Menschheitsgeschichte.

Die Leiterin der Gedenkstätte, Dr. Weber, begleitet Sie: "Unsere Aufgabe ist es, historische Genauigkeit mit pädagogischer Verantwortung zu verbinden. Jede Entscheidung, wie wir diese Geschichte präsentieren, trägt ethisches Gewicht."

📚 HISTORISCHER KONTEXT: Das KZ Mauthausen bestand von 1938-1945. Über 190.000 Menschen waren hier inhaftiert, mindestens 90.000 wurden ermordet. Die Gedenkstätte wurde 1949 eröffnet und ist heute ein zentraler Ort der Erinnerungskultur.

HANDLUNGSOPTIONEN:
1. Untersuchen Sie die Quellenlage und Primärdokumente
2. Analysieren Sie die Rolle von Erinnerungskultur in der Gegenwart
3. Erforschen Sie die individuellen Biografien der Opfer`,
      choices: [
        'Untersuchen Sie die Quellenlage und Primärdokumente',
        'Analysieren Sie die Rolle von Erinnerungskultur in der Gegenwart',
        'Erforschen Sie die individuellen Biografien der Opfer',
      ],
    },
  ],
}

export function getMockStory(variant: Variant, ageMode: AgeMode, sceneNumber: number = 0): MockStory {
  const stories = variant === 'medieval'
    ? MEDIEVAL_STORIES
    : variant === 'gamer'
    ? GAMER_STORIES
    : MUSEUM_STORIES

  const modeStories = stories[ageMode]
  const index = sceneNumber % modeStories.length

  return modeStories[index]
}

export function getDemoLocationSuggestions(variant: Variant): string[] {
  if (variant === 'medieval') {
    return [
      'Burg Hohenwerfen',
      'Festung Hohensalzburg',
      'Schloss Schönbrunn',
      'Burg Kreuzenstein',
      'Kaiserburg Nürnberg',
    ]
  }

  if (variant === 'gamer') {
    return [
      'Stephansdom Wien',
      'Wiener Prater',
      'Hofburg Wien',
      'Belvedere Schloss',
      'Hundertwasserhaus',
    ]
  }

  // museum
  return [
    'Naturhistorisches Museum Wien',
    'Technisches Museum Wien',
    'KZ-Gedenkstätte Mauthausen',
    'Haus der Geschichte Österreich',
    'Albertina Museum',
  ]
}
