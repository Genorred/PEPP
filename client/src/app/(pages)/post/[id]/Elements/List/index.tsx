import { ListOrdered, ListIcon} from 'lucide-react'
import React from "react";

type ListProps = {
  as: 'h1' | 'h2',
  attributes: object,
  element: object,
  size: 'xl' | 'lg',
  children: React.ReactNode,
}

const List = (props: ListProps) => {
  const { attributes, children, element } = props

  const Component = element.type === 'ordered-list' ? ListIcon : ListOrdered

  return (
    <Component {...attributes}>
      {children}
    </Component>
  )
}

export default List
