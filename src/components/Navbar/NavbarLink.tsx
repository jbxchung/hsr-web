import { FC, MouseEventHandler } from 'react';

import { Link } from 'react-router-dom';

interface Props {
  active: boolean;
  target: string;
  title: string;
  onClick: MouseEventHandler;
}

const NavbarLink: FC<Props> = (props: Props) => (
  <div className={`navbar-link${props.active ? ' active' : ''}`} onClick={props.onClick}>
    <Link to={props.target}>{props.title}</Link>
  </div>
)

export default NavbarLink;