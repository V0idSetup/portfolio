/* =========================================================
   TRADUCTIONS
   Tout texte peut s'écrire de deux façons :
     "Texte simple"                      -> identique dans les 2 langues
     { fr: "Texte", en: "Text" }         -> une version par langue
   Pour une liste de paragraphes :
     { fr: ["Para 1", "Para 2"], en: ["Para 1", "Para 2"] }
   ========================================================= */

/* =========================================================
   TON PROFIL
   ========================================================= */
const PROFIL = {
  nom: "Arthur CAUMONT",
  photo: "assets/moi.jpeg",
  titre: {
    fr: "Étudiant en 3EA (Électronique, Énergie électrique et Automatique) à l'ENSEEIHT. Passionné d'électronique et de code depuis toujours.",
    en: "3EA student (Electronics, Electrical Energy and Automation) at ENSEEIHT. Passionate about electronics and coding for as long as I can remember."
  },
  ecole: {
    fr: "ENSEEIHT — Électronique (3EA 1A) · Toulouse",
    en: "ENSEEIHT — Electronics (3EA, 1st year) · Toulouse"
  },
  linkedin: "https://www.linkedin.com/in/arthur-caumont/",
  // CV : dépose ton PDF dans assets/ puis mets son chemin ici.
  // Un seul fichier : "assets/cv.pdf"   |   un par langue : { fr: "assets/cv-fr.pdf", en: "assets/cv-en.pdf" }
  // "" = bouton masqué.
  cv: "assets/cv.pdf",
  email: "arthur.caumont@etu.inp-n7.fr",     // laisse "" pour masquer
  // Paragraphes de la section Présentation
  presentation: {
    fr: [
      "Je suis étudiant en électronique à l'ENSEEIHT. Je m'intéresse à l'embarqué et aux systèmes connectés.",
      "Ce portfolio rassemble mes projets personnels, y compris ceux qui n'ont pas abouti, parce qu'on y apprend souvent le plus."
    ],
    en: [
      "I am an electronics student at ENSEEIHT. I am interested in embedded systems and connected devices.",
      "This portfolio gathers my personal projects, including the ones that did not make it, because that is often where I learn the most."
    ]
  }
};

/* =========================================================
   CATÉGORIES (ordre d'affichage sur la page)
   id = valeur à mettre dans "categorie" d'un projet
   ========================================================= */
// "desc" = description affichée sous le titre de chaque partie.
// Un paragraphe : { fr: "...", en: "..." }
// Plusieurs :     { fr: ["Para 1", "Para 2"], en: ["Para 1", "Para 2"] }
const CATEGORIES = [
  { id: "info", ref: "U1",
    titre: { fr: "Informatique", en: "Computer science" },
    desc:  { fr: "Étant issu d'une prépa informatique et passionné par la matière, j'ai un bon niveau en programmation et en algorithmique.", en: "Coming from a computer science preparatory class (prépa) and passionate about the subject, I have a strong level in programming and algorithms." } },
  { id: "iot",  ref: "U2",
    titre: { fr: "Physique (IoT)", en: "Hardware (IoT)" },
    desc:  { fr: "Passer de l'ordinateur au monde réel est ce qui m'a toujours plu avec l'électronique.", en: "Moving from the computer to the real world is what I have always loved about electronics." } },
  { id: "wip",  ref: "U3",
    titre: { fr: "Non aboutis", en: "Unfinished" },
    desc:  { fr: "Projets inachevés, abandonnés ou en pause, et ce que j'en ai retenu.", en: "Unfinished, abandoned or paused projects, and what I took from them." } }
];

/* =========================================================
   TES PROJETS
   ---------------------------------------------------------
   Pour ajouter un projet :
   1. Crée le dossier  Projets/<dossier>/
   2. Mets-y :  front.webp (vignette, facultative : sans elle, img1.webp sert de vignette),
                img1.webp, img2.webp ...
                video1.mp4, video2.mp4 ... (ou .webm)
                doc1.pdf, doc2.pdf ...
   3. Copie un bloc ci-dessous et remplis-le.
   Les médias sont détectés automatiquement (numérotation sans trou).
   Option : si tes fichiers ont d'autres noms, ajoute
     medias: { images: ["schema.webp"], videos: ["demo.mp4"], pdf: ["rapport.pdf"] }
   ========================================================= */
const PROJETS = [
  //_____________________INFO
  {
    dossier: "Soulless",
    titre: { fr: "Soulless - jeu d'arène", en: "Soulless - Arena Game" },
    categorie: "info",
    annee: "2022",
    resume: {
      fr: "Jeu de PvE en Java.",
      en: "PvE game written in Java."
    },
    texte: {
      fr: [
        "Soulless est un jeu réalisé en collaboration avec un de mes amis. Le but est d'éliminer des monstres qui apparaissent au fur et à mesure que la partie avance. L'argent gagné en tuant des monstres permet d'acheter des sorts et des objets pour progresser plus facilement. Le jeu a été programmé entièrement en Java, du moteur graphique aux classes d'objets, avec l'aide d'un ami pour les graphismes.",
        "C'est le projet qui m'a fait le plus progresser : j'ai tout appris de la programmation grâce à lui."
      ],
      en: [
        "Soulless is a game I made in collaboration with one of my friends. The goal is to eliminate monsters that appear as the game goes on. The money earned by killing monsters can be spent on spells and items to make progress easier. The game was programmed entirely in Java, from the graphics engine to the object classes, with the help of a friend for the artwork.",
        "It is the project that made me progress the most, as I learned everything about programming thanks to it."
      ]
    },
    competences: ["java", "pm"]
  },
  {
    dossier: "Orsadrya",
    titre: { fr: "Orsadrya - Serveur Minecraft", en: "Orsadrya - Minecraft Server" },
    categorie: "info",
    annee: "2020",
    resume: {
      fr: "Serveur Minecraft.",
      en: "Minecraft server."
    },
    texte: {
      fr: [
        "Orsadrya est un projet de serveur Minecraft créé avec deux de mes amis. Ce serveur a connu trois versions : les deux premières sont des serveurs de mini-jeux, avec des plugins côté serveur et une base de données ; la troisième est une version moddée, qui ajoute du code s'exécutant côté client.",
        ""
      ],
      en: [
        "Orsadrya is a Minecraft server project created with two of my friends. The server went through three versions: the first two are minigame servers, with server-side plugins and a database; the third is a modded version, which also adds code running on the client side.",
        ""
      ]
    },
    competences: ["java", "serv"]
  },
  {
    dossier: "GameWindows",
    titre: { fr: "Game of windows", en: "Game of windows" },
    categorie: "info",
    annee: "2020",
    resume: {
      fr: "Jeu de fenêtres en Java.",
      en: "Window-based game in Java."
    },
    texte: {
      fr: [
        "Game of Windows a été mon premier jeu codé en Java, en 2020. Il m'a permis d'apprendre à gérer les textures et les fenêtres. Le principe du jeu est de se déplacer entre les différentes fenêtres afin de les regrouper et de terminer les missions."
      ],
      en: [
        "Game of Windows was my first game coded in Java, back in 2020. It taught me how to handle textures and windows. The idea of the game is to move between the different windows in order to group them together and complete the missions."
      ]
    },
    competences: ["java", "serv"]
  },
  //__________________________________IOT
  {
    dossier: "Horloge",
    titre: { fr: "Horloge binaire", en: "Binary clock" },
    categorie: "iot",
    annee: "2022",
    resume: {
      fr: "Affiche l'heure à l'aide de LED.",
      en: "Displays the time using LEDs."
    },
    texte: {
      fr: [
        "Le but de ce projet est d'afficher l'heure en binaire à l'aide de LED : 5 LED vertes pour les heures, 6 bleues pour les minutes et 6 rouges pour les secondes. Ce projet utilise un Arduino Nano alimenté en 5 V. Les pieds sont imprimés en 3D."
      ],
      en: [
        "The goal of this project is to display the time in binary using LEDs: 5 green LEDs for the hours, 6 blue ones for the minutes and 6 red ones for the seconds. The project uses an Arduino Nano powered at 5 V. The feet are 3D printed."
      ]
    },
    competences: ["arduino", "c", "cir", "3d"]
  },
  {
    dossier: "Distanciateursocial",
    titre: { fr: "Distanciateur social", en: "Social distancing device" },
    categorie: "iot",
    annee: "2021",
    resume: {
      fr: "Projet pour l'oral du brevet.",
      en: "Project for the brevet oral exam."
    },
    texte: {
      fr: [
        "Ce projet a été réalisé dans le cadre de l'oral du brevet (DNB), qui s'est déroulé en 2021, donc pendant une année bouleversée par la pandémie. Son but est d'indiquer si l'on se trouve bien à au moins un mètre d'une autre personne. Il a été construit avec un Arduino Nano, calcule la distance grâce à un capteur à ultrasons et indique avec deux LED, une rouge et une verte, si la distance est respectée."
      ],
      en: [
        "This project was made for the oral exam of the brevet (DNB), which took place in 2021, a year disrupted by the pandemic. Its purpose is to indicate whether you are at least one metre away from another person. It was built with an Arduino Nano, calculates the distance using an ultrasonic sensor, and shows with two LEDs, one red and one green, whether the distance is respected."
      ]
    },
    competences: ["arduino", "c", "cir"]
  },
  {
    dossier: "Imprimante3D",
    titre: { fr: "Imprimante 3D", en: "3D printer" },
    categorie: "iot",
    annee: "2021",
    resume: {
      fr: "Imprimante 3D DIY.",
      en: "DIY 3D printer."
    },
    texte: {
      fr: [
        "Pour m'aider à finaliser mes projets, j'avais besoin de pièces sur mesure. C'est pourquoi je voulais une imprimante 3D, que j'ai achetée en kit et montée seul."
      ],
      en: [
        "To help me finish my projects, I needed custom-made parts. That is why I wanted a 3D printer, which I bought as a kit and assembled on my own."
      ]
    },
    competences: ["3d"]
  },
    {
    dossier: "Boite",
    titre: { fr: "Boîte de révision", en: "Revision box" },
    categorie: "iot",
    annee: "2021",
    resume: {
      fr: "Cellule pour téléphone, pour éviter la tentation.",
      en: "A phone lock box to avoid temptation."
    },
    texte: {
      fr: [
        "Cette boîte sert à ranger son téléphone afin de ne pas être sollicité pendant ses révisions. Le principe est que la boîte se verrouille quand elle est branchée et ne s'ouvre que deux heures après avoir demandé l'ouverture en appuyant sur le bouton. Le fonctionnement est simple : quand la boîte est fermée, un servomoteur place une tige en métal qui empêche l'ouverture. Une LED indique aussi l'état de la boîte : rouge quand elle est fermée, orange quand elle est en train de s'ouvrir et verte quand elle est ouverte."
      ],
      en: [
        "This box is used to store your phone so that you are not disturbed while revising. The principle is that the box locks when it is plugged in and only opens two hours after you ask for it to open by pressing the button. It works simply: when the box is closed, a servo motor places a metal rod that prevents it from opening. An LED also shows the state of the box: red when it is closed, orange while it is opening and green when it is open."
      ]
    },
    competences: ["3d", "c", "arduino"]
  },
  {
    dossier: "Pedale",
    titre: { fr: "Pédale d'amplification", en: "Amplifier pedal" },
    categorie: "iot",
    annee: "2024",
    resume: {
      fr: "Pédale d'amplification pour guitare électrique.",
      en: "Amplification pedal for electric guitar."
    },
    texte: {
      fr: [
        "Le principal défaut d'une guitare électrique est qu'il faut un amplificateur, qui prend de la place, pour obtenir un bon son. C'est pourquoi j'ai décidé de construire une pédale pour amplifier le signal de la guitare et l'envoyer dans un casque. La pédale possède une LED RGB qui s'allume selon le mode choisi. Le bouton central permet de passer du mode amplifié au mode non amplifié. Sur le côté se trouve un interrupteur permettant de choisir, quand la pédale n'est pas en mode amplifié, entre un mode bypass et un mode standby (le courant passe sans être modifié, ou il est bloqué). Si la pédale amplifie, la LED est bleue ; si elle est en bypass, la LED est verte ; et si elle est en standby, la LED est rouge."
      ],
      en: [
        "The main drawback of an electric guitar is that you need an amplifier, which takes up space, to get a good sound. That is why I decided to build a pedal that amplifies the guitar signal and sends it to headphones. The pedal has an RGB LED that lights up according to the selected mode. The central button switches between amplified and non-amplified mode. On the side, a switch lets you choose, when the pedal is not in amplified mode, between bypass and standby (the signal passes through unaffected, or it is blocked). If the pedal is amplifying, the LED is blue; if it is in bypass, the LED is green; and if it is in standby, the LED is red."
      ]
    },
    competences: ["cir"]
  },
  {
    dossier: "Guitare1",
    titre: { fr: "Guitare v1", en: "Guitar v1" },
    categorie: "iot",
    annee: "2024",
    resume: {
      fr: "Guitare électrique.",
      en: "Electric guitar."
    },
    texte: {
      fr: [
        "Ce projet est une guitare électrique que j'ai assemblée et à laquelle j'ai ajouté une amplification du signal pour pouvoir jouer avec un casque, des écouteurs ou brancher une enceinte. L'amplification est réglable : un interrupteur permet de l'activer ou de la désactiver à volonté, et un potentiomètre de régler le volume.",
        "Cette guitare a ensuite été démontée afin de l'améliorer."
      ],
      en: [
        "This project is an electric guitar that I assembled and to which I added signal amplification, so that I can play with headphones, earphones or connect a speaker. The amplification is adjustable: a switch lets me turn it on or off at will, and a potentiometer adjusts the volume.",
        "This guitar was later taken apart in order to improve it."
      ]
    },
    competences: ["cir"]
  },
  {
    dossier: "TourneurPages",
    titre: { fr: "Tourneur de pages", en: "Page turner" },
    categorie: "iot",
    annee: "2024",
    resume: {
      fr: "Tourneur de pages pour musiciens.",
      en: "Page turner for musicians."
    },
    texte: {
      fr: [
        "L'un des grands problèmes des musiciens est que les pages des partitions papier doivent être tournées pendant l'interprétation d'un morceau. Étant moi-même musicien, j'ai décidé de fabriquer un bras mécanique, actionné par un servomoteur. Ce dispositif s'active à l'aide d'une pédale fabriquée avec un bouton et deux pièces en métal."
      ],
      en: [
        "One of the big problems for musicians is that the pages of paper scores have to be turned while performing a piece. Being a musician myself, I decided to build a mechanical arm driven by a servo motor. The device is triggered by a pedal made from a button and two metal parts."
      ]
    },
    competences: ["cir", "arduino", "3d"]
  },
  //_____________________________________IN PROGRESS
  {
    dossier: "XChess",
    titre: { fr: "Jeu d'échecs", en: "Chess game" },
    categorie: "wip",
    annee: "2023",
    resume: {
      fr: "Jeu d'échecs en ligne, avec des pouvoirs pour les pièces.",
      en: "Online chess game with special powers for the pieces."
    },
    texte: {
      fr: [
        "XChess est un projet de jeu d'échecs sur ordinateur, avec une variante comportant des pièces additionnelles dotées de capacités spéciales. Ce jeu a été codé entièrement en Java.",
        "Pour l'instant, seule la partie plateau de jeu existe ; la partie interface utilisateur a été mise de côté."
      ],
      en: [
        "XChess is a computer chess game project, with a variant that adds extra pieces with special abilities. The game was coded entirely in Java.",
        "For now, only the game board part exists; the user interface part has been set aside."
      ]
    },
    competences: ["java", "serv"]
  },
  {
    dossier: "Violon",
    titre: { fr: "Violon électronique", en: "Electronic violin" },
    categorie: "wip",
    annee: "2023",
    resume: {
      fr: "Violon contrôlé par Arduino.",
      en: "Arduino-controlled violin."
    },
    texte: {
      fr: [
        "Ce projet est un violon électronique basé sur une plateforme Arduino. Le principe est de contrôler le jeu de l'archet grâce à un accéléromètre/gyroscope qui commande le volume et la corde virtuelle jouée. Les boutons sur le manche permettent de simuler l'appui des doigts.",
        "Abandonné car le gyroscope manquait de précision."
      ],
      en: [
        "This project is an electronic violin based on an Arduino platform. The idea is to control the bowing with an accelerometer/gyroscope that controls the volume and the virtual string being played. The buttons on the neck simulate finger presses.",
        "Abandoned because the gyroscope was not accurate enough."
      ]
    },
    competences: ["arduino", "3d", "c"]
  },
  {
    dossier: "AstralArcana",
    titre: { fr: "Astral Arcana", en: "Astral Arcana" },
    categorie: "wip",
    annee: "2022",
    resume: {
      fr: "MMORPG en ligne.",
      en: "Online MMORPG."
    },
    texte: {
      fr: [
        "Astral Arcana est un jeu vidéo 3D réalisé avec deux de mes amis. Ce jeu est un MMORPG (jeu de rôle en ligne massivement multijoueur) avec des royaumes et une histoire politique élaborée. À ce jour, il n'existe que des spécifications, et la phase de programmation n'a pas encore commencé. Le royaume le plus développé est celui nommé « Mary Bay », pour lequel 54 espèces de faune et de flore ont été imaginées."
      ],
      en: [
        "Astral Arcana is a 3D video game made with two of my friends. It is an MMORPG (massively multiplayer online role-playing game) with kingdoms and an elaborate political history. To date, only specifications exist, and the programming phase has not started yet. The most developed kingdom is the one called 'Mary Bay', for which 54 species of fauna and flora have been imagined."
      ]
    },
    competences: ["java", "serv", "pm"]
  }
];

/* =========================================================
   PARCOURS & DÉVELOPPEMENT
   Section en bas de page : une suite de blocs, chacun avec
   un titre, du texte et (optionnel) une vidéo.
   video = fichier local ("assets/ma-video.mp4", mp4 ou webm)
           ou lien YouTube / Vimeo.
   Retire "video" pour un bloc texte seul, retire "texte" pour
   une vidéo seule. Copie un bloc pour en ajouter.
   Mets  blocs: []  pour masquer toute la section.
   ========================================================= */
const CARRIERE = {
  ref: "U4",
  titre: { fr: "Parcours & développement", en: "Career & development" },
  desc: {
    fr: "Mes projets pour le futur.",
    en: "My plans for the future."
  },
  blocs: [
    {
      titre: { fr: "Formation", en: "Education" },
      texte: {
        fr: [
          "Bonjour ! Je m'appelle Arthur et je suis étudiant en première année d'école d'ingénieurs, en 3EA, à l'INP-ENSEEIHT. Issu d'une classe préparatoire MPI, j'ai toujours été passionné d'informatique et d'électronique, mais j'ai choisi de me spécialiser en génie électrique car je souhaite faire le lien entre le logiciel et le matériel afin de concevoir des systèmes intelligents.",
          "Ma classe préparatoire m'a apporté de solides capacités d'analyse ainsi que de bonnes bases en mathématiques, en physique et en programmation. En dehors des cours, j'aime bricoler : je réalise régulièrement des projets personnels avec Arduino et Raspberry Pi pour automatiser de petites choses autour de moi. Je suis également membre actif du Club Robot de l'N7, où nous travaillons en équipe à la fois sur la conception électronique et sur la programmation de nos robots."
        ],
        en: [
          "Hi! I’m Arthur, a first-year engineering student in 3EA at INP-ENSEEIHT. Coming from an MPI prep class, I’ve always been super passionate about computer science and electronics, but I decided to specialize in electrical engineering because I really want to bridge the gap between software and hardware to design smart systems.",
          "My prep class gave me strong analytical skills and a solid base in math, physics and coding. Outside of classes, I love tinkering with hardware—for instance, I regularly build personal projects using Arduino and Raspberry Pi to automate small things around me. Plus, I’m an active member of the N7 Robot Club, where we collaborate as a team to handle both the electronic design and the programming part of our robots."
        ]
      },
      video: "https://youtu.be/VihCjXVMHMM",
      legende: { fr: "Présentation de mon parcours", en: "A short tour of my background" }
    },
    {
      titre: { fr: "Objectifs", en: "Goals" },
      texte: {
        fr: "À l'avenir, mon objectif est de travailler sur des systèmes embarqués dans l'industrie aérospatiale, idéalement dans de grandes entreprises comme Thales, Airbus ou Safran, où la fiabilité et la performance sont essentielles. Pour y parvenir, mon plan A est de poursuivre en double diplôme avec l'ISAE-Supaéro afin d'acquérir la meilleure expertise aérospatiale possible. La mobilité internationale me motive également beaucoup : j'aimerais étudier aux États-Unis pour découvrir leur écosystème technologique en perpétuel mouvement, ou en Scandinavie, en Norvège ou en Suède, pour leur culture d'ingénierie de haut niveau et leur attention portée aux technologies durables. Toutes ces étapes m'aideront à devenir un ingénieur polyvalent, prêt à relever les défis industriels de demain. Merci de votre attention !",
        en: "Looking ahead, my goal is to work on embedded systems in the aerospace industry, ideally at top companies like Thales, Airbus, or Safran, where reliability and performance are critical. To make this happen, my plan A is to pursue a double degree with ISAE-Supaéro to get the best aerospace expertise possible. I’m also very motivated by international mobility: I’d love to study in the US to discover their fast-paced tech ecosystem, or in Scandinavia—like Norway or Sweden—for their high-level engineering culture and focus on sustainable tech. Ultimately, all these steps will help me become a versatile engineer ready to tackle tomorrow's industrial challenges. Thanks a lot for watching!"
      }
    }
  ]
};
