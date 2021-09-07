/* eslint-disable no-console */
import * as React from 'react';
import { useRouter } from 'next/router';
import { storage } from '../lib/storage';
// import fetch from 'cross-fetch';

// import {
//   Fetcher,
//   Key,
//   useSWR,
//   SWRResponse,
//   SWRConfiguration,
//   SWRHook,
// } from 'swr';

// import userFetcher from '../lib/user';

// function useUser() {
//   const { data, mutate, error } = useSWR('api_user', userFetcher);

//   const loading = !data && !error;
//   const loggedOut = error && error.status === 403;

//   return {
//     loading,
//     loggedOut,
//     user: data,
//     mutate,
//   };
// }

export type AuthContext = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSignIn: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  // handleSignOut: (
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) => Promise<void>;
};

export const AuthContext = React.createContext<AuthContext>(
  undefined!
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useRouter();

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    await fetch(
      new Request('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      })
    ).then((response) => {
      if (response.ok) {
        setEmail('');
        setPassword('');
        setLoggedIn(true);
        storage.setUserLocal(email);
        history.push({
          pathname: '/pokemons',
        });
      } else {
        console.log(response);
        setEmail('');
        setLoggedIn(false);
        storage.clearUserLocal();
        storage.setLogoutEvent();
      }
    });
  };

  React.useEffect(() => {
    function checkUserData(e: StorageEvent) {
      if (e.key === 'app_logout') {
        setEmail('');
        setLoggedIn(false);
        storage.clearUserLocal();
        storage.setLogoutEvent();
      }
    }
    window.addEventListener('storage', (e) => checkUserData(e));
    return () => {
      window.removeEventListener('storage', (e) => checkUserData(e));
    };
  }, []);

  // React.useEffect(() => {
  //   if (!(username || accessToken)) {
  //     history.push('/');
  //     setLoggedIn(false);
  //     setReturning(true);
  //     toast({
  //       duration: 3000,
  //       isClosable: true,
  //       render: () => (
  //         <Prompt
  //           error
  //           message="Oops. It seems you've been logged out."
  //         />
  //       ),
  //     });
  //   }
  // }, [username, accessToken]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
        handleSignIn,
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
