'use client';

import logo from '@/app/assets/logo.svg';
import CryptoJS from 'crypto-js';
import { Button } from 'dms-common-ux/components/button';
import Image from 'next/image';
import pkceChallenge from 'pkce-challenge';
import { useState } from 'react';
import { authUrl, clientId, redirectUri } from '../constants/configs';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const pkce = await pkceChallenge();
      localStorage.setItem('code_verifier', pkce.code_verifier);
      if (clientId && redirectUri) {
        const random = CryptoJS.lib.WordArray.random(8).toString(CryptoJS.enc.Hex); // 8 bytes randomness
        const queryParams = new URLSearchParams({
          client_id: clientId,
          redirect_uri: redirectUri,
          nonce: 'asd',
          scope: `openid profile email phone ${random}`,
          state: random,
          response_type: 'code',
          code_challenge_method: 'S256',
          code_challenge: pkce.code_challenge,
        }).toString();
        window.location.href = `${authUrl}?${queryParams}`;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex flex-col gap-6 rounded-2xl bg-[linear-gradient(var(--color-foreground-white-transparent),var(--color-foreground-white-transparent)),url(/login_bg.png)] bg-cover p-4 shadow-lg md:gap-8 lg:p-8">
        <div className="flex w-full justify-end">
          <Image src={logo} alt="ABB Logo" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-foreground-secondary mt-4 text-base font-normal">
            <span className="text-brand-red block text-3xl font-bold">&#x2014;</span>
            <span>Welcome to</span>
          </div>
          <div className="text-2xl font-bold lg:pr-28">EDGE Gateway Program (CITADEL) - Status</div>
          <div className="pt-16 pb-5">
            <Button onClick={handleLogin} size="xl" isLoading={isLoading}>
              Log in with CIAM
            </Button>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="justify-center">
              <span className="text-foreground-secondary text-sm leading-tight font-normal">
                By logging in, you agree to our{' '}
              </span>
              <a
                href="https://new.abb.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-uiblue-background-primary-default text-sm leading-tight font-normal"
              >
                Terms of Service
              </a>
              <span className="text-foreground-secondary text-sm leading-tight font-normal"> and </span>
              <a
                href="https://new.abb.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-uiblue-background-primary-default text-sm leading-tight font-normal"
              >
                Privacy Policy
              </a>
            </div>
            <div className="text-foreground-primary text-right text-xs font-light">
              All rights reserved {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
