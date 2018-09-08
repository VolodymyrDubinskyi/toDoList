import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleEdit: false,
      editValue: props.list.title,
    };
  }

  goToPage = () => {
    switch (this.props.pageState) {
      case 'authorization': this.props.goToPage('registration'); break;
      default: this.props.goToPage('authorization')
    }
  }

  editTitle = () => {
    this.setState({
      titleEdit: true,
    });
  }


  updateValue(e) {
    this.setState({
      editValue: e.target.value,
    });
  }

  changeTitle = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        titleEdit: false,
      });
      this.props.changeListTitle(this.state.editValue)
    }
  }

  render() {
    let goToBtn;
    switch (this.props.pageState) {
      case 'authorization': goToBtn = 'Registration'; break;
      case 'registration': goToBtn = 'Authorization'; break;
      case 'list': goToBtn = 'Log out'; break;
      default: this.props.goToPage('authorization')
    }

    let backBtn;
    if (this.props.listType === 'todos' && this.props.pageState === 'list') {
      backBtn = <Button variant="contained" color="primary"
        style={{ float: 'right', fontSize: '15px' }}
        className='headerButton'
        onClick={this.props.goToLists}>
        {'Back'}
      </Button>
    }

    let title = ''
    let editTitle = <span />
    const editField = <TextField
      style={(this.state.titleEdit ? { margin: 0 } : { display: 'none', margin: 0 })}
      value={this.state.editValue}
      onChange={e => this.updateValue(e)}
      margin="normal"
      onKeyDown={e => this.changeTitle(e)}
    />
    if (this.props.pageState === 'list') title += this.props.user.name
    if (this.props.listType === 'todos' && this.props.pageState === 'list') {
      if (this.state.titleEdit) {
        title += '/'
      } else {
        title += `/${this.props.list.title}`
        editTitle = <span style={{
          color: 'black',
          display: 'inline-block',
          margin: 5,
          fontSize: '0.7em',
          fontStyle: 'italic',
          cursor: 'pointer',
        }}
          onClick={this.editTitle}
        >edit</span>
      }
    }

    return (
      <div className={'header'}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Button variant="contained" color="primary"
            style={{ float: 'right', fontSize: '15px' }}
            className='headerButton'
            onClick={this.goToPage}>
            {goToBtn}
          </Button>
          {backBtn}
          <span className='headerInfo'>{title}</span>{editTitle}{editField}
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  goToPage: PropTypes.func.isRequired,
  pageState: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  listType: PropTypes.string.isRequired,
  goToLists: PropTypes.func.isRequired,
  changeListTitle: PropTypes.func.isRequired,
}
