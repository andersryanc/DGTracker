import { roundsCollection } from '../../config/firebase'
import { LOADED, UPDATE, RESET } from '../reducers/rounds'

export const loaded = () => ({
  type: LOADED,
})

export const update = courses => ({
  type: UPDATE,
  courses
})

export const reset = () => ({
  type: RESET,
})

export const loadRounds = courseId => dispatch => {
  console.log('rounds subscribe')

  roundsCollection
    .where('courseId', '==', courseId)
    .get()
    .then(docs => {
      if (!docs.exists) {
        dispatch(loaded())
        return
      }

      const rounds = []

      docs.forEach(doc => {
        let round = doc.data()
        round.id = doc.id
        rounds.push(round)
      })

      dispatch(update(rounds))
    })
    .catch(error => console.log('rounds subscribe ERROR:', error))
}

export const startRound = round => dispatch => {
  roundsCollection.add(round)
    .then(doc => {
      console.log({ doc })
    })
    .catch(error => console.log('startRound ERROR:', error))
}
