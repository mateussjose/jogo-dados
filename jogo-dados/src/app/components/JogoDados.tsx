
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Dado from "./Dado";

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosJogador1, setDadosJogador1] = useState([1, 1]);
  const [dadosJogador2, setDadosJogador2] = useState([1, 1]);
  const [jogadorAtual, setJogadorAtual] = useState(1);

  const [resultado, setResultado] = useState("");
  const [resultadoFinal, setResultadoFinal] = useState("");

  const [vitoriasJogador1, setVitoriasJogador1] = useState(0);
  const [vitoriasJogador2, setVitoriasJogador2] = useState(0);

  const [fimDeJogo, setFimDeJogo] = useState(false);

  function sortearDados() {
    return [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
  }

  function jogar(jogador: number) {
    if (jogador !== jogadorAtual || fimDeJogo) {
      return;
    }

    const novosDados = sortearDados();

    if (jogador === 1) {
      setDadosJogador1(novosDados);
      setJogadorAtual(2);
      setResultado("");
      return;
    }

    setDadosJogador2(novosDados);

    const somaJogador1 = dadosJogador1[0] + dadosJogador1[1];
    const somaJogador2 = novosDados[0] + novosDados[1];

    let novasVitorias1 = vitoriasJogador1;
    let novasVitorias2 = vitoriasJogador2;
    let mensagem = "";

    if (somaJogador1 > somaJogador2) {
      mensagem = "Jogador 1 venceu a rodada!";
      novasVitorias1++;
      setVitoriasJogador1(novasVitorias1);
    } else if (somaJogador2 > somaJogador1) {
      mensagem = "Jogador 2 venceu a rodada!";
      novasVitorias2++;
      setVitoriasJogador2(novasVitorias2);
    } else {
      mensagem = "Empate na rodada!";
    }

    setResultado(mensagem);

    if (rodada === 5) {
      setFimDeJogo(true);

      if (novasVitorias1 > novasVitorias2) {
        setResultadoFinal("Jogador 1 venceu a partida!");
      } else if (novasVitorias2 > novasVitorias1) {
        setResultadoFinal("Jogador 2 venceu a partida!");
      } else {
        setResultadoFinal("Empate geral!");
      }
    } else {
      setRodada((valor) => valor + 1);
      setJogadorAtual(1);
    }
  }

  function jogarNovamente() {
    setRodada(1);
    setDadosJogador1([1, 1]);
    setDadosJogador2([1, 1]);
    setJogadorAtual(1);
    setResultado("");
    setResultadoFinal("");
    setVitoriasJogador1(0);
    setVitoriasJogador2(0);
    setFimDeJogo(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo de Dados</Text>

      <Text style={styles.rodada}>
        Rodada {rodada} / 5
      </Text>

      <View style={styles.jogadores}>
        <View style={styles.jogador}>
          <Text style={styles.nomeJogador}>Jogador 1</Text>

          <View style={styles.dados}>
            {dadosJogador1.map((valor, index) => (
              <Dado key={index} valor={valor} />
            ))}
          </View>

          <Text style={styles.soma}>
            Soma: {dadosJogador1[0] + dadosJogador1[1]}
          </Text>

          <TouchableOpacity
            style={[
              styles.botao,
              jogadorAtual !== 1 && styles.botaoDesabilitado,
            ]}
            onPress={() => jogar(1)}
            disabled={jogadorAtual !== 1 || fimDeJogo}
          >
            <Text style={styles.textoBotao}>Jogar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.jogador}>
          <Text style={styles.nomeJogador}>Jogador 2</Text>

          <View style={styles.dados}>
            {dadosJogador2.map((valor, index) => (
              <Dado key={index} valor={valor} />
            ))}
          </View>

          <Text style={styles.soma}>
            Soma: {dadosJogador2[0] + dadosJogador2[1]}
          </Text>

          <TouchableOpacity
            style={[
              styles.botao,
              jogadorAtual !== 2 && styles.botaoDesabilitado,
            ]}
            onPress={() => jogar(2)}
            disabled={jogadorAtual !== 2 || fimDeJogo}
          >
            <Text style={styles.textoBotao}>Jogar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mensagem}>
        <Text style={styles.textoMensagem}>
          {resultado || "Aguardando jogadas..."}
        </Text>
      </View>

      {fimDeJogo && (
        <View style={styles.resultadoFinal}>
          <Text style={styles.textoFinal}>
            {resultadoFinal}
          </Text>

          <TouchableOpacity
            style={styles.botaoNovamente}
            onPress={jogarNovamente}
          >
            <Text style={styles.textoBotao}>
              Jogar Novamente
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "#1E293B",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#38BDF8",
    alignItems: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#38BDF8",
    marginBottom: 10,
  },

  rodada: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 25,
  },

  jogadores: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },

  jogador: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 18,
    paddingHorizontal: 5,
    backgroundColor: "#273449",
    borderWidth: 1,
    borderColor: "#38BDF8",
    borderRadius: 10,
    alignItems: "center",
  },

  nomeJogador: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 15,
  },

  dados: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
  },

  soma: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#CBD5E1",
    marginVertical: 15,
  },

  botao: {
    backgroundColor: "#38BDF8",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: "center",
  },

  botaoDesabilitado: {
    backgroundColor: "#475569",
  },

  textoBotao: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "bold",
  },

  mensagem: {
    width: "100%",
    marginTop: 25,
    padding: 18,
    backgroundColor: "#273449",
    borderWidth: 1,
    borderColor: "#38BDF8",
    borderRadius: 8,
    alignItems: "center",
  },

  textoMensagem: {
    color: "#F8FAFC",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },

  resultadoFinal: {
    width: "100%",
    marginTop: 20,
    padding: 20,
    backgroundColor: "#273449",
    borderWidth: 2,
    borderColor: "#38BDF8",
    borderRadius: 8,
    alignItems: "center",
  },

  textoFinal: {
    color: "#38BDF8",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  botaoNovamente: {
    backgroundColor: "#38BDF8",
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 6,
  },
});
