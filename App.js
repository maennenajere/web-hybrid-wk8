import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { firestore, collection, getDocs, addDoc, deleteDoc, doc } from "./Config/firebaseConfig";
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(firestore, "shoppingList"));
    const itemList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    setItems(itemList);
  };

  const handleAddItem = async () => {
    if (itemName.trim() !== "") {
      await addDoc(collection(firestore, "shoppingList"), { name: itemName });
      setItemName("");
      fetchItems();
    } else {
      alert("oh no no you can't add an empty item");
    }
  };

  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(firestore, "shoppingList", id));
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Shopping list</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    value={itemName}
                    onChangeText={setItemName}
                    placeholder="e.g. Jack Daniels"
                    style={styles.input}
                />
                <Button title="Add" onPress={handleAddItem} />
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        paddingTop: 80,
    },
    header: {
        fontSize: 30,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    itemText: {
        fontSize: 25,
    },
    deleteButton: {
        backgroundColor: "#f00",
        padding: 5,
        borderRadius: 5,
    },
    deleteText: {
        color: "#fff",
    },
});