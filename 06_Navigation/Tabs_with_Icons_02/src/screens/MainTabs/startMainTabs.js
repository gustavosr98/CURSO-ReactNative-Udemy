import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
// IONICONS ES EL SET DE ICONOS, HAY MAS, COMO FONT_AWESOME

// METODO PARA INICIALIZAR LOS TABS, LO EJECTUTA UN COMP_X (Auth.js)
const startTabs = () => {
    // ESPERA A QUE TODAS LAS PROMESAS SE CUMPLAN Y RETORNA UNA PROMESA
    Promise.all([
        // (PROMISE) Icon.getImageSource( incono que me gusto, tamano , ...)                     
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30)
    ]).then( (sources) => {
        // INICIALIZA LOS TABS
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "awesome-places.FindPlaceScreen",
                    label: "Find Place",
                    title: "Find Place",
                    // AQUI RECIBO EL PATH DE UN ICONO
                    icon: sources[0]
                },
                {
                    screen: "awesome-places.SharePlaceScreen",
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1]
                }
            ]
        });
    });
};

export default startTabs;