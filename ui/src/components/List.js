import React from 'react';
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import AddToDoComponent from './List/AddToDoComponent';
import HidingToggle from './List/HidingToggle';
import ListComponentTodos from './List/ListComponentTodos'
import ListComponentLists from './List/ListComponentLists'

export default class List extends React.Component {
  render() {
    let list = <div>something go wrong</div>;

    if (this.props.listType === 'todos') {
      list = <div className={'todosList'}>
        <p className={'todoListTitle'}>Todo List</p>
        <div className={'list clearfix'}>
          <HidingToggle elem={this.props.user}
            changeVisibility={this.props.changeUserVisibility} />
          <ListComponentTodos
            listItems={this.props.elems}
            deleteTodo={this.props.deleteElem}
            toggleChose={this.props.toggleChose}
            editTodoListValue={this.props.editElemListValue} />
          <AddToDoComponent createTodo={this.props.createElem} />
        </div>
      </div>
    } else if (this.props.listType === 'lists') {
      list = <div className={'todosList'}>
        <p className={'todoListTitle'}>Todo List</p>
        <div className={'list clearfix'}>
          <HidingToggle elem={this.props.list}
            changeVisibility={this.props.changeListVisibility} />
          <ListComponentLists
            listItems={this.props.elems}
            deleteList={this.props.deleteElem}
            goToTodolist={this.props.goToTodolist}/>
          <Button style={{ fontSize: '12px' }}
            variant="contained" color="primary"
            onClick={this.props.createNewList}>
            {'Create new List'}
          </Button>
        </div></div>
    }

    return (
      list
    )
  }
}

List.defaultProps = {
  elems: [],
}


List.propTypes = {
  goToTodolist: PropTypes.func.isRequired,
  changeUserVisibility: PropTypes.func.isRequired,
  changeListVisibility: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  listType: PropTypes.string.isRequired,
  createNewList: PropTypes.func.isRequired,
  elems: PropTypes.array,
  deleteElem: PropTypes.func.isRequired,
  toggleChose: PropTypes.func.isRequired,
  editElemListValue: PropTypes.func.isRequired,
  createElem: PropTypes.func.isRequired,
}
