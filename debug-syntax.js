// Script de debug pour identifier l'erreur de syntaxe
console.log('🔍 Debug syntax démarré');

// Test des fonctions de base
try {
  // Test 1: Fonction simple
  function test1() {
    console.log('✅ Test 1 OK');
  }
  test1();
  
  // Test 2: Alert avec apostrophe
  function test2() {
    alert('Test d\'apostrophe');
    console.log('✅ Test 2 OK');
  }
  
  // Test 3: Notification simple
  function test3() {
    if ('Notification' in window) {
      console.log('✅ Test 3 OK - Notification supportée');
    }
  }
  test3();
  
  // Test 4: Service Worker
  function test4() {
    if ('serviceWorker' in navigator) {
      console.log('✅ Test 4 OK - Service Worker supporté');
    }
  }
  test4();
  
  console.log('🎯 Tous les tests de syntaxe passés');
  
} catch (error) {
  console.error('❌ Erreur de syntaxe détectée:', error);
  console.error('📍 Ligne:', error.lineNumber);
  console.error('📍 Colonne:', error.columnNumber);
}

// Test des caractères spéciaux
const testStrings = [
  'Test simple',
  'Test d\'apostrophe',
  'Test "guillemets"',
  'Test émoji 🎬',
  'Test accents éàù'
];

testStrings.forEach((str, index) => {
  try {
    console.log(`✅ String ${index + 1} OK:`, str);
  } catch (error) {
    console.error(`❌ String ${index + 1} erreur:`, error);
  }
});

console.log('🏁 Debug syntax terminé');