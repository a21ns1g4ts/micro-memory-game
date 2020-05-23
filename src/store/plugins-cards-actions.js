import { Snackbar } from 'buefy/dist/components/snackbar'
import { Dialog } from 'buefy/dist/components/dialog'
import { Toast } from 'buefy/dist/components/toast'
import { size, head, toUpper } from 'lodash-es'
import * as mutations from './mutations.type'

const cathAlert = identifier => {
  Snackbar.open({
    position: 'is-top',
    message: `Micróbio da ${toUpper(identifier)} encontrado!`,
    queue: false,
    actionText: null,
    duration: 3000
  })
}

const cardsActionsPlugin = store => {
  const resetSelecteds = () => {
    setTimeout(() => {
      store.commit(mutations.resetSelecteds)
    }, 400)
  }

  const addFound = ({ id, identifier, description, transmission, symptoms }) => {
    cathAlert(identifier)
    store.dispatch('addFound', id)
    store.commit(mutations.setReadingInformations, true)
    Dialog.confirm({
      title: identifier.toUpperCase(),
      message: `
       <div class="info-micro">
        <center><img width="100px"  src="img/biologia/${id}.png"></center>
        <p>${description}</p>
        <h3>Transmissão:</h3>
        <p>${transmission}</p>
        <h3>Sintomas:</h3>
        <p>${symptoms}</p>
       </div>
      `,
      confirmText: 'Entendi !',
      onConfirm: function () {
        store.commit(mutations.setReadingInformations, false)
      },
      canCancel: false,
      type: 'is-success'
    })
  }

  store.watch(
    ({ microbeRawList, isMobile, shuffleCount }) => ({ microbeRawList, isMobile, shuffleCount }),
    ({ isMobile }) => {
      if (isMobile) {
        setTimeout(() => {
          const el = document.querySelector('#main')
          if (el) {
            el.scrollIntoView()
          }
        })
      }
    }
  )

  // roulette mode
  store.watch(
    ({ level, isRouletteMode }, { foundCount }) => ({ level, foundCount, isRouletteMode }),
    ({ level, foundCount, isRouletteMode }) => {
      // skip
      if (foundCount <= 1 || !isRouletteMode || level === foundCount) {
        return
      }

      if ((foundCount % (level / 3)) === 0) {
        store.commit(mutations.setIsLoading, true)

        setTimeout(() => {
          store.commit(mutations.setShuffleCount, Math.random() * 100)
          store.commit(mutations.setIsLoading, false)
        }, 500)
      }
    }
  )

  // watch Easy Mode
  store.watch(
    ({ isEasyMode }) => isEasyMode,
    val => {
      val
        ? Toast.open({
          type: 'is-warning',
          message: 'O modo fácil está ativado. Sua pontuação será menor que o normal.'
        })
        : Toast.open({
          message: 'O Modo Fácil está Desativado, sua pontuação volta ao normal.'
        })
    }
  )

  // watch cards selections
  store.watch(
    // get data
    (state, { isMath, selectedCards }) => ({ selectedCards, isMath }),
    // handler
    ({ selectedCards, isMath }) => {
      if (isMath) {
        addFound(
          head(selectedCards)
        )
      }

      // need reset
      if (size(selectedCards) === 2) {
        resetSelecteds()

        if (!isMath) {
          store.commit(mutations.addFailure)
        }
      }
    }
  )
}

export default cardsActionsPlugin
