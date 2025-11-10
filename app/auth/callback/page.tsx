'use client';

import logo from '@/app/assets/logo.svg';
import { Spinner } from 'dms-common-ux/components/spinner';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthCallBackPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = window.location.href.replace('#', '?');
    const searchParams = new URL(url).searchParams;

    const expiresIn = searchParams.get('expires_in');
    let expiresAt = 3600 * 1000 + Date.now();

    if (expiresIn) {
      const expiresInValue = Number(expiresIn);
      if (!isNaN(expiresInValue)) {
        expiresAt = expiresInValue * 1000 + Date.now();
      }
    }

    const authData = JSON.stringify({
      // accessToken,
      expiresAt,
    });

    Cookies.set('authData', authData, { expires: new Date(expiresAt) });
    router.push('/');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex flex-col gap-6 rounded-2xl bg-[linear-gradient(var(--color-foreground-white-transparent),var(--color-foreground-white-transparent)),url(/login_bg.png)] bg-cover p-4 shadow-lg md:gap-8 lg:p-8">
        <div className="flex w-full justify-end">
          <Image src={logo} alt="ABB Logo" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-brand-red block text-3xl font-bold">&#x2014;</span>
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="text-2xl font-bold lg:pr-28">EDGE Gateway Program (CITADEL) - Status</div>
            <div className="pt-10 pb-5">
              <Spinner size={96} variant="gradient" />
            </div>
            <p className="text-foreground-primary text-center text-sm leading-4 font-normal">
              Please wait while we process your login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCallBackPage;
