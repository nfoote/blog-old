import * as React from "react"
import SiteHeader from "./site-header"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  // let header

  // header = isRootPath //fix
  //   ? <SiteHeader title={title} className="main-heading" />
  //   : <SiteHeader title={title} className="header-link-home" />

  return (
<>
    <header>
      <SiteHeader title={title} />
    </header>

    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <main>{children}</main>
    </div>
  </>
  )
}

export default Layout
