
type LinkProps = {
  attributes: object,
  children: React.ReactNode,
  element: object,
}
const Link = (props: LinkProps) => {
  const {
    attributes, children, element,
  } = props

  return (
    <Link
      // fontWeight="bold"
      href={element.href}
      textAlign={element.align}
      {...attributes}
    >
      {children}
    </Link>
  )
}

export default Link
