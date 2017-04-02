**EINDOPDRACHT — COURSE-FASE — DWA**

# *de Kwizzert*

De Kwizzert is een real-time webapplicatie die in kroegen, sportkantines en wellicht gevangenissen gebruikt kan worden om in teamverband quizzen te spelen. Een pub quiz, dus.

Een typisch gebruik in een café ziet er als volgt uit:
- Spelers zijn ingedeeld in *teams*. Typisch is een team tussen 3 en 8 deelnemers groot, maar dat is niet zo belangrijk voor de app.
- Aan een *Kwiz-avond* doen typisch tussen de 2 en de 6 teams mee.
- Een Kwiz-avond kan bestaan uit meerdere *rondes*, en iedere ronde bevat 12 *vragen*, gekozen uit 3 *categorieën*.
- Naast de teams is er een KwizMeestert, die vragen selecteert, antwoorden goed- of afkeurt, en met humor en enthousiasme de stemming erin weet te houden.
- Ieder team deelt een tafel, en gebruikt de smartphone van één van de teamleden om antwoorden in te dienen.
- De KwizMeestert heeft een tablet die hij/zij gebruikt om het spel te leiden.
- Ten slotte is er een groot scherm, b.v. een beamer, die aan iedereen de scores toont, de huidige vraag, en een timer.
- De Kwizzert stelt open vragen waarop een kort antwoord mogelijk is. Dus geen multiple-choice of ja/nee vragen, maar ook geen vragen die een uitgebreide zin of alinea als antwoord vragen. Bijvoorbeeld: “Hoe heet de hoofdstad van Peru?”, of “In welk jaar won Nederland het WK kleiduifschieten voor het laatst?”.
- De KwizMeestert beslist wanneer de Kwiz-avond eindigt. Op dat moment wijst de applicatie de winnaar aan op basis van de resultaten in de rondes die geweest zijn.


## Drie SPA’s

De Kwizzert bestaat eigenlijk uit 3 single page web applicaties:

1. **De Team-app.**
   Deze SPA draait op de smartphones van de teams. Deze app kan twee dingen:
   - De telefoon (en daarmee het team) aanmelden bij de Kwiz-avond. Een onderdeel van aanmeldprocedure is dat het team een naam voor zichzelf instuurt, en dat de KwizMeestert de aanmelding moet accepteren.
   - De huidige vraag tonen, en het team de gelegenheid geven een antwoord in te voeren en in te sturen.

2. **De KwizMeestert-app.**
   Deze SPA draait op de tablet van de KwizMeestert. Hij/zij kan daarmee de volgende taken uitvoeren:
   - De Kwiz-avond starten, en openstellen voor aanmeldingen van (smartphones van) teams.
   - Aanmeldingen van teams accepteren of weigeren.
   - De feitelijke Kwiz starten zodra alle teams zich hebben aangemeld.
   - Een Kwiz-ronde (van 12 vragen) starten door uit een menu 3 categorieën te selecteren, en dan op de knop “Start Ronde” (o.i.d.) te drukken.
   - Na afloop van een ronde te kiezen of er nog een ronde gestart wordt, of dat de Kwiz-avond beëindigd wordt.
   - De KwizMeestert de volgende vraag te laten kiezen. Dit is een interessant schermpje, dat hieronder nader wordt toegelicht onder het kopje [User Interface](#user-interface).
   - De gekozen vraag *starten* door op een knop te drukken. Pas dan wordt de vraag getoond op het Scorebord of in de Team-app. Vanaf dat moment kunnen teams hun antwoorden insturen, totdat de KwizMeestert de vraag weer *sluit*, ook door op een knop te drukken.
   - De antwoorden van de teams ter goedkeuring voorleggen aan de KwizMeestert. De KwizMeestert kan zo zelf beslissen of hij/zij antwoorden met spelfouten toch goedkeurt, bijvoorbeeld.

3. **De Scorebord-app.**
   Deze app heeft geen eigen interactie, maar toont, real-time:
   - de voortgang: hoeveelste ronde zitten we in, en de hoeveelste vraag van deze ronde.
   - de namen van de teams, met daarbij de scores in “rondepunten”, en het aantal goede vragen in deze ronde.
     Rondepunten  worden als volgt verdiend: Na iedere ronde van 12 vragen, krijgt het team dat de meeste vragen goed had 4 ronde punten. Het team dat op één na het meeste vragen goed had krijgt 2 rondepunten, en het team dat op twee na het beste was krijgt nog 1 rondepunt. Alle andere teams krijgen 0.1 rondepunt voor de moeite en de gezelligheid.
   - Als er een vraag “loopt” (hij is gestart en nog niet gesloten: teams kunnen nog antwoorden insturen), dan toont het scorebord:
     - de vraag;
     - de categorie waar de vraag bij hoort;
     - welke teams al een antwoord hebben ingestuurd (niet de antwoorden zelf).
   - Zodra een vraag gesloten is, toont het scorebord de antwoorden van de teams, en wanneer de KwizMeestert een antwoord goed of afkeurt wordt dat ook zichtbaar, en worden de team-scores bijgewerkt.


## Technisch

Er zijn drie afzonderlijke SPA’s: de Team-app, de KwizMeestert-app en de Scorebord-app. Het is dus niet de bedoeling dat er één grote monolithische SPA gemaakt wordt waarbij de gebruiker in het begin de keuze van de juiste app moet bepalen. Alle drie de SPA’s worden door dezelfde NodeJS/Express server bediend, en het geheel draait op de MERN-stack, aangevuld met een zelfgekozen socket library (ws, Socket.io, etc.).

Het zijn gewone web-apps die in de browser van de telefoon of de tablet draaien. Het hoeven dus geen “echte” apps te worden die in de AppStore of Google Play aangeboden kunnen worden.

De drie SPA’s gebruiken websockets om realtime te communiceren. Voorbeelden van real-time communicatie zijn:

- Wanneer de KwizMeestert een vraag *start*, dan verschijnt die vraag onmiddellijk op de telefoons en op het scorebord.
- Wanneer een team een antwoord instuurt dan wordt de antwoord-tekst onmiddellijk getoond op de tablet van de KwizMeestert (en het Scorebord toont dat dat team al een antwoord heet ingestuurd).
- Wanneer de KwizMeestert een antwoord goedkeurt, wordt de score op het scorebord onmiddellijk bijgewerkt.

Het is niet verplicht om *alle* data te versturen via websockets; je kunt ook via websockets een bericht versturen en de client dan via een REST interface de data laten ophalen. Als een client data via een REST interface verstuurd dan kan de server natuurlijk via websockets een bericht versturen naar de overige clients. Zorg dat je het communicatie protocol (websockets, REST, welke berichten, etc.) duidelijk vooraf bedacht hebt!

De server kan meerdere Kwiz-avonden (in verschillende kroegen bijvoorbeeld) tegelijkertijd ondersteunen. Om te voorkomen dat een telefoon zich bij de verkeerde Kwiz-avond (in een andere kroeg) aanmelden krijgen de teams van de KwizMeestert een eenvoudig wachtwoord dat ze bij het aanmelden moeten gebruiken; dit wachtwoord wordt ook weergegeven op de Scorebord-app.


## User Interface

Je hoeft nu geen gelikte UI te ontwerpen, maar bedenk van tevoren wel welke schermen de verschillende apps nodig hebben, en hoe die er grofweg uitzien (lees: maak wireframes). Het gebruik van een front-end framework zoals bijvoorbeeld Bootstrap, Foundation of Material-UI is optioneel (maar wel de moeite waard). Uiteraard kun je ook kijken naar React specifieke UI frameworks (Google: ‘react ui framework’). Een mooi visueel ontwerp van de apps kan pas een klein bonusje opleveren als de app al goed voldoet aan de requirements in dit document. Zorg dus dat het gebruik van een framework geen belemmering is om functionaliteit af te krijgen.

Eén punt is wel belangrijk om over na te denken. Het is belangrijk dat de KwizMeestert wat vrijheid heeft in de keuze voor de volgende vraag, om zo in te kunnen spelen op zijn/haar publiek, of op de stemming van het moment. Bedenk zelf een UI waarmee de KwizMeestert-app de KwizMeestert de keuze geeft uit meerdere vragen, van iedere categorie (elke ronde heeft 3 categorieën) een paar.


## Kleine requirements

Dit is de onvolledige lijst kleine requirements:

1. Iedere vraag wordt, tijdens een Kwiz-avond maar één keer gesteld. Als een vraag gesteld is, komt-ie ook niet meer voor in de vragen die aan de KwizMeestert worden voorgesteld (categorieën kunnen wel meer dan in meer dan één ronde per Kwiz-avond voorkomen).
2. Twee teams mogen niet dezelfde naam hebben. Team-namen mogen niet leeg zijn.
3. Nadat een team een antwoord heeft ingestuurd, mag het zich bedenken. Dan kan het team een tweede antwoord insturen, zolang de KwizMeestert de vraag nog niet gesloten heeft. Het laatst ingestuurde antwoord telt.
4. Lege antwoorden worden genegeerd door de app. Als een team per ongeluk een leeg antwoord instuurt, dan wordt dat niet aan de KwizMeestert of op het Scorebord getoond.
5. Zodra de KwizMeestert de Kwiz-avond afsluit, toont het scorebord de namen van de teams die nummer 1, 2 en 3 zijn geworden (gemeten aan het aantal rondepunten dat ze gehaald hebben). In dat “slotscherm” ligt er een visuele nadruk op de naam van het team dat nummer 1 werd.

Deze lijst met kleine requirements is waarschijnlijk onvolledig. Mocht je een witte plek tegenkomen waarin het gedrag van de applicatie niet door dit document wordt beschreven, gebruik dan de volgende vuistregels:

- Als er één voor-de-hand liggende invulling te bedenken is die in redelijke tijd te implementeren is doe dat.
  Met “voor-de-hand liggend” wordt bedoeld: welke invulling zorgt ervoor dat de app z’n doel bereikt (een leuke avond voor iedereen), en gebruiksvriendelijk is.
- Als er meerdere voor-de-hand liggende invullingen te bedenken zijn die alle in redelijke tijd te implementeren zijn, kies dan zelf.
- Als alle invullingen die je kunt bedenken niet echt bijdragen aan een leuke avond, of de gebruiksvriendelijkheid, leg het dilemma dan voor aan één van je docenten.
- Als de enige invullingen die OK lijken allemaal ook erg veel werk vergen, overleg ook dan met één van je docenten. 


## Extra’s

Wanneer je het vertrouwen hebt dat je alle bovenstaande aspecten van de Kwizzert goed en netjes aan het werk hebt, dan kun je overwegen om de applicatie uit te breiden met interessante extra’s. Daarvoor geven we bonuspunten (mits je uitwerking zonder die extra’s een voldoende zou scoren).

Voel je vrij om eigen leuke nieuwe mogelijkheden of spelregels te bedenken. Hieronder alvast een paar ideetjes:

- *De team-selfie* — Gebruik de HTML5 API waarmee je toegang tot de camera van de team-telefoon kunt krijgen om teams de gelegenheid te geven een selfie in te sturen als onderdeel van het aanmeldproces. Die selfie komt dan terug op het scorebord.
- *Apache Cordova* — Het is veel makkelijker dan je denkt om het client-side deel van een SPA te verpakken als een “echte” Android of iOS app.  Daarvoor wordt typisch een tool gebruikt die “Apache Cordova” heet.
- *Lollige badges* — Geef de KwizMeestert de mogelijkheid om, op eigen initiatief, vrolijk geformuleerde complimentjes uit te delen aan teams (in de vorm van een soort badges). Voorbeelden zouden kunnen zijn “Geinig antwoord”, “Pijnlijke typo”, “Snelle vogels” (het team geeft snel antwoord), etc. De badges hoeven geen rol te spelen in de score berekening.
- *Bedenktijd* — In plaats van de KwisMeestert het einde van de looptijd van een vraag zelf te bepalen zou er ook een (vaste of variabele) bedenktijd kunnen zijn, die gaat lopen zodra de KwisMeestert de vraag start. Het scorebord zou een countdown-timer kunnen tonen voor die bedenktijd.
- *Geschiedenis* — De app onthoudt de teams, waardoor er een competitie mogelijk wordt die over meerdere avonden loopt.
