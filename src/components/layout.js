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
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
      <SiteHeader title={title} className="main-heading" />
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
