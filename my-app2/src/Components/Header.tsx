import styled from "styled-components";

const Nav = styled.nav``;

const Col = styled.div``;

const Logo = styled.svg``;

const Items = styled.ul``;

const Item = styled.li``;

function Header() {
  return (
    <Nav>
      <Col>
        <Logo />
        <Items>
          <Item>Home</Item>
          <Item>Tv Shows</Item>
          <Item></Item>
        </Items>
      </Col>
      <Col>
        <button>search</button>
      </Col>
    </Nav>
  );
}

export default Header;
