# 🛠️ Guide de dépannage - Commentaires et localhost

## Problème
Les commentaires ne s'affichent pas lorsque vous testez en local (localhost:8000, localhost:8001, etc.).

## Solution

### Pourquoi ce problème ?
Lorsque vous testez en local avec `http://localhost`, votre navigateur bloque les requêtes vers Airtable en raison de la **politique CORS (Cross-Origin Resource Sharing)**. C'est un comportement normal et sécurisé des navigateurs web.

### Solutions disponibles

#### ✅ Solution 1 : Utiliser Netlify (recommandé)
Votre site est déjà configuré pour fonctionner parfaitement sur Netlify avec HTTPS :
- Les commentaires s'affichent correctement
- Pas de problème CORS
- HTTPS activé automatiquement

#### ✅ Solution 2 : Utiliser ngrok (test local sécurisé)
1. Installez ngrok : `npm install -g ngrok`
2. Lancez : `ngrok http 8000`
3. Utilisez l'URL HTTPS fournie par ngrok (ex: https://abc123.ngrok.io)

#### ✅ Solution 3 : Extension Chrome (développement rapide)
Installez l'extension "Allow CORS: Access-Control-Allow-Origin" sur Chrome pour désactiver temporairement la protection CORS.

### Comportement attendu
- **En local (HTTP)** : Affichage d'un message d'information + commentaires de fallback
- **Sur Netlify (HTTPS)** : Affichage de tous les vrais commentaires depuis Airtable

### Vérification
Ouvrez la console du navigateur (F12) → onglet "Console" pour voir :
- Les logs de chargement des commentaires
- Les erreurs éventuelles CORS
- Le mode actuel (HTTP vs HTTPS)