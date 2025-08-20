@echo off
echo ==========================================
echo 🚀 Démarrage du serveur HTTPS pour tests mobiles
echo ==========================================
echo.

REM Vérifier si npx est disponible
where npx >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js/npx non trouvé. Installez Node.js depuis nodejs.org
    pause
    exit /b 1
)

REM Vérifier si ngrok est installé
npx ngrok --version >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installation de ngrok...
    npm install -g ngrok
)

echo ✅ Configuration ngrok...
echo.
echo 🔗 Expose votre serveur local en HTTPS pour tests mobiles
echo 📱 Ouvrez l'URL HTTPS sur votre téléphone
echo ⚠️  Assurez-vous que votre serveur local tourne sur le port 8000
.
echo.

REM Lancer ngrok
start cmd /k "npx ngrok http 8000"

echo ✅ Ngrok lancé !
echo.
echo 📋 Instructions :
echo 1. Attendez que ngrok affiche l'URL HTTPS
echo 2. Ouvrez cette URL sur votre téléphone
echo 3. Testez les notifications mobiles
echo.
echo 🌐 L'URL sera du type : https://abc123.ngrok.io
echo.
pause