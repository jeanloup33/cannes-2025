// ===================================================================
// SERVEUR HTTPS LOCAL POUR TESTS MOBILES
// ===================================================================

const https = require('https');
const fs = require('fs');
const path = require('path');

// IMPORTANT : Ce script nécessite un certificat SSL valide
// Pour un certificat auto-signé, suivez les étapes ci-dessous

const options = {
  key: fs.readFileSync('./certs/key.pem'),      // Clé privée SSL
  cert: fs.readFileSync('./certs/cert.pem')     // Certificat SSL
};

const server = https.createServer(options, (req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Fichier non trouvé');
      return;
    }
    
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (ext) {
      case '.js':
        contentType = 'application/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
    }
    
    res.writeHead(200, {
      'Content-Type': contentType,
      'Service-Worker-Allowed': '/'
    });
    res.end(data);
  });
});

const PORT = 8443;
server.listen(PORT, () => {
  console.log(`🚀 Serveur HTTPS lancé sur https://localhost:${PORT}`);
  console.log(`📱 Pour tests mobiles, utilisez votre IP locale : https://[VOTRE-IP]:${PORT}`);
  console.log(`🔧 Assurez-vous que le certificat SSL est accepté sur mobile`);
});

// Instructions pour créer un certificat auto-signé :
/*
1. Créez le dossier certs : mkdir certs
2. Générez la clé privée : 
   openssl genrsa -out certs/key.pem 2048
3. Créez le certificat :
   openssl req -new -x509 -key certs/key.pem -out certs/cert.pem -days 365
4. Acceptez le certificat sur mobile
*/