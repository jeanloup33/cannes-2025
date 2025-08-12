// Fonction Netlify pour récupérer les commentaires
const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase (vous devrez créer un compte gratuit)
const supabaseUrl = process.env.SUPABASE_URL || 'https://votre-projet.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'votre-clé-publique';

// Fallback simple sans base de données
const comments = [
  {
    nom: "Jean-Loup",
    message: "Bienvenue sur notre système de commentaires ! Les messages apparaîtront ici automatiquement.",
    date: "12 janvier, 15:30"
  }
];

exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Gérer les requêtes OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Pour l'instant, retourner les commentaires de démonstration
    // Plus tard, vous pourrez connecter une vraie base de données
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(comments)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur lors du chargement des commentaires' })
    };
  }
};