const fs = require('fs');
let src = fs.readFileSync('C:/Users/simon/Downloads/picolo_game.tsx', 'utf8');

function addToArray(src, marker, newEntries) {
  const idx = src.indexOf(marker);
  if (idx === -1) { console.log('NOT FOUND:', marker.slice(0,60)); return src; }
  const insertAt = idx + marker.length + 1;
  return src.slice(0, insertAt) + newEntries + src.slice(insertAt);
}

// Fix shuffle
src = src.replace(
  `  const pool = [];
  Object.entries(weights).forEach(([cat, count]) => {
    for (let i = 0; i < count; i++) {
      if (cat === "ultime") pool.push({ cat, fn: rnd(ultime) });
      else pool.push({ cat, fn: rnd(banks[cat][level]) });
    }
  });`,
  `  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const pool = [];
  Object.entries(weights).forEach(([cat, count]) => {
    if (cat === "ultime") {
      shuffle(ultime).slice(0, count).forEach(fn => pool.push({ cat, fn }));
    } else {
      shuffle(banks[cat][level]).slice(0, count).forEach(fn => pool.push({ cat, fn }));
    }
  });`
);

// Fix weights
src = src.replace(
  `    1: { jamais: 12, verite: 9, action: 12, vote: 10, tous: 10, bizarre: 8, interdit: 7, distrib: 9, collective: 6, duel: 6, ultime: 3 },
    2: { jamais: 11, verite: 11, action: 11, vote: 10, tous: 9, bizarre: 7, interdit: 7, distrib: 9, collective: 6, duel: 7, ultime: 5 },
    3: { jamais: 11, verite: 12, action: 10, vote: 10, tous: 8, bizarre: 6, interdit: 7, distrib: 9, collective: 8, duel: 7, ultime: 7 },`,
  `    1: { jamais: 20, verite: 16, action: 20, vote: 16, tous: 14, bizarre: 12, interdit: 10, distrib: 14, collective: 10, duel: 10, ultime: 5 },
    2: { jamais: 20, verite: 18, action: 18, vote: 16, tous: 13, bizarre: 11, interdit: 11, distrib: 14, collective: 10, duel: 11, ultime: 8 },
    3: { jamais: 20, verite: 20, action: 18, vote: 17, tous: 12, bizarre: 10, interdit: 11, distrib: 14, collective: 12, duel: 12, ultime: 11 },`
);

const insertions = [
  ['  const jamais1 = [', `    () => \`Je n'ai jamais liké accidentellement une photo en stalkant quelqu'un. Si oui → bois 2.\`,
    () => \`Je n'ai jamais utilisé le wifi de mes voisins sans le dire. Si oui → bois.\`,
    () => \`Je n'ai jamais fait semblant de ne pas voir quelqu'un dans la rue pour éviter de le saluer. Si oui → bois.\`,
    () => \`Je n'ai jamais regardé une série entière en une seule journée. Si oui → bois.\`,
    () => \`Je n'ai jamais mangé directement dans la casserole. Si oui → bois.\`,
    () => \`Je n'ai jamais sauté le brossage des dents le soir parce que j'étais trop fatigué(e). Si oui → bois.\`,
    () => \`Je n'ai jamais pleuré à cause d'un personnage de série. Si oui → bois.\`,
    () => \`Je n'ai jamais commandé de la bouffe en livraison par pure flemme. Si oui → bois.\`,
    () => \`Je n'ai jamais fouillé dans les affaires de quelqu'un sans permission. Si oui → bois 2.\`,
    () => \`Je n'ai jamais menti pour éviter d'aller à une fête. Si oui → bois.\`,
    () => \`Je n'ai jamais utilisé "j'ai pas vu ton message" alors que j'avais vu. Si oui → bois.\`,
    () => \`Je n'ai jamais mangé un truc périmé et m'en être rendu compte après. Si oui → bois 2.\`,
    () => \`Je n'ai jamais répondu "ça va" alors que ça n'allait vraiment pas. Si oui → bois.\`,
    () => \`Je n'ai jamais mangé la part de quelqu'un dans le frigo et menti dessus. Si oui → bois 2.\`,
    () => \`Je n'ai jamais fait un plan de soirée et annulé au dernier moment. Si oui → bois 2.\`,
    () => \`Je n'ai jamais acheté quelque chose d'inutile en ligne à 2h du mat. Si oui → bois 2.\`,
    () => \`Je n'ai jamais fait pipi sous la douche. Si oui → bois.\`,
    () => \`Je n'ai jamais passé plus de 30 min à choisir quoi regarder sans rien choisir. Si oui → bois 2.\`,
    () => \`Je n'ai jamais posté une photo puis la supprimé parce que pas assez de likes. Si oui → bois.\`,
    () => \`Je n'ai jamais mangé au lit et laissé des miettes. Si oui → bois.\`,
    () => \`Je n'ai jamais payé pour un abonnement que j'utilise jamais. Si oui → bois.\`,
    () => \`Je n'ai jamais chanté à tue-tête tout seul(e) en voiture. Si oui → bois.\`,
    () => \`Je n'ai jamais pris une photo de mon repas avant de le manger. Si oui → bois.\`,
    () => \`Je n'ai jamais pleuré dans un transport en commun. Si oui → bois 2.\`,
    () => \`Je n'ai jamais donné un faux numéro à quelqu'un. Si oui → bois.\`,
    () => \`Je n'ai jamais passé plus d'1h sur les toilettes avec mon téléphone. Si oui → bois.\`,
    () => \`Je n'ai jamais inventé une excuse pour ne pas aller au sport. Si oui → bois.\`,
    () => \`Je n'ai jamais commandé une pizza entière pour moi tout seul(e). Si oui → bois.\`,
    () => \`Je n'ai jamais menti sur mon niveau de langue à quelqu'un. Si oui → bois 2.\`,
    () => \`Je n'ai jamais saboté une recette et fait genre c'était voulu. Si oui → bois 2.\`,
    () => \`Je n'ai jamais googler mes symptômes et conclu que j'allais mourir. Si oui → bois.\`,
    () => \`Je n'ai jamais recyclé un cadeau reçu pour l'offrir à quelqu'un d'autre. Si oui → bois 2.\`,
    () => \`Je n'ai jamais fait semblant d'avoir lu un livre / vu un film pour paraître cultivé(e). Si oui → bois 2.\`,
    () => \`Je n'ai jamais oublié l'anniversaire de quelqu'un d'important. Si oui → bois 2.\`,
    () => \`Je n'ai jamais menti sur mon salaire à quelqu'un. Si oui → bois 2.\`,
`],
  ['  const jamais2 = [', `    () => \`Je n'ai jamais eu une double vie au moins une semaine. Si oui → bois 2.\`,
    () => \`Je n'ai jamais parlé en mal de quelqu'un et été surpris en train de le faire. Si oui → bois 3.\`,
    () => \`Je n'ai jamais eu un crush sur un prof ou un supérieur. Si oui → bois 2.\`,
    () => \`Je n'ai jamais lu le journal intime ou les messages privés de quelqu'un. Si oui → bois 2.\`,
    () => \`Je n'ai jamais commencé une rumeur. Si oui → bois 3.\`,
    () => \`Je n'ai jamais répondu à un ex qui revenait alors que j'étais en couple. Si oui → bois 3.\`,
    () => \`Je n'ai jamais continué à parler à quelqu'un juste pour garder l'option ouverte. Si oui → bois 2.\`,
    () => \`Je n'ai jamais menti sur mon passé romantique à un(e) partenaire. Si oui → bois 2.\`,
    () => \`Je n'ai jamais dépensé une somme déraisonnable dans une seule nuit. Si oui → bois 2.\`,
`],
  ['  const jamais3 = [', `    () => \`Je n'ai jamais eu une attirance pour quelqu'un de cette pièce que je n'ai jamais avouée. Si oui → bois 3 et regarde cette personne.\`,
    () => \`Je n'ai jamais fantasmé sur quelqu'un de beaucoup plus vieux/jeune que moi. Si oui → bois 3.\`,
    () => \`Je n'ai jamais eu des sentiments pour quelqu'un de la table sans jamais rien dire. Si oui → bois SEC.\`,
    () => \`Je n'ai jamais imaginé une scène avec quelqu'un de présent ce soir. Si oui → bois 3.\`,
`],
  ['  const verite1 = [', `    () => \`\${rndP()} : quelle est ta pire qualité selon toi ? Refuse = bois 2.\`,
    () => \`\${rndP()} : le moment où tu as eu le plus peur de ta vie ? Refuse = bois 2.\`,
    () => \`\${rndP()} : ton plus grand regret jusqu'à présent ? Refuse = bois 2.\`,
    () => \`\${rndP()} : si tu pouvais changer une chose de toi, ce serait quoi ? Refuse = bois 2.\`,
    () => \`\${rndP()} : ton plus gros défaut que tu n'admets jamais ? Refuse = bois 2.\`,
    () => \`\${rndP()} : le truc qui te ferait pleurer le plus vite là maintenant ? Refuse = bois 2.\`,
    () => \`\${rndP()} : la personne qui t'a le plus déçu(e) dans ta vie ? Refuse = bois 2.\`,
    () => \`\${rndP()} : ton plus grand mensonge blanc récent ? Refuse = bois 2.\`,
    () => \`\${rndP()} : ton pire défaut en tant qu'ami(e) ? Refuse = bois 2.\`,
`],
  ['  const verite2 = [', `    () => \`\${rndP()} : ta pire rupture que t'aies vécue ou faite, raconte. Refuse = bois 3.\`,
    () => \`\${rndP()} : la chose la plus risquée que t'aies faite sans que personne le sache ? Refuse = bois 3.\`,
    () => \`\${rndP()} : si tu pouvais lire les pensées d'une personne de cette table, ce serait qui ? Refuse = bois 2.\`,
    () => \`\${rndP()} : le truc le plus bizarre qui t'attire physiquement ? Refuse = bois 3.\`,
    () => \`\${rndP()} : ton pire comportement quand tu es bourré(e) ? Refuse = bois 3.\`,
    () => \`\${rndP()} : si tu devais embrasser quelqu'un ici sans que ce soit romantique, qui ? Refuse = bois 3.\`,
    () => \`\${rndP()} : ton plus gros complexe au lit ? Refuse = bois 3.\`,
`],
  ['  const verite3 = [', `    () => \`\${rndP()} : si tu devais déshabiller mentalement quelqu'un de cette pièce, ce serait qui ? Refuse = bois SEC.\`,
    () => \`\${rndP()} : le truc le plus osé que t'aies jamais proposé à quelqu'un ? Refuse = bois SEC.\`,
    () => \`\${rndP()} : si tu devais passer une nuit avec quelqu'un ici mais personne n'en saurait jamais rien, qui ? Refuse = bois SEC.\`,
`],
  ['  // === ACTION (débiles / gênantes, sans contact physique imposé) ===\n  const action1 = [', `    () => \`\${rndP()} doit parler en verlan jusqu'à la prochaine carte. Oubli = gorgée.\`,
    () => \`Tout le monde sort son téléphone et montre la DERNIÈRE photo de sa galerie. Qui refuse boit 3.\`,
    () => \`\${rndP()} doit dire un compliment sincère à chaque personne de la table en moins de 30 sec. Trop lent = bois 2.\`,
    () => \`Le premier qui sourit boit 2. GO !\`,
    () => \`\${rndP()} doit parler uniquement en chuchotant jusqu'à la prochaine carte. Oubli = gorgée.\`,
    () => \`Le dernier à crier "GOLMON" boit 2. GO !\`,
    () => \`\${rndP()} doit inventer un cocktail imaginaire et le vendre comme un barman 5 étoiles. Rate = bois 2.\`,
    () => \`Tout le monde doit changer de place. Le dernier assis boit 2. GO !\`,
    () => \`\${rndP()} doit prétendre être célèbre et répondre aux questions de la table pendant 30 sec. Rate = bois 2.\`,
    () => \`\${rndP()} doit réciter l'alphabet à l'envers aussi vite que possible. Bloque avant M = bois 3.\`,
    () => \`Tout le monde bat le rythme. \${rndP()} doit improviser un rap de 4 lignes. Aucune rime = bois 2.\`,
    () => \`\${rndP()} doit imiter la marche d'une célébrité choisie par la table. Rate = bois 2.\`,
`],
  ['  const action2 = [', `    () => \`\${rndP()} doit faire un tour de magie de sa composition. Raté = bois 3.\`,
    () => \`\${rndP()} doit raconter une histoire de 30 sec qui finit par "et c'est pourquoi je bois". La table juge.\`,
    () => \`\${rndP()} doit convaincre la table d'un mensonge absurde. Si quelqu'un croit → distribue 3 gorgées.\`,
    () => \`\${rndP()} doit faire une pub de 20 sec pour le verre qu'il/elle tient. Pas convainquant = bois 2.\`,
    () => \`\${rndP()} doit inventer un surnom à chaque personne de la table en 20 sec. Trop lent = bois 2.\`,
    () => \`Concours : \${rndP()} vs la personne en face — qui garde son sérieux le plus longtemps ? La table tente de les faire rire. Le premier à craquer boit 3.\`,
`],
  ['  const action3 = [', `    () => \`\${rndP()} doit faire une confession de désir de 20 sec à la table, sans nommer de prénom. Refuse = bois SEC.\`,
    () => \`\${rndP()} doit voter pour qui dans la table il/elle embrasserait là maintenant, puis expliquer pourquoi. Refuse = bois SEC.\`,
`],
  ['  // === VOTE (humiliants / drôles, pas d\'attaque dégradante réelle) ===\n  const vote1 = [', `    () => \`VOTE : qui a le pire style vestimentaire ce soir ? L'élu boit 2.\`,
    () => \`VOTE : qui est le plus susceptible d'envoyer un message bizarre à 3h du mat ? L'élu boit 2.\`,
    () => \`VOTE : qui a le meilleur sens de l'humour ? L'élu donne 2 gorgées à qui il veut.\`,
    () => \`VOTE : qui a le plus de potentiel mais le gâche ? L'élu boit 3 et répond s'il est d'accord.\`,
    () => \`VOTE : qui est le plus honnête de la table ? L'élu distribue 2 gorgées.\`,
    () => \`VOTE : qui est le plus susceptible de tomber amoureux ce soir ? L'élu boit 2.\`,
`],
  ['  const vote2 = [', `    () => \`VOTE : qui aurait le plus de matchs sur Tinder selon vous ? L'élu boit 2.\`,
    () => \`VOTE : qui est le plus "compliqué(e)" en couple ? L'élu boit 3 et admet ou nie.\`,
    () => \`VOTE : qui a clairement quelqu'un en tête ce soir ? L'élu boit 3.\`,
    () => \`VOTE : qui est le plus susceptible de regretter quelque chose cette nuit ? L'élu boit 2.\`,
`],
  ['  const vote3 = [', `    () => \`VOTE : qui a le regard le plus intense de la table ? L'élu fixe quelqu'un de son choix 10 sec, les deux boivent SEC.\`,
    () => \`VOTE : qui ici donne le plus envie ce soir ? L'élu choisit qui boit SEC avec lui/elle.\`,
`],
  ['  // === TOUT LE MONDE (cartes générales) ===\n  const tous1 = [', `    () => \`Tout le monde pose son téléphone face retournée jusqu'à la prochaine carte. Qui regarde le sien boit 3.\`,
    () => \`Le premier à tousser ou éternuer boit 2.\`,
    () => \`Tous ceux qui ont une notification non lue en ce moment boivent 2.\`,
    () => \`Le plus grand et le plus petit s'affrontent en cul sec. Les autres regardent.\`,
`],
  ['  const tous2 = [', `    () => \`Tous ceux qui ont déjà pleuré en écoutant une chanson boivent 2.\`,
    () => \`Tous ceux qui ont regardé un ex sur les réseaux dans la semaine boivent 2.\`,
    () => \`Tout le monde compte jusqu'à 10 en chœur. Qui se décale boit 2.\`,
    () => \`Tous ceux qui pensent que quelqu'un dans la pièce les trouve attirant(e) boivent 2 et regardent cette personne.\`,
`],
  ['  const tous3 = [', `    () => \`Tout le monde dit qui, selon lui, sera le plus "chaud" ce soir. En même temps au compte de 3. Les deux plus cités boivent SEC.\`,
`],
  ['  // === BIZARRE (mini-jeux de boisson) ===\n  const bizarre1 = [', `    () => \`Tout le monde boit en faisant un bruit d'animal différent entre chaque gorgée. Le moins créatif reboit.\`,
    () => \`\${rndP()} invente une règle bizarre pour boire que tout le monde suit jusqu'à la prochaine carte.\`,
    () => \`Concours : qui fait le visage le plus dégoûté après avoir bu quelque chose de bon ? Le perdant reboit.\`,
`],
  ['  const bizarre2 = [', `    () => \`Tout le monde boit en faisant semblant que son verre est la meilleure chose goûtée de sa vie. Le moins convaincant reboit.\`,
    () => \`\${rndP()} boit en comptant à voix haute les secondes. Trop vite ou trop lent = reboit.\`,
    () => \`Concours de qui boit le plus lentement sans poser le verre. Le premier à poser boit encore.\`,
`],
  ['  const bizarre3 = [', `    () => \`\${rndP()} est le "chef de gorgée" : il/elle décide quand tout le monde boit pendant les 2 prochaines cartes. Anticipation ou oubli = gorgée.\`,
`],
  ['  const interdit1 = [', `    () => \`RÈGLE : interdiction de dire le prénom de qui que ce soit. On dit "lui", "elle", "eux". Qui craque boit 2.\`,
    () => \`RÈGLE : interdiction de jurer. Chaque gros mot = 1 gorgée immédiate.\`,
`],
  ['  const interdit2 = [', `    () => \`RÈGLE : tout le monde doit parler lentement, comme au ralenti. Qui accélère boit 2.\`,
    () => \`RÈGLE : interdiction de dire le mot "jeu". Qui craque boit 2.\`,
`],
  ['  const interdit3 = [', `    () => \`RÈGLE GOLMON : tout le monde doit terminer ses phrases par "...et j'assume". Qui oublie boit 3.\`,
    () => \`RÈGLE : \${rndP()} est "le juge". Il/elle peut donner 1 gorgée à qui parle trop, trop peu ou dit quelque chose de banal. Jusqu'à la prochaine carte.\`,
`],
  ['  const distrib1 = [', `    () => ({ n: 2, desc: \`\${rndP()} distribue 2 gorgées à la personne qu'il/elle pense être la plus honnête.\` }),
    () => ({ n: 2, desc: \`\${rndP()} distribue 2 gorgées à la personne qui a le moins bu jusqu'ici.\` }),
`],
  ['  const distrib2 = [', `    () => ({ n: 3, desc: \`\${rndP()} distribue 3 gorgées à la personne dont il/elle aimerait le plus lire les messages.\` }),
    () => ({ n: 2, desc: \`\${rndP()} distribue 2 gorgées à la personne qui l'a fait rire le plus ce soir.\` }),
`],
  ['  const distrib3 = [', `    () => ({ n: 4, desc: \`\${rndP()} distribue 4 gorgées à la personne avec qui il/elle aurait le plus de tension si on les enfermait seuls.\` }),
    () => ({ n: 3, desc: \`\${rndP()} distribue 3 gorgées à la personne qu'il/elle ne s'attendait pas à trouver aussi attirant(e).\` }),
`],
  ['  // === PÉNALITÉ COLLECTIVE ===\n  const coll1 = [', `    () => \`Tout le monde avoue son dernier mensonge à quelqu'un de la table. Le plus gros menteur boit 3.\`,
    () => \`\${rndP()} choisit un "binôme de destin" : deux personnes qui doivent faire tout pareil pendant 3 cartes.\`,
`],
  ['  const coll2 = [', `    () => \`Tour de table : chacun dit le meilleur souvenir qu'il a avec quelqu'un de présent. Le plus émouvant distribue 3 gorgées.\`,
    () => \`Le groupe désigne les deux personnes les plus susceptibles d'avoir un secret. Elles boivent 3 et peuvent mentir.\`,
`],
  ['  const coll3 = [', `    () => \`Tour de table : chacun dit ce qu'il pense secrètement de quelqu'un sans le nommer. Les autres devinent. L'auteur boit SEC si deviné.\`,
    () => \`Chacun écrit un mensonge et une vérité sur lui. La table vote laquelle est vraie. Qui trompe tout le monde distribue 4 gorgées.\`,
`],
  ['  // === DUEL ===\n  const duel1 = [', `    () => { const [a,b] = rndTwo(); return \`DUEL : \${a} vs \${b} — qui retient le mieux son souffle. Le premier à lâcher boit 3.\`; },
    () => { const [a,b] = rndTwo(); return \`DUEL : \${a} vs \${b} — qui connaît le mieux l'autre ? 3 questions chacun. Le moins bon boit 3.\`; },
`],
  ['  const duel2 = [', `    () => { const [a,b] = rndTwo(); return \`DUEL : \${a} pose une question à \${b} sur sa vie sentimentale. \${b} répond honnêtement ou boit SEC.\`; },
    () => { const [a,b] = rndTwo(); return \`DUEL : \${a} vs \${b} — qui peut décrire l'autre en 10 mots. Le moins précis boit 3.\`; },
`],
  ['  const duel3 = [', `    () => { const [a,b] = rndTwo(); return \`DUEL GOLMON : \${a} et \${b} se regardent dans les yeux et disent chacun un truc jamais dit à voix haute. Le plus timide boit SEC.\`; },
    () => { const [a,b] = rndTwo(); return \`DUEL : \${a} dit à \${b} ce qu'il/elle pense vraiment de ses sentiments pour quelqu'un de la pièce. \${b} boit SEC dans tous les cas.\`; },
`],
  ['  // === PÉNALITÉ ULTIME (participatif / duel / ciblé) ===\n  const ultime = [', `    () => ({ mode: "PARTICIPATIF 🌍", desc: \`La table invente une règle fun pour \${rndP()}. Il/elle l'accepte ou boit SEC + 2.\` }),
    () => { const [a,b] = rndTwo(); return { mode: "DUEL ⚔️", desc: \`\${a} et \${b} s'avouent le truc le plus intime qu'ils pensent l'un de l'autre. Refuse = bois SEC.\` }; },
`],
];

for (const [marker, entries] of insertions) {
  src = addToArray(src, marker, entries);
}

fs.writeFileSync('C:/Users/simon/Downloads/golmon-proj/src/App.tsx', src, 'utf8');
console.log('Done! Size:', src.length, 'bytes');
console.log('Encoding:', src.includes('é') && src.includes('\uD83C') ? 'OK' : 'CHECK');
