/*
 * @param shape | Array<Object> - Defines the shape of our list.
 *                                Example: [
 *                                  { key: 'username', label: 'Username' },
 *                                  { key: 'bio', label: 'Biography' }
 *                                ]
 *
 * @param data | Object - Defines the data to populate our shape.
 *                               Example: {
 *                                  username: 'myFirstUsername',
 *                                  bio: 'This is a cool biography for my profile'
 *                                }
 *
 * @param classNames | Object - Defines the classnames to be applied to ul, li, and p respectively
 *
 * Shape and data must be of the same length, and the 'key' values in shape must correspond to the keys in data
 */

import generateKey from '../lib/generateKey'

export default function DataList ({ shape, data, classNames = { ul: 'data-list', li: 'data-list__group', p: 'data-list__entry' } }) {
  const keys = generateKey()
  return (
    <ul className={classNames.ul}>
      {shape.map((entry) => {
        return (
          <li key={keys.next().value} className={classNames.li}>
            <p className={classNames.p}>{entry.label}</p>
            <p className={classNames.p}>{data[entry.key]}</p>
          </li>
        )
      })}
    </ul>
  )
}
