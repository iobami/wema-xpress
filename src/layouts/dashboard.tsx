import React, { ReactNode } from 'react';
import { Header, Sidebar } from '../components/dashboard';


interface IProps {
  children: ReactNode;
}

export default function DashboardLayout(props: IProps) {
const { children } = props

  return (
  <div className='wema__dashboard__layout'>
    <Sidebar />
    <Header />
    <div className='wema__dashboard__layout__main__content'>
      {children}
    </div>
  </div>
  );
}