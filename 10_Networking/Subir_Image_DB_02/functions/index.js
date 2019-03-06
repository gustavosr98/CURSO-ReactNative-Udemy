const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");

// GENERAR ESTE ARCHIVO AL EJECUTAR $firebase init
//    EN CARPETA PROYECTO

const gcconfig = {
  // FIREBASE.COM > PROYECTO X > SETTINGS
  projectId: "YOUR_PROJECT_ID",
  // FIREBASE.COM > PROYECTO X > SETTINGS > SERVICE ACCOUNT > SERVICE SETTINGS > FIREBASE ADMIN SDK > GENERATE NEW PRIVATE KEY
  // ESO GENERA UN ARCHIVO_DESCARGAR QUE RENOMBRO Y GUARDO DENTRO DE FUNCTIONS/
  keyFilename: "ARCHIVO_DESCARGAR"
};

const gcs = require("@google-cloud/storage")(gcconfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.storeImage = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {

    const body = JSON.parse(request.body);

    // MONTAR EN NUBE, CARPETA TEMPORAL
    // fs.writeFileSync( DEST FOLDER EN NUBE , FILE A SUBIR , TIPO DE ARCHIVO , F() EN CASO DE ERROR ) 
    fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", 
      // EN CASO DE ERROR
      err => {
        console.log(err);
        // responde.status( NUMERO ).json( OBJETO )
        return response.status(500).json({ error: err });
      }
    );

    // ************************************
    // MOVER DE NUBE A FIREBASE - STORAGE
    // CREAR BUCKET
    const bucket = gcs.bucket("YOUR_PROJECT_ID.appspot.com");

    const uuid = UUID();
    
    // SUBIR EN BUCKET
    return bucket.upload(
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
      // LUEGO DE QUE SE SUBA O HAYA UN ERROR
      (err, file) => {
        if (!err) {
          // RESPUESTA CUANDO TODO BIEN
          return response.status(201).json({
            imageUrl:
              "https://firebasestorage.googleapis.com/v0/b/" +
              bucket.name +
              "/o/" +
              encodeURIComponent(file.name) +
              "?alt=media&token=" +
              uuid
          });
        } else {
          // RESPUESTA CUANDO ERROR
          console.log(err);
          return response.status(500).json({ error: err });
        }
      }
    );
  });
});

// AL TERMINAR DE HACER LAS FUNCIONES DE NUBE SUBIRLAS A FIREBASE
//    SUBIRLAS CON $firebase deploy 
//    EJECUTARLO EN CARPETA DEL PROYECTO