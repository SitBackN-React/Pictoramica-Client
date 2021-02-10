import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const authenticatedOptions = (
  <Fragment>
    <Nav className="container d-flex pt-2" variant="dark">
      <Nav.Link href="#home-page">Home</Nav.Link>
      <Nav.Link href="#all-images">All Images</Nav.Link>
      <Nav.Link href="#all-blogs">View All Blogs</Nav.Link>
      <Nav.Link href="#my-blogs">View My Blogs</Nav.Link>
      <Nav.Link href="#my-images">View My Images</Nav.Link>
      <Nav.Link href="#post-image">Create Image</Nav.Link>
      <Nav.Link href="#create-blog">Create Blog</Nav.Link>
    </Nav>
    <Nav class="drop-down-nav">
      <DropdownButton
        variant="outline-light"
        alignRight
        title="Account"
        id="dropdown-menu-align-right"
      >
        <Dropdown.Item href="#text-editor">Text Editor</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#change-password">Change Password</Dropdown.Item>
        <Dropdown.Item href="#sign-out">Sign Out</Dropdown.Item>
      </DropdownButton>
    </Nav>
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
  <div>
    <Navbar className="nav-bar" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand href="#home-page container-sm">
        <img src="https://user-images.githubusercontent.com/64027495/107455102-36592400-6b1c-11eb-8c10-4c1cfc0d575b.png"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { user && <span className="welcome-user mr-2">Welcome, {user.email}</span>}
          { user ? authenticatedOptions : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div>
      <p>ptag</p>
    </div>
  </div>
)

export default Header
