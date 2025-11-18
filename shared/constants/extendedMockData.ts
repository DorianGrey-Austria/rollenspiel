/**
 * Extended Mock Data for Demo Mode
 * Additional pre-generated stories for more variety
 */

import { AgeMode, Variant } from '../types/shared'

interface MockStory {
  text: string
  choices: string[]
}

// Additional Medieval Stories
export const EXTENDED_MEDIEVAL_STORIES: Record<AgeMode, MockStory[]> = {
  kids: [
    {
      text: `Ihr betretet die Schatzkammer von Schloss Schönbrunn. Überall glitzern goldene Münzen und funkelnde Edelsteine!

Ein freundlicher Hofnarr mit bunten Kleidern tanzt herein: "Ah, ein junger Schatzsucher! Die Kaiserin hat drei magische Rätsel hinterlassen. Löst eines, und ein Schatz gehört Euch!"

Drei geheimnisvolle Truhen stehen vor Euch, jede mit einem anderen Symbol verziert.

WAHL DER HANDLUNG:
1. Öffnet die Truhe mit dem Sonnensymbol - sie leuchtet warm
2. Fragt den Hofnarr nach Hinweisen zu den Rätseln
3. Untersucht alte Gemälde an der Wand nach Hinweisen`,
      choices: [
        'Öffnet die Truhe mit dem Sonnensymbol - sie leuchtet warm',
        'Fragt den Hofnarr nach Hinweisen zu den Rätseln',
        'Untersucht alte Gemälde an der Wand nach Hinweisen',
      ],
    },
    {
      text: `Im Garten von Schloss Hellbrunn entdeckt Ihr sprudelnde Wasserspiele! Fröhlich spritzen die Fontänen in die Höhe.

Ein junger Gärtner winkt Euch zu: "Willkommen! Die Wasserspiele wurden vor 400 Jahren erbaut. Wollt Ihr lernen, wie sie funktionieren?"

Die Sonne scheint und überall plätschert es fröhlich.

WAHL DER HANDLUNG:
1. Erforscht, wie die alten Wasserleitungen funktionieren
2. Spielt mit den Wasserfontänen und habt Spaß
3. Hört die Geschichte, wie das Schloss gebaut wurde`,
      choices: [
        'Erforscht, wie die alten Wasserleitungen funktionieren',
        'Spielt mit den Wasserfontänen und habt Spaß',
        'Hört die Geschichte, wie das Schloss gebaut wurde',
      ],
    },
  ],
  teen: [
    {
      text: `Die Bibliothek der Nationalbibliothek Wien öffnet sich vor Euch. Jahrhundertealte Bücher füllen Regale bis zur hohen Decke.

Ein Archivar mit strengem Blick nähert sich: "Ihr sucht das verschollene Tagebuch von Maria Theresia? Es existiert, doch viele wollen es für sich. Seid vorsichtig - nicht alle Gelehrten hier sind ehrlich."

Drei verdächtige Personen beobachten Euch aus verschiedenen Ecken.

WAHL DER HANDLUNG:
1. Durchsucht heimlich die verbotene Abteilung nach dem Tagebuch
2. Verbündet Euch mit dem Archivar und arbeitet zusammen
3. Beobachtet die verdächtigen Personen, um ihre Pläne zu erkennen`,
      choices: [
        'Durchsucht heimlich die verbotene Abteilung nach dem Tagebuch',
        'Verbündet Euch mit dem Archivar und arbeitet zusammen',
        'Beobachtet die verdächtigen Personen, um ihre Pläne zu erkennen',
      ],
    },
  ],
  adult: [
    {
      text: `Wien, 1683. Die Türken belagern die Stadt. Ihr steht als Chronist auf den Mauern und beobachtet das osmanische Heer.

Graf Starhemberg, Kommandant der Verteidigung, wendet sich an Euch: "Die Situation ist verzweifelt. König Jan Sobieski von Polen ist unsere einzige Hoffnung, doch wird er rechtzeitig kommen? Die Stadt hungert. Manche fordern Kapitulation."

Eine historische Entscheidung steht bevor - und Eure Aufzeichnungen werden in die Annalen eingehen.

WAHL DER HANDLUNG:
1. Dokumentiert die militärische Lage objektiv und präzise
2. Untersucht die Stimmung in der Bevölkerung zwischen Durchhalten und Aufgabe
3. Analysiert die diplomatischen Optionen und politischen Konsequenzen`,
      choices: [
        'Dokumentiert die militärische Lage objektiv und präzise',
        'Untersucht die Stimmung in der Bevölkerung zwischen Durchhalten und Aufgabe',
        'Analysiert die diplomatischen Optionen und politischen Konsequenzen',
      ],
    },
  ],
}

// Additional Gamer Stories
export const EXTENDED_GAMER_STORIES: Record<AgeMode, MockStory[]> = {
  kids: [
    {
      text: `🎮 NEW LOCATION DISCOVERED: Schönbrunn Zoo

Du bist im ältesten Zoo der Welt! 🦁 Dein Quest-Log zeigt: "Find the Secret Animal Friendship"

Ein cooler Tierpfleger mit Tablet kommt vorbei: "Hey Champion! Die Tiere hier haben magische Kräfte, aber nur Kids können sie sehen! Wähl weise!"

+30 XP für Location Discovery!

DEINE WAHL:
1. Geh zu den Pandas - sie haben Meditation-Skills! 🐼
2. Check die Elefanten - super Memory Power! 🐘
3. Visit die Pinguine - Ice-Sliding Abilities! 🐧`,
      choices: [
        'Geh zu den Pandas - sie haben Meditation-Skills! 🐼',
        'Check die Elefanten - super Memory Power! 🐘',
        'Visit die Pinguine - Ice-Sliding Abilities! 🐧',
      ],
    },
  ],
  teen: [
    {
      text: `⚡ URGENT QUEST: Hofburg Conspiracy

Location: Kaiserliche Hofburg, Wien
Threat Level: HIGH ⚠️

Du bist ein Hacker-Investigator. Jemand hat die historischen Archive manipuliert - Geschichte wird neu geschrieben!

Dein Contact, eine KI namens "MARIA", flüstert: "Die Wahrheit liegt in drei Dateien. Aber Vorsicht - das System ist compromised. Wähl den richtigen Path!"

Infiltration Mode Active 🔓

DEINE WAHL:
1. Hack das Archiv-System direkt - risky but fast
2. Social Engineering - manipuliere die Guards
3. Stealth Route - infiltriere durch die Ventilation`,
      choices: [
        'Hack das Archiv-System direkt - risky but fast',
        'Social Engineering - manipuliere die Guards',
        'Stealth Route - infiltriere durch die Ventilation',
      ],
    },
  ],
  adult: [
    {
      text: `🌃 DARK QUEST: Zentralfriedhof Wien

[Mature Content Warning]

Location: Vienna Central Cemetery [Historical Site]
Quest Type: Memory Keeper / Ghost Story

Du bist ein "Memory Archivist" - deine Fraktion bewahrt die Geschichten der Toten. Hier ruhen Beethoven, Schubert, Strauss... aber auch unbekannte Souls mit unerzählten Stories.

Ein Ghost-NPC materialisiert - ein anonymes Opfer der Pestzeit 1679: "Meine Geschichte wurde vergessen. Wie willst du mich erinnern? Durch Facts? Emotion? Oder Warning?"

Your Choice Shapes Memory 💀

DEINE WAHL:
1. Dokumentiere die historischen Fakten der Pest-Opfer
2. Erzähle die emotionale Story des Individual
3. Kreiere eine Warning für moderne Pandemics`,
      choices: [
        'Dokumentiere die historischen Fakten der Pest-Opfer',
        'Erzähle die emotionale Story des Individual',
        'Kreiere eine Warning für moderne Pandemics',
      ],
    },
  ],
}

// Additional Museum Stories
export const EXTENDED_MUSEUM_STORIES: Record<AgeMode, MockStory[]> = {
  kids: [
    {
      text: `Sie befinden sich im Technischen Museum Wien, Abteilung Eisenbahn.

Eine freundliche Kuratorin öffnet die Tür einer alten Dampflok: "Steigen Sie ein! Diese Lokomotive ist über 150 Jahre alt. Damals brauchte man von Wien nach Salzburg 8 Stunden - heute nur 2,5 Stunden!"

Sie dürfen sogar ins Führerhaus klettern und die alten Hebel sehen.

📚 HISTORISCHER KONTEXT: Die erste Eisenbahn in Österreich fuhr 1837 von Wien nach Wagram. Sie revolutionierte das Reisen und den Transport von Waren.

HANDLUNGSOPTIONEN:
1. Lernen Sie, wie die Dampfmaschine funktioniert
2. Vergleichen Sie alte und moderne Züge
3. Hören Sie Geschichten von historischen Zugfahrten`,
      choices: [
        'Lernen Sie, wie die Dampfmaschine funktioniert',
        'Vergleichen Sie alte und moderne Züge',
        'Hören Sie Geschichten von historischen Zugfahrten',
      ],
    },
  ],
  teen: [
    {
      text: `Ihre Klasse steht vor dem Sisi-Museum in der Hofburg.

Dr. Hartmann, Historiker für das 19. Jahrhundert, beginnt: "Kaiserin Elisabeth, genannt Sisi, war mehr als die romantische Figur aus Filmen. Sie war eine Frau in einem goldenen Käfig - intelligent, rebellisch, aber gefangen in den Zwängen ihrer Zeit."

Ausstellungsstücke zeigen ihre Gedichte, Trainingswerkzeuge und persönliche Briefe.

📚 HISTORISCHER KONTEXT: Elisabeth von Österreich (1837-1898) wurde mit 16 Kaiserin. Sie litt unter dem strengen Hofprotokoll, reiste exzessiv und wurde 1898 in Genf ermordet. Ihre Geschichte wirft Fragen über Freiheit, Gender-Rollen und Macht auf.

HANDLUNGSOPTIONEN:
1. Analysieren Sie Sisis persönliche Schriften zur weiblichen Emanzipation
2. Untersuchen Sie die politischen Zwänge ihrer Position
3. Vergleichen Sie historische und moderne Medien-Darstellungen`,
      choices: [
        'Analysieren Sie Sisis persönliche Schriften zur weiblichen Emanzipation',
        'Untersuchen Sie die politischen Zwänge ihrer Position',
        'Vergleichen Sie historische und moderne Medien-Darstellungen',
      ],
    },
  ],
  adult: [
    {
      text: `Ihre Forschung führt Sie ins Haus der Geschichte Österreich, Ausstellung "Österreich im Nationalsozialismus".

Dr. Weber, Expertin für Zeitgeschichte, begleitet Sie: "Diese Ausstellung ist ein Balanceakt. Wir müssen die Täterschaft Österreichs zeigen, ohne zu relativieren. Die Opferthese ('erstes Opfer Hitlers') war lange dominant - heute wissen wir es besser."

Vitrinen zeigen Propagandamaterial, Deportationslisten, aber auch Widerstandsdokumente.

📚 HISTORISCHER KONTEXT: Nach dem "Anschluss" 1938 wurden über 65.000 österreichische Juden ermordet. Die Aufarbeitung begann erst Jahrzehnte später. Die Moskauer Deklaration (1943) ermöglichte die Opferthese, die erst in den 1980ern kritisch hinterfragt wurde.

HANDLUNGSOPTIONEN:
1. Analysieren Sie die Entwicklung der österreichischen Erinnerungskultur
2. Untersuchen Sie konkrete Täterbiografien und Kollaboration
3. Erforschen Sie Kontinuitäten in Politik und Justiz nach 1945`,
      choices: [
        'Analysieren Sie die Entwicklung der österreichischen Erinnerungskultur',
        'Untersuchen Sie konkrete Täterbiografien und Kollaboration',
        'Erforschen Sie Kontinuitäten in Politik und Justiz nach 1945',
      ],
    },
  ],
}

// Helper function to get extended stories
export function getExtendedMockStory(
  variant: Variant,
  ageMode: AgeMode,
  sceneNumber: number
): MockStory | null {
  const stories =
    variant === 'medieval'
      ? EXTENDED_MEDIEVAL_STORIES
      : variant === 'gamer'
      ? EXTENDED_GAMER_STORIES
      : EXTENDED_MUSEUM_STORIES

  const modeStories = stories[ageMode]
  if (!modeStories || modeStories.length === 0) return null

  const index = sceneNumber % modeStories.length
  return modeStories[index]
}
