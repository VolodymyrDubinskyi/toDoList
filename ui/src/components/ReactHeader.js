import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';

export default class ReactToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goToPage = () => {
    switch (this.props.pageState) {
      case 'authorization': this.props.goToPage('registration'); break;
      default: this.props.goToPage('authorization')
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
    if (this.props.listType === 'todo' && this.props.pageState === 'list') {
      backBtn = <Button variant="contained" color="primary"
        style={{ float: 'right', fontSize: '15px' }}
        className='headerButton'
        onClick={this.goBack}>
        {'Back'}
      </Button>
    }

    return (
      <div className={'header'}>
        <Button variant="contained" color="primary"
          style={{ float: 'right', fontSize: '15px' }}
          className='headerButton'
          onClick={this.goToPage}>
          {goToBtn}
        </Button>
        {backBtn}
        <p className='headerInfo'>{this.props.user.name}</p>
      </div>
    )
  }
}

ReactToDoList.propTypes = {
  goToPage: PropTypes.func.isRequired,
  pageState: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  listType: PropTypes.string.isRequired,
}
