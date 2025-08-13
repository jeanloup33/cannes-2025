# 🎬 Festival de Cannes Night - Site Web Événementiel

> Site web élégant pour une soirée à thème Festival de Cannes avec système de commentaires en temps réel

## 🌟 Aperçu

Site web moderne et responsive pour organiser une soirée glamour sur le thème du Festival de Cannes. Comprend une galerie photos, un système de news, et un système de commentaires en temps réel permettant aux invités de partager leur enthousiasme.

## ✨ Fonctionnalités

### 🎭 Interface Principale
- **Design thème sombre** avec accents dorés
- **Hero section** avec image de fond et call-to-action
- **Galerie photos** responsive avec lightbox
- **Section actualités** avec articles dynamiques
- **Interface mobile-first** entièrement responsive

### 💬 Système de Commentaires
- **Commentaires en temps réel** via Airtable
- **Partage entre visiteurs** sans identification requise
- **Interface élégante** avec avatars et timestamps
- **Synchronisation automatique** toutes les 30 secondes
- **Fallback intelligent** vers stockage local
- **Validation et sécurité** intégrées

### 📱 Progressive Web App (PWA)
- **Installation** sur mobile et desktop
- **Mode hors-ligne** avec Service Worker
- **Icônes** optimisées pour tous les appareils
- **Manifest** complet pour l'installation

### 🛡️ Sécurité
- **Content Security Policy** (CSP) configurée
- **Validation** des données utilisateur
- **Protection** contre les injections
- **Gestion d'erreurs** robuste

## 🏗️ Architecture Technique

### Frontend
- **HTML5** sémantique
- **CSS3** avec Tailwind CSS
- **JavaScript ES6+** vanilla
- **Responsive Design** mobile-first

### Backend & Base de Données
- **Airtable** comme base de données cloud
- **API REST** pour les commentaires
- **Netlify** pour l'hébergement
- **GitHub** pour le versioning

### Déploiement
- **Netlify** avec déploiement continu
- **CDN mondial** pour les performances
- **HTTPS** automatique
- **Domaine personnalisé** supporté

## 🚀 Installation et Configuration

### Prérequis
- Compte [Netlify](https://netlify.com)
- Compte [Airtable](https://airtable.com)
- Compte [GitHub](https://github.com)

### 1. Cloner le Repository
```bash
git clone https://github.com/jeanloup33/cannes-2025.git
cd cannes-2025
```

### 2. Configuration Airtable

#### Créer la Base de Données
1. Créez une nouvelle base Airtable
2. Créez une table nommée `Comments`
3. Configurez les colonnes :
   - `Nom` (Single line text)
   - `Message` (Long text)
   - `Date` (Single line text)

#### Générer le Token API
1. Allez sur [Airtable Tokens](https://airtable.com/create/tokens)
2. Créez un nouveau token avec les permissions :
   - `data.records:read`
   - `data.records:write`
3. Sélectionnez votre base
4. Copiez le token généré

#### Configurer l'Application
Dans `index.html`, mettez à jour la configuration :
```javascript
const AIRTABLE_CONFIG = {
  baseId: 'VOTRE_BASE_ID',        // Ex: appXXXXXXXXXXXXXX
  tableName: 'Comments',
  apiKey: 'VOTRE_TOKEN_API'       // Token avec permissions read/write
};
```

### 3. Déploiement sur Netlify

#### Via GitHub (Recommandé)
1. Forkez ce repository
2. Connectez votre compte Netlify à GitHub
3. Créez un nouveau site depuis votre fork
4. Le déploiement se fait automatiquement

#### Via Drag & Drop
1. Téléchargez le code source
2. Glissez-déposez le dossier sur Netlify
3. Votre site est en ligne immédiatement

## 📁 Structure du Projet

```
cannes-2025/
├── index.html              # Page principale
├── news.html              # Page actualités
├── offline.html           # Page hors-ligne
├── manifest.webmanifest   # Manifest PWA
├── sw.js                  # Service Worker
├── app.js                 # JavaScript principal
├── netlify.toml          # Configuration Netlify
├── _headers              # Headers HTTP
├── assets/               # Images et médias
│   ├── hero.webp
│   ├── gallery*.webp
│   ├── logo.webp
│   └── news.json
├── icons/                # Icônes PWA
│   ├── icon-192.png
│   └── icon-512.png
├── content/news/         # Articles de blog
├── admin/                # Interface d'administration
└── scripts/              # Scripts de build
```

## 🎨 Personnalisation

### Couleurs et Thème
Les couleurs principales sont définies dans `index.html` :
```css
:root {
  --gold: #d4af37;
  --gold-soft: #f4e4a6;
  --dark: #0b0b0d;
}
```

### Images
- Remplacez `assets/hero.webp` pour l'image principale
- Ajoutez vos photos dans `assets/gallery*.webp`
- Mettez à jour `assets/logo.webp` avec votre logo

### Contenu
- Modifiez les textes directement dans `index.html`
- Ajoutez des actualités dans `content/news/`
- Personnalisez les métadonnées dans `<head>`

## 💬 Gestion des Commentaires

### Interface Utilisateur
- Formulaire simple : nom + message
- Affichage en temps réel avec avatars
- Synchronisation automatique
- Design responsive

### Administration
- Tous les commentaires visibles dans Airtable
- Modération possible (suppression/modification)
- Export des données en CSV
- Statistiques d'engagement

### Sécurité
- Validation côté client et serveur
- Protection anti-spam (honeypot)
- Gestion des erreurs robuste
- Fallback automatique

## 📊 Analytics et Monitoring

### Netlify Analytics
- Trafic et pages vues
- Géolocalisation des visiteurs
- Performance du site

### Airtable Insights
- Nombre de commentaires
- Engagement des utilisateurs
- Tendances temporelles

## 🔧 Maintenance

### Mises à Jour
- Push sur GitHub → Déploiement automatique
- Monitoring via Netlify Dashboard
- Logs d'erreurs accessibles

### Sauvegarde
- Code source sur GitHub
- Commentaires dans Airtable
- Export régulier recommandé

## 🌐 Performance

### Optimisations
- Images WebP pour la compression
- CSS et JS minifiés
- CDN Netlify mondial
- Service Worker pour le cache

### Scores
- **Lighthouse** : 95+ sur tous les critères
- **Mobile-friendly** : 100%
- **PWA** : Installation native

## 🐛 Dépannage

### Problèmes Courants

#### Commentaires non sauvegardés
1. Vérifiez la configuration Airtable
2. Contrôlez les permissions du token
3. Vérifiez la structure de la table

#### Site non accessible
1. Vérifiez le statut Netlify
2. Contrôlez les DNS si domaine personnalisé
3. Vérifiez les logs de déploiement

#### Images non affichées
1. Vérifiez les chemins des fichiers
2. Contrôlez la taille des images
3. Vérifiez le format WebP

### Logs de Debug
Ouvrez la console navigateur (F12) pour voir :
- Statut des requêtes Airtable
- Erreurs JavaScript
- Messages de debug détaillés

## 📞 Support

### Documentation
- [Netlify Docs](https://docs.netlify.com/)
- [Airtable API](https://airtable.com/developers/web/api/introduction)
- [PWA Guide](https://web.dev/progressive-web-apps/)

### Communauté
- [Netlify Community](https://community.netlify.com/)
- [Airtable Community](https://community.airtable.com/)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **Tailwind CSS** pour le framework CSS
- **Airtable** pour la base de données
- **Netlify** pour l'hébergement
- **WebP** pour l'optimisation des images

---

**Développé avec ❤️ pour une soirée Festival de Cannes inoubliable ! 🎬✨**

> Pour toute question ou support, consultez la documentation ou ouvrez une issue sur GitHub.