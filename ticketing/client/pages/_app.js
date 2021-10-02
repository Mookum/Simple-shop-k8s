import 'bootstrap/dist/css/bootstrap.css'

const globalStyling = ({ Component, pageProps }) => {
  return <Component { ...pageProps } />
}

export default globalStyling
