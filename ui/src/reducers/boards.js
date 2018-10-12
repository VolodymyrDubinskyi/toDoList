// @flow

type actionParams = {
  type: string,
  payload: any,
}

const boards = (state: any = [], action: actionParams) => {
  switch (action.type) {
    case 'ADD_BOARD': {
      const [...newState] = state;
      const newBoard = action.payload;
      const newBoardId = newBoard.id
      let allredyHaveThisBoard = false
      newState.map((board) => {
        if (board.id === newBoardId) allredyHaveThisBoard = true
        return null
      })
      if (allredyHaveThisBoard) return state
      newState.push(newBoard)
      newState.sort((a, b) => a.index > b.index)
      return newState
    }
    case 'REMOVE_BOARD': {
      const [...newState] = state.filter(elem => elem.id !== action.payload);
      newState.sort((a, b) => a.index > b.index)
      return newState
    }
    case 'EDIT_BOARD_REDUCER': {
      let [...newState] = state
      newState = newState.map((elem) => {
        let newElem = elem
        if (newElem.id === action.payload.id) {
          newElem = Object.assign({}, newElem, action.payload.changes)
        }
        return newElem
      })
      newState.sort((a, b) => a.index > b.index)
      return [...newState]
    }
    case 'CLEAR_STORE': {
      const newState = []
      return newState
    }
    default:
      return state
  }
}

export default boards
