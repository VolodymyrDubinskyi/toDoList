import React from 'react';
import List from './List'
import Registration from './Registration'
import Authorization from './Authorization'
import Header from './Header'


export default class ToDo extends React.Component {
  state = {
    userPosition: 'list',
    user: {
      name: 'Mark',
      visibility: true,
      id: '',
    },
    list: {
      title: '',
      visibility: true,
      id: '',
    },
    listType: 'lists',
    elems: [],
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

  changeListVisibility = () => {
    const newList = this.state.list;
    newList.visibility = !newList.visibility
    this.setState({ list: newList })
  }

  createNewList = () => {
    const newElems = [...this.state.elems, { title: 'new list', id: Math.ceil(Math.random() * 9999999) }]
    this.setState({
      elems: newElems,
    })
  }

  createNewUser = (login, password) => {
    console.log('login ' + login)
    console.log('password ' + password)
  }

  tryAuthorize = (login, password) => {
    this.setState({
      userPosition: 'list',
    })
  }

  goToTodolist = (title) => {
    const newList = {
      title,
      visibility: this.state.list.visibility,
    }

    this.setState({
      list: newList,
      listType: 'todos',
    })
  }

  goToLists = () => {
    this.setState({
      listType: 'lists',
    })
  }

  createElem = (newElem) => {
    const newElems = [...this.state.elems, newElem]
    this.setState({
      elems: newElems,
    })
  }

  deleteElem = (id) => {
    const newElems = this.state.elems.filter(elem => elem.id !== id)
    this.setState({
      elems: newElems,
    })
  }

  toggleChose = (id) => {
    console.log(id)
    const newElems = [...this.state.elems]
    newElems.forEach((elem) => {
      if (elem.id === id) {
        elem.chosen = !elem.chosen
      }
    })
    this.setState({
      elems: newElems,
    })
  }

  editElemListValue = (id, newTitle) => {
    const newElems = [...this.state.elems]
    newElems.forEach((elem) => {
      if (elem.id === id) {
        elem.title = newTitle
      }
    })
    this.setState({
      elems: newElems,
    })
  }

  changeListTitle = (newTitle) => {
    const newList = {
      title: newTitle,
      visibility: this.state.list.visibility,
    }

    this.setState({
      list: newList,
    })
  }


  render() {
    let position
    switch (this.state.userPosition) {
      case 'list': position = <List
        listType={this.state.listType}
        changeUserVisibility={this.changeUserVisibility}
        changeListVisibility={this.changeListVisibility}
        user={this.state.user}
        createNewList={this.createNewList}
        deleteElem={this.deleteElem}
        toggleChose={this.toggleChose}
        editElemListValue={this.editElemListValue}
        createElem={this.createElem}
        elems={this.state.elems}
        list={this.state.list}
        goToTodolist={this.goToTodolist} />; break;
      case 'registration': position = <Registration
        createNewUser={this.createNewUser}
        checkLoginExisting={this.checkLoginExisting} />; break;
      default: position = <Authorization tryAuthorize={this.tryAuthorize} />;
    }
    return (<div style={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
    }}>
      <Header
        goToPage={this.goToPage}
        pageState={this.state.userPosition}
        user={this.state.user}
        list={this.state.list}
        listType={this.state.listType}
        goToLists={this.goToLists}
        changeListTitle={this.changeListTitle} />
      {position}
    </div>
    )
  }

  checkLoginExisting = async (id) => {
    console.log(id)
    return true
  }
}
