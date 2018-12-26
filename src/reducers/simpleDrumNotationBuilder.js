import notate from './notate'
import iterate from './iterate'
import moveIndex from './moveIndex'

const simpleDrumNotationBuilder = (
    state = {
      index: 0,
      notation: notate()
    },
    action) =>
{
  return {
    index: moveIndex(state.index,action,state.notation.length),
    notation: iterate(state.notation,action,state.index)
  }
}

export default simpleDrumNotationBuilder