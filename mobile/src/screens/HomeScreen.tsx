import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  Animated,
} from "react-native";

// Components
import NavigationCard from "../components/NavigationCard";
import ProgressCard from "../components/ProgressCard";
import CookIcon from "../assets/chef_cuisto.svg";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Trigger entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // User info (would come from state/context in a real app)
  const userInfo = {
    name: "Arthur",
    level: 2,
    progress: 75,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.section,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.greeting}>Hello, {userInfo.name}</Text>
        </Animated.View>

        <Animated.View
          style={[
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <ProgressCard level={userInfo.level} percentage={userInfo.progress} />
        </Animated.View>

        <Animated.View
          style={[
            styles.gridContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.row}>
            <NavigationCard
              title="Scan & Nutrition"
              icon={
                <Image
                  style={{
                    width: "70%",
                    aspectRatio: 1,
                    height: undefined,
                    position: "absolute",
                    bottom: -18,
                    transform: [{ rotate: "-16deg" }],
                  }}
                  source={require("../assets/barcode-scan.png")}
                />
              }
              destination="Scan"
            />
            <NavigationCard
              title="Find Shops & Restaurant"
              icon={
                <Image
                  style={{
                    width: "70%",
                    aspectRatio: 1,
                    height: undefined,
                    position: "absolute",
                    bottom: -10,
                    left: "-5%",
                    transform: [{ rotate: "7deg" }],
                  }}
                  source={require("../assets/store.png")}
                />
              }
              destination="Shops"
            />
          </View>

          <View style={styles.row}>
            <NavigationCard
              title="My Workouts"
              icon={
                <Image
                  style={{
                    width: "70%",
                    aspectRatio: 1,
                    height: undefined,
                    position: "absolute",
                    bottom: -18,
                    left: "50%",
                    transform: [{ translateX: "-35%" }],
                  }}
                  source={require("../assets/weightlifting.png")}
                />
              }
              destination="Workouts"
            />
            <NavigationCard
              title={"My\nStats"}
              icon={
                <Image
                  style={{
                    width: "85%",
                    aspectRatio: 1,
                    height: undefined,
                    position: "absolute",
                    bottom: "5%",
                    right: "-15%",
                    transform: [{ rotate: "22deg" }],
                  }}
                  source={require("../assets/statistical-analysis.png")}
                />
              }
              destination="Stats"
            />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.recipeSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <TouchableOpacity
            style={styles.recipeCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Recipes")}
          >
            <CookIcon width={140} height={140} style={styles.cookIcon} />
            <View style={styles.recipeContent}>
              <View style={styles.recipeTextContainer}>
                <Text style={styles.recipeTitle}>
                  Find Recipes using magic cook
                </Text>
                <Text style={styles.recipeSubtitle}>
                  I have the ingredients but don't know what to cook
                </Text>
              </View>
            </View>
            <View style={styles.magicButton}>
              <Icon name="wand-magic-sparkles" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  gridContainer: {
    marginVertical: 8,
    gap: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: -6,
    gap: 15,
  },
  recipeSection: {
    marginTop: 16,
  },
  recipeCard: {
    backgroundColor: "#FEEADC",
    borderRadius: 16,
    padding: 20,
    alignItems: "flex-end",
    position: "relative",
  },
  recipeContent: {
    width: "70%",
  },
  recipeTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  cookIcon: {
    position: "absolute",
    bottom: -6,
    left: -10,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  recipeSubtitle: {
    fontSize: 15,
    color: "#8A8A8A",
    lineHeight: 20,
  },
  magicButton: {
    position: "absolute",
    top: -20,
    right: 15,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#9b87f5",
  },
});

export default HomeScreen;
