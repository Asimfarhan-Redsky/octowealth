// screens/SupportScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { API } from "aws-amplify";

const SupportScreen = () => {
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");

  const faqData = [
    {
      key: "1",
      question: "How do I reset my password?",
      answer: 'Go to settings and select "Reset Password".',
    },
    // Add more FAQs here
  ];

  const submitTicket = async () => {
    const ticketData = { title: ticketTitle, description: ticketDescription };
    try {
      await API.post("YourApiName", "/tickets", { body: ticketData });
      setTicketTitle("");
      setTicketDescription("");
      // Add success handling logic
    } catch (error) {
      console.error(error);
      // Add error handling logic
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Support</Text>

      {/* FAQ Section */}
      <Text style={styles.subtitle}>Frequently Asked Questions</Text>
      <FlatList
        data={faqData}
        renderItem={({ item }) => (
          <View style={styles.faqItem}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        )}
      />

      {/* Support Ticket Form */}
      <Text style={styles.subtitle}>Submit a Ticket</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={ticketTitle}
        onChangeText={setTicketTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={ticketDescription}
        onChangeText={setTicketDescription}
        multiline
      />
      <Button title="Submit" onPress={submitTicket} />
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
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 10,
  },
  question: {
    fontWeight: "bold",
  },
  answer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
});

export default SupportScreen;
