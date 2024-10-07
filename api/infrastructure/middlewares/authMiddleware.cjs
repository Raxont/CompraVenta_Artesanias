const jwtUtils = require("../../utils/jwtUtils.cjs");

/**
 * Middleware para autenticar el token JWT en la sesión del usuario.
 * Verifica la validez del token y si corresponde con el usuario en la sesión.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
exports.authenticateToken = (req, res, next) => {
  const users = req.session.passport.user;
  if (req.session && users) {
    // Verifica si existe una sesión de usuario
    const token = req.session["token"]; // Obtiene el token JWT de la sesión

    if (!token) {
      // Si no hay token, responde con un error 401 (No autorizado) y limpia la cookie
      res.clearCookie("connect.sid", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        domain: "localhost",
        sameSite: "strict",
      });
      return res.redirect(process.env.VITE_HTTP_FRONTEND + "/login");
    }

    // Verifica el token JWT usando la función verifyToken del utilitario jwtUtils
    jwtUtils.verifyToken(token, (err, user) => {
      if (err) {
        // Si hay un error en la verificación del token, destruye la sesión, limpia la cookie y responde con un error 401
        req.session.destroy((err) => {
          if (err) {
            console.error("Error al destruir la sesión:", err);
          }
          res.clearCookie("connect.sid", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            domain: "localhost",
            sameSite: "strict",
          });
          return res.redirect(process.env.VITE_HTTP_FRONTEND + "/login");
        });
        return;
      }

      // Verifica si el ID del usuario en la sesión coincide con el ID del usuario en el token
      if (users !== user.id) {
        // Si hay un desajuste de ID, destruye la sesión, limpia la cookie y responde con un error 401
        req.session.destroy((err) => {
          if (err) {
            console.error("Error al destruir la sesión:", err);
          }
          res.clearCookie("connect.sid", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            domain: "localhost",
            sameSite: "strict",
          });
          return res.redirect(process.env.VITE_HTTP_FRONTEND + "/login");
        });
        return;
      }

      // Si todo está bien, adjunta el usuario al objeto de solicitud y pasa al siguiente middleware
      req.user = user;
      next();
    });
  } else {
    // Si no hay sesión, limpia la cookie y responde con un error 401
    res.clearCookie("connect.sid", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      domain: "localhost",
      sameSite: "strict",
    });
    return res.redirect(process.env.VITE_HTTP_FRONTEND + "/login");
  }
};
