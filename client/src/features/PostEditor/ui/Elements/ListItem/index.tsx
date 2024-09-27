import {LucideList} from 'lucide-react'

type ListItemProps = {
  attributes: object,
  children: React.ReactNode,
}

const ListItem = (props: ListItemProps) => {
  const { attributes, children } = props

  return (
    <LucideList {...attributes}>
      {children}
    </LucideList>
  )
}

export default ListItem
