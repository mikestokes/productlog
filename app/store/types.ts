
export interface EditingPayload {
  draft?: boolean,
  pinned?: boolean,
  published?: Date,
  title?: string,
  markdown?: string,
  html?: string,
  tag?: Tag
}

export const emptyEditingPayload = (): EditingPayload => ({
  draft: undefined,
  pinned: undefined,
  published: undefined,
  title: undefined,
  markdown: undefined,
  html: undefined,
  tag: undefined
})

export interface Tag {
  color: string,
  name: string
}

export interface Post extends EditingPayload {
  id: string
}

export interface Log {
  id?: string,
  title: string,
  website: string,
  entry: Post[]
}

export interface LogState {
  log?: Log,
  entries: Post[],
  editing: boolean,
  editingId?: string,
  editingPayload: EditingPayload,
  tagTypes: Tag[]
}

export interface BaseState {
}

