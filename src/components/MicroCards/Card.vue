<template lang="html">
  <div class="card" :class="{ 'is-spotlight': isFound }">
    <div class="card-image">
      <CardImage
        @click.native="onClick"
        v-bind="{ microbe, placehold, visible, found: isFound }" />
    </div>
  </div>
</template>

<script>
import CardImage from './CardImage.vue'
import { includes, upperCase } from 'lodash-es'
import { mapState } from 'vuex'

export default {
  name: 'PokeCard',
  components: { CardImage },
  props: {
    selecteds: Array,
    findings: Array,
    microbe: Object,
    forceDisplay: Boolean
  },
  computed: {
    ...mapState(['timer']),
    visible () {
      return this.forceDisplay || this.isSelected || this.isFound
    },
    isSelected () {
      return includes(this.selecteds, this.microbe.index)
    },
    isFound () {
      return includes(this.findings, this.microbe.id)
    },
    placehold () {
      const { index } = this.microbe
      if (index > 25) {
        const letter = index % 26
        const base = Math.floor(index / 26) - 1

        return upperCase(
          String.fromCharCode(97 + base) + String.fromCharCode(97 + letter)
        )
      }

      return upperCase(
        String.fromCharCode(97 + index)
      )
    }
  },
  methods: {
    onClick (e) {
      if (this.timer > 0) { this.$emit('select', this.microbe) }
    }
  }
}
</script>
