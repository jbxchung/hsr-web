import { FC } from 'react';
import Login from './Login/Login';
import { User, UserRole } from '../types/User';
import Home from './Home/Home';
import Characters from './Characters/Characters';
import LightCones from './LightCones/LightCones';
import Users from './Users/Users';

interface PageConfig {
  title: string;
  path: string;
  component: FC;
}

export const publicPages: PageConfig[] = [
  {
    title: 'Home',
    path: '/',
    component: Home,
  },
  {
    title: 'Characters',
    path: '/character',
    component: Characters,
  },
  {
    title: 'Light Cones',
    path: '/lightcone',
    component: LightCones,
  }
];

const userPages = [
  {
    title: 'Pull Records',
    path: '/pulls',
    component: () => <div>POST AUTH ONLY: pull records page placeholder</div>,
  }
];

const adminPages: PageConfig[] = [
  {
    title: 'User Management',
    path: '/users',
    component: Users,
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