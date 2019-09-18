import { forwardRef, useContext } from 'react'
import { ThemeContext } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'
import jsx from './jsx'
// experimental
import { useEditor } from './use-editor'

export const styled = tag => (...args) => {
  const shouldForwardProps = typeof tag === 'function'
  const Styled = forwardRef(({ as, ..._props }, ref) => {
    const props = useEditor(_props, {
      tag,
    })
    const theme = useContext(ThemeContext)
    let nextProps = shouldForwardProps ? props : {}
    let styles = {}
    args.forEach(arg => {
      const style = typeof arg === 'function' ? arg({ theme, ...props }) : arg
      Object.assign(styles, style)
    })

    if (!shouldForwardProps) {
      for (let key in props) {
        if (!isPropValid(key)) continue
        nextProps[key] = props[key]
      }
    }

    return jsx(as || tag, {
      ...nextProps,
      ref,
      css: styles,
    })
  })
  return Styled
}

export default styled
