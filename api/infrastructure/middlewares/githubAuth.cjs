const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const ConnectToDatabase = require('../../infrastructure/database/mongodb.cjs');

// Configuración de la estrategia de autenticación con Google
passport.use(
	new GithubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID, // ID del cliente de Google
			clientSecret: process.env.GITHUB_CLIENT_SECRET, // Secreto del cliente de Google
			callbackURL: process.env.VITE_HTTP_BACKEND+'/users/github/callback', // URL de callback después de la autenticación
			passReqToCallback: true, // Pasa el objeto `req` al callback
			scope: ['user:email'],
		},
		async (req, accessToken, refreshToken, profile, cb) => {
			try {
				// Conecta a la base de datos
				const dbConnection = new ConnectToDatabase();
				await dbConnection.connectOpen();
				const db = dbConnection.db;
				const clienteCollection = db.collection('usuarios');

				// Busca al usuario en la colección "cliente"
				let existingUser = await clienteCollection.findOne({
					id: profile.id
				});

				if (existingUser) {
					// Si el usuario ya existe, devuelve el usuario con el campo isRegistered
					(existingUser.id = profile.id), (existingUser.isRegistered = true);
					return cb(null, existingUser);
				} else {
					// Si no existe, crea un objeto de usuario con isRegistered = false
					(existingUser = profile), (existingUser.isRegistered = false);
					return cb(null, existingUser);
				}
			} catch (error) {
				return cb(error, false);
			}
		},
	),
);

// Serializa el usuario en la sesión
passport.serializeUser((user, cb) => {
    cb(null, user.id); // Guarda solo el ID del usuario en la sesión
});

// Deserializa el usuario de la sesión
passport.deserializeUser(async (id, cb) => {
    cb(null, cb);
});

module.exports = passport; // Exporta el objeto de configuración de passport