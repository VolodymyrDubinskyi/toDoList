import React from 'react';
import ReactList from './ReactList'
import ReactRegistration from './ReactRegistration'
import ReactAuthorization from './ReactAuthorization'
import ReactHeader from './ReactHeader'


export default class ReactToDo extends React.Component {
  state = {
    userPosition: 'list',
    user: {
      name: '',
      visibility: true,
    },
    listType: 'todo',
  }

  goToPage = (nextPage) => {
    this.setState({
      userPosition: nextPage,
    })
  }

  changeUserVisibility = () => {
    const newUser = this.state.user;
    newUser.visibility = !newUser.visibility
    this.setState({ user: newUser })
  }

  createNewUser = (login, password) => {
    console.log('login ' + login)
    console.log('password ' + password)
  }

  tryAuthorize = (login, password) => {
    console.log('login ' + login)
    console.log('password ' + password)
  }

  render() {
    let position
    switch (this.state.userPosition) {
      case 'list': position = <ReactList
        listType={this.state.listType}
        changeUserVisibility={this.changeUserVisibility}
        user={this.state.user} />; break;
      case 'registration': position = <ReactRegistration
        createNewUser={this.createNewUser}
        checkLoginExisting={this.checkLoginExisting} />; break;
      default: position = <ReactAuthorization tryAuthorize={this.tryAuthorize} />;
    }
    return (<div style={{
      width: '100vw',
      minHeight: '50vh',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
    }}>
      <ReactHeader
        goToPage={this.goToPage}
        pageState={this.state.userPosition}
        user={this.state.user}
        listType={this.state.listType} />
      {position}
    </div>
    )
  }

  checkLoginExisting = async (id) => {
    console.log(id)
    return false
  }
}
