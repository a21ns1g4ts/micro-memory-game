<template>
  <div class="modal-card" ref="root">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Informações
      </p>
    </header>
    <section class="modal-card-body">
      <h2 class="title">Modos de Jogo</h2>
      <p>Modos que mudam a experiência do jogo e a pontuação final.</p>

      <hr>

      <div class="columns is-mobile">
        <div class="column">
          <h3 class="subtitle">
            <b-icon icon="baby-buggy" /> Modo fácil
          </h3>
          <p>Comece a praticar com todas as cartas reveladas.</p>
          <p>O tempo de exibição das dicas variam com o nível selecionado.</p>
          <p>Jogar nesse nível faz com que você perca 50% da pontuação básica; no modo roleta, esse valor é 75%</p>
        </div>
        <div class="column">
          <h3 class="subtitle">
            <b-icon icon="shuffle-variant" /> Modo Roleta
          </h3>
          <p>Este modo fornece uma dificuldade extra gerando uma pontuação muito maior que no modo fácil.</p>
          <p>Depois de vários acertos tudo é embaralhado novamente.</p>

        </div>
      </div>

      <h2 class="title">Pontuação</h2>
      <p style="margin-bottom: 10px">Cada micróbio que você combina adiciona pontos à pontuação total. Esses pontos variam de acordo com o nível e o modo de jogo ativos.</p>
      <table class="table is-bordered is-fullwidth">
        <thead>
          <tr>
            <th>Nível</th>
            <th>Normal / Fácil</th>
            <th>Modo Roleta / Fácil</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in levelsList" :key="row.level">
            <td>{{ row.level }}</td>
            <td>{{ row.base | number }} / {{ row.base_easy | number }}</td>
            <td>{{ row.roulette | number }} / {{ row.roulette_easy | number }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { map } from 'lodash-es'

export default {
  name: 'InformationsModal',
  computed: {
    ...mapGetters(['levels']),
    levelsList () {
      return map(this.levels, level => {
        const base = Math.pow(level, 2)
        const roulette = Math.pow(level, 3)
        return {
          level: level * 2,
          base,
          roulette,
          base_easy: base * 0.5,
          roulette_easy: roulette * 0.25
        }
      })
    }
  }
}
</script>
