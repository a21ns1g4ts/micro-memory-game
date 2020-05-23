<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item mono">
        <img :src="microbe.id ? logo: 'img/abstract.png'" title="MicroMemória" alt="MicroMemória" class="logo">
        <span v-if="isMobile">MicroMemória</span>
        <span v-else>MicroMemória: <br> O Jogo dos Micróbios </span>
      </div>
      <div class="navbar-item">
        <Timer class="is-pulled-right" v-if="isMobile" />
      </div>
    </div>
    <div class="navbar-menu" v-if="!isMobile">
      <div class="navbar-end">
        <div class="navbar-item">
          <Timer />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { sample } from 'lodash-es'
import { mapState } from 'vuex'
import Timer from '../Timer.vue'
import Visibility from 'visibilityjs'
import { biologia } from '../../support/utils'

export default {
  name: 'ShellHeader',
  components: { Timer },
  data () {
    return {
      ids: [],
      microbe: 14
    }
  },
  computed: {
    ...mapState(['isMobile']),
    logo () {
      return biologia(this.microbe.id)
    }
  },
  watch: {
    logo (href) {
      this.$headIcons
        .forEach(el => {
          el.href = href
        })
    }
  },
  methods: {
    loadIds () {
      return fetch('/biologia.json')
        .then(response => response.json())
        .then(ids => {
          this.ids = ids
        })
    },
    changeLogo () {
      this.microbe = sample(this.ids)
    }
  },
  created () {
    this.$headIcons = document.querySelectorAll('link[rel=icon')
  },
  mounted () {
    this.loadIds()
      .then(() => {
        this.$interval = Visibility.every(10000, () => { // 10s
          this.changeLogo()
        })
      })
  },
  beforeDestroy () {
    Visibility.stop(this.$interval)
  }
}
</script>

<style>
  .logo {
    max-height: 2.5rem !important;
    border-radius: 12px;
    margin-right: 10px;
  }
  .mono {
    font-family: monospace;
    font-weight: bold;
  }
</style>
