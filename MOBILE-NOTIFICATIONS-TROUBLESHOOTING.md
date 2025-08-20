# 📱 Guide de dépannage - Notifications mobiles

## 🚨 Problème identifié
Les notifications ne fonctionnent pas sur mobile en local (localhost) car elles nécessitent **HTTPS** pour les Service Workers.

## ✅ Solution immédiate

### 1. Test sur Netlify (RECOMMANDÉ)
**Déployez sur Netlify** - c'est la solution la plus simple :
```bash
# Si vous avez déjà Netlify CLI
netlify deploy --prod --dir .

# Ou via Git push
```
Netlify fournit automatiquement HTTPS, permettant aux Service Workers de fonctionner.

### 2. Test local avec HTTPS (ngrok)

#### Installation de ngrok :
```bash
# Via npm (recommandé)
npm install -g ngrok

# Ou téléchargez depuis https://ngrok.com/download
```

#### Configuration :
```bash
# Exposer votre serveur local en HTTPS
ngrok http 8000

# Vous obtiendrez une URL HTTPS comme :
# https://abc123.ngrok.io
```

#### Test mobile :
1. Lancez `ngrok http 8000`
2. Ouvrez l'URL HTTPS sur votre mobile
3. Activez les notifications
4. Testez le bouton "Test notif commentaire"

### 3. Alternative : localtunnel
```bash
# Installation
npm install -g localtunnel

# Utilisation
lt --port 8000 --subdomain cannes-test

# URL : https://cannes-test.loca.lt
```

## 🔍 Diagnostic pas à pas

### Vérification du Service Worker
Ouvrez la console développeur (F12) et vérifiez :

```javascript
// Vérifier l'enregistrement du Service Worker
navigator.serviceWorker.getRegistration().then(reg => {
  console.log('Service Worker:', reg ? '✅ Actif' : '❌ Non enregistré');
});

// Vérifier les permissions
console.log('Permissions:', Notification.permission);

// Vérifier HTTPS
console.log('HTTPS:', location.protocol === 'https:' ? '✅ OK' : '❌ Requis');
```

### Test sur mobile avec Chrome DevTools

#### Android (via USB) :
1. Activez le mode développeur sur Android
2. Connectez via USB
3. Ouvrez `chrome://inspect/#devices` sur votre ordinateur
4. Activez le port forwarding : `localhost:8000` → `localhost:8000`
5. Testez sur votre mobile

#### Commandes utiles :
```bash
# Port forwarding avec ADB (Android)
adb reverse tcp:8000 tcp:8000

# Vérifiez la connexion
adb devices
```

## 🎯 Test rapide checklist

Avant de tester les notifications, assurez-vous que :

- [ ] Vous êtes sur **HTTPS** (pas localhost)
- [ ] Le Service Worker est **actif** (voir console)
- [ ] Les permissions sont **accordées** (Notification.permission === 'granted')
- [ ] Le bouton "Activer les notifications" a été cliqué

## 🛠️ Script de test complet

### Test dans la console :
```javascript
// Test complet des notifications
(async () => {
  // Vérifier HTTPS
  if (location.protocol !== 'https:') {
    console.error('❌ HTTPS requis pour mobile');
    return;
  }
  
  // Vérifier permissions
  if (Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }
  
  // Vérifier Service Worker
  if (!('serviceWorker' in navigator)) {
    console.error('❌ Service Worker non supporté');
    return;
  }
  
  const registration = await navigator.serviceWorker.ready;
  console.log('✅ Service Worker prêt');
  
  // Envoyer une notification de test
  await registration.showNotification('Test mobile', {
    body: 'Notification test depuis mobile',
    icon: './icons/icon-192.png'
  });
  
  console.log('✅ Notification envoyée');
})();
```

## 📋 Erreurs courantes et solutions

### Erreur : "Illegal constructor"
**Cause** : Tentative d'utiliser `new Notification()` sur mobile sans HTTPS
**Solution** : Utilisez `registration.showNotification()` via Service Worker

### Erreur : "Service Worker registration failed"
**Cause** : Pas de HTTPS ou fichier sw.js inaccessible
**Solution** : 
- Vérifiez que sw.js est accessible via `/sw.js`
- Utilisez HTTPS (ngrok ou Netlify)

### Erreur : "Notifications blocked"
**Cause** : Permissions refusées ou navigateur bloquant
**Solution** : 
- Réinitialisez les permissions dans Chrome → Paramètres → Confidentialité → Paramètres du site → Notifications
- Sur mobile : Paramètres → Applications → Chrome → Notifications

## 🚀 Test immédiat avec votre smartphone

### Méthode 1 : Netlify (30 secondes)
1. Poussez votre code sur GitHub
2. Connectez GitHub à Netlify
3. Déployez automatiquement
4. Testez l'URL Netlify sur mobile

### Méthode 2 : ngrok (2 minutes)
1. Installez ngrok : `npm install -g ngrok`
2. Lancez : `ngrok http 8000`
3. Ouvrez l'URL HTTPS sur mobile
4. Testez les notifications

### Méthode 3 : Chrome DevTools (Android)
1. Connectez votre Android en USB
2. Activez le mode développeur
3. Ouvrez `chrome://inspect/#devices`
4. Activez le port forwarding
5. Testez via localhost:8000

## 📞 Support

Si les notifications ne fonctionnent toujours pas :

1. **Vérifiez la console** : F12 → Console
2. **Testez le diagnostic** : ouvrez `/diagnostic-notifications.html`
3. **Envoyez les logs** : copiez/collez la console
4. **Vérifiez HTTPS** : assurez-vous d'être sur HTTPS

## ✅ Résumé

- **Localhost HTTP** : ❌ Ne fonctionne pas sur mobile
- **Netlify HTTPS** : ✅ Fonctionne parfaitement
- **ngrok HTTPS** : ✅ Fonctionne en local
- **Chrome DevTools** : ✅ Pour Android

**Recommandation** : Déployez sur Netlify pour les tests mobiles.