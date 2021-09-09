import * as React from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { storage } from '../lib/storage';

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
  // TODO Option to shallow route, that changes the URL without refesh
  // router.push('/?counter=10', '/about?counter=10', { shallow: true });

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    if (email === 'admin@admin.com' && password === 'admin') {
      // TODO Persist email to secure pages beyond `/`
      // setEmail('');
      setPassword('');
      setLoggedIn(true);
      storage.setUserLocal(email);
      Router.push({
        pathname: '/pokemons',
      });
    } else {
      setEmail('');
      setLoggedIn(false);
      storage.clearUserLocal();
      storage.setLogoutEvent();
    }
    // TODO
    // SSR FETCHING to /api for authentication is disabled in prod.
    // AuthContext is providing a Mock Auth for the time being.

    // await fetch(
    //   new Request('/api', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //   })
    // ).then((response) => {
    //   if (response.ok) {
    //     setEmail('');
    //     setPassword('');
    //     setLoggedIn(true);
    //     storage.setUserLocal(email);
    //     history.push({
    //       pathname: '/pokemons',
    //     });
    //   } else {

    //     setEmail('');
    //     setLoggedIn(false);
    //     storage.clearUserLocal();
    //     storage.setLogoutEvent();
    //   }
    // });
  };

  // TODO Optional Mock to secure pages beyond '/`
  // React.useEffect(() => {
  //   if (!email) {
  //     history.push('/');
  //     setLoggedIn(false);
  //   }
  // }, [email]);

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
