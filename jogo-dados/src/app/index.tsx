
import { StatusBar } from "expo-status-bar";
import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import JogoDados from "./components/JogoDados";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <JogoDados />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  conteudo: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingVertical: 30,
  },
});
