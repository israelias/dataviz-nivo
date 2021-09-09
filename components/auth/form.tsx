import { FormControl, FormLabel, Input } from '@chakra-ui/react';

import React from 'react';

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSignIn,
}: {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleSignIn: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
}) => {
  return (
    <form id="login" onSubmit={handleSignIn}>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          placeholder="admin@admin.com"
          _placeholder={{ color: 'gray.500' }}
          border="1px solid"
          borderColor="transparent"
          color={'white'}
          _focus={{
            borderColor: '#f1c857',
          }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          border="1px solid"
          borderColor="transparent"
          color={'white'}
          _focus={{
            borderColor: '#f1c857',
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
    </form>
  );
};

export default LoginForm;
