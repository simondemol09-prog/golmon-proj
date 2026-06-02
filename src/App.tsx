import { useState } from "react";

const CAT = {
  JAMAIS: "jamais",
  VERITE: "verite",
  ACTION: "action",
  VOTE: "vote",
  TOUS: "tous",
  BIZARRE: "bizarre",
  INTERDIT: "interdit",
  DISTRIB: "distrib",
  COLLECTIVE: "collective",
  DUEL: "duel",
  ULTIME: "ultime",
};

const CAT_LABELS = {
  jamais: "🍺 Je n'ai jamais",
  verite: "🔥 Vérité",
  action: "🤡 Action",
  vote: "🗳️ Vote",
  tous: "🍻 Tout le monde",
  bizarre: "🌀 Bizarre",
  interdit: "🤐 Mot interdit",
  distrib: "🎁 Distribution",
  collective: "💀 Pénalité Collective",
  duel: "⚔️ Duel",
  ultime: "☠️ PÉNALITÉ ULTIME",
};

const CAT_COLORS = {
  jamais: "#7d3cff",
  verite: "#c0392b",
  action: "#16a085",
  vote: "#8e44ad",
  tous: "#0fa3b1",
  bizarre: "#f39c12",
  interdit: "#2ecc71",
  distrib: "#e84393",
  collective: "#d4145a",
  duel: "#ff6b35",
  ultime: "#ff003c",
};

// Difficulté : 1 = Soft, 2 = Hardcore, 3 = Golmon
const LEVELS = [
  { id: 3, name: "GOLMON", color: "#ff003c", desc: "Plus aucune limite" },
];

const buildDeck = (players, level) => {
  const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const rndP = () => rnd(players);
  const rndTwo = () => {
    if (players.length < 2) return [players[0], players[0]];
    const a = rnd(players);
    let b = rnd(players);
    while (b === a) b = rnd(players);
    return [a, b];
  };

  // === JE N'AI JAMAIS ===
  const jamais1 = [
    () => `Je n'ai jamais liké accidentellement une photo en stalkant quelqu'un. Si oui → bois 2.`,
    () => `Je n'ai jamais utilisé le wifi de mes voisins sans le dire. Si oui → bois.`,
    () => `Je n'ai jamais fait semblant de ne pas voir quelqu'un dans la rue pour éviter de le saluer. Si oui → bois.`,
    () => `Je n'ai jamais regardé une série entière en une seule journée. Si oui → bois.`,
    () => `Je n'ai jamais mangé directement dans la casserole. Si oui → bois.`,
    () => `Je n'ai jamais sauté le brossage des dents le soir parce que j'étais trop fatigué(e). Si oui → bois.`,
    () => `Je n'ai jamais pleuré à cause d'un personnage de série. Si oui → bois.`,
    () => `Je n'ai jamais commandé de la bouffe en livraison par pure flemme. Si oui → bois.`,
    () => `Je n'ai jamais fouillé dans les affaires de quelqu'un sans permission. Si oui → bois 2.`,
    () => `Je n'ai jamais menti pour éviter d'aller à une fête. Si oui → bois.`,
    () => `Je n'ai jamais utilisé "j'ai pas vu ton message" alors que j'avais vu. Si oui → bois.`,
    () => `Je n'ai jamais mangé un truc périmé et m'en être rendu compte après. Si oui → bois 2.`,
    () => `Je n'ai jamais répondu "ça va" alors que ça n'allait vraiment pas. Si oui → bois.`,
    () => `Je n'ai jamais mangé la part de quelqu'un dans le frigo et menti dessus. Si oui → bois 2.`,
    () => `Je n'ai jamais fait un plan de soirée et annulé au dernier moment. Si oui → bois 2.`,
    () => `Je n'ai jamais acheté quelque chose d'inutile en ligne à 2h du mat. Si oui → bois 2.`,
    () => `Je n'ai jamais fait pipi sous la douche. Si oui → bois.`,
    () => `Je n'ai jamais passé plus de 30 min à choisir quoi regarder sans rien choisir. Si oui → bois 2.`,
    () => `Je n'ai jamais posté une photo puis la supprimé parce que pas assez de likes. Si oui → bois.`,
    () => `Je n'ai jamais mangé au lit et laissé des miettes. Si oui → bois.`,
    () => `Je n'ai jamais payé pour un abonnement que j'utilise jamais. Si oui → bois.`,
    () => `Je n'ai jamais chanté à tue-tête tout seul(e) en voiture. Si oui → bois.`,
    () => `Je n'ai jamais pris une photo de mon repas avant de le manger. Si oui → bois.`,
    () => `Je n'ai jamais pleuré dans un transport en commun. Si oui → bois 2.`,
    () => `Je n'ai jamais donné un faux numéro à quelqu'un. Si oui → bois.`,
    () => `Je n'ai jamais passé plus d'1h sur les toilettes avec mon téléphone. Si oui → bois.`,
    () => `Je n'ai jamais inventé une excuse pour ne pas aller au sport. Si oui → bois.`,
    () => `Je n'ai jamais commandé une pizza entière pour moi tout seul(e). Si oui → bois.`,
    () => `Je n'ai jamais menti sur mon niveau de langue à quelqu'un. Si oui → bois 2.`,
    () => `Je n'ai jamais saboté une recette et fait genre c'était voulu. Si oui → bois 2.`,
    () => `Je n'ai jamais googler mes symptômes et conclu que j'allais mourir. Si oui → bois.`,
    () => `Je n'ai jamais recyclé un cadeau reçu pour l'offrir à quelqu'un d'autre. Si oui → bois 2.`,
    () => `Je n'ai jamais fait semblant d'avoir lu un livre / vu un film pour paraître cultivé(e). Si oui → bois 2.`,
    () => `Je n'ai jamais oublié l'anniversaire de quelqu'un d'important. Si oui → bois 2.`,
    () => `Je n'ai jamais menti sur mon salaire à quelqu'un. Si oui → bois 2.`,
    () => `Je n'ai jamais menti sur mon nombre de partenaires. Si oui → bois.`,
    () => `Je n'ai jamais envoyé un message coquin à la mauvaise personne. Si oui → bois 2.`,
    () => `Je n'ai jamais fait semblant de prendre du plaisir. Si oui → bois.`,
    () => `Je n'ai jamais embrassé quelqu'un dont j'avais oublié le prénom. Si oui → bois 2.`,
    () => `Je n'ai jamais stalké un ex à 3h du mat. Si oui → bois.`,
    () => `Je n'ai jamais flashé sur quelqu'un de présent ce soir. Si oui → bois discrètement.`,
    () => `Je n'ai jamais vomi à cause de l'alcool. Si oui → bois.`,
    () => `Je n'ai jamais menti sur l'endroit où j'étais à quelqu'un. Si oui → bois.`,
    () => `Je n'ai jamais fait semblant d'aimer un cadeau. Si oui → bois.`,
    () => `Je n'ai jamais pleuré devant un film de Disney. Si oui → bois.`,
    () => `Je n'ai jamais espionné le téléphone de mon/ma partenaire. Si oui → bois 2.`,
    () => `Je n'ai jamais fait croire que j'avais lu un message alors que non. Si oui → bois.`,
    () => `Je n'ai jamais chanté sous la douche en imaginant un public. Si oui → bois.`,
    () => `Je n'ai jamais fait pipi dans une piscine. Si oui → bois 2.`,
    () => `Je n'ai jamais mangé une pizza tombée par terre en mode 5 secondes. Si oui → bois.`,
    () => `Je n'ai jamais gardé le même caleçon/culotte pendant plus de 10 jours. Si oui → bois 2.`,
    () => `Je n'ai jamais fait semblant d'être malade pour éviter de payer une addition. Si oui → bois 2.`,
    () => `Je n'ai jamais parlé tout seul à voix haute dans la rue. Si oui → bois.`,
    () => `Je n'ai jamais mangé du ketchup à la cuillère. Si oui → bois.`,
    () => `Je n'ai jamais pleuré devant un film complètement stone. Si oui → bois.`,
    () => `Je n'ai jamais fait un monologue bourré devant le miroir. Si oui → bois.`,
    () => `Je n'ai jamais hurlé des insultes à des pigeons dans la rue. Si oui → bois 2.`,
    () => `Je n'ai jamais bu du jus de cornichon en shot. Si oui → bois 2.`,
    () => `Je n'ai jamais mis du beurre directement dans ma bouche comme un sauvage. Si oui → bois 2.`,
    () => `Je n'ai jamais pissé dans un lavabo parce que les toilettes étaient trop loin. Si oui → bois 2.`,
    () => `Je n'ai jamais volé de la nourriture dans le frigo de mes potes. Si oui → bois 2.`,
    () => `Je n'ai jamais dormi par terre dans un couloir parce que j'étais trop bourré. Si oui → bois 2.`,
    () => `Je n'ai jamais sniffé du déodorant pour voir ce que ça faisait. Si oui → bois.`,
    () => `Je n'ai jamais hurlé des insultes à des inconnus depuis un balcon. Si oui → bois 2.`,
    () => `Je n'ai jamais gardé des chaussettes sales sous mon lit pendant plus d'un mois. Si oui → bois 2.`,
    () => `Je n'ai jamais bu de l'alcool directement dans une bouteille de shampoing. Si oui → bois 2.`,
    () => `Je n'ai jamais vomi dans un évier de cuisine et fait comme si de rien n'était. Si oui → bois 3.`,
    () => `Je n'ai jamais mis du dentifrice sur des boutons parce que j'avais rien d'autre. Si oui → bois.`,
    () => `Je n'ai jamais fait la vaisselle avec de l'eau de vaisselle déjà sale. Si oui → bois 2.`,
    () => `Je n'ai jamais mangé des pâtes froides au ketchup pendant 3 jours. Si oui → bois 2.`,
    () => `Je n'ai jamais caché des canettes vides sous mon lit pendant des semaines. Si oui → bois.`,
    () => `Je n'ai jamais fait un concours de rots le plus long et le plus bruyant. Si oui → bois 2.`,
    () => `Je n'ai jamais dormi avec mes chaussures aux pieds toute la nuit. Si oui → bois.`,
    () => `Je n'ai jamais reniflé mes aisselles pour voir si ça sentait encore. Si oui → bois 2.`,
    () => `Je n'ai jamais fait semblant d'avoir une conversation téléphonique pour éviter quelqu'un. Si oui → bois.`,
    () => `Je n'ai jamais mangé du pain moisi en enlevant juste les parties vertes. Si oui → bois 2.`,
    () => `Je n'ai jamais pissé dans un pot de fleurs à une soirée. Si oui → bois 3.`,
    () => `Je n'ai jamais gardé un reste de kebab sous mon lit "pour plus tard". Si oui → bois 2.`,
    () => `Je n'ai jamais hurlé le nom d'une ex en pleine nuit en dormant. Si oui → bois 2.`,
    () => `Je n'ai jamais bu directement au carton de lait sans verre. Si oui → bois.`,
    () => `Je n'ai jamais dormi dans une baignoire parce que j'avais raté mon lit. Si oui → bois 2.`,
    () => `Je n'ai jamais sniffé du poivre pour me faire éternuer. Si oui → bois.`,
    () => `Je n'ai jamais fait un rap improvisé sur mes propres problèmes de cul. Si oui → bois 2.`,
    () => `Je n'ai jamais mangé des céréales avec de l'eau parce qu'il n'y avait plus de lait. Si oui → bois.`,
    () => `Je n'ai jamais laissé traîner des assiettes sales pendant plus d'un mois. Si oui → bois 2.`,
    () => `Je n'ai jamais bu du vinaigre en pensant que c'était du jus. Si oui → bois 2.`,
    () => `Je n'ai jamais fait semblant d'être possédé par un esprit devant mes potes. Si oui → bois 2.`,
    () => `Je n'ai jamais reniflé l'intérieur de mes chaussures après une longue journée. Si oui → bois 2.`,
    () => `Je n'ai jamais gardé mes rognures d'ongles dans un petit pot. Si oui → bois 3.`,
    () => `Je n'ai jamais parlé à ma plante comme à une personne pendant des semaines. Si oui → bois.`,
    () => `Je n'ai jamais mangé une pomme de terre crue par flemme de la cuire. Si oui → bois.`,
    () => `Je n'ai jamais fait un concours de qui tient le plus longtemps sans aller aux toilettes. Si oui → bois 2.`,
    () => `Je n'ai jamais hurlé "Je suis le meilleur" tout seul dans ma chambre. Si oui → bois.`,
    () => `Je n'ai jamais bu de l'eau des pâtes après les avoir cuites. Si oui → bois 2.`,
    () => `Je n'ai jamais gardé un ticket de caisse pendant plus d'un an "au cas où". Si oui → bois.`,
    () => `Je n'ai jamais fait une danse ridicule tout seul devant ma caméra en mode selfie. Si oui → bois.`,
    () => `Je n'ai jamais dormi avec une serviette mouillée sur le visage. Si oui → bois.`,
    () => `Je n'ai jamais mangé de la colle UHU pour voir ce que ça goûtait. Si oui → bois 2.`,
  ];
  const jamais2 = [
    () => `Je n'ai jamais eu une double vie au moins une semaine. Si oui → bois 2.`,
    () => `Je n'ai jamais parlé en mal de quelqu'un et été surpris en train de le faire. Si oui → bois 3.`,
    () => `Je n'ai jamais eu un crush sur un prof ou un supérieur. Si oui → bois 2.`,
    () => `Je n'ai jamais lu le journal intime ou les messages privés de quelqu'un. Si oui → bois 2.`,
    () => `Je n'ai jamais commencé une rumeur. Si oui → bois 3.`,
    () => `Je n'ai jamais répondu à un ex qui revenait alors que j'étais en couple. Si oui → bois 3.`,
    () => `Je n'ai jamais continué à parler à quelqu'un juste pour garder l'option ouverte. Si oui → bois 2.`,
    () => `Je n'ai jamais menti sur mon passé romantique à un(e) partenaire. Si oui → bois 2.`,
    () => `Je n'ai jamais dépensé une somme déraisonnable dans une seule nuit. Si oui → bois 2.`,
    () => `Je n'ai jamais eu un plan d'un soir que j'ai jamais avoué à mes potes. Si oui → bois 2.`,
    () => `Je n'ai jamais pensé à quelqu'un d'autre que mon/ma partenaire pendant l'acte. Si oui → bois 2.`,
    () => `Je n'ai jamais envoyé un nude. Si oui → bois 2.`,
    () => `Je n'ai jamais fait des trucs interdits dans un lieu public. Si oui → bois 3.`,
    () => `Je n'ai jamais menti à un date sur ma situation. Si oui → bois.`,
    () => `Je n'ai jamais ghosté quelqu'un juste après avoir couché. Si oui → bois 2.`,
    () => `Je n'ai jamais embrassé deux personnes différentes dans la même soirée. Si oui → bois 2.`,
    () => `Je n'ai jamais menti à un(e) ami(e) sur ce que je pensais de son/sa partenaire. Si oui → bois 2.`,
    () => `Je n'ai jamais fait semblant de dormir pour éviter quelqu'un. Si oui → bois.`,
    () => `Je n'ai jamais dragué quelqu'un juste pour rendre une autre personne jalouse. Si oui → bois 2.`,
    () => `Je n'ai jamais regardé le profil d'un ex et de son nouveau/nouvelle. Si oui → bois 2.`,
    () => `Je n'ai jamais flirté avec quelqu'un alors que j'étais en couple. Si oui → bois 3.`,
    () => `Je n'ai jamais menti sur mon âge pour impressionner. Si oui → bois.`,
    () => `Je n'ai jamais piqué quelque chose dans un magasin. Si oui → bois 2.`,
    () => `Je n'ai jamais piqué de la bouffe dans le frigo d'un coloc. Si oui → bois 2.`,
    () => `Je n'ai jamais bu de l'alcool en douce dans un contenant pas prévu pour ça. Si oui → bois 2.`,
    () => `Je n'ai jamais fait un vomi arc-en-ciel après un mélange douteux. Si oui → bois 3.`,
    () => `Je n'ai jamais léché un truc dégueu pour un pari. Si oui → bois 2.`,
    () => `Je n'ai jamais pissé dans un endroit totalement inapproprié en soirée. Si oui → bois 3.`,
    () => `Je n'ai jamais fait un concours de pets. Si oui → bois 2.`,
  ];
  const jamais3 = [
    () => `Je n'ai jamais eu une attirance pour quelqu'un de cette pièce que je n'ai jamais avouée. Si oui → bois 3 et regarde cette personne.`,
    () => `Je n'ai jamais fantasmé sur quelqu'un de beaucoup plus vieux/jeune que moi. Si oui → bois 3.`,
    () => `Je n'ai jamais eu des sentiments pour quelqu'un de la table sans jamais rien dire. Si oui → bois SEC.`,
    () => `Je n'ai jamais imaginé une scène avec quelqu'un de présent ce soir. Si oui → bois 3.`,
    () => `Je n'ai jamais eu un fantasme que je trouve moi-même chelou. Si oui → bois 3 et la table peut te poser UNE question.`,
    () => `Je n'ai jamais flashé sur quelqu'un que je n'aurais VRAIMENT pas dû. Si oui → bois 3.`,
    () => `Je n'ai jamais eu un plan à plusieurs. Si oui → bois SEC.`,
    () => `Je n'ai jamais menti ce soir même dans ce jeu. Si oui → bois 3.`,
    () => `Je n'ai jamais désiré quelqu'un présent dans cette pièce là, maintenant. Si oui → bois et regarde-le/la dans les yeux.`,
    () => `Je n'ai jamais fait un truc que je n'avouerai à PERSONNE. Si oui → bois 3, tu gardes ton secret.`,
    () => `Je n'ai jamais simulé être malade pour rentrer plus tôt d'une soirée et finir avec quelqu'un. Si oui → bois 3.`,
    () => `Je n'ai jamais embrassé quelqu'un du même groupe d'amis en cachette. Si oui → bois SEC.`,
    () => `Je n'ai jamais eu un crush sur le/la partenaire d'un(e) ami(e). Si oui → bois 3.`,
    () => `Je n'ai jamais menti sur "c'était la première fois que je faisais ça". Si oui → bois 3.`,
    () => `Je n'ai jamais relu d'anciens messages chauds pour les vibes. Si oui → bois 2.`,
    () => `Je n'ai jamais regretté quelqu'un avec qui j'ai couché DÈS le lendemain matin. Si oui → bois 3.`,
    () => `Je n'ai jamais gardé un secret qui détruirait une amitié s'il sortait. Si oui → bois SEC.`,
    () => `Je n'ai jamais menti dans un "je n'ai jamais". Si oui → bois 3, balance par-dessus le marché.`,
    () => `Je n'ai jamais utilisé un jouet ou un accessoire pendant un rapport. Si oui → bois 3.`,
    () => `Je n'ai jamais eu un coup d'un soir le soir même de la rencontre. Si oui → bois SEC.`,
    () => `Je n'ai jamais fait semblant d'avoir fini pour que ça s'arrête. Si oui → bois 3.`,
    () => `Je n'ai jamais eu un crush secret sur un ami proche. Si oui → bois 3.`,
    () => `Je n'ai jamais simulé un orgasme. Si oui → bois 2.`,
    () => `Je n'ai jamais regardé du porno vraiment bizarre. Si oui → bois 2.`,
    () => `Je n'ai jamais envoyé une photo intime à la mauvaise personne. Si oui → bois SEC.`,
    () => `Je n'ai jamais volé les affaires de quelqu'un. Si oui → bois 2.`,
  ];

  // === VÉRITÉ ===
  const verite1 = [
    () => `${rndP()} : quelle est ta pire qualité selon toi ? Refuse = bois 2.`,
    () => `${rndP()} : le moment où tu as eu le plus peur de ta vie ? Refuse = bois 2.`,
    () => `${rndP()} : ton plus grand regret jusqu'à présent ? Refuse = bois 2.`,
    () => `${rndP()} : si tu pouvais changer une chose de toi, ce serait quoi ? Refuse = bois 2.`,
    () => `${rndP()} : ton plus gros défaut que tu n'admets jamais ? Refuse = bois 2.`,
    () => `${rndP()} : le truc qui te ferait pleurer le plus vite là maintenant ? Refuse = bois 2.`,
    () => `${rndP()} : la personne qui t'a le plus déçu(e) dans ta vie ? Refuse = bois 2.`,
    () => `${rndP()} : ton plus grand mensonge blanc récent ? Refuse = bois 2.`,
    () => `${rndP()} : ton pire défaut en tant qu'ami(e) ? Refuse = bois 2.`,
    () => `${rndP()} : la personne du groupe que tu trouves la plus attirante ? Réponds ou bois 2.`,
    () => `${rndP()} : ton pire date de tous les temps, raconte. Refuse = 2 gorgées.`,
    () => `${rndP()} : ton lieu le plus improbable où t'as fait des trucs ? Refuse = 2 gorgées.`,
    () => `${rndP()} : combien de personnes t'as embrassé dans ta vie ? Mens et bois quand même.`,
    () => `${rndP()} : ton plus gros mensonge à tes parents ? Refuse = 2 gorgées.`,
    () => `${rndP()} : la dernière fois que t'as pleuré et pourquoi ? Refuse = 2 gorgées.`,
    () => `${rndP()} : ton crush de jeunesse le plus honteux ? Refuse = 2 gorgées.`,
    () => `${rndP()} : quel est ton plus gros complexe ? Refuse = bois 2.`,
    () => `${rndP()} : le truc le plus dégueu que t'as mangé sur un pari ? Refuse = 2 gorgées.`,
    () => `${rndP()} : la pire bêtise que t'as faite enfant ? Refuse = 2 gorgées.`,
    () => `${rndP()} : ton pire moment de honte en public ? Refuse = 2 gorgées.`,
    () => `${rndP()} : quelle partie de ton corps tu détestes le plus ? Refuse = bois 2.`,
    () => `${rndP()} : quelle personne ici te semble la plus attirante sexuellement ? Refuse = bois 2.`,
    () => `${rndP()} : qui dans le groupe aimerais-tu embrasser ? Refuse = bois 2.`,
    () => `${rndP()} : as-tu déjà fantasmé sur quelqu'un de cette soirée ? Réponds ou bois 2.`,
    () => `${rndP()} : qui ici a le meilleur corps selon toi ? Refuse = bois 2.`,
    () => `${rndP()} : as-tu déjà eu un crush sur un ami proche ? Refuse = bois 2.`,
    () => `${rndP()} : as-tu déjà menti sur tes expériences sexuelles ? Refuse = bois 2.`,
  ];
  const verite2 = [
    () => `${rndP()} : ta pire rupture que t'aies vécue ou faite, raconte. Refuse = bois 3.`,
    () => `${rndP()} : la chose la plus risquée que t'aies faite sans que personne le sache ? Refuse = bois 3.`,
    () => `${rndP()} : si tu pouvais lire les pensées d'une personne de cette table, ce serait qui ? Refuse = bois 2.`,
    () => `${rndP()} : le truc le plus bizarre qui t'attire physiquement ? Refuse = bois 3.`,
    () => `${rndP()} : ton pire comportement quand tu es bourré(e) ? Refuse = bois 3.`,
    () => `${rndP()} : si tu devais embrasser quelqu'un ici sans que ce soit romantique, qui ? Refuse = bois 3.`,
    () => `${rndP()} : ton plus gros complexe au lit ? Refuse = bois 3.`,
    () => `${rndP()} : décris ta dernière fois, juste l'ambiance pas les détails crus. Refuse = 3 gorgées.`,
    () => `${rndP()} : ton plus gros red flag que personne ici ne connaît ? Refuse = 3 gorgées.`,
    () => `${rndP()} : qui ici tu embrasserais si t'étais célibataire et bourré ? Refuse = bois 3.`,
    () => `${rndP()} : le truc le plus gênant que t'as fait par désir pour quelqu'un ? Refuse = 3 gorgées.`,
    () => `${rndP()} : quelle est la personne ici que tu trouves la plus baisable et pourquoi ? Refuse = bois 3.`,
    () => `${rndP()} : ton pire moment honteux en soirée ? Refuse = 3 gorgées.`,
    () => `${rndP()} : combien de fois par semaine tu penses au sexe, sincèrement ? Refuse = bois 3.`,
    () => `${rndP()} : qui ici ferait le meilleur coup d'un soir selon toi ? Refuse = bois 3.`,
    () => `${rndP()} : ton plus gros échec au lit (raconte sans honte) ? Refuse = bois 3.`,
    () => `${rndP()} : quel est ton kink le plus assumé ? Refuse = bois 3.`,
    () => `${rndP()} : le compliment le plus chaud qu'on t'ait jamais fait ? Refuse = bois 2.`,
    () => `${rndP()} : la chose la plus spontanée que t'aies faite par excitation ? Refuse = bois 3.`,
    () => `${rndP()} : le pire endroit ou contexte où l'envie t'a pris ? Refuse = bois 3.`,
    () => `${rndP()} : la meilleure ET la pire excuse jamais entendue au lit ? Refuse = bois 2.`,
    () => `${rndP()} : le truc le plus gênant qui t'est arrivé pendant l'acte (bruit, crampe, fou rire) ? Refuse = bois 3.`,
    () => `${rndP()} : la phrase la plus cringe qu'on t'ait sortie en pleine action ? Refuse = bois 3.`,
    () => `${rndP()} : matin, après-midi ou soir — défends ton créneau préféré. Refuse = bois 2.`,
    () => `${rndP()} : le red flag qui te coupe net l'envie ? Refuse = bois 2.`,
    () => `${rndP()} : ton plus gros turn-on inattendu (un détail, pas un truc évident) ? Refuse = bois 3.`,
    () => `${rndP()} : le cliché de drague qui marche étrangement sur toi ? Refuse = bois 2.`,
  ];
  const verite3 = [
    () => `${rndP()} : si tu devais déshabiller mentalement quelqu'un de cette pièce, ce serait qui ? Refuse = bois SEC.`,
    () => `${rndP()} : le truc le plus osé que t'aies jamais proposé à quelqu'un ? Refuse = bois SEC.`,
    () => `${rndP()} : si tu devais passer une nuit avec quelqu'un ici mais personne n'en saurait jamais rien, qui ? Refuse = bois SEC.`,
    () => `${rndP()} : ton fantasme le plus tabou que t'as jamais avoué à voix haute. Refuse = bois SEC.`,
    () => `${rndP()} : classe tout le monde ici du plus au moins désirable. À voix haute. Refuse = bois SEC.`,
    () => `${rndP()} : la chose la plus folle que t'as déjà faite par pure excitation ? Refuse = bois SEC.`,
    () => `${rndP()} : si tu devais passer une nuit avec une personne de cette pièce, ce serait qui et pourquoi ? Refuse = bois SEC.`,
    () => `${rndP()} : décris en détail ton dernier rapport. Refuse = bois SEC.`,
    () => `${rndP()} : le secret que tu emporterais dans ta tombe ? Refuse = bois SEC.`,
    () => `${rndP()} : à qui dans cette pièce tu n'as jamais osé dire que tu le/la trouvais attirant(e) ? Refuse = bois SEC.`,
    () => `${rndP()} : quel est le truc le plus malsain que tu as déjà désiré ? Refuse = bois SEC.`,
    () => `${rndP()} : décris ta position préférée et pourquoi, sans détour. Refuse = bois SEC.`,
    () => `${rndP()} : le truc le plus osé que tu aimerais essayer mais que t'as jamais fait ? Refuse = bois SEC.`,
    () => `${rndP()} : raconte ton meilleur souvenir de cul (sans nommer). Refuse = bois SEC.`,
    () => `${rndP()} : quelle est la limite que tu ne franchirais JAMAIS au lit ? Refuse = bois SEC.`,
  ];

  // === ACTION (débiles / gênantes, sans contact physique imposé) ===
  const action1 = [
    () => `${rndP()} doit parler en verlan jusqu'à la prochaine carte. Oubli = gorgée.`,
    () => `Tout le monde sort son téléphone et montre la DERNIÈRE photo de sa galerie. Qui refuse boit 3.`,
    () => `${rndP()} doit dire un compliment sincère à chaque personne de la table en moins de 30 sec. Trop lent = bois 2.`,
    () => `Le premier qui sourit boit 2. GO !`,
    () => `${rndP()} doit parler uniquement en chuchotant jusqu'à la prochaine carte. Oubli = gorgée.`,
    () => `Le dernier à crier "GOLMON" boit 2. GO !`,
    () => `${rndP()} doit inventer un cocktail imaginaire et le vendre comme un barman 5 étoiles. Rate = bois 2.`,
    () => `Tout le monde doit changer de place. Le dernier assis boit 2. GO !`,
    () => `${rndP()} doit prétendre être célèbre et répondre aux questions de la table pendant 30 sec. Rate = bois 2.`,
    () => `${rndP()} doit réciter l'alphabet à l'envers aussi vite que possible. Bloque avant M = bois 3.`,
    () => `Tout le monde bat le rythme. ${rndP()} doit improviser un rap de 4 lignes. Aucune rime = bois 2.`,
    () => `${rndP()} doit imiter la marche d'une célébrité choisie par la table. Rate = bois 2.`,
    () => `${rndP()} doit parler avec une voix sexy ridicule jusqu'à la prochaine carte. Sinon → gorgée.`,
    () => `${rndP()} fait son meilleur regard de braise à la personne en face pendant 10 sec sans rire. Rate = bois 2.`,
    () => `${rndP()} doit refaire le bruit qu'il/elle fait quand c'est trop bon (en mangeant, interprète). Refuse = 2 gorgées.`,
    () => `${rndP()} doit crier un mot au choix de la table le plus fort possible. Refuse = bois 2.`,
    () => `${rndP()} doit boire son verre de la manière la plus bizarre possible. Les autres notent, le pire boit encore.`,
    () => `${rndP()} doit imiter la personne à sa droite jusqu'à la prochaine carte. Rate = bois 2.`,
    () => `${rndP()} doit parler uniquement en chantant jusqu'à son prochain tour. Oubli = gorgée.`,
    () => `${rndP()} fait deviner un film en mimant, sans parler. La table a 30 sec. Échec = bois 2.`,
    () => `${rndP()} doit garder un glaçon dans la bouche jusqu'à ce qu'il fonde. Crache = bois 3.`,
    () => `Bois ton verre en aboyant comme un chien entre chaque gorgée. Refuse = bois SEC.`,
    () => `Bois cul sec après avoir tourné sur toi-même 8 fois. Renversé = recommence.`,
    () => `Bois avec les mains dans le dos comme un animal. Le plus propre gagne, les autres reboivent.`,
    () => `${rndP()} doit boire le verre de son voisin. Le voisin récupère le sien après.`,
    () => `${rndP()} mélange les verres de tout le monde aléatoirement. Tout le monde boit ce qu'il a.`,
    () => `${rndP()} laisse quelqu'un ajouter quelque chose dans son verre (raisonnable). Il doit le boire.`,
    () => `${rndP()} doit deviner ce qu'il y a dans le verre de son voisin en goûtant. Rate = boit 2.`,
    () => `${rndP()} est le barman ce tour : il/elle sert tout le monde. Qui attend trop longtemps boit 1.`,
    () => `Le premier qui finit son verre distribue 3 gorgées à qui il veut. GO !`,
    () => `Le dernier à lever les deux mains en l'air boit 2 gorgées. GO !`,
    () => `Le dernier à toucher son nez boit un cul sec. GO !`,
    () => `Le premier qui rote le plus fort distribue 2 gorgées. GO !`,
    () => `Le premier qui fait 5 pompes boit 1 gorgée mais distribue 4. GO !`,
    () => `Le premier qui imite une danse sexy ridicule gagne un shot offert par le groupe. GO !`,
    () => `Le premier qui marche comme un pingouin pendant 10 secondes distribue 4 gorgées. GO !`,
    () => `Le premier qui aboie gagne un verre offert par la table. GO !`,
    () => `Le premier qui chante une chanson paillarde gagne un shot offert. GO !`,
    () => `Le premier qui imite un animal de la ferme gagne le droit de faire boire quelqu'un. GO !`,
    () => `Le premier qui dit "santé" en regardant quelqu'un dans les yeux distribue 3 gorgées. GO !`,
    () => `Le dernier debout sur une jambe pendant 10 secondes gagne un shot. GO !`,
    () => `Le premier qui fait un moonwalk choisit qui boit un cul sec. GO !`,
    () => `Le premier qui parle avec une voix de bébé pendant 15 secondes distribue 3 gorgées. GO !`,
    () => `Tous ceux qui ont déjà vomi à cause de l'alcool boivent 3 gorgées.`,
    () => `Tous ceux qui portent un sous-vêtement noir boivent 2 gorgées.`,
    () => `Tous ceux qui ont menti ce soir boivent 3 gorgées.`,
    () => `Tous ceux qui ont le téléphone allumé sur la table boivent 2 gorgées.`,
    () => `La prochaine question : le premier qui boit une gorgée distribue le double des gorgées exigées.`,
  ];
  const action2 = [
    () => `${rndP()} doit faire un tour de magie de sa composition. Raté = bois 3.`,
    () => `${rndP()} doit raconter une histoire de 30 sec qui finit par "et c'est pourquoi je bois". La table juge.`,
    () => `${rndP()} doit convaincre la table d'un mensonge absurde. Si quelqu'un croit → distribue 3 gorgées.`,
    () => `${rndP()} doit faire une pub de 20 sec pour le verre qu'il/elle tient. Pas convainquant = bois 2.`,
    () => `${rndP()} doit inventer un surnom à chaque personne de la table en 20 sec. Trop lent = bois 2.`,
    () => `Concours : ${rndP()} vs la personne en face — qui garde son sérieux le plus longtemps ? La table tente de les faire rire. Le premier à craquer boit 3.`,
    () => `${rndP()} doit faire une déclaration enflammée et fausse à la personne à sa gauche, façon télénovela. Rate = bois 2.`,
    () => `${rndP()} doit draguer son voisin de droite avec sa meilleure phrase pourrie. S'il/elle rit ou cale, ${rndP()} boit 2.`,
    () => `${rndP()} imite un orgasme cinématographique de 10 secondes. Refuse = bois 3.`,
    () => `${rndP()} doit murmurer "je pense à toi cette nuit 😏" à la personne en face avec le plus de sérieux possible. Rate = bois 3.`,
    () => `${rndP()} fait un slow tout seul au milieu de la pièce pendant 15 sec. Refuse = bois 2.`,
    () => `${rndP()} doit manger ou boire le mélange que toute la table vote (raisonnable, comestible). Refuse = bois SEC.`,
    () => `${rndP()} doit faire boire quelqu'un d'autre alors que ce n'est pas son tour — sa cible boit 2.`,
    () => `${rndP()} doit draguer la personne en face uniquement avec des métaphores sur la bouffe. La table juge, raté = bois 2.`,
    () => `${rndP()} doit faire un twerk habillé pendant 15 secondes. Refuse = bois 3.`,
    () => `${rndP()} parle à la 3e personne comme s'il/elle était une star de télé-réalité jusqu'à la prochaine carte. Rate = gorgée.`,
    () => `${rndP()} doit faire un compliment ultra gênant et trop intime à la personne en face. Refuse = bois 2.`,
    () => `${rndP()} doit imiter le rire de quelqu'un de la table, les autres devinent qui. Faux = ${rndP()} boit.`,
    () => `Concours de drague : ${rndP()} et son voisin de gauche sortent chacun leur pire technique. La table désigne le plus cringe, qui boit 2.`,
  ];
  const action3 = [
    () => `${rndP()} doit faire une confession de désir de 20 sec à la table, sans nommer de prénom. Refuse = bois SEC.`,
    () => `${rndP()} doit voter pour qui dans la table il/elle embrasserait là maintenant, puis expliquer pourquoi. Refuse = bois SEC.`,
    () => `${rndP()} doit raconter à voix haute le souvenir le plus chaud qu'il/elle ait (sans nommer la personne). Refuse = bois SEC.`,
    () => `${rndP()} fait un lap dance fully habillé sur une chaise pendant 15 sec. Refuse = bois SEC.`,
    () => `${rndP()} doit déclarer sa flamme à la personne en face d'une voix grave et sérieuse, sans rire. Refuse = bois SEC.`,
    () => `${rndP()} mime sa position préférée avec un coussin, la table devine. Refuse = bois SEC.`,
    () => `${rndP()} mime un "69" avec un coussin pendant 15 sec sans rire. Rire ou refus = bois SEC.`,
    () => `${rndP()} doit raconter un souvenir chaud en mimant les gestes dans le vide (sans toucher personne). Refuse = bois SEC.`,
    () => `${rndP()} doit faire la démo (sur l'air, sans personne) de sa meilleure technique de drague physique. Refuse = bois SEC.`,
    () => `${rndP()} choisit quelqu'un et lui fait une déclaration de désir totalement fausse mais très détaillée. Refuse = bois SEC.`,
  ];

  // === VOTE (humiliants / drôles, pas d'attaque dégradante réelle) ===
  const vote1 = [
    () => `VOTE : qui a le pire style vestimentaire ce soir ? L'élu boit 2.`,
    () => `VOTE : qui est le plus susceptible d'envoyer un message bizarre à 3h du mat ? L'élu boit 2.`,
    () => `VOTE : qui a le meilleur sens de l'humour ? L'élu donne 2 gorgées à qui il veut.`,
    () => `VOTE : qui a le plus de potentiel mais le gâche ? L'élu boit 3 et répond s'il est d'accord.`,
    () => `VOTE : qui est le plus honnête de la table ? L'élu distribue 2 gorgées.`,
    () => `VOTE : qui est le plus susceptible de tomber amoureux ce soir ? L'élu boit 2.`,
    () => `VOTE : qui est le plus susceptible de finir la soirée en pleurs ? Le gagnant boit 2.`,
    () => `VOTE : qui drague le plus mal ? Le champion boit 2.`,
    () => `VOTE : qui est le plus chaud bouillant du groupe ? L'élu boit 1 et fait un clin d'œil à tout le monde.`,
    () => `VOTE : qui ferait le pire coup d'un soir ? Boit 2.`,
    () => `VOTE : qui est le/la plus beau/belle de la table ? L'élu donne 2 gorgées à qui il veut.`,
    () => `VOTE : qui a clairement la pire hygiène ? L'élu boit 2.`,
    () => `VOTE : qui ronfle le plus selon vous ? Boit 2.`,
    () => `VOTE : qui est le plus radin ? L'élu boit 2.`,
    () => `VOTE : qui rigole comme une casserole ? L'élu doit rire à la demande, puis boit 2.`,
    () => `VOTE : qui est le plus susceptible de s'endormir en premier ce soir ? Boit 2.`,
    () => `VOTE : qui a la plus belle mère ? L'élu boit 2 et doit confirmer ou nier.`,
    () => `VOTE : qui a le plus l'air coquin(e) ? L'élu boit 2.`,
    () => `VOTE : qui a le plus les pieds qui puent ? L'élu boit 3.`,
    () => `VOTE : qui doit boire cul sec de façon ridicule ? L'élu s'exécute.`,
    () => `VOTE : qui a le corps le plus attirant ? L'élu donne 3 gorgées à qui il veut.`,
    () => `VOTE : qui est le plus gros charo du groupe ? L'élu boit 3.`,
    () => `VOTE : qui doit raconter une anecdote WTF de sa vie ? L'élu raconte ou boit 3.`,
    () => `VOTE : qui boit le plus bizarrement ? L'élu fait une démo et la table vote si c'est validé.`,
    () => `VOTE : qui est le plus gros pervers du groupe ? L'élu boit 3.`,
    () => `VOTE : qui devient le serveur ce tour ? L'élu sert tout le monde, dernier servi boit 2.`,
  ];
  const vote2 = [
    () => `VOTE : qui aurait le plus de matchs sur Tinder selon vous ? L'élu boit 2.`,
    () => `VOTE : qui est le plus "compliqué(e)" en couple ? L'élu boit 3 et admet ou nie.`,
    () => `VOTE : qui a clairement quelqu'un en tête ce soir ? L'élu boit 3.`,
    () => `VOTE : qui est le plus susceptible de regretter quelque chose cette nuit ? L'élu boit 2.`,
    () => `VOTE : qui a le plus de squelettes dans le placard niveau cul ? L'élu boit 2 et a le droit de mentir sur une chose.`,
    () => `VOTE : qui est secrètement le/la plus pervers(e) ? L'élu boit 3.`,
    () => `VOTE : qui flirterait avec n'importe qui pour un verre gratuit ? Boit 2.`,
    () => `VOTE : qui regarde le plus quelqu'un dans cette pièce ? La table désigne, les DEUX boivent 2.`,
    () => `VOTE : qui ne se lave clairement pas assez ? L'élu boit 3.`,
    () => `VOTE : qui a le plus de chances d'avoir déjà menti dans ce jeu ? L'élu boit 3.`,
    () => `VOTE : qui est le/la plus accro à son téléphone ? L'élu pose son tel au centre jusqu'à la fin ou boit 3.`,
    () => `VOTE : qui a le pire goût en matière de partenaires ? L'élu boit 2 et défend ses choix.`,
    () => `VOTE : qui est le plus susceptible d'avoir un dossier honteux dans sa galerie ? L'élu boit 3.`,
    () => `VOTE : qui drague à deux verres et regrette à cinq ? L'élu boit 3.`,
    () => `VOTE : qui a la playlist la plus chaude ? L'élu boit 2 et balance un titre pour prouver.`,
    () => `VOTE : qui ment le plus sur son tableau de chasse ? L'élu boit 3.`,
    () => `VOTE : qui enverrait un texto risqué en premier après 3 verres ? L'élu boit 2.`,
    () => `VOTE : qui a clairement une face cachée ? L'élu boit 3 et la table lui pose UNE question.`,
  ];
  const vote3 = [
    () => `VOTE : qui a le regard le plus intense de la table ? L'élu fixe quelqu'un de son choix 10 sec, les deux boivent SEC.`,
    () => `VOTE : qui ici donne le plus envie ce soir ? L'élu choisit qui boit SEC avec lui/elle.`,
    () => `VOTE : qui devrait faire un mini show de charme de 20 sec pour le groupe (habillé) ? L'élu s'exécute OU boit SEC.`,
    () => `VOTE : qui ici a clairement déjà fantasmé sur quelqu'un d'autre dans la pièce ? L'élu boit SEC et désigne sur qui (ou rebois).`,
    () => `VOTE : qui assume le moins ses désirs ? L'élu boit 3 et doit avouer un truc.`,
    () => `VOTE : qui est le boss niveau séduction ? L'élu donne 3 gorgées à répartir.`,
    () => `VOTE : qui a le plus de chances d'envoyer un nude à 2h du mat ? L'élu boit SEC.`,
    () => `VOTE : qui a clairement le plus de dossiers cachés ce soir ? L'élu boit SEC et la table lui pose UNE question.`,
    () => `VOTE : qui finirait le plus vite à poil dans un jeu plus hard ? L'élu boit SEC.`,
    () => `VOTE : qui ici tout le monde imagine le plus avoir une vie secrète sulfureuse ? L'élu boit SEC et confirme ou nie.`,
  ];

  // === TOUT LE MONDE (cartes générales) ===
  const tous1 = [
    () => `Tout le monde pose son téléphone face retournée jusqu'à la prochaine carte. Qui regarde le sien boit 3.`,
    () => `Le premier à tousser ou éternuer boit 2.`,
    () => `Tous ceux qui ont une notification non lue en ce moment boivent 2.`,
    () => `Le plus grand et le plus petit s'affrontent en cul sec. Les autres regardent.`,
    () => `TOUT LE MONDE BOIT. Santé. 🍻`,
    () => `Le dernier à lever son verre boit 2.`,
    () => `Tous ceux qui sont déjà tombés amoureux ce soir... mauvaise question, tout le monde boit.`,
    () => `Tous ceux qui portent du noir boivent 2.`,
    () => `Le plus jeune et le plus vieux de la table trinquent et boivent 2.`,
    () => `Tous ceux qui ont déjà embrassé quelqu'un de la table boivent 2.`,
    () => `Doigt sur le nez ! Le dernier boit 2.`,
    () => `Tous ceux qui sont célibataires boivent (et se regardent).`,
  ];
  const tous2 = [
    () => `Tous ceux qui ont déjà pleuré en écoutant une chanson boivent 2.`,
    () => `Tous ceux qui ont regardé un ex sur les réseaux dans la semaine boivent 2.`,
    () => `Tout le monde compte jusqu'à 10 en chœur. Qui se décale boit 2.`,
    () => `Tous ceux qui pensent que quelqu'un dans la pièce les trouve attirant(e) boivent 2 et regardent cette personne.`,
    () => `Tout le monde boit, sauf la personne qui a embrassé le plus de gens cette année.`,
    () => `Tous ceux qui ont déjà couché un premier soir boivent 2.`,
    () => `Tous ceux qui ont envoyé un nude un jour boivent 2.`,
    () => `Tous ceux qui ont déjà trompé ou été tentés boivent 2 (discrètement, on juge pas... si).`,
    () => `Le plus grand parle, tout le monde doit l'imiter, le plus mauvais boit.`,
    () => `Tous ceux qui pensent à quelqu'un de précis là maintenant boivent 2.`,
    () => `Cul sec pour les deux personnes qui se sont le moins parlé ce soir.`,
    () => `Tous ceux qui ont déjà menti dans ce jeu boivent 3 (vous savez qui vous êtes).`,
  ];
  const tous3 = [
    () => `Tout le monde dit qui, selon lui, sera le plus "chaud" ce soir. En même temps au compte de 3. Les deux plus cités boivent SEC.`,
    () => `TOUT LE MONDE CUL SEC. Aucune exception. ☠️`,
    () => `Tous ceux qui ont déjà désiré quelqu'un de cette pièce boivent SEC.`,
    () => `Les deux personnes que la table juge les plus proches d'un "il s'est passé un truc" boivent SEC.`,
    () => `Tous ceux qui ont un secret qui ruinerait la soirée s'il sortait boivent 3.`,
    () => `Tout le monde dit le prénom de son crush du moment EN MÊME TEMPS au compte de 3. Qui hésite boit SEC.`,
    () => `Tous ceux qui regretteraient un truc fait ce soir une fois sobres boivent 3.`,
  ];

  // === BIZARRE (mini-jeux de boisson) ===
  const bizarre1 = [
    () => `Tout le monde boit en faisant un bruit d'animal différent entre chaque gorgée. Le moins créatif reboit.`,
    () => `${rndP()} invente une règle bizarre pour boire que tout le monde suit jusqu'à la prochaine carte.`,
    () => `Concours : qui fait le visage le plus dégoûté après avoir bu quelque chose de bon ? Le perdant reboit.`,
    () => `Chacun son tour, buvez une gorgée de la manière la plus bizarre possible. La table élit le pire, qui reboit.`,
    () => `${rndP()} lance : tout le monde doit boire sans utiliser les mains. Le plus lent boit encore.`,
    () => `Cul sec en imitant un animal choisi par la personne à votre gauche.`,
    () => `Buvez tous avec l'accent que ${rndP()} impose. Qui craque son accent boit 2.`,
    () => `Concours : qui fait le "ahhh" le plus satisfait après avoir bu ? Le moins convaincant boit.`,
    () => `${rndP()} boit son verre en aboyant comme un chien entre chaque gorgée.`,
    () => `${rndP()} boit cul sec après avoir tourné 10 fois sur lui/elle-même. Renversé = reboit.`,
    () => `${rndP()} boit les mains dans le dos, comme un animal. Trop salissant = la table reboit pour le plaisir.`,
  ];
  const bizarre2 = [
    () => `Tout le monde boit en faisant semblant que son verre est la meilleure chose goûtée de sa vie. Le moins convaincant reboit.`,
    () => `${rndP()} boit en comptant à voix haute les secondes. Trop vite ou trop lent = reboit.`,
    () => `Concours de qui boit le plus lentement sans poser le verre. Le premier à poser boit encore.`,
    () => `${rndP()} invente une "danse de la gorgée". Tout le monde la refait avant de boire. Le pire boit 2.`,
    () => `Tout le monde boit les yeux fermés. Le dernier à rouvrir les yeux boit 2.`,
    () => `Chacun boit en regardant fixement la personne en face dans les yeux. Qui rit boit 2.`,
    () => `Buvez en tenant le verre avec le coude (ou comme vous pouvez sans les doigts). Renversé = reboit.`,
    () => `${rndP()} fait un toast dramatique et faux-larmoyant de 15 sec avant que tout le monde boive.`,
    () => `${rndP()} boit en criant des petites insultes gentilles sur lui/elle-même entre chaque gorgée.`,
    () => `${rndP()} boit en imitant une star de cinéma de son choix. La table devine, ratée = reboit.`,
  ];
  const bizarre3 = [
    () => `${rndP()} est le "chef de gorgée" : il/elle décide quand tout le monde boit pendant les 2 prochaines cartes. Anticipation ou oubli = gorgée.`,
    () => `Cul sec collectif en mode "le dernier qui pose son verre fait un gage de la table".`,
    () => `Tout le monde échange son verre avec son voisin de gauche, puis cul sec. (Restez raisonnables.)`,
    () => `${rndP()} mène : tout le monde boit une gorgée à chaque fois qu'il/elle cligne des yeux, pendant 30 sec.`,
    () => `Concours de descente raisonnable : le dernier à finir choisit qui boit SEC.`,
    () => `${rndP()} boit en mode "commentateur sportif" qui décrit chaque gorgée en direct.`,
  ];

  // === MOT INTERDIT (mécanique : règle qui dure jusqu'à la prochaine carte de ce type) ===
  const interdit1 = [
    () => `RÈGLE : interdiction de dire le prénom de qui que ce soit. On dit "lui", "elle", "eux". Qui craque boit 2.`,
    () => `RÈGLE : interdiction de jurer. Chaque gros mot = 1 gorgée immédiate.`,
    () => `MOT INTERDIT : interdiction de dire "NON" jusqu'à la prochaine carte de ce type. Qui craque boit 2.`,
    () => `MOT INTERDIT : interdiction de dire "JE" / "MOI". Qui craque boit 2.`,
    () => `RÈGLE : interdiction de pointer du doigt. Qui le fait boit 2.`,
    () => `RÈGLE : interdiction de prononcer le prénom de qui que ce soit. Qui craque boit 2.`,
    () => `RÈGLE : interdiction de dire "boire", "verre" ou "alcool". Qui craque boit 2.`,
  ];
  const interdit2 = [
    () => `RÈGLE : tout le monde doit parler lentement, comme au ralenti. Qui accélère boit 2.`,
    () => `RÈGLE : interdiction de dire le mot "jeu". Qui craque boit 2.`,
    () => `MOT INTERDIT : interdit de jurer. Chaque insulte = 1 gorgée. ${rndP()} surveille.`,
    () => `RÈGLE : interdit de rire. Le premier qui craque boit 3 et la règle saute.`,
    () => `RÈGLE : tout le monde doit finir chaque phrase par "...et c'est mérité". Oubli = gorgée.`,
    () => `RÈGLE : interdit de poser une question. Qui le fait boit 2.`,
    () => `RÈGLE : ${rndP()} choisit un mot banal (genre "ok"). Quiconque le dit boit 1, jusqu'à la prochaine carte mot interdit.`,
  ];
  const interdit3 = [
    () => `RÈGLE GOLMON : tout le monde doit terminer ses phrases par "...et j'assume". Qui oublie boit 3.`,
    () => `RÈGLE : ${rndP()} est "le juge". Il/elle peut donner 1 gorgée à qui parle trop, trop peu ou dit quelque chose de banal. Jusqu'à la prochaine carte.`,
    () => `RÈGLE GOLMON : interdit de dire "non" ET de rire. Double infraction = bois SEC. ${rndP()} arbitre.`,
    () => `RÈGLE : à partir de maintenant, tout le monde parle à la 3e personne ("Untel pense que..."). Qui craque bois 3.`,
    () => `RÈGLE : ${rndP()} devient le "maître du silence" — il/elle peut imposer le silence 10 sec quand il veut. Qui parle boit 3.`,
    () => `RÈGLE : interdit de dire "oui" ou "non". Il faut contourner. Qui craque boit SEC.`,
    () => { const p = rndP(); return `RÈGLE SPÉCIALE : ${p} se fait appeler "n'importe quoi" pendant 4 tours. Celui qui dit son vrai prénom prend 4 pénalités. ${p} surveille.`; },
  ];

  // === DISTRIBUTION (le joueur actif distribue des pénalités) ===
  // n = nombre de gorgées distribuées, esquive = triple pour le joueur actif
  const distrib1 = [
    () => ({ n: 2, desc: `${rndP()} distribue 2 gorgées à la personne qu'il/elle pense être la plus honnête.` }),
    () => ({ n: 2, desc: `${rndP()} distribue 2 gorgées à la personne qui a le moins bu jusqu'ici.` }),
    () => ({ n: 1, desc: `${rndP()} distribue 1 gorgée au joueur le moins bien habillé de la table.` }),
    () => ({ n: 1, desc: `${rndP()} distribue 1 gorgée à la personne qui parle le plus fort ce soir.` }),
    () => ({ n: 2, desc: `${rndP()} distribue 2 gorgées à la personne la plus drôle de la soirée.` }),
    () => ({ n: 1, desc: `${rndP()} distribue 1 gorgée à celui/celle qui a le rire le plus chiant.` }),
    () => ({ n: 2, desc: `${rndP()} distribue 2 gorgées à la personne qui lui tape le plus sur les nerfs.` }),
    () => ({ n: 1, desc: `${rndP()} distribue 1 gorgée à la personne la plus en retard sur sa cuite.` }),
  ];
  const distrib2 = [
    () => ({ n: 3, desc: `${rndP()} distribue 3 gorgées à la personne dont il/elle aimerait le plus lire les messages.` }),
    () => ({ n: 2, desc: `${rndP()} distribue 2 gorgées à la personne qui l'a fait rire le plus ce soir.` }),
    () => ({ n: 2, desc: `${rndP()} distribue 2 gorgées à la personne avec qui il/elle pourrait coucher.` }),
    () => ({ n: 2, desc: `${rndP()} distribue 2 gorgées à la personne qu'il/elle trouve la plus attirante ici.` }),
    () => ({ n: 3, desc: `${rndP()} distribue 3 gorgées à celui/celle qu'il/elle embrasserait s'il/elle était célibataire.` }),
    () => ({ n: 2, desc: `${rndP()} distribue 2 gorgées à la personne qui a le plus de dossiers.` }),
    () => ({ n: 2, desc: `${rndP()} distribue 2 gorgées à celui/celle qui drague le plus mal.` }),
    () => ({ n: 3, desc: `${rndP()} distribue 3 gorgées à la personne qu'il/elle trouve secrètement la plus chaude.` }),
  ];
  const distrib3 = [
    () => ({ n: 4, desc: `${rndP()} distribue 4 gorgées à la personne avec qui il/elle aurait le plus de tension si on les enfermait seuls.` }),
    () => ({ n: 3, desc: `${rndP()} distribue 3 gorgées à la personne qu'il/elle ne s'attendait pas à trouver aussi attirant(e).` }),
    () => ({ n: 3, desc: `${rndP()} distribue 3 gorgées à la personne avec qui il/elle passerait la nuit, là, ce soir.` }),
    () => ({ n: 3, desc: `${rndP()} distribue 3 gorgées à celui/celle sur qui il/elle a déjà fantasmé dans la pièce.` }),
    () => ({ n: 4, desc: `${rndP()} distribue 4 gorgées à la personne qu'il/elle désire le plus ici, sans mentir.` }),
    () => ({ n: 3, desc: `${rndP()} distribue 3 gorgées à celui/celle dont il/elle trouve le corps le plus canon.` }),
    () => ({ n: 4, desc: `${rndP()} distribue 4 gorgées à la personne avec qui il/elle aurait le meilleur coup d'un soir.` }),
  ];

  // === PÉNALITÉ COLLECTIVE ===
  const coll1 = [
    () => `Tout le monde avoue son dernier mensonge à quelqu'un de la table. Le plus gros menteur boit 3.`,
    () => `${rndP()} choisit un "binôme de destin" : deux personnes qui doivent faire tout pareil pendant 3 cartes.`,
    () => `Tout le monde boit, sauf celui qui a embrassé le plus de gens cette année.`,
    () => `Le groupe invente un surnom sexy ridicule à ${rndP()}. Il/elle le garde toute la partie ou boit 2 à chaque oubli.`,
    () => `Shot collectif : ${rndP()} compte, tout le monde boit ensemble. Dernier à finir reboit.`,
    () => `Nouvelle règle : interdit de dire "je". Qui craque boit 1. Jusqu'à la prochaine collective.`,
    () => `Tout le monde donne une gorgée à la personne qu'il trouve la plus drôle. Le plus de gorgées = champion (et bien bourré).`,
  ];
  const coll2 = [
    () => `Tour de table : chacun dit le meilleur souvenir qu'il a avec quelqu'un de présent. Le plus émouvant distribue 3 gorgées.`,
    () => `Le groupe désigne les deux personnes les plus susceptibles d'avoir un secret. Elles boivent 3 et peuvent mentir.`,
    () => `Tour de table : chacun dit le truc le plus chaud qu'il a fait cette année. Le plus sage boit 3.`,
    () => `Nouvelle règle jusqu'à la prochaine pénalité : interdit de dire "non". Qui craque boit 2.`,
    () => `Le groupe désigne le/la plus sobre. Il/elle rattrape : boit autant que le groupe décide (min 4).`,
    () => `Chacun avoue sur qui il a flashé en arrivant ce soir. Le plus hésitant boit 3.`,
    () => `Règle des binômes : ${rndP()} choisit deux personnes liées. Quand l'une boit, l'autre boit. Jusqu'à la prochaine collective.`,
  ];
  const coll3 = [
    () => `Tour de table : chacun dit ce qu'il pense secrètement de quelqu'un sans le nommer. Les autres devinent. L'auteur boit SEC si deviné.`,
    () => `Chacun écrit un mensonge et une vérité sur lui. La table vote laquelle est vraie. Qui trompe tout le monde distribue 4 gorgées.`,
    () => `Confessions anonymes : chacun écrit son secret le plus chaud. ${rndP()} les lit sans dire qui. Le plus fou est voté, l'auteur boit SEC.`,
    () => `Règle Golmon : chacun choisit un "binôme de gorgée". Quand l'un boit, l'autre boit. Jusqu'à la fin.`,
    () => `Tout le monde révèle sur qui il a flashé dans la pièce, en même temps, au compte de 3. Personne ne boit, le malaise suffit.`,
    () => `Chacun dit la chose la plus trash qu'il pense en secret. La plus choquante désigne qui boit SEC.`,
    () => `Le groupe vote le "couple imaginaire" de la soirée. Les deux concernés boivent SEC et expliquent pourquoi non (ou oui).`,
  ];

  // === DUEL ===
  const duel1 = [
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} vs ${b} — qui retient le mieux son souffle. Le premier à lâcher boit 3.`; },
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} vs ${b} — qui connaît le mieux l'autre ? 3 questions chacun. Le moins bon boit 3.`; },
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} vs ${b} — concours de regard intense. Premier qui rit ou détourne les yeux boit 3.`; },
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} vs ${b} — qui a le plus d'audace ? La table vote, le perdant boit 2.`; },
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} vs ${b} — bras de fer. Le perdant boit 3.`; },
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} vs ${b} — concours de grimaces. La table désigne le plus moche, qui boit 2.`; },
  ];
  const duel2 = [
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} pose une question à ${b} sur sa vie sentimentale. ${b} répond honnêtement ou boit SEC.`; },
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} vs ${b} — qui peut décrire l'autre en 10 mots. Le moins précis boit 3.`; },
    () => { const [a,b] = rndTwo(); return `DUEL DE VÉRITÉ : ${a} pose une question intime à ${b}. ${b} répond ou boit 3, puis on inverse.`; },
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} vs ${b} — battle de phrases de drague nulles. La table désigne le pire, qui boit 3.`; },
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} vs ${b} — qui des deux est le plus dragueur ? La table tranche, le perdant boit 3.`; },
    () => { const [a,b] = rndTwo(); return `DUEL D'IMITATION : ${a} imite ${b}, puis l'inverse. La table désigne le moins ressemblant, qui boit 2.`; },
  ];
  const duel3 = [
    () => { const [a,b] = rndTwo(); return `DUEL GOLMON : ${a} et ${b} se regardent dans les yeux et disent chacun un truc jamais dit à voix haute. Le plus timide boit SEC.`; },
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} dit à ${b} ce qu'il/elle pense vraiment de ses sentiments pour quelqu'un de la pièce. ${b} boit SEC dans tous les cas.`; },
    () => { const [a,b] = rndTwo(); return `DUEL GOLMON : ${a} et ${b} se posent LA question la plus intrusive possible. Celui qui refuse de répondre boit SEC.`; },
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} vs ${b} — chacun avoue ce qu'il pense vraiment de l'autre. Le plus gentil (donc menteur) boit 3.`; },
    () => { const [a,b] = rndTwo(); return `DUEL : ${a} et ${b} doivent dire, chacun, s'ils ont déjà flashé l'un sur l'autre. Mensonge soupçonné = bois SEC.`; },
    () => { const [a,b] = rndTwo(); return `DUEL DE CONFESSION : ${a} et ${b} balancent leur pire dossier respectif. Le plus soft boit SEC.`; },
  ];

  // === PÉNALITÉ ULTIME (participatif / duel / ciblé) ===
  const ultime = [
    () => ({ mode: "PARTICIPATIF 🌍", desc: `La table invente une règle fun pour ${rndP()}. Il/elle l'accepte ou boit SEC + 2.` }),
    () => { const [a,b] = rndTwo(); return { mode: "DUEL ⚔️", desc: `${a} et ${b} s'avouent le truc le plus intime qu'ils pensent l'un de l'autre. Refuse = bois SEC.` }; },
    () => ({ mode: "PARTICIPATIF 🌍", desc: `${rndP()} est maître du jeu : il/elle invente une règle absurde qui s'applique à TOUT LE MONDE jusqu'à la prochaine pénalité ultime. Qui enfreint boit SEC.` }),
    () => ({ mode: "PARTICIPATIF 🌍", desc: `Cul sec général ! Tout le monde lève son verre et boit SEC ensemble. Le dernier à finir choisit la prochaine règle de la partie.` }),
    () => { const [a,b] = rndTwo(); return { mode: "DUEL ⚔️", desc: `${a} affronte ${b} en cul sec. Le perdant subit une punition (non physique) choisie par toute la table.` }; },
    () => ({ mode: "CIBLÉ 🎯", desc: `La table vote en secret pour UNE personne. La plus votée fait cul sec + un défi gênant (au choix du groupe) ou enchaîne un 2e cul sec.` }),
    () => ({ mode: "CIBLÉ 🎯", desc: `${rndP()} : cul sec immédiat. Ensuite tu choisis : avouer ton plus gros secret de la soirée, ou refaire un cul sec.` }),
    () => ({ mode: "PARTICIPATIF 🌍", desc: `Confession ultime : chacun écrit le truc le plus trash qu'il a fait. ${rndP()} lit tout anonymement, la table devine les auteurs. Chaque mauvaise devinette = gorgée, chaque démasqué = cul sec.` }),
  ];

  const banks = {
    jamais: { 1: jamais1, 2: [...jamais1, ...jamais2], 3: [...jamais1, ...jamais2, ...jamais3] },
    verite: { 1: verite1, 2: [...verite1, ...verite2], 3: [...verite1, ...verite2, ...verite3] },
    action: { 1: action1, 2: [...action1, ...action2], 3: [...action1, ...action2, ...action3] },
    vote: { 1: vote1, 2: [...vote1, ...vote2], 3: [...vote1, ...vote2, ...vote3] },
    tous: { 1: tous1, 2: [...tous1, ...tous2], 3: [...tous1, ...tous2, ...tous3] },
    bizarre: { 1: bizarre1, 2: [...bizarre1, ...bizarre2], 3: [...bizarre1, ...bizarre2, ...bizarre3] },
    interdit: { 1: interdit1, 2: [...interdit1, ...interdit2], 3: [...interdit1, ...interdit2, ...interdit3] },
    distrib: { 1: distrib1, 2: [...distrib1, ...distrib2], 3: [...distrib1, ...distrib2, ...distrib3] },
    collective: { 1: coll1, 2: [...coll1, ...coll2], 3: [...coll1, ...coll2, ...coll3] },
    duel: { 1: duel1, 2: [...duel1, ...duel2], 3: [...duel1, ...duel2, ...duel3] },
  };

  // Pondération du deck selon le niveau
  const weights = {
    1: { jamais: 20, verite: 16, action: 20, vote: 16, tous: 14, bizarre: 12, interdit: 10, distrib: 14, collective: 10, duel: 10, ultime: 5 },
    2: { jamais: 20, verite: 18, action: 18, vote: 16, tous: 13, bizarre: 11, interdit: 11, distrib: 14, collective: 10, duel: 11, ultime: 8 },
    3: { jamais: 20, verite: 20, action: 18, vote: 17, tous: 12, bizarre: 10, interdit: 11, distrib: 14, collective: 12, duel: 12, ultime: 11 },
  }[level];

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const pool = [];
  Object.entries(weights).forEach(([cat, count]) => {
    if (cat === "ultime") {
      shuffle(ultime).slice(0, count).forEach(fn => pool.push({ cat, fn }));
    } else {
      shuffle(banks[cat][level]).slice(0, count).forEach(fn => pool.push({ cat, fn }));
    }
  });

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [players, setPlayers] = useState([]);
  const [inputName, setInputName] = useState("");
  const [level, setLevel] = useState(3);
  const [cards, setCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [shake, setShake] = useState(false);
  const [sips, setSips] = useState({});
  const [turn, setTurn] = useState(0);
  const [sipRecorded, setSipRecorded] = useState(false);

  const addPlayer = () => {
    const name = inputName.trim();
    if (!name || players.includes(name)) { triggerShake(); return; }
    setPlayers([...players, name]);
    setInputName("");
  };
  const removePlayer = (name) => setPlayers(players.filter(p => p !== name));
  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 500); };

  const makeCard = (deck, idx) => {
    const c = deck[idx];
    const r = c.fn();
    return { cat: c.cat, content: typeof r === "string" ? { mode: null, desc: r } : r };
  };

  const startGame = () => {
    if (players.length < 2) { triggerShake(); return; }
    const deck = buildDeck(players, level);
    setCards(deck); setCardIndex(0);
    setCurrentCard(makeCard(deck, 0));
    setSips(Object.fromEntries(players.map(p => [p, 0])));
    setTurn(0);
    setSipRecorded(false);
    setFlipped(false); setScreen("game");
  };

  const parseSipsFromCard = (desc) => {
    if (!desc) return 0;
    const low = desc.toLowerCase();
    if (low.includes('sec')) return 8;
    const m = low.match(/boi[st][ent]* (\d+)/);
    if (m) return parseInt(m[1]);
    if (low.includes('bois') || low.includes('boit') || low.includes('boivent')) return 1;
    return 0;
  };

  const addSip = (n) => {
    const p = players[turn % players.length];
    setSips(s => ({ ...s, [p]: (s[p] || 0) + n }));
    setSipRecorded(true);
  };
  const addSipAll = (n) => {
    setSips(s => Object.fromEntries(players.map(p => [p, (s[p] || 0) + n])));
    setSipRecorded(true);
  };

  const nextCard = () => {
    const ni = cardIndex + 1;
    // Si personne n'a enregistré de gorgées manuellement, on auto-ajoute depuis le texte
    if (flipped && !sipRecorded && currentCard) {
      const desc = currentCard.content?.desc || "";
      const auto = parseSipsFromCard(desc);
      if (auto > 0) addSipAll(auto);
    }
    if (ni >= cards.length) { setScreen("end"); return; }
    setFlipped(false);
    setSipRecorded(false);
    setTurn(t => t + 1);
    setTimeout(() => { setCurrentCard(makeCard(cards, ni)); setCardIndex(ni); }, 200);
  };

  const currentPlayer = players.length ? players[turn % players.length] : "";
  const ranking = [...players].sort((a, b) => (sips[b] || 0) - (sips[a] || 0));
  const totalSips = Object.values(sips).reduce((a, b) => a + b, 0);

  const lvlColor = LEVELS.find(l => l.id === level).color;
  const bg = currentCard ? CAT_COLORS[currentCard.cat] : "#1a0a1f";

  if (screen === "home") return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at top,#2a0a2e 0%,#0a0a14 60%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ fontSize: "70px", marginBottom: "0.5rem" }}>☠️</div>
        <h1 style={{ fontSize: "44px", fontWeight: 900, margin: 0, color: "#fff", letterSpacing: "-1px", textShadow: "0 0 40px rgba(255,0,60,0.7)" }}>LE DERNIER</h1>
        <h1 style={{ fontSize: "56px", fontWeight: 900, margin: 0, color: "#ff003c", letterSpacing: "2px", textShadow: "0 0 50px rgba(255,0,60,0.9)" }}>GOLMON</h1>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: "0.8rem 0 0", letterSpacing: "5px", textTransform: "uppercase" }}>Aucune limite</p>
      </div>
      <button onClick={() => setScreen("setup")} style={{ background: "#ff003c", border: "none", color: "#fff", padding: "18px 60px", borderRadius: "16px", fontSize: "20px", fontWeight: 800, cursor: "pointer", letterSpacing: "2px", boxShadow: "0 0 30px rgba(255,0,60,0.5)" }}>
        ENTRER
      </button>
      <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", marginTop: "2.5rem", textAlign: "center", maxWidth: "300px" }}>+18 • Entre adultes consentants • Tout reste un jeu, personne n'est forcé • Bois de l'eau 💧</p>
    </div>
  );

  if (screen === "setup") return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at top,#2a0a2e 0%,#0a0a14 60%)", display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "14px", cursor: "pointer", padding: 0, marginBottom: "1.5rem" }}>← Retour</button>

        <div style={{ textAlign: "center", marginBottom: "2rem", background: "rgba(255,0,60,0.15)", border: "1px solid #ff003c", borderRadius: "14px", padding: "14px" }}>
          <div style={{ color: "#ff003c", fontSize: "20px", fontWeight: 900, letterSpacing: "3px" }}>☠️ MODE GOLMON ☠️</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginTop: "4px" }}>Toutes les cartes • Aucune limite</div>
        </div>

        <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: 800, margin: "0 0 1rem" }}>Les joueurs</h2>
        <div style={{ display: "flex", gap: "8px", marginBottom: "1.2rem" }}>
          <input value={inputName} onChange={e => setInputName(e.target.value)} onKeyDown={e => e.key === "Enter" && addPlayer()} placeholder="Prénom..." style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: `1.5px solid ${shake ? "#ff003c" : "rgba(255,255,255,0.2)"}`, borderRadius: "12px", padding: "14px 16px", color: "#fff", fontSize: "16px", outline: "none" }} />
          <button onClick={addPlayer} style={{ background: lvlColor, border: "none", color: "#fff", padding: "14px 22px", borderRadius: "12px", fontSize: "22px", cursor: "pointer", fontWeight: 800 }}>+</button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2rem", minHeight: "50px" }}>
          {players.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.08)", borderRadius: "30px", padding: "8px 8px 8px 14px", color: "#fff" }}>
              <span style={{ fontSize: "15px", marginRight: "8px" }}>{p}</span>
              <button onClick={() => removePlayer(p)} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: "22px", height: "22px", borderRadius: "50%", fontSize: "14px", cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
          ))}
          {players.length === 0 && <p style={{ color: "rgba(255,255,255,0.3)", margin: "0.5rem 0" }}>Ajoute au moins 2 joueurs (pas de max)</p>}
        </div>

        <button onClick={startGame} style={{ width: "100%", background: players.length >= 2 ? lvlColor : "rgba(255,255,255,0.08)", border: "none", color: players.length >= 2 ? "#fff" : "rgba(255,255,255,0.3)", padding: "18px", borderRadius: "16px", fontSize: "18px", fontWeight: 800, cursor: players.length >= 2 ? "pointer" : "default", letterSpacing: "1px", boxShadow: players.length >= 2 ? `0 0 25px ${lvlColor}66` : "none" }}>
          {players.length >= 2 ? `LANCER • ${players.length} JOUEURS 🔥` : "Minimum 2 joueurs"}
        </button>
      </div>
    </div>
  );

  if (screen === "end") {
    const podium = [...players].sort((a, b) => (sips[b] || 0) - (sips[a] || 0));
    const top3 = podium.slice(0, 3);
    const rest = podium.slice(3);
    const medals = ["🥇", "🥈", "🥉"];
    const heights = [150, 110, 85];
    const podiumColors = ["#ffd700", "#c0c0c0", "#cd7f32"];
    const order = top3.length === 3 ? [1, 0, 2] : top3.map((_, i) => i);
    return (
      <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at center,#2a0a2e 0%,#0a0a14 60%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "system-ui,sans-serif" }}>
        <div style={{ fontSize: "56px", marginBottom: "0.3rem" }}>🏆</div>
        <h2 style={{ color: "#fff", fontSize: "30px", fontWeight: 900, margin: "0 0 0.3rem", textAlign: "center" }}>Podium de la cuite</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2rem", fontSize: "13px" }}>{cardIndex + 1} cartes • niveau {LEVELS.find(l => l.id === level).name} • {totalSips} gorgées au total</p>

        {/* Podium */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "10px", marginBottom: "2rem", width: "100%", maxWidth: "420px" }}>
          {order.filter(i => top3[i]).map(i => {
            const p = top3[i];
            return (
              <div key={p} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: "30px", marginBottom: "4px" }}>{medals[i]}</div>
                <div style={{ color: "#fff", fontSize: "15px", fontWeight: 800, marginBottom: "2px", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{p}</div>
                <div style={{ color: podiumColors[i], fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{sips[p] || 0} 🍺</div>
                <div style={{ width: "100%", height: `${heights[i]}px`, background: `linear-gradient(180deg,${podiumColors[i]}cc,${podiumColors[i]}55)`, border: `1px solid ${podiumColors[i]}`, borderRadius: "12px 12px 0 0", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "10px", boxShadow: `0 0 25px ${podiumColors[i]}66` }}>
                  <span style={{ color: "#1a0a1f", fontSize: "26px", fontWeight: 900 }}>{i + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reste du classement */}
        {rest.length > 0 && (
          <div style={{ width: "100%", maxWidth: "320px", display: "flex", flexDirection: "column", gap: "6px", marginBottom: "2rem" }}>
            {rest.map((p, i) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "8px 14px" }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", fontWeight: 700, width: "20px" }}>{i + 4}</span>
                <span style={{ color: "#fff", fontSize: "14px", flex: 1 }}>{p}</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: 700 }}>{sips[p] || 0} 🍺</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "300px" }}>
          <button onClick={() => { const d = buildDeck(players, level); setCards(d); setCardIndex(0); setCurrentCard(makeCard(d, 0)); setSips(Object.fromEntries(players.map(p => [p, 0]))); setTurn(0); setFlipped(false); setScreen("game"); }} style={{ background: lvlColor, border: "none", color: "#fff", padding: "16px", borderRadius: "14px", fontSize: "16px", fontWeight: 800, cursor: "pointer" }}>Nouvelle manche</button>
          <button onClick={() => setScreen("setup")} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "16px", borderRadius: "14px", fontSize: "16px", cursor: "pointer" }}>Changer joueurs / niveau</button>
        </div>
      </div>
    );
  }

  const isUltime = currentCard?.cat === CAT.ULTIME;
  return (
    <div style={{ minHeight: "100vh", background: `radial-gradient(ellipse at center, ${bg}dd 0%, #08080f 72%)`, display: "flex", flexDirection: "column", alignItems: "center", padding: "1.5rem", fontFamily: "system-ui,sans-serif", transition: "background 0.5s" }}>
      <div style={{ width: "100%", maxWidth: "820px", display: "flex", gap: "1.2rem", flex: 1, alignItems: "stretch" }}>

        {/* Colonne principale */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <button onClick={() => setScreen("setup")} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "8px 14px", borderRadius: "10px", fontSize: "13px", cursor: "pointer" }}>← Menu</button>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>{cardIndex + 1} / {cards.length}</div>
            <div style={{ background: CAT_COLORS[currentCard?.cat] + "44", border: `1px solid ${CAT_COLORS[currentCard?.cat]}`, borderRadius: "10px", padding: "6px 12px", color: "#fff", fontSize: "12px", fontWeight: 700 }}>
              {CAT_LABELS[currentCard?.cat]}
            </div>
          </div>

          {/* Joueur actuel */}
          <div style={{ textAlign: "center", marginBottom: "0.8rem" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Au tour de</span>
            <div style={{ color: "#fff", fontSize: "22px", fontWeight: 800 }}>{currentPlayer}</div>
          </div>

          <div onClick={() => setFlipped(true)} style={{ background: "rgba(255,255,255,0.05)", border: `2px solid ${flipped ? CAT_COLORS[currentCard?.cat] : "rgba(255,255,255,0.1)"}`, borderRadius: "24px", padding: "2rem", cursor: flipped ? "default" : "pointer", transition: "all 0.4s", minHeight: "260px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: flipped ? `0 0 40px ${CAT_COLORS[currentCard?.cat]}55` : "none" }}>
            {isUltime && flipped && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg,${CAT_COLORS.ultime},#ff6b6b,${CAT_COLORS.ultime})` }} />}
            {!flipped ? (
              <div style={{ color: "rgba(255,255,255,0.3)" }}>
                <div style={{ fontSize: "60px", marginBottom: "1rem" }}>🃏</div>
                <p style={{ fontSize: "16px" }}>Touche pour révéler</p>
              </div>
            ) : isUltime ? (
              <div>
                <div style={{ background: CAT_COLORS.ultime + "33", border: `1px solid ${CAT_COLORS.ultime}`, borderRadius: "12px", padding: "8px 18px", display: "inline-block", marginBottom: "1.5rem" }}>
                  <span style={{ color: "#fff", fontSize: "15px", fontWeight: 800, letterSpacing: "2px" }}>{currentCard.content.mode}</span>
                </div>
                <p style={{ color: "#fff", fontSize: "17px", lineHeight: 1.7, margin: 0 }}>{currentCard.content.desc}</p>
              </div>
            ) : (
              <p style={{ color: "#fff", fontSize: "18px", lineHeight: 1.7, margin: 0 }}>{currentCard.content.desc}</p>
            )}
          </div>

          {/* Compteur de gorgées / distribution */}
          {flipped && currentCard?.cat === CAT.DISTRIB ? (
            <div style={{ marginTop: "1rem", background: "rgba(255,255,255,0.05)", borderRadius: "16px", padding: "12px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", textAlign: "center" }}>
                <b style={{ color: "#fff" }}>{currentPlayer}</b> distribue {currentCard.content.n} gorgée{currentCard.content.n > 1 ? "s" : ""}. Clique sur le joueur visé — ou esquive (triple pour toi).
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
                {players.filter(p => p !== currentPlayer).map(p => (
                  <button key={p} onClick={() => { setSips(s => ({ ...s, [p]: (s[p] || 0) + currentCard.content.n })); setSipRecorded(true); }} style={{ background: "rgba(255,255,255,0.1)", border: `1px solid ${CAT_COLORS.distrib}66`, color: "#fff", padding: "8px 12px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                    {p} +{currentCard.content.n}
                  </button>
                ))}
              </div>
              <button onClick={() => addSip(currentCard.content.n * 3)} style={{ background: CAT_COLORS.ultime, border: "none", color: "#fff", padding: "8px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                😨 {currentPlayer} esquive et boit {currentCard.content.n * 3} (triple)
              </button>
            </div>
          ) : flipped && (
            <div style={{ marginTop: "1rem", background: "rgba(255,255,255,0.05)", borderRadius: "16px", padding: "12px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>Gorgées de <b style={{ color: "#fff" }}>{currentPlayer}</b></span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => addSip(1)} style={{ background: lvlColor, border: "none", color: "#fff", padding: "8px 14px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>+1 gorgée</button>
                  <button onClick={() => addSip(8)} style={{ background: CAT_COLORS.ultime, border: "none", color: "#fff", padding: "8px 14px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>Cul sec +8</button>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px" }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Tout le monde boit</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => addSipAll(1)} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "8px 14px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>Tous +1</button>
                  <button onClick={() => addSipAll(8)} style={{ background: "rgba(255,0,60,0.4)", border: "1px solid #ff003c", color: "#fff", padding: "8px 14px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>Tous cul sec</button>
                </div>
              </div>
            </div>
          )}

          <button onClick={flipped ? nextCard : () => setFlipped(true)} style={{ marginTop: "1rem", background: flipped ? CAT_COLORS[currentCard?.cat] : "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "18px", borderRadius: "16px", fontSize: "17px", fontWeight: 800, cursor: "pointer", letterSpacing: "0.5px", width: "100%" }}>
            {flipped ? "Carte suivante →" : "Révéler"}
          </button>
        </div>

        {/* Panneau latéral : classement gorgées */}
        <div style={{ width: "190px", flex: "0 0 190px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px", padding: "16px 12px", display: "flex", flexDirection: "column" }}>
          <div style={{ textAlign: "center", marginBottom: "12px" }}>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" }}>Total bu</div>
            <div style={{ color: lvlColor, fontSize: "28px", fontWeight: 900 }}>{totalSips}</div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "10px", display: "flex", flexDirection: "column", gap: "6px", overflowY: "auto", flex: 1 }}>
            {ranking.map((p, i) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: "8px", background: p === currentPlayer ? lvlColor + "33" : "transparent", border: p === currentPlayer ? `1px solid ${lvlColor}` : "1px solid transparent", borderRadius: "10px", padding: "6px 8px" }}>
                <span style={{ color: i === 0 && sips[p] > 0 ? "#ffd700" : "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: 700, width: "16px" }}>{i + 1}</span>
                <span style={{ color: "#fff", fontSize: "13px", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p}</span>
                <span style={{ color: lvlColor, fontSize: "14px", fontWeight: 800 }}>{sips[p] || 0}</span>
              </div>
            ))}
          </div>
          {ranking[0] && sips[ranking[0]] > 0 && (
            <div style={{ marginTop: "10px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
              👑 {ranking[0]} mène la cuite
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
