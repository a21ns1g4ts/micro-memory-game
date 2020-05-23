import { size, map, chunk, shuffle, find } from 'lodash-es'
import { randomIntList, makeLevels } from '../support/utils'
import { getColsNumber, getColsMobileNumber } from '../support/grid'

export default {
  // count all microbe
  microbeRawCount: ({ microbeRawList }) => size(microbeRawList),
  // number of cards
  levelCount: ({ level }) => level * 2,
  // number of microbe found
  foundCount: ({ found }) => size(found),
  levels: ({ isMobile }) => {
    return makeLevels(7, isMobile ? 2 : 2)
  },
  timerStatus: ({ isRunning }, { isDone }) => {
    return isRunning && !isDone
  },
  // random microbe microbe list
  microbe: ({ level, microbeRawList }, { microbeRawCount }) => {
    if (microbeRawCount <= 0) {
      return []
    }

    const indexes = randomIntList(level, microbeRawCount - 1, 0)
    return map(indexes, index => microbeRawList[index])
  },
  // list of pokecards
  pokeCards: ({ shuffleCount }, { microbe }) => {
    const list = shuffle([...microbe, ...microbe])

    return map(list, (row, index) => {
      return {
        ...row,
        shuffleCount, // only to force update of the list.
        index
      }
    })
  },
  // lists of microbe list
  pokeCardsLists: ({ isMobile }, { pokeCards }) => {
    const len = size(pokeCards)
    return chunk(
      pokeCards,
      isMobile ? getColsMobileNumber(len) : getColsNumber(len)
    )
  },
  // poke cards selected
  selectedCards: ({ selecteds }, { pokeCards }) => {
    return map(selecteds, index => {
      return find(pokeCards, card => card.index === index)
    })
  },
  // all microbe has find
  isDone: ({ level }, { foundCount }) => {
    if (foundCount === 0) {
      return false
    }

    return level === foundCount
  },
  // cards selected is math
  isMath: (state, { selectedCards }) => {
    if (size(selectedCards) === 2) {
      const [a, b] = selectedCards
      return a.id === b.id
    }

    return false
  },
  baseScore: ({ level, isEasyMode, isRouletteMode }) => {
    const factor = isRouletteMode ? 3 : 2
    const base = Math.pow(level, factor)

    return isEasyMode
      ? Math.floor(base * (isRouletteMode ? 0.25 : 0.50))
      : base
  },
  nextScoreIncrement: ({ level, failures }, { baseScore }) => {
    if (failures === 0) {
      return baseScore
    }

    // max factor
    const factor = failures < 10 ? (failures / 10) : 0.9
    const value = baseScore - (baseScore * factor)

    return Math.floor(value)
  }
}
