import { FC } from 'react';
import Login from './Login/Login';
import { User, UserRole } from '../types/User';
import Home from './Home/Home';
import Characters from './Characters/Characters';
import CharacterDetails from './Characters/CharacterDetails';
import Friends from './Friends/Friends';
import Items from './Items/Items';
import LightCones from './LightCones/LightCones';
import PullRecords from './Pulls/Pulls';
import Users from './Users/Users';
import Inventory from './Inventory/Inventory';

interface PageConfig {
  title: string;
  path: string;
  component: FC;
  detailComponent?: FC;
  showInNavbar?: boolean;
}

export const publicPages: PageConfig[] = [
  {
    title: 'Home',
    path: '/',
    component: Home,
    showInNavbar: true
  },
  {
    title: 'Characters',
    path: '/characters',
    component: Characters,
    detailComponent: CharacterDetails,
    showInNavbar: true,
  },
  {
    title: 'Light Cones',
    path: '/lightcones',
    component: LightCones,
    detailComponent: () => <div>todo: implement light cone details page</div>,
    showInNavbar: true,
  },
  {
    title: 'Items',
    path: '/items',
    component: Items,
    showInNavbar: true,
  }
];

const userPages = [
  {
    title: 'Pull Records',
    path: '/pulls',
    component: PullRecords,
    showInNavbar: true,
  },
  {
    title: 'Inventory',
    path: '/inventory',
    component: Inventory,
    showInNavbar: true,
  },
  {
    title: 'Friends',
    path: '/friends',
    component: Friends,
    showInNavbar: false,
  }
];

const adminPages: PageConfig[] = [
  {
    title: 'User Management',
    path: '/users',
    component: Users,
    showInNavbar: true,
  }
];

export const LoginPage: PageConfig = {
  title: 'Login',
  path: '/login',
  component: Login,
};

export const getRoleBasedPages = (user: User | null): PageConfig[] => {
  let visiblePages: PageConfig[] = publicPages;

  if (user) {
    visiblePages = [...visiblePages, ...userPages];
    if (user.role === UserRole.ADMIN) {
      visiblePages = [...visiblePages, ...adminPages];
    }
  }

  return visiblePages;
}