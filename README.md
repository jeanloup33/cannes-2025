# 🎬 Soirée Festival de Cannes - Site Web

Site officiel pour la soirée "Festival de Cannes Night" du 13 septembre 2025 à Bruges.

## 🚀 Mise en production

### Prérequis
- Node.js 18+ (voir `.nvmrc`)
- Git configuré

### Installation locale
```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd cannes-party

# Installer les dépendances
npm install

# Lancer le serveur local
npm start
# ou
python -m http.server 8000 --bind 127.0.0.1
```

### Déploiement GitHub Pages

1. **Créer le repository GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Soirée Festival de Cannes 2025"
   git branch -M main
   git remote add origin https://github.com/[VOTRE_USERNAME]/cannes-party.git
   git push -u origin main
   ```

2. **Activer GitHub Pages**
   - Aller dans les paramètres du repository
   - Section "Pages" → Source → Deploy from a branch
   - Sélectionner "main" branch et "/ (root)"

3. **Vérifier le déploiement**
   - Le site sera accessible à : `https://[VOTRE_USERNAME].github.io/cannes-party/`

### Structure du projet

```
cannes-party/
├── index.html              # Page principale avec actualités
├── news.html               # Page actualités détaillée
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service Worker
├── assets/                 # Images et médias
├── content/news/           # Articles Markdown
├── icons/                  # Icônes PWA
├── uploads/                # Images uploadées
├── scripts/                # Scripts de build
├── admin/                  # Configuration Netlify CMS
└── comments.json           # Système de commentaires
```

### Fonctionnalités

- ✅ Design responsive et moderne avec style premium
- ✅ PWA (Progressive Web App)
- ✅ Actualités dynamiques via Netlify CMS
- ✅ Formulaire de réservation
- ✅ Partage social
- ✅ Mode hors ligne
- ✅ Optimisation SEO
- ✅ Système de commentaires
- ✅ Galerie photo interactive avec navigation précédent/suivant
- ✅ Galerie de stars avec effets visuels premium
- ✅ Menu optimisé avec lien "Les Stars" et FAQ à droite

### Configuration

#### Variables d'environnement
Les fichiers de configuration sont déjà prêts :
- `netlify.toml` - Configuration Netlify
- `_headers` - Headers de sécurité
- `manifest.webmanifest` - Configuration PWA

#### Netlify CMS
Le site utilise Netlify CMS pour la gestion du contenu avec connexion via Netlify Identity (git-gateway). La configuration est prête dans `admin/config.yml`.

### Scripts de build

```bash
# Construire les actualités
npm run build:news

# Vérifier la syntaxe
npm run check-syntax
```

### Améliorations récentes (2025)
- 🔧 Nettoyage complet du système Firebase Messaging (FCM) pour optimiser les performances
- 🔧 Migration vers Netlify Identity pour l'authentification CMS
- 🔧 Amélioration de la navigation avec menu optimisé
- 🔧 Refonte des liens de navigation pour une meilleure UX

### Support navigateurs
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers
- Support complet des fonctionnalités premium sur tous les navigateurs modernes

### Maintenance

#### Ajouter une actualité
1. Créer un fichier `.md` dans `content/news/`
2. Format : `YYYY-MM-DD-titre.md`
3. Déployer automatiquement via GitHub Pages

#### Mettre à jour le contenu
Les modifications sur la branche `main` sont automatiquement déployées.

### Contact & Support
Pour toute question ou problème :
- 🐛 [Ouvrir une issue sur GitHub](https://github.com/jeanloup33/cannes-2025/issues)
- 📧 Contacter l'équipe organisatrice
- 💬 Discussions sur le repository GitHub

---

**🌐 Site en production :** [https://cannes-2025.netlify.app](https://cannes-2025.netlify.app)

**📅 Événement :** 13 septembre 2025 • Bruges • Dress code glamour ✨

**🔗 Repository :** [https://github.com/jeanloup33/cannes-2025](https://github.com/jeanloup33/cannes-2025)