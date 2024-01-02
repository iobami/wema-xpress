import { DashboardLayout } from "../../layouts";
import {
  Button,
  Checkbox,
  InputField,
  Select,
} from "../../components/form control";
import queries from "../../services/queries/verifiers";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import config from "../../config";

enum Verifiers {
  Active = "1",
  Pending = "2",
  Deactivated = "3",
}

function Status(props: { status: `${Verifiers}` }) {
  if (Verifiers.Active === props.status) {
    return <span className="app__badge app__badge--active">Active</span>;
  }

  if (Verifiers.Deactivated === props.status) {
    return (
      <span className="app__badge app__badge--deactivated">Deactivated</span>
    );
  }

  if (Verifiers.Pending === props.status) {
    return (
      <span className="app__badge app__badge--pending">Awaiting approval</span>
    );
  }

  return null;
}

const options = [
  { label: "All", value: "" },
  { label: "Active Verifiers", value: Verifiers.Active },
  { label: "Pending Verifiers", value: Verifiers.Pending },
  { label: "Deactivated Verifiers", value: Verifiers.Deactivated },
];

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Ellipsis() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M5 10.5C3.9 10.5 3 11.4 3 12.5C3 13.6 3.9 14.5 5 14.5C6.1 14.5 7 13.6 7 12.5C7 11.4 6.1 10.5 5 10.5Z"
        stroke="#333333"
        strokeWidth="1.5"
      />
      <path
        d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z"
        stroke="#333333"
        strokeWidth="1.5"
      />
      <path
        d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z"
        stroke="#333333"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export enum SearchParams {
  status = 'status',
  searchParams = 'searchParams',
  pageNumber = 'pageNumber',
  pageSize = 'pageSize',
}

export const useSearchQueries = () => {
  const [searchParams] = useSearchParams();

  return useMemo(() => ({
    status: searchParams.get(SearchParams.status) || undefined,
    searchParams: searchParams.get(SearchParams.searchParams) || undefined,
    pageNumber: searchParams.get(SearchParams.pageNumber) || config.queryArgs.pageNumber,
    pageSize: searchParams.get(SearchParams.pageSize) || config.queryArgs.pageSize,
  }), [searchParams])
};

export default function Page() {
  const [, setSearchParams] = useSearchParams();

  const query = useSearchQueries();

  const { data, isLoading } = queries.read({ query });

  return (
    <DashboardLayout>
      <div className="wema__dshboard__filters">
        <Select
          className="wema__dshboard__filters__select"
          options={options}
          optionLabel="label"
          optionValue="value"
          onChange={(e) => {
            setSearchParams((params) => {
              params.set(SearchParams.status, (e.target as any).value || '');

              return params;
            })
          }}
          value={query.status || ''}
        />

        <div className="wema__dshboard__filters__right">
          <InputField
            className="wema__dshboard__filters__input"
            placeholder="Name/Phone no / Location"
            onChange={(e) => {
              setSearchParams((params) => {
                params.set(SearchParams.searchParams, (e.target as any).value || '');
  
                return params;
              })
            }}
            value={query.searchParams || ''}
          />

          <Button>
            <PlusIcon />
            Add New Verifier
          </Button>
        </div>
      </div>

      <div className="table-responsive wema__dshboard__table">
        <table className="table mb-0">
          <thead>
            <tr>
              <th className="align-middle">
                <Checkbox checked={false} onChange={() => {}} />
              </th>
              <th className="align-middle font-inter">First Name</th>
              <th className="align-middle font-inter">Last Name</th>
              <th className="align-middle font-inter">Phone Number</th>
              <th className="align-middle font-inter">Partner</th>
              <th className="align-middle font-inter">Location</th>
              <th className="align-middle font-inter">Status</th>
              <th className="align-middle font-inter">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <td className="align-middle">
                  <Checkbox checked={false} onChange={() => {}} />
                </td>
                <td className="align-middle font-inter">{item.first_name}</td>
                <td className="align-middle font-inter">{item.last_name}</td>
                <td className="align-middle font-inter">+234800 000 0000</td>
                <td className="align-middle font-inter">{item.partner}</td>
                <td className="align-middle font-inter">{item.location}</td>
                <td className="align-middle">
                  <Status
                    status={String(item.status) as unknown as Verifiers}
                  />
                </td>
                <td className="align-middle">
                  <Ellipsis />
                </td>
              </tr>
            ))}

            {!data?.length && !isLoading && (
              <tr>
                <td className="align-middle" colSpan={8}>
                  No record available
                </td>
              </tr>
            )}

            {!data?.length && isLoading && (
              <tr>
                <td className="align-middle" colSpan={8}>
                  Fetching data...
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="wema__dshboard__table__pagination">
          <div className="size">
            <p>Rows per page</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
