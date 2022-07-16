import * as React from "react"
import SiteHeader from "./site-header"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  header = isRootPath 
    ? <SiteHeader title={title} className="main-heading" />
    : <SiteHeader title={title} className="header-link-home" />

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
