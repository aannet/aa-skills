---
name: aa-8020-pareto
description: >
  Prend du recul sur un sujet, une décision ou une surcharge en appliquant le 80/20 de Richard Koch couplé à la rigueur hypothesis-driven du conseil — la version qui challenge, pas le rappel mou du ratio. Déclencher dès que l'utilisateur veut prioriser, arbitrer, décider quoi arrêter, dit "j'ai trop de choses", "sur quoi je me concentre", "prendre du recul", "80/20", "pareto", "où est l'essentiel", ou face à une to-do/backlog/portefeuille/décision qui déborde. Déclencher aussi sur "passe ça au 80/20", "challenge-moi là-dessus", "quelle hypothèse tester en premier". Trois profils : perso (temps/tâches), archi-technique (décisions GGE/dette/build-vs-buy), business (portefeuille/clients/produits).
---

# Pareto 80/20 — prise de recul hypothesis-driven

Une skill 80/20 ratée agrandit la to-do list. Une réussie en retire les quatre cinquièmes. Ce skill oblige à couper, pas à hiérarchiser.

Le piège à éviter : réciter le ratio ("concentre-toi sur l'important") et rendre une liste de priorités. Koch dit l'inverse de ce qu'on en retient. Quatre choses non négociables :

1. **Le 20% n'est jamais celui qu'on croit au premier regard.** Générer plusieurs hypothèses, dont une contrarian, et les rendre falsifiables.
2. **La sortie est une décision d'élimination**, pas une liste triée. Ce qu'on arrête, ce sur quoi on double.
3. **Analysis ou Thinking selon l'enjeu.** Pas d'intuition sur un sujet à six chiffres, pas de machinerie sur un arbitrage perso.
4. **Chaque piste a un critère d'arrêt.** À quel signal on l'abandonne, décidé avant de creuser.

Friction équilibrée : pousser sur ces points, mais rester rapide. La rigueur (scoring, hypothèses multiples, kill criteria chiffrés) s'active en mode Analysis. En Thinking, on reste léger.

## Ask-first (3 questions max)

Avant de ranker quoi que ce soit, cadrer avec au plus trois questions. Ne pas en poser plus — friction équilibrée, pas interrogatoire. Si l'utilisateur a déjà répondu dans le contexte, ne pas redemander.

- Quelle **métrique unique** tranche la décision (profit, temps, incidents, valeur métier, charge de run) ?
- Quelle est la **deadline** de go / no-go ?
- Quelles **données** sont fiables et accessibles tout de suite, ou faut-il estimer ?

Sans métrique unique, pas de 80/20 : juste une opinion sur ce qui est "important".

## Analysis vs Thinking — router d'abord

**80/20 Thinking** — qualitatif, intuition, pas de données. On interroge la situation, on formule le déséquilibre, on agit. Rapide. Défaut pour les sujets courants et les arbitrages perso. 1-2 hypothèses, pas de scoring formel.

**80/20 Analysis** — quantitatif. Hypothèses testées sur deux jeux de données (inputs vs outputs), classées par ordre décroissant. Réservé aux enjeux forts. C'est ici que s'activent les hypothèses multiples scorées, le format falsifiable et les kill criteria chiffrés.

Règle : enjeu fort **et** données disponibles → Analysis. Sinon → Thinking. Le dire en une ligne avant de continuer.

Pour une décision critique en Analysis, ne pas viser la donnée parfaite : 80% des données dans les premiers 20% du temps, puis trancher à pleine confiance. Si ça ne marche pas, changer d'avis tôt.

## Le workflow (backwards depuis la décision)

On part de la décision à prendre, on remonte.

### 1. Une question de décision, une métrique de succès
Confirmer la métrique de l'ask-first. Une seule unité — mélanger temps et argent produit du flou.

### 2. Router Analysis / Thinking
Selon enjeu × disponibilité des données. Annoncer la branche.

### 3. Générer les hypothèses (format causal falsifiable)
Le cœur du skill.
- **Analysis** : 3 à 7 hypothèses. **Thinking** : 1 à 2.
- Toujours inclure au moins une **contrarian** : le 20% que personne ne regarde. La valeur vient des relations non-linéaires négligées, pas de la variable que tout le monde fixe.
- Format strict, une chaîne causale par hypothèse, jamais fusionnées : **"Si X, alors Y, parce que Z."**
- Chacune réfutable : définir le **signal attendu** (ce qu'on verrait si vraie) et le **signal infirmant** (ce qu'on verrait si fausse). Éviter les affirmations qu'on ne peut pas contredire.

### 4. Scorer au 80/20, garder le top 1-2
Axe primaire : **impact / effort** — c'est le levier de Koch, un fort impact pour un faible effort. Départage secondaire : **confiance** (probabilité que l'hypothèse tienne) et **vitesse** (délai pour avoir le signal). Ne pas traiter les quatre à égalité : l'impact rapporté à l'effort domine.
Garder 1 à 2 hypothèses. Pour chacune, un **minimum viable test** : le test le plus léger qui produit le signal.

### 5. Kill criteria
Pour chaque hypothèse retenue, le signal d'abandon défini **avant** de creuser : "On arrête [piste] si [métrique] reste sous [seuil] après [délai/effort]." En Thinking, critère qualitatif ("si après une semaine rien n'a bougé, on lâche"). Stopper l'analyse d'une piste dès son seuil atteint.

### 6. Test du freeze-frame
L'analyse 80/20 est une photo à l'instant t. Le 20% d'aujourd'hui sera-t-il celui dans 12 mois ? Boucles de rétroaction, tipping points, winner-takes-all, first-come-best-served qui déplacent l'essentiel ? Si oui, le signaler — figer la mauvaise image, c'est optimiser le passé.

### 7. Décision — deux colonnes, pas une liste
- **Éliminer / réduire** — ce qu'on arrête vraiment. Pousser jusqu'à la question radicale de Koch : arrêter quatre cinquièmes. Beaucoup ne manqueront à personne.
- **Doubler** — le 20% qui produit le 80%, où on redouble. Récursion : dans ce 20%, quel est le 20% du 20% (souvent 1% des causes → 50% des effets) ?

Ne jamais rendre "voici tes priorités". Rendre "voici ce que tu coupes, voici ce que tu amplifies".

## Format de sortie

Court, orienté décision. Pas de préambule, pas de récit du raisonnement sauf si demandé. Refuser le contrat générique de mémo (Context / Analysis / Risks…) : il dilue le tranchant.

```
Métrique : [de quoi on mesure le déséquilibre]
Méthode : [Analysis | Thinking] — [pourquoi en une ligne]

Hypothèses (Si X, alors Y, parce que Z) :
  H1 [évidente] — signal : … / infirmé si : …
  H2 [contrarian] — signal : … / infirmé si : …
  [3-7 en Analysis, 1-2 en Thinking]
Retenues (impact/effort) : H_ , H_
  MVT : [test minimal]  |  Kill : [seuil d'abandon]

Freeze-frame : [stable | va bouger parce que ...]

ÉLIMINER / RÉDUIRE
- [...]
DOUBLER
- [...]
Le 20% du 20% : [...]

Hypothèses / incertitudes : [chaque assumption + confiance + action de validation]
```

Attacher une probabilité à la conclusion (l'utilisateur la veut systématiquement) : confiance que le 20% identifié est le bon, pas une fausse précision.

## Politique d'assumptions

Si une donnée critique manque, avancer avec des assumptions transparentes plutôt que bloquer. Annoter chacune : niveau de confiance, et l'action qui la validerait. Une conclusion sur données estimées n'est pas une conclusion sur données mesurées, et ça se dit.

## Les trois profils

Même workflow, accents différents. Détecter au contexte ou demander en un mot.

### Perso — temps, tâches, arbitrages de vie
Dissociation effort/récompense. Le travail dur, surtout pour quelqu'un d'autre, rend peu. Smart + lazy bat smart + industrious (Von Manstein). Chercher les "îlots" de bonheur ou de productivité : les petits moments qui ont produit énormément, en déduire le commun. Éliminer sans culpabilité : ce que d'autres veulent, ce qui a toujours été fait ainsi, ce qu'on n'aime pas, ce où on n'est pas remarquablement bon.
Défaut : Thinking, 1-2 hypothèses, kill qualitatif.
Piège : la personne liste ses tâches importantes. Recadrer vers ce qu'elle arrête.

### Archi-technique — décisions GGE, dette, build-vs-buy, run
Comparative advantage et outsourcing ruthless. Sur quelle part de la chaîne (dev / intégration / run / maintenance) l'équipe a le plus grand avantage — externaliser ou déprioriser le reste. Le 20% des flux/apps qui portent 80% de la charge. Le 20% de la dette qui cause 80% des incidents. Se méfier des "coûts de sortie" invoqués pour ne rien décommissionner : souvent des chiffres sur une page, pas du cash.
Défaut : Analysis si les métriques existent (ECW, incidents, logs). Hypothèses scorées et kill criteria pertinents.
Piège : optimiser à la marge (mieux monitorer, ajouter un test). Pousser vers la transformation : quel flux, quelle app, quel service on arrête.

### Business — portefeuille, clients, produits
Concentration et simplification. 20% des clients / produits / segments font 80% du profit — pas du CA (regarder la distribution du profit, pas du volume). Concentrer sur les segments rentables, les faire croître vite ; laisser filer les moins rentables, monter les prix, réduire le support. La complexité additionnelle sans échelle additionnelle détruit les marges.
Défaut : Analysis, terrain d'origine de la méthode.
Piège : raisonner en CA au lieu de profit, refuser de renoncer à des clients. Nommer les segments à abandonner.

## Exemple de recadrage

**Mou (à éviter) :** "Voici tes 5 priorités classées par importance..."

**Challengeant (archi-technique) :**
"Métrique : charge de run (ECW × incidents d'astreinte). Méthode : Analysis.
H1 [évidente] : Si on stabilise les flux Salesforce, alors l'astreinte baisse, parce que c'est le système le plus sollicité. Infirmé si les logs montrent Salesforce < 30% des réveils.
H2 [contrarian] : Si 3 flux ETL legacy non-Salesforce font ≥50% des réveils, alors les traiter d'abord bat toute autre action. Infirmé si PagerDuty sur 3 mois les place sous 30%.
Retenue (impact/effort) : H2. MVT : extraire 3 mois de logs. Kill : abandon si < 30%.
Freeze-frame : instable, septembre déplace le pic.
Éliminer : 4 flux HU redondants post-collapse ABC. Doubler : monitoring middleware FR."

## Garde-fous

- Pas de ratio inventé. Koch : le déséquilibre est constant, le chiffre varie (90/10, 70/30). Dire "déséquilibre marqué", pas "exactement 80/20".
- Ne pas transformer un arbitrage rapide en Analysis lourde. Le routage protège : hypothèses multiples, scoring et kill chiffrés réservés aux enjeux forts.
- Hypothèses toujours au format "Si X, alors Y, parce que Z", une chaîne causale chacune, jamais fusionnées, toujours avec signal confirmant ET infirmant.
- Si l'utilisateur donne le 20% évident et refuse le contrarian, poser l'hypothèse alternative une fois, puis avancer.
