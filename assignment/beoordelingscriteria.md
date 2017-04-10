# Beoordelingscriteria De Kwizzert

Onderstaande punten zijn de criteria waar tijdens het assessment naar gekeken wordt. Tezamen bepalen alle criteria het cijfer. 



## Functionale requirements

| criteria                                 | beoordeling[^1] |
| ---------------------------------------- | --------------- |
| Teams                                    |  X              |
| Rondes                                   |  X              |
| Vragen: open, korte antwoorden           |  X              |
| Categorieën                              |  X              |
| Meestert-app, Team-app, Scorebord-app    |  X               |
| Kwizavond starten, teams melden aan met naam en ww, acceptatie door master, aanmeldingen sluiten door kwiz te starten |  X               | 
| Kwizronde starten door 3 categorieën te kiezen, na ronde kwizavond eidigen, eindscores tonen |               |
| Vraag selecteren, tonen aan team & op scorebord, antwoord insturen, vraag sluiten, antwoorden goedkeuren | X               |
| Scorebord-app: ronde, vraagnummer, teams, scores (rondepunten & score voor ronde). Tijdens vraag: vraag, categorie, teamstatus. Na vraag: goede antwoord, Meestert oordelen, scores |                  |
| Rondepunten worden als volgt verdiend: Na iedere ronde van 12 vragen, krijgt het team dat de meeste vragen goed had 4 ronde punten. Het team dat op één na het meeste vragen goed had krijgt 2 rondepunten, en het team dat op twee na het beste was krijgt nog 1 rondepunt. Alle andere teams krijgen 0.1 rondepunt voor de moeite en de gezelligheid. | X                |



## Technisch

| criteria                                 | beoordeling[^1] |
| ---------------------------------------- | --------------- |
| Ondersteuning voor meerdere kwizzen tegelijk | X                 |
| 1 server-proces, 3 SPA's                 | X                |
| Gebruik React (routing, propTypes, etc.) | X                |
| Gebruik WebSocket                        | X                |
| Gebruik Mogoose modellen[^3]             |  X               |
| Gebruik DB voor meer dan alleen vragen[^3] |  X               |
| Business rules (uniciteit, lege waardes etc)[^3] | X                 |
| AJAX / Rest vs. Sockets[^3]              |  X              |
| Sessies vs. Sockets[^3]                  |  X              |



## Kwaliteit

| criteria                 | beoordeling[^1] |
| ------------------------ | --------------- |
| Testen                   |                 |
| Comments (& docs)        | X               |
| Naamgeving / layout code |                 |
| Modulaire opzet          | X               |



## Bonuspunten

| criteria                                 | beoordeling[^2] |
| ---------------------------------------- | --------------- |
| Vormgeving                               |                 |
| Promises                                 | X                |
| Redux                                    | X                 |
| Gesuggereerde extra's:  selfie, Cordova, badges, timer |                 |
| Deployed op server (Heroku oid)          |                 |
| Overig                                   |                 |




[^1]: **O**nvoldoende | **V**oldoende | **G**oed | **N**iet **A**anwezig

[^2]: **A**anwezig | **N**iet **A**anwezig

[^3]: De beoordeling van deze criteria zijn mede afhankelijk van de argumentatie die aangegeven wordt (en gedocumenteerd is).
