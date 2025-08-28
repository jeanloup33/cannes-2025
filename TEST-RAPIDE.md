# 🚀 Test rapide des notifications FCM

## Étape 1 : Vérifier l'installation
1. Ouvrez votre site : http://localhost:8000/test-fcm.html
2. Cliquez sur "Vérifier la permission"
3. Acceptez les notifications si demandé

## Étape 2 : Obtenir le token
1. Dans test-fcm.html, cliquez sur "Obtenir le token FCM"
2. Le token sera automatiquement copié dans votre presse-papiers
3. Notez ce token quelque part

## Étape 3 : Configurer Firebase
1. Allez sur https://console.firebase.google.com
2. Sélectionnez votre projet Cannes
3. Allez dans Paramètres > Cloud Messaging
4. Copiez la **Clé serveur** (Server key)

## Étape 4 : Tester l'envoi
1. Ouvrez le terminal
2. Exécutez : 
   ```bash
   node send-fcm-test.js "VOTRE_TOKEN_ICI"
   ```
3. Remplacez "VOTRE_TOKEN_ICI" par le token obtenu

## Étape 5 : Vérifier la réception
- Regardez votre navigateur pour la notification
- Vérifiez aussi votre téléphone si vous avez installé le PWA

## Commandes utiles
```bash
# Test simple
node send-fcm-test.js "abc123..."

# Test avec message personnalisé
node send-fcm-test.js "abc123..." "🎬 Nouveau" "Jean-Loup a partagé un moment !"

# Test avec envoi à tous (topic)
# (nécessite d'abord de s'abonner au topic dans le code)
```

## Dépannage rapide
- **Pas de notification ?** Vérifiez que la permission est accordée
- **Token invalide ?** Rechargez la page et récupérez un nouveau token
- **Erreur 401 ?** Vérifiez votre clé serveur Firebase
- **Erreur 404 ?** Vérifiez que le token est bien copié

## Test en 30 secondes
1. Ouvrez : http://localhost:8000/test-fcm.html
2. Cliquez sur "Obtenir le token FCM"
3. Copiez le token
4. Dans le terminal : `node send-fcm-test.js [token]`
5. Vérifiez la notification !