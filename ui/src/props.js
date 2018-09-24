export type userProps = {
  name: string,
  currentList: string,
  visibility: boolean,
  id: string,
}

export type todoProps = {
  title: string,
  chosen: boolean,
}

export type listsProps = {
  todos: Array<todoProps>,
  id: string,
  visibility: boolean,
  title: string,
}
