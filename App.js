import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import HomeScreen from "./pages/HomeScreen";
import Album from './pages/Album';
import Member from "./pages/Members";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import Members from "./pages/Members.js";
import Albums from './pages/Album.js';
import AlbumDetail from './components/AlbumDetail.js';
import TrackDetail from './components/TrackDetail.js';

const BottomTabNavigator = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator() {
  return (
    <BottomTabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#92a8d1",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#ffff", // Dark background
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 70,
          marginHorizontal: 0,
          paddingHorizontal: 20,
          paddingBottom: 10,
          shadowColor: "#fffff",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? "#92a8d1" : "#b3b3b3"; // Highlighted color

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Members") {
            iconName = "users";
          } else if (route.name === "Album") {
            iconName = "book";
          } else if (route.name === "Profile") {
            iconName = "user-circle";
          }

          return <FontAwesome name={iconName} size={24} color={iconColor} />;
        },
        headerShown: false,
      })}
    >
      <BottomTabNavigator.Screen name="Home" component={HomeScreen} />
      <BottomTabNavigator.Screen name="Search" component={SearchPage} />
      <BottomTabNavigator.Screen name="Members" component={Member} />
      <BottomTabNavigator.Screen name="Album" component={Album} />
      <BottomTabNavigator.Screen name="Profile" component={Profile} />
    </BottomTabNavigator.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Album"
          component={Album}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Member"
          component={Members}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="AlbumDetail"
          component={AlbumDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrackDetail"
          component={TrackDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}