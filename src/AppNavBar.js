import { Link } from "react-router-dom";
import { Menu } from 'antd';

export function AppNavBar(handleMenu, currentMenu) {
  return <Menu onClick={handleMenu} selectedKeys={[currentMenu]} mode="horizontal">
    <Menu.Item key="home">
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item key="book">
      <Link to="/book">Book</Link>
    </Menu.Item>
    <Menu.Item key="movie">
      <Link to="/movie">Movie</Link>
    </Menu.Item>
    <Menu.Item key="character">
      <Link to="/character">Character</Link>
    </Menu.Item>
    <Menu.Item key="quote">
      <Link to="/quote">Quote</Link>
    </Menu.Item>
    <Menu.Item key="chapter">
      <Link to="/chapter">Chapter</Link>
    </Menu.Item>
  </Menu>;
}
