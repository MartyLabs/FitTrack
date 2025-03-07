import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationCardProps = {
  title: string;
  icon: React.ReactNode;
  destination: string;
  size?: "small" | "large";
  backgroundColor?: string;
  subtitle?: string;
};

const NavigationCard = ({
  title,
  icon,
  destination,
  size = "small",
  backgroundColor = "#F6F6F7",
  subtitle,
}: NavigationCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        size === "large" ? styles.largeCard : styles.smallCard,
        { backgroundColor },
      ]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate(destination)}
    >
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          {/* ✅ Gère les retours à la ligne */}
          {title.split("\n").map((line, index) => (
            <Text key={index} style={styles.title}>
              {line}
            </Text>
          ))}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 12,
  },
  smallCard: {
    height: 153,
    width: undefined,
    aspectRatio: 1,
    flex: 1,
    marginHorizontal: 6,
  },
  largeCard: {
    height: 100,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
  },
  textContainer: {
    flex: 1,
  },
  iconContainer: {},
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});

export default NavigationCard;
