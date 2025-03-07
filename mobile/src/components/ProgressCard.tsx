import React from "react";
import { View, Text, StyleSheet } from "react-native";

type ProgressCardProps = {
  level: number;
  percentage: number;
};

const ProgressCard = ({ level, percentage }: ProgressCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <Text style={styles.label}>Your score</Text>
        <Text style={styles.level}>LEVEL {level}</Text>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${percentage}%`, backgroundColor: "#9b87f5" },
            ]}
          />
          <View style={[styles.progressBackground]} />
        </View>
      </View>
      <View style={styles.percentageContainer}>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F6F6F7",
    borderRadius: 20,
    padding: 25,
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  level: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressContainer: {
    height: 8,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
    position: "absolute",
    left: 0,
    top: 0,
  },
  progressBackground: {
    position: "absolute",
    right: 0,
    top: 0,
    height: "100%",
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
  },
  percentageContainer: {
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  percentage: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProgressCard;
