import generateKey from '../lib/generateKey'
import PropTypes from 'prop-types'

/**
 * This function will dynamically render a list of data based on the provided shape.
 * Shape and data must be of the same length, and the 'key' values in shape must correspond to the keys in data
 *
 * Example usage:
 * ```jsx
 *const shape = [
 *  { key: 'username', label: 'Username' },
 *  { key: 'bio', label: 'Biography' }
 *]
 *const data = {
 *  username: 'myFirstUsername',
 *  bio: 'This is a cool biography for my profile'
 *}
 *
 *return <DataList shape={shape} data={data} />
 * ```
 */
export default function DataList ({ shape, data, classNames = { ul: 'data-list', li: 'data-list__group', p: 'data-list__entry' } }) {
  const keys = generateKey()
  return (
    <ul className={classNames.ul}>
      {shape.map((entry) => {
        return (
          <li key={keys.next().value} className={classNames.li}>
            <p className={classNames.p}>{entry.label}:</p>
            <p className={classNames.p}>{data[entry.key]}</p>
          </li>
        )
      })}
    </ul>
  )
}

DataList.propTypes = {
  /** The shape of our data */
  shape: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,

  /** The actual data, the keys in this object must correspond one-to-one with the array of key names in shape */
  data: PropTypes.object.isRequired,

  /** Class name overrides to style the list with custom css */
  classNames: PropTypes.shape({
    ul: PropTypes.string,
    li: PropTypes.string,
    p: PropTypes.string
  })
}
