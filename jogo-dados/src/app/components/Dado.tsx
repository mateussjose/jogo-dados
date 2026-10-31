
import { Image, StyleSheet } from "react-native";

interface DadoProps {
  valor: number;
}

const imagens = {
  1: require("../../../assets/images/dado1.png"),
  2: require("../../../assets/images/dado2.png"),
  3: require("../../../assets/images/dado3.png"),
  4: require("../../../assets/images/dado4.png"),
  5: require("../../../assets/images/dado5.png"),
  6: require("../../../assets/images/dado6.png"),
};

export default function Dado({ valor }: DadoProps) {
  return (
    <Image
      source={imagens[valor as keyof typeof imagens]}
      style={styles.dado}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  dado: {
    width: 65,
    height: 65,
  },
});
