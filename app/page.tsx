'use client';

import dynamic from 'next/dynamic';

const DynamicDashboard = dynamic(() => import('./dashboard'), {
  ssr: false,
});

const Home = () => <DynamicDashboard />;

export default Home;
