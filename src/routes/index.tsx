import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routersList } from '@/routes/list';
import Loading from '@/components/Loading';

const Router = () => (
  <React.Suspense fallback={<Loading />}>
    <Routes>
      {routersList.map(item => (
        <Route key={item.path} path={item.path} Component={item.element} />
      ))}
    </Routes>
  </React.Suspense>
);

export default Router;
