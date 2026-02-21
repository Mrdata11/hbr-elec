# HBR Électricité générale — Site vitrine

Site vitrine professionnel pour HBR Électricité générale, électricien indépendant à Bruxelles.

## Structure du projet

```
hbr-elec/
├── index.html       ← Page unique (toutes les sections)
├── styles.css       ← Feuille de style (CSS custom, mobile-first)
├── script.js        ← JavaScript (navbar, animations, formulaire)
├── images/          ← Images (stock + logo)
├── sitemap.xml      ← Plan du site pour les moteurs de recherche
└── README.md        ← Ce fichier
```

## Tester en local

Ouvrir un terminal dans le dossier du projet et lancer :

```bash
python3 -m http.server 8000
```

Puis ouvrir [http://localhost:8000](http://localhost:8000) dans un navigateur.

## Éléments à personnaliser avant mise en ligne

Rechercher `À REMPLIR` dans le code HTML pour trouver tous les placeholders.

### Obligatoires

| Élément | Emplacement | Format |
|---------|-------------|--------|
| **Numéro de téléphone** | Hero, Contact, Footer, Schema.org | `+32 XXX XX XX XX` |
| **Adresse email** | Contact, Footer | `contact@hbr-elec.be` |
| **Numéro TVA (BCE)** | Footer, Schema.org | `BE XXXX.XXX.XXX` |
| **ID Formspree** | Formulaire de contact (`action="..."`) | Créer un formulaire sur [formspree.io](https://formspree.io) et copier l'ID |
| **Logo HBR** | Navbar, Footer (remplacer le texte placeholder) | Fichier PNG ou SVG |
| **URL du site** | Schema.org, Open Graph, sitemap.xml | `https://www.hbr-elec.be/` |

### Recommandés

| Élément | Emplacement |
|---------|-------------|
| Photo de Yann | Section "À propos" — remplacer `about-placeholder.jpg` |
| Photos de réalisations | Section "Réalisations" — remplacer `portfolio-1.jpg` à `portfolio-6.jpg` |
| Vrais avis clients | Section "Avis clients" — modifier le texte des 3 témoignages |
| Horaires d'ouverture | Section Contact |
| Liens réseaux sociaux | Footer — remplacer les `href="#"` |
| Certification RGE | Section Services (carte Photovoltaïque) |
| URL Google Maps | Section Zone d'intervention — remplacer le `src` de l'iframe |
| Favicon | Générer à partir du logo et remplacer `favicon.png` |

### Comment configurer Formspree

1. Aller sur [formspree.io](https://formspree.io) et créer un compte gratuit
2. Créer un nouveau formulaire
3. Copier l'ID du formulaire (ex : `xrgvkbpl`)
4. Dans `index.html`, remplacer `YOUR_FORM_ID` par cet ID dans l'attribut `action` du formulaire
5. Tester en envoyant un message de test

### Comment remplacer le logo texte par le vrai logo

1. Placer le fichier logo dans le dossier `images/` (ex : `logo-hbr.png`)
2. Dans `index.html`, remplacer les 2 occurrences du logo texte par :
   ```html
   <img src="images/logo-hbr.png" alt="HBR Électricité générale" width="150" height="50">
   ```
3. Supprimer les classes `logo-text` et styles associés si nécessaire

### Comment obtenir l'URL Google Maps embed

1. Aller sur [Google Maps](https://www.google.com/maps)
2. Rechercher l'adresse de l'entreprise ou "Bruxelles"
3. Cliquer sur "Partager" → "Intégrer une carte"
4. Copier l'URL du `src` de l'iframe
5. Remplacer l'URL dans la section "Zone d'intervention"

## Déploiement

### Option 1 : Netlify (recommandé)

1. Créer un compte sur [netlify.com](https://www.netlify.com)
2. Glisser-déposer le dossier `hbr-elec/` dans l'interface Netlify
3. Configurer le nom de domaine `hbr-elec.be`

### Option 2 : GitHub Pages

1. Créer un repository GitHub
2. Pousser les fichiers
3. Activer GitHub Pages dans les paramètres du repository
4. Configurer le domaine personnalisé

### Option 3 : Vercel

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Importer le projet
3. Configurer le domaine

## Technologies

- HTML5 sémantique
- CSS3 custom (variables CSS, Grid, Flexbox)
- JavaScript vanilla (Intersection Observer, Fetch API)
- Google Fonts (Montserrat)
- Formspree (formulaire de contact)

## Crédits images

Les images stock proviennent de [Unsplash](https://unsplash.com) et sont utilisées à titre temporaire.
Elles doivent être remplacées par les vraies photos de l'entreprise.
