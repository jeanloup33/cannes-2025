// Système de notifications Festival de Cannes
// Code simple et propre inspiré de test-notifications.html

// Fonction pour demander les permissions
window.requestNotificationPermission = async function() {
  console.log('🔔 Demande de permission notifications');
  
  if (!('Notification' in window)) {
    console.log('❌ Notifications non supportées');
    alert('Votre navigateur ne supporte pas les notifications.');
    return;
  }
  
  try {
    const permission = await Notification.requestPermission();
    console.log('📝 Permission:', permission);
    
    if (permission === 'granted') {
      console.log('✅ Permissions accordées !');
      hideNotificationPrompt();
      showTestButton();
    } else {
      console.log('❌ Permissions refusées');
      alert('Permissions refusées. Vous pouvez les réactiver dans les paramètres de votre navigateur.');
    }
  } catch (error) {
    console.log('❌ Erreur:', error.message);
    alert('Erreur lors de la demande de permission: ' + error.message);
  }
};

// Fonction pour envoyer une notification de test
window.sendTestNotification = function() {
  console.log('🧪 Test de notification');
  
  if (Notification.permission !== 'granted') {
    alert('Veuillez d\'abord activer les notifications.');
    return;
  }
  
  try {
    // Test notification simple d'abord
    const notification = new Notification('🎬 Festival de Cannes', {
      body: 'Test de notification simple !',
      icon: './icons/icon-192.png'
    });
    
    console.log('✅ Notification simple envoyée');
    
    notification.onclick = function() {
      console.log('👆 Notification cliquée');
      notification.close();
    };
    
    // Test Service Worker si disponible
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(async function(registration) {
        // Attendre que le Service Worker soit actif
        if (registration.active?.state !== 'activated') {
          console.log('⏳ Attente activation Service Worker...');
          await new Promise(resolve => {
            const sw = registration.installing || registration.waiting || registration.active;
            if (sw.state === 'activated') resolve();
            else sw.addEventListener('statechange', () => sw.state === 'activated' && resolve());
          });
        }
        
        console.log('📡 Service Worker prêt et actif');
        
        registration.showNotification('🎬 Festival de Cannes - Test SW', {
          body: 'Test depuis Service Worker !',
          icon: './icons/icon-192.png',
          badge: './icons/icon-192.png',
          vibrate: [200, 100, 200],
          tag: 'test-cannes',
          requireInteraction: true,
          actions: [
            {
              action: 'view',
              title: 'Voir',
              icon: './icons/icon-192.png'
            }
          ]
        });
        
        console.log('✅ Notification Service Worker envoyée');
      }).catch(function(error) {
        console.log('❌ Erreur Service Worker:', error.message);
      });
    }
    
  } catch (error) {
    console.log('❌ Erreur notification:', error.message);
    alert('Erreur lors du test de notification: ' + error.message);
  }
};

// Fonction pour masquer le widget
window.hideNotificationPrompt = function() {
  console.log('❌ Fermeture du widget notifications');
  const prompt = document.getElementById('notification-prompt');
  if (prompt) {
    prompt.style.display = 'none';
  }
};

// Fonction pour afficher le bouton de test
window.showTestButton = function() {
  const container = document.getElementById('test-notification-container');
  if (container) {
    container.style.display = 'block';
  }
};

// Fonction pour forcer l'affichage du widget
window.forceShowWidget = function() {
  const prompt = document.getElementById('notification-prompt');
  if (prompt) {
    prompt.style.display = 'block';
    console.log('🔔 Widget forcé à s\'afficher');
  }
};

console.log('🎯 Fonctions notifications chargées depuis fichier externe');