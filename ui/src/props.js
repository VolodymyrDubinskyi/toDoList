export type userProps = {
  name: string,
  currentList: string,
  visibility: boolean,
  id: string,
}

export type listsProps = {
  todos: Array<Object>,
  id: string,
  visibility: boolean,
  title: string,
}

export type todoProps = {
  title: string,
  chosen: boolean,
}
