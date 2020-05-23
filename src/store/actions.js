import * as mutations from './mutations.type'
import { includes } from 'lodash-es'

const loadMicrobe = ({ commit }) => {
  commit(mutations.setTimer, 0)
  commit(mutations.setIsLoading, true)
  commit(mutations.setIsRunning, false)
  commit(mutations.resetSelecteds)
  commit(mutations.resetFound)
  commit(mutations.resetFailures)
  commit(mutations.resetScore)

  return fetch('/biologia.json')
    .then(response => response.json())
    .then(data => {
      commit(mutations.setError, '')
      commit(mutations.setMicrobeRawList, [...data])
      return new Promise(resolve => {
        setTimeout(() => {
          commit(mutations.setIsRunning, true)
          commit(mutations.setIsLoading, false)
        }, 500)
      })
    })
    .catch(err => {
      commit(mutations.setIsLoading, false)
      commit(mutations.setError, err.message)
    })
}

const selectPokeCard = ({ commit, state }, microbe) => {
  const { found, selecteds } = state

  if (includes(found, microbe.id) || includes(selecteds, microbe.index)) {
    return
  }

  commit(mutations.addSelected, microbe.index)
}

const setLevel = ({ commit, dispatch }, level) => {
  commit(mutations.setLevel, level)

  return dispatch('loadMicrobe')
}

const setIsEasyMode = ({ commit, dispatch }, value) => {
  commit(mutations.setIsEasyMode, value)

  return dispatch('loadMicrobe')
}

const setIsRouletteMode = ({ commit, dispatch }, value) => {
  commit(mutations.setIsRouletteMode, value)

  return dispatch('loadMicrobe')
}

const addFound = ({ commit, state, getters }, id) => {
  const { nextScoreIncrement } = getters

  commit(mutations.addFound, id)
  commit(mutations.addScore, nextScoreIncrement)
  commit(mutations.resetFailures)
}

export default { loadMicrobe, selectPokeCard, setLevel, addFound, setIsEasyMode, setIsRouletteMode }
