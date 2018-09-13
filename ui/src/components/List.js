import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { connect } from '../../react-myRedux'
import AddToDoComponent from './List/AddToDoComponent';
import HidingToggle from './List/HidingToggle';
import ListComponentTodos from './List/ListComponentTodos'
import ListComponentLists from './List/ListComponentLists'
import {
  addList, removeList, editUser, editList,
} from '../actions/actions'

const List = (props) => {
  if (!props.user.name) {
    props.history.push('/authorization')
    return null
  }

  const list = props.lists.filter(elem => elem.id === props.user.currentList)[0]

  return (
    <Switch>
      <Route exact path="/user/:id" component={() => <div className={'todosList'}>
        <p className={'todoListTitle'}>Todo List</p>
        <div className={'list clearfix'}>
          <HidingToggle
            visibility={props.user.visibility}
            editvisibility={() => { props.editUser({ visibility: !props.user.visibility }) }}
          />
          <ListComponentLists
            user={props.user}
            lists={props.lists}
            addCurrentList={(id) => { props.editUser({ currentList: id }) }}
            deleteList={(id) => {
              props.removeList(id)
            }}
          />
          <Button style={{ fontSize: '12px' }}
            variant="contained" color="primary"
            onClick={props.addList}>
            {'Create new List'}
          </Button>
        </div></div>} />
      <Route exact path="/user/:id/list/:list" component={() => <div className={'todosList'}>
        <p className={'todoListTitle'}>Todo List</p>
        <div className={'list clearfix'}>
          <HidingToggle
            visibility={list.visibility}
            editvisibility={() => {
              props.editList(list.id, { visibility: !list.visibility })
            }} />
          <ListComponentTodos
            user={props.user}
            listItems={list.todos}
          />
          <AddToDoComponent />
        </div>
      </div>} />
    </Switch>
  )
}

List.defaultProps = {
  todos: [],
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
  addList: () => dispatch(addList('no name')),
  removeList: id => dispatch(removeList(id)),
  editUser: changes => dispatch(editUser(changes)),
  editList: (id, changes) => dispatch(editList(id, changes)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps, List))
