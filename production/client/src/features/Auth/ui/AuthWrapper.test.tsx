import { render } from '@testing-library/react'
import Home from "@/app/page";

it('Landing is stable', () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})