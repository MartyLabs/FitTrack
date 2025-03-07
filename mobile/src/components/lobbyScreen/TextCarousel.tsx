import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { fonts } from "../../styles/fonts";

const { width } = Dimensions.get("window");

const DATA = [
  {
    title: "Gagne du temps, boost tes résultats",
    description:
      "Fini les heures perdues à tout planifier. Ton entraînement et ta diète sont gérés intelligemment, sans prise de tête.",
  },
  {
    title: "Entraîne-toi, mange bien, sans contrainte",
    description:
      "On t’aide à faire les bons choix, pas à te frustrer. Scan tes aliments, trouve les meilleures options en fonction de ton objectif.",
  },
  {
    title: "Ton coach 24/7 dans ta poche",
    description:
      "Plus besoin d’un carnet ou d’une app séparée. Suis ta progression en temps réel et améliore tes performances sans effort.",
  },
  {
    title: "Resto, magasins, on t’accompagne partout",
    description:
      "Que tu sois en ville ou en voyage, on te trouve les meilleurs spots adaptés à ton régime.",
  },
];

const TextCarousel = () => {
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={3} // Change tous les 3 secondes
        autoplayLoop
        index={0}
        showPagination
        paginationDefaultColor="#DDD"
        paginationActiveColor="#333"
        paginationStyle={{}}
        paginationStyleItem={{
          width: 7,
          height: 7,
          marginHorizontal: 5,
          borderRadius: "100%",
          marginTop: 25,
        }}
      >
        {DATA.map((item, index) => (
          <View key={index} style={[styles.slide, { width }]}>
            <Text style={[styles.title]}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </SwiperFlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 30,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    gap: 5,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  description: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
    color: "#9B9B9B",
    fontFamily: "Poppins-Regular",
  },
});

export default TextCarousel;
