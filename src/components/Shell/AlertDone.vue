<template>
  <b-notification
    has-icon
    v-if="isDone"
    v-on="$listeners"
    type="is-success">
    <p>Parabéns, você conseguiu !</p>
    <p>Obrigado por jogar !</p>
  </b-notification>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AlertDone',
  computed: {
    ...mapGetters(['isDone'])
  }
}
</script>
