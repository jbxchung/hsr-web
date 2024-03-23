import { useContext, useEffect, useState } from 'react';
import { /*useUser,*/ User, UserLoginRequest } from './useUser';
import { useLocalStorage } from './useLocalStorage';

import { getApiBaseUrl } from '../utils/HostUtils';
import { AuthContext } from '../contexts/AuthContext';

const BASE_URL = getApiBaseUrl();

export const useAuth = () => {
  return useContext(AuthContext);
};