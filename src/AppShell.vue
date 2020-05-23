<template>
  <div id="app" :class="{'is-mobile': isMobile}">
    <div class="container is-fluid">
      <ShellHeader />

      <ShellAlertError @close="loadMicrobe" />
      <ShellAlertDone @close="loadMicrobe" />

      <MicroCards id="main">
        <LevelSelect />
      </MicroCards>

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
