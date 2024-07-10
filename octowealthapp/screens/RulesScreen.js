// screens/RulesScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { API } from "aws-amplify";

const RulesScreen = () => {
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState("");

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const rulesData = await API.get("YourApiName", "/rules");
      setRules(rulesData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddRule = async () => {
    try {
      await API.post("YourApiName", "/rules", { body: { rule: newRule } });
      setNewRule("");
      fetchRules(); // Refresh the list of rules
    } catch (error) {
      console.error(error);
    }
  };

  const renderRule = ({ item }) => (
    <View style={styles.ruleItem}>
      <Text style={styles.ruleText}>{item.rule}</Text>
      {/* Implement more UI elements as needed (like edit/delete buttons) */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Rules</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewRule}
        value={newRule}
        placeholder="Enter a new rule"
      />
      <Button title="Add Rule" onPress={handleAddRule} />

      <FlatList
        data={rules}
        renderItem={renderRule}
        keyExtractor={(item) => item.id.toString()}
      />
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
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  ruleItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  ruleText: {
    fontSize: 16,
  },
});

export default RulesScreen;
