import 'styled-components'

/**
 * @see https://github.com/vercel/next.js/blob/canary/examples/with-styled-components/styled.d.ts
 **/
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
    }
  }
}