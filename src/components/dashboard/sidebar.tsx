import React from 'react';
import { Deals, Logo, Transactions, Verifiers } from '../svg';
import { Link } from 'react-router-dom';
import { routes } from '../../navigation';
import { useLocation } from 'react-router-dom'


export default function Sidebar() {
  const location = useLocation()

  const sidebarLinks = [
    {id: 1, label: 'Verifiers', route: routes.dashboard.path, icon: Verifiers},
    {id: 2, label: 'Deals', route: routes.dashboard.deals.path, icon: Deals},
    {id: 3, label: 'Transactions', route: routes.dashboard.transactions.path, icon: Transactions},
  ]
  
  return (
  <div className='wema__dashboard__sidebar'>
    <div className="d-flex justify-content-center">
      <Logo />
    </div>

    <div className="wema__dashboard__sidebar__divider"></div>

    <div className="wema__dashboard__sidebar__links__con pt-1">
      {
        sidebarLinks.map(item => {
          const active = location.pathname === item?.route

          return (
            <Link key={item.id} className={`wema__dashboard__sidebar__link my-3 ${active? 'active': ''}`} to={item.route}>
              <div className="d-flex align-items-center gap-3">
                {item.icon()}
                <p className='font-inter'>{item.label}</p>
              </div>
              {active && <div className="indicator"></div>}
            </Link>
    
            )
        })
      }
    </div>
  </div>
  );
}