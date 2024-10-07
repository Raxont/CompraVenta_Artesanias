const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs");

// Configuración de la estrategia de autenticación con Discord
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID, // ID de la aplicación de Discord
      clientSecret: process.env.DISCORD_CLIENT_SECRET, // Secreto de la aplicación de Discord
      callbackURL: process.env.VITE_HTTP_BACKEND+"/users/discord/callback", // URL de callback después de la autenticación
      scope: ["identify", "email"], // Campos del perfil a solicitar
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Conecta a la base de datos
        const dbConnection = new ConnectToDatabase();
        await dbConnection.connectOpen();
        const db = dbConnection.db;
        const clienteCollection = db.collection("usuarios");

        // Busca al usuario en la colección "cliente"
        let existingUser = await clienteCollection.findOne({
          id: profile.id,
        });

        if (existingUser) {
          // Si el usuario ya existe, devuelve el usuario con el campo isRegistered
          (existingUser = profile), (existingUser.isRegistered = true);
          return done(null, existingUser);
        } else {
          // Si no existe, crea un objeto de usuario con isRegistered = false
          (existingUser = profile), (existingUser.isRegistered = false);
          return done(null, existingUser);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
// Serializa el usuario en la sesión
passport.serializeUser((user, done) => {
  done(null, user.id); // Guarda solo el ID del usuario en la sesión
});

// Deserializa el usuario de la sesión
passport.deserializeUser(async (id, done) => {
  done(null, done);
});

module.exports = passport; // Exporta el objeto de configuración de passport
