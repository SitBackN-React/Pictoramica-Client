import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const authenticatedOptions = (
  <Fragment>
    <DropdownButton
      alignRight
      title="Menu"
      id="dropdown-menu-align-right"
    >
      <Dropdown.Item href="#home-page">Home</Dropdown.Item>
      <Dropdown.Item href="#post-image">Create Image</Dropdown.Item>
      <Dropdown.Item href="#create-blog">Create Blog</Dropdown.Item>
      <Dropdown.Item href="#all-blogs">View All Blogs</Dropdown.Item>
      <Dropdown.Item href="#my-blogs">View My Blogs</Dropdown.Item>
      <Dropdown.Item href="#my-images">View My Images</Dropdown.Item>
      <Dropdown.Item href="#text-editor">Text Editor</Dropdown.Item>
      <Dropdown.Item href="#all-images">All Images</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#change-password">Change Password</Dropdown.Item>
      <Dropdown.Item href="#sign-out">Sign Out</Dropdown.Item>
    </DropdownButton>

  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)
//
// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link to="/home-page">Home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href="#home-page">
      Pictoramica
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
