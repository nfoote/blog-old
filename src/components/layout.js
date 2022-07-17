import * as React from "react"
import SiteHeader from "./site-header"
import styled from "styled-components";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  // let header

  // header = isRootPath //fix
  //   ? <SiteHeader title={title} className="main-heading" />
  //   : <SiteHeader title={title} className="header-link-home" />


  // .global-wrapper {
  //   margin: var(--spacing-0) auto;
  //   max-width: var(--maxWidth-wrapper);
  //   padding: var(--spacing-10) var(--spacing-5);
  // }
  
  // .global-wrapper[data-is-root-path="true"] .bio {
  //   margin-bottom: var(--spacing-20);
  // }

  const StyledLayout = styled.section`
    margin: var(--spacing-0) auto;
    max-width: var(--maxWidth-wrapper);
    padding: var(--spacing-10) var(--spacing-5);
`;

  return (
<>
    <StyledLayout isRootPath={isRootPath}>
    <header>
      <SiteHeader title={title} />
    </header>
      <main>{children}</main>
    </StyledLayout>
  </>
  )
}

export default Layout
