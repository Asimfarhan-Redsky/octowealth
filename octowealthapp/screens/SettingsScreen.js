// screens/SettingsScreen.js
import React, { useState } from "react";
import { View, Text, Picker, Switch, StyleSheet } from "react-native";

const SettingsScreen = () => {
  const [selectedRole, setSelectedRole] = useState("user");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* User Role Selection */}
      <Text style={styles.label}>Role:</Text>
      {/* <Picker
                selectedValue={selectedRole}
                onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
                style={styles.picker}>
                <Picker.Item label="User" value="user" />
                <Picker.Item label="Administrator" value="admin" />
                <Picker.Item label="Auditor" value="auditor" />
               
            </Picker> */}

      {/* Notifications Toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Enable Notifications:</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Dark Mode:</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {/* Add more settings as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default SettingsScreen;
