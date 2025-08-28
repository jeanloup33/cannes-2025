# 🔧 Fix: Service Worker 404 Error - Firebase Cloud Messaging

## ✅ Problème résolu : fichier `firebase-messaging-sw.js` manquant

Le fichier `firebase-messaging-sw.js` a été créé pour résoudre l'erreur :
```
FirebaseError: Messaging: We are unable to register the default service worker. Failed to register a ServiceWorker... firebase-messaging-sw.js returned 404
```

## 📁 Nouveau fichier créé
- `firebase-messaging-sw.js` - Service worker Firebase requis pour FCM

## 🧪 Test du correctif

### Étape 1 : Vérifier la présence du fichier
```bash
# Dans votre terminal
curl -I http://localhost:8000/firebase-messaging-sw.js
# Devrait retourner HTTP/1.0 200 OK
```

### Étape 2 : Test via navigateur
1. **Ouvrez** : http://localhost:8000/get-token.html
2. **Cliquez** sur "Obtenir automatiquement le token"
3. **Suivez** les instructions de permission
4. **Vérifiez** la console pour : `✅ Token obtenu avec succès!`

### Étape 3 : Test via console (méthode alternative)
```javascript
// Dans la console (F12)
await window.getFCMToken()
```

## 🔄 Si l'erreur persiste

### 1. Rafraîchir le Service Worker
```javascript
// Dans la console
try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) await reg.unregister();
    location.reload();
} catch(e) { console.log('Service Worker refresh:', e); }
```

### 2. Vérifier les permissions
```javascript
// Vérifier l'état actuel
console.log('Notification permission:', Notification.permission);
console.log('Service Worker support:', 'serviceWorker' in navigator);
```

### 3. Nettoyer le cache
```javascript
// Nettoyer le cache du service worker
if ('caches' in window) {
    caches.keys().then(keys => keys.forEach(key => caches.delete(key)));
    location.reload();
}
```

## 📋 Configuration requise

### Service Worker Registration
Le fichier `firebase-messaging-sw.js` doit être accessible à :
```
http://localhost:8000/firebase-messaging-sw.js
```

### Structure des fichiers
```
cannes/
├── firebase-messaging-sw.js  ✅ (nouveau)
├── firebase-config.js          ✅ (existant)
├── get-token.html              ✅ (existant)
├── send-fcm-test.js           ✅ (existant)
└── ...
```

## 🚨 Erreurs courantes après le fix

### Service Worker déjà enregistré
```javascript
// Forcer la mise à jour du service worker
navigator.serviceWorker.getRegistration().then(reg => {
    if (reg) reg.update();
});
```

### Token non généré
- **Vérifiez** que les notifications sont autorisées dans les paramètres du navigateur
- **Testez** avec un autre navigateur (Chrome recommandé)
- **Utilisez** le mode incognito pour éviter les conflits

## ✅ Vérification finale

### Test complet via terminal
```bash
# 1. Démarrer le serveur
python -m http.server 8000

# 2. Ouvrir dans Chrome
open http://localhost:8000/get-token.html

# 3. Copier le token
# 4. Tester avec Node.js
node send-fcm-test.js "VOTRE_TOKEN_ICI"
```

### Messages attendus
- Console : `✅ Firebase initialisé avec succès`
- Console : `✅ Système de notifications configuré`
- Console : `✅ Token obtenu avec succès!`
- Terminal : `✅ Notification envoyée avec succès!`

## 🎯 Résolution rapide
Si vous voyez encore des erreurs :

1. **Actualisez** la page avec Ctrl+Shift+R (hard refresh)
2. **Vérifiez** que `firebase-messaging-sw.js` existe dans votre dossier
3. **Testez** dans un nouvel onglet/incognito
4. **Utilisez** `get-token.html` pour le test complet

Le fichier manquant a été créé - votre système FCM devrait maintenant fonctionner correctement !