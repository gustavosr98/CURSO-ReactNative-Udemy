const functions = require("firebase-functions");

// EL ADMIN VIENE INCLUIDO Y NOS SIRVE PARA VALIDAR EL TOKEN
const admin = require("firebase-admin");

const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");

const gcconfig = {
  projectId: "YOUR_PROJECT_ID",
  // ARCHIVO DESCARGADO
  keyFilename: "awesome-places.json"
};

const gcs = require("@google-cloud/storage")(gcconfig);

// HAY QUE INICIALIZAR EL ADMIN
admin.initializeApp({
  // EL PATH ES EL DEL ARCHIVO DESCARGADO
  credential: admin.credential.cert(require("./awesome-places.json"))
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    
    // LA LOGICA PROPUESTA FUE QUE LA AUTHORIZACION LLEGUE POR EL HEADER
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith("AlgoAhi ")
    ) {

      // CUANDO NO TIENE TOKEN EN EL HEADER
      console.log("No token present!");

      // 403 -> ACCESO DENEGADO
      response.status(403).json({ error: "Unauthorized" });
      return;
    }


    let idToken;
    // BORRAR LA PARTE DE "AlgoAhi " QUE LE AGREGAMOS DEL TOKEN
    idToken = request.headers.authorization.split("AlgoAhi ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {

        // CUANDO EL TOKEN ES VALIDO
        // AQUI VA TODA LA LOGICA

        const body = JSON.parse(request.body);
        fs.writeFileSync(
          "/tmp/uploaded-image.jpg",
          body.image,
          "base64",
          err => {
            console.log(err);
            return response.status(500).json({ error: err });
          }
        );
        const bucket = gcs.bucket("YOUR_PROJECT_ID.appspot.com");
        const uuid = UUID();

        bucket.upload(
          "/tmp/uploaded-image.jpg",
          {
            uploadType: "media",
            destination: "/places/" + uuid + ".jpg",
            metadata: {
              metadata: {
                contentType: "image/jpeg",
                firebaseStorageDownloadTokens: uuid
              }
            }
          },
          (err, file) => {
            if (!err) {
              response.status(201).json({
                imageUrl:
                  "https://firebasestorage.googleapis.com/v0/b/" +
                  bucket.name +
                  "/o/" +
                  encodeURIComponent(file.name) +
                  "?alt=media&token=" +
                  uuid
              });
            } else {
              console.log(err);
              response.status(500).json({ error: err });
            }
          }
        );
      })
      .catch(error => {
        // CUANDO EL TOKEN ES INVALIDO
        
        console.log("Token is invalid!");
        response.status(403).json({error: "Unauthorized"});
      });
  });
});
