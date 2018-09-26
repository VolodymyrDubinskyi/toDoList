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
  editList: (callEditListParams) => void,
  lists: Array<listsProps>,
  user: userProps,
  isDragging: boolean,
  connectDragSource: Function,
  connectDragPreview: Function,
  connectDropTarget: Function,
}

const listSource = {
  beginDrag(props) {
    return {
      id: props.list.id,
      index: props.list.index,
    };
  },
  endDrag(props: Object) {
    props.lists.map((obj) => {
      props.editList({ id: obj.id, changes: { index: obj.index } })
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
                title={(this.props.elem.id) ? this.props.lists.filter(
                  obj => obj.id === this.props.elem.id,
                )[0].title : null} />
            </div>)}
            <ListTodos
              list={this.props.elem}
              user={this.props.user}
              listItems={this.props.elem.todos}
            />
            <AddToDo list={this.props.elem} />
          </div>
        </div>
      </div>,
    ))
  }
}

// const TodosContainerContext = DragDropContext(HTML5Backend)(TodosContainer)

export default DragSource(itemTypes.LIST, listSource, collect)(
  DropTarget(itemTypes.LIST, listTarget, (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  }))(TodosContainer),
)
