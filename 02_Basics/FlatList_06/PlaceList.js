import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "../ListItem/ListItem";

const placeList = props => {
  return (
    <FlatList
      style={styles.listContainer}

      // OBLIGATORIO DATA=ARRAY_OBJETOS
      // ARRAY_OBJETOS = [ { KEY : ### , LO QUE QUIERA... }, OTROS ELEMENTOS ]
      data={props.places} 

      // renderItem= ({item}) => algunJSX
      renderItem={ ({item})  => (
        <ListItem
          placeName={item.value}
          onItemPressed={() => props.onItemDeleted(item.key)}
        />
      )}
    />
  );
};

// TIENE MAYOR PERFORMANCE QUE LOS <ScrollView /> YA QUE NO RENDERIZA LO QUE NO SALE EN LA PANTALLA
// INVESTIGAR TAMBIEN SOBRE <SectionList /> PARA ARRAYS MULTIDIMENSIONALES

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default placeList;
