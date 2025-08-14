# 🚀 Guide de déploiement rapide GitHub

## Étapes pour déployer sur GitHub Pages

### 1. Initialiser Git (si pas déjà fait)
```bash
git init
git add .
git commit -m "Initial commit - Soirée Festival de Cannes 2025"
git branch -M main
```

### 2. Créer le repository GitHub
1. Aller sur https://github.com/new
2. Créer un nouveau repository nommé `cannes-party` (ou autre nom)
3. Ne PAS cocher "Initialize with README"

### 3. Connecter et pousser
```bash
git remote add origin https://github.com/[VOTRE_USERNAME]/cannes-party.git
git push -u origin main
```

### 4. Activer GitHub Pages
1. Aller dans Settings → Pages du repository
2. Source → Deploy from a branch
3. Branch → main / root
4. Sauvegarder

### 5. Vérifier le déploiement
- Le site sera accessible sous : `https://[VOTRE_USERNAME].github.io/cannes-party/`
- Le déploiement prend 1-5 minutes

## Commandes utiles

### Mettre à jour le site
```bash
git add .
git commit -m "Mise à jour [description]"
git push origin main
```

### Vérifier l'état
```bash
git status
git log --oneline -5
```

## 🎯 Prêt pour la production

✅ Bouton "Tester les notifications" supprimé  
✅ Code de test nettoyé  
✅ Fichiers de débogage supprimés  
✅ README.md mis à jour  
✅ .gitignore configuré  
✅ Structure optimisée  

Le site est maintenant prêt pour le déploiement !