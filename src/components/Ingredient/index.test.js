import renderer from 'react-test-renderer'
import Ingredient from './'

test('Should render component', () => {
  const item = {'name': 'egg', 'src': 'egg.png'}

  const component = renderer.create(
    <Ingredient item={item} onClick={() => {}} />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
