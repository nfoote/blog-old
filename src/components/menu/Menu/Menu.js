
import { Link } from 'gatsby';
import React from 'react';
import Emoji from '../../emoji';
import { StyledMenu } from './Menu.styled';
import { useStaticQuery, graphql } from "gatsby"
import linkedin from '../../../images/svg/linkedin.svg'
import github from '../../../images/svg/github.svg'

const Menu = ({ open }) => {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      site {
        siteMetadata {
          social {
            linkedin,
			github
          }
        }
      }
    }
  `)

  const social = data.site.siteMetadata?.social

  return (
    <StyledMenu open={open}>
      <Link to="/blog/" itemProp="url">
		<span role="img" aria-label="Blog">
			<Emoji symbol="📝" style={{paddingRight: 1, paddingLeft: 1}} label="Blog"/>
		</span>
		Blog
      </Link>
		<a href={`https://www.github.com/${social?.github || ``}`}>
			<span style={{ display:'block'}}>
			<img style={{height: '25px', width: '25px', marginRight: '12px'}} src={github} alt="github logo" />
			GitHub
			</span>
		</a>
		<a href={`https://www.linkedin.com/in/${social?.linkedin || ``}`}>
			<span style={{ display:'block'}}>
			<img style={{height: '25px', width: '25px', marginRight: '12px'}} src={linkedin} alt="linkedin logo" />
			LinkedIn
			</span>
		</a>
		<a href="resume.pdf">
			<span role="img" aria-label="Resume">
				<Emoji symbol="📃" style={{paddingRight: 1, paddingLeft: 1}} label="Resume"/>
			</span>
			Resume
		</a>
    </StyledMenu>
  )
}
export default Menu;
