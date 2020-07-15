<template>
  <div id="app" :class="{'is-mobile': isMobile}">
    <div class="container is-fluid">
      <ShellHeader />

      <ShellAlertError @close="loadMicrobe" />
      <ShellAlertDone @close="loadMicrobe" />

      <MicroCards id="main">
        <LevelSelect />
      </MicroCards>
      <hr>
      <section class="hero has-text-centered">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Projeto Edital PIBEX 2020
            </h1>
            <hr>
            <h4 class="subtitle">
              Ensino dos seres microscópios em escolas da Região Metropolitana de Belém (PA):
              <br>
              experimentação laboratorial e uso de tecnologias educacionais.
            </h4>
            <p>Laboratório de Microbiologia Ambiental (ICB/UFPA)</p>
            <p>Instituto de Ciências Biológicas Laboratório de Microbiologia Ambiental</p>
          </div>
          <hr>
          <p>
            <strong>Professora: </strong>Karla T. S. Ribeiro Coordenadora de Projetos de Extensão do <strong>ICB/UFPA</strong>
          </p>
          <br>
          <p>
            <strong>Alunas:</strong>
          </p>
          <p>
            <a href="carolabadessa@gmail.com">CAROLYNE CRISTINA MACÊDO ABADESSA</a>
          </p>
          <p>
            <a href="luanajbcabral@gmail.com">LUANA JOANA BARRETO CABRAL</a>
          </p>
          <p>
            <a href="mayaranerina@gmail.com">MAYARA NERINA FORTES ARTHUR</a>
          </p>
          <hr>
        </div>
      </section>
      <ShellFooter />
    </div>
    <b-loading is-full-page :active="isLoading" />
  </div>
</template>

<script>
import { ModalProgrammatic } from 'buefy/dist/components/modal'
import { mapActions, mapState, mapGetters } from 'vuex'
import { Snackbar } from 'buefy/dist/components/snackbar'
import ShellComponents from './components/Shell'

const LevelSelect = () => import(/* webpackChunkName: "level-select" */ './components/LevelSelect.vue')
const MicroCards = () => import(/* webpackChunkName: "poke-cards" */ './components/MicroCards/Main.vue')
const FinishModal = () => import(/* webpackChunkName: "finish-modal" */ './components/FinishModal.vue')

export default {
  name: 'AppShell',
  components: {
    MicroCards,
    LevelSelect,
    ...ShellComponents
  },
  computed: {
    ...mapState(['error', 'isLoading', 'isMobile']),
    ...mapGetters(['isDone'])
  },
  watch: {
    isDone (value) {
      if (value) {
        ModalProgrammatic.open({
          parent: this,
          component: FinishModal,
          hasModalCard: true,
          canCancel: !this.isMobile
        })
      }
    }
  },
  methods: {
    ...mapActions(['loadMicrobe'])
  },
  mounted () {
    this.loadMicrobe()
  },
  created () {
    document.addEventListener('sw:update', () => {
      const reload = () => document.location.reload(true)

      Snackbar.open({
        message: 'There is an update available.',
        actionText: 'Reload Now',
        type: 'is-warning',
        indefinite: true,
        onAction: reload
      })
    })
  }
}
</script>
