// @flow

import React from 'react';
import {
  DragSource,
  DropTarget,
  DropTargetConnector,
} from 'react-dnd';
import { findDOMNode } from 'react-dom'

import AddToDo from './AddToDo';
import HidingToggle from './HidingToggle';
import ListTodos from './ListTodos'
import type { userProps, listsProps, todosProps } from '../../props'
import type { callEditListParams } from '../../actions/lists'
import itemTypes from '../../ItemTypes'

type Props = {
  elem: {
    id: string,
    todos: Array<todosProps>
  },
  moved: string,
  editList: (callEditListParams) => void,
  lists: Array<listsProps>,
  list: Object,
  user: userProps,
  isDragging: boolean,
  connectDragSource: Function,
  connectDragPreview: Function,
  connectDropTarget: Function,
  changeList: Function,
  removeToDoInState: Function,
  setMoveIndex: Function,
  stopMove: Function,
  editToDo: Function,
  todos: Array<Object>,
}

const listSource = {
  beginDrag(props) {
    return {
      id: props.list.id,
      index: props.list.index,
    };
  },
  endDrag(props) {
    props.stopMoveList()
    const { lists } = props
    lists.map((obj, index) => {
      props.editList({ id: obj.id, changes: { index } })
      return null
    })
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}


const listTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.elem.index

    if (dragIndex === hoverIndex) {
      return
    }

    // $FlowFixMe
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect() //eslint-disable-line
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientX = clientOffset.x - hoverBoundingRect.left

    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return
    }
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return
    }

    props.moveList(dragIndex, hoverIndex)

    monitor.getItem().index = hoverIndex //eslint-disable-line
  },
}

class TodosContainer extends React.Component<Props> {
  render() {
    const idOfListTodos = this.props.list.todos
    const { todos } = this.props
    const listItems = todos.filter((obj) => {
      if (idOfListTodos.indexOf(obj.id) !== -1) {
        return true
      }
      return false
    })

    return this.props.connectDropTarget(this.props.connectDragPreview(
      <div className={'todosList'}
        key={this.props.elem.id}>
        <div className={'list clearfix'}
          style={this.props.isDragging ? { backgroundColor: 'transparent' } : {}}>
          {this.props.isDragging ? <div className='listStub' /> : <></>}
          <div style={this.props.isDragging ? { opacity: 0 } : {}}>
            {this.props.connectDragSource(<div>
              <HidingToggle
                list={this.props.elem}
                lists={this.props.lists}
                title={(this.props.elem.id) ? this.props.lists.filter(
                  obj => obj.id === this.props.elem.id,
                )[0].title : ''} />
            </div>)}
            <ListTodos
              changeList={this.props.changeList}
              list={this.props.elem}
              user={this.props.user}
              listItems={listItems}
              removeToDoInState={this.props.removeToDoInState}
              moved={this.props.moved}
              setMoveIndex={this.props.setMoveIndex}
              stopMove={this.props.stopMove}
              editToDo={this.props.editToDo}
            />
            <AddToDo list={this.props.elem} />
          </div>
        </div>
      </div>,
    ))
  }
}

export default DragSource(itemTypes.LIST, listSource, collect)(
  DropTarget(itemTypes.LIST, listTarget, (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  }))(TodosContainer),
)
