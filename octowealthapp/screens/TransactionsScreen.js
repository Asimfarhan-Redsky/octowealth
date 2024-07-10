// screens/TransactionsScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { API } from "aws-amplify";

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const transactionData = await API.get("YourApiName", "/transactions");
      setTransactions(transactionData);
    } catch (error) {
      console.error(error);
    }
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionTitle}>{item.title}</Text>
      <Text>{`Amount: $${item.amount}`}</Text>
      <Text>{`Date: ${item.date}`}</Text>
      {/* Add more transaction details as needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  transactionItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  transactionTitle: {
    fontWeight: "bold",
  },
  // Add more styles as needed
});

export default TransactionsScreen;
