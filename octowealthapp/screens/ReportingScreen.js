// screens/ReportingScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ReportingScreen = ({ navigation }) => {
  const reports = [
    { name: "Security Report", icon: "shield", key: "security" },
    {
      name: "Financial Planning",
      icon: "line-chart",
      key: "financial-planning",
    },
    { name: "Expense Analysis", icon: "pie-chart", key: "expense-analysis" },
    {
      name: "Investment Insights",
      icon: "bar-chart",
      key: "investment-insights",
    },
    // Add more reports as needed
  ];

  const handleReportPress = (reportKey) => {
    // Placeholder for navigation to detailed report screen
    console.log(`Navigate to ${reportKey}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <View style={styles.reportContainer}>
        {reports.map((report) => (
          <TouchableOpacity
            key={report.key}
            style={styles.reportItem}
            onPress={() => handleReportPress(report.key)}
          >
            <Icon name={report.icon} size={30} color="#0055b5" />
            <Text style={styles.reportText}>{report.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  reportContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  reportItem: {
    alignItems: "center",
    marginBottom: 20,
  },
  reportText: {
    marginTop: 8,
    fontSize: 16,
  },
});

export default ReportingScreen;
