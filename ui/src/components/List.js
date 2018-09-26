// @flow

import React from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { connect } from '../../react-myRedux'
import TodosContainer from './List/TodosContainer';
import type { callEditUserParams } from '../actions/user'
import type { callEditListParams } from '../actions/lists'
import type { userProps, listsProps } from '../props'
import {
  editUser,
} from '../actions/user'
import {
  addList, removeList, editList,
} from '../actions/lists'
import {
  getAllToDos,
} from '../actions/todos'

type Props = {
  lists: Array<listsProps>,
  user: userProps,
  history: Object,
  editUser: (callEditUserParams) => void,
  removeList: (string) => void,
  addList: Function,
  editList: (callEditListParams) => void,
  getAllToDos: (string) => void,
};

type State = {
  lists: Array<Object>
}

class List extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = { lists: props.lists }
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { lists } = this.state
    const dragCard = lists[dragIndex]

    const newLists = lists
    newLists.splice(dragIndex, 1)
    newLists.splice(hoverIndex, 0, dragCard)
    newLists.forEach((obj, i) => {
      const newObj = obj
      newObj.index = i
      return newObj
    })
    this.setState({
      lists: newLists,
    })
  }

  render() {
    console.log(this.props.lists)
    if (this.props.lists.length > this.state.lists.length) {
      const newState = []
      this.props.lists.map(obj => newState.push(obj))
      newState.sort((a, b) => {
        if (a.index > b.index) {
          return 1
        }
        return -1
      })
      this.setState({ lists: newState })
    }

    if (!this.props.user.name) {
      this.props.history.push('/authorization')
      return null
    }

    const allLists = this.state.lists.map(elem => <TodosContainer
      key={elem.id}
      editList={this.props.editList}
      elem={elem}
      list={elem}
      user={this.props.user}
      listItems={elem.todos}
      lists={this.props.lists}
      moveCard={this.moveCard}
    />)

    if (this.props.lists[0]) {
      return <div
        style={{
          width: '100vw',
          height: 'calc(100vh - 68px)',
          paddingTop: 68,
          display: 'flex',
          position: 'relative',
        }}>
        {allLists.map(obj => obj)}
      </div>
    }
    return <div />
  }
}

List.propTypes = {
  addList: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  lists: state.lists,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  addList: addList(dispatch),
  removeList: removeList(dispatch),
  editUser: editUser(dispatch),
  editList: editList(dispatch),
  getAllToDos: getAllToDos(dispatch),
})

const ListWithContext = DragDropContext(HTML5Backend)(List)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListWithContext))
