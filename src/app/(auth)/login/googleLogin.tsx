'use client';

import { useEffect, useRef } from 'react';
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          prompt: () => void;
          renderButton: (
            element: HTMLElement | null,
            options: { theme: string; size: string }
          ) => void;
        };
      };
    };
  }
}

export default function GoogleLoginButton() {
  const initializedRef = useRef(false);
   
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!window.google || initializedRef.current || !clientId) return;
  
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });
  
    window.google.accounts.id.renderButton(
      document.getElementById('gsi-button'),
      { theme: 'outline', size: 'large' } // customization attributes
    );
  
    initializedRef.current = true;
  }, []);

  const handleCredentialResponse = (response: { credential: string }) => {
    console.log("asd")
    fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json() as { user: { email: string; name: string } };
          console.log('User payload:', data?.user ?? ""); // 👈 email, name, etc.
          
          // You can now access user info
          console.log('Email:', data.user.email);
          console.log('Name:', data.user.name);
          console.log('Google login successful', res);
          //   window.location.reload();
        } else {
          console.error('Google login failed');
        }
      })
      .catch((error) => {
        console.error('An error occurred during Google login:', error);
      });
  };

  

  return (
    <div id="gsi-button"></div>
  );
}
