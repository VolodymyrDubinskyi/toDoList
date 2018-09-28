// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import CreateIcon from '@material-ui/icons/Create';
import type { todoProps } from '../../props'

type Props = {
  todo: todoProps,
  toggleChose: Function,
  goToEdit: Function,
  deleteTodo: Function,
  title: string,
};
type State = {
}

export default class ListItemUsual extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      titleEdit: false,
    };
  }

  iconStyle = { width: 17, height: 17, margin: 3 }

  render() {
    const style = {
      color: '#17394d',
      padding: '6px 8px 2px',
      margin: 0,
      marginBottom: 8,
      boxShadow: '0 1px 0 rgba(9,45,66,.25)',
      borderRadius: 3,
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 400,
      minHeight: 24,
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    }

    return <div key={this.props.todo.title}
      style={style}
      className='todoListItem'>
      <div style={{ cursor: 'pointer', fontSize: '1em' }}>
      {this.props.title}
      </div>
      <div className='todoEditIcoHolder'>
        <CreateIcon
          onClick={this.props.goToEdit}
          className='todoEditIco'
          style={this.iconStyle} />
      </div>
    </div>
  }
}

ListItemUsual.propTypes = {
  todo: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleChose: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
}
