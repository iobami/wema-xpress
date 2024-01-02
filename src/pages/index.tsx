import React from 'react'
import { Navigate } from 'react-router-dom';
import { routes } from '../navigation';

export default function Page() {
  return (
    <Navigate to={routes.dashboard.entry.path} />
  );
}
