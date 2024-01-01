import React from 'react';
import { DashboardLayout } from '../../layouts';
import { Checkbox } from '../../components/form control';

export default function Page() {
  return (
    <DashboardLayout>
      <div className="table-responsive wema__dshboard__table">
        <table className="table">
          <thead>
            <tr>
              <th className='align-middle'>
                <Checkbox checked onChange={() => {}} />
              </th>
              <th className='align-middle font-inter'>First Name</th>
              <th className='align-middle font-inter'>Last Name</th>
              <th className='align-middle font-inter'>Phone Number</th>
              <th className='align-middle font-inter'>Partner</th>
              <th className='align-middle font-inter'>Location</th>
              <th className='align-middle font-inter'>Status</th>
              <th className='align-middle font-inter'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((item) => (
              <tr key={item}>
                <td className='align-middle'>
                  <Checkbox checked onChange={() => {}} />
                </td>
                <td className='align-middle font-inter'>Temitope</td>
                <td className='align-middle font-inter'>Adejumoke</td>
                <td className='align-middle font-inter'>+234800 000 0000</td>
                <td className='align-middle font-inter'>The Place</td>
                <td className='align-middle font-inter'>Festac</td>
                <td className='align-middle'>Active</td>
                <td className='align-middle'>Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
