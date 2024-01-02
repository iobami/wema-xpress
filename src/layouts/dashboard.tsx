import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

import { Header, Sidebar } from '../components/dashboard';
import { routes } from '../navigation';


interface IProps {
  children: ReactNode;
}

export default function DashboardLayout(props: IProps) {
  const { children } = props;

  const email = ReactSession.get('email');

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate(routes.signIn.path)
    }
  }, [navigate, email]);

  if (!email) return null;

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