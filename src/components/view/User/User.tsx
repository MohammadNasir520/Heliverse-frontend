/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllUserQuery } from "../../../redux/api/userApi/userApi";
import UserCard from "../../ui/UserCard/UserCard";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";

export type IUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
  domain: string;
  available: boolean;
  password: string;
  team?: string;
};

const User = () => {
  const [query, setQuery] = useState({});
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: AllUser } = useGetAllUserQuery(undefined);
  const { data } = useGetAllUserQuery({ ...query, searchTerm: searchTerm });
  const users = data?.data;
  const meta = data?.meta;
  // console.log(meta);
  // console.log(users);

  const totalPages = Math.ceil(meta?.total / meta?.limit);

  // Generating an array of numbers from 1 to totalPages
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  // console.log(pageNumbers);

  const teamUniqueDomain = new Set();

  AllUser?.data?.forEach((member: any) => {
    teamUniqueDomain.add(member.domain);
  });

  const teamUniqueDomainArray = Array.from(teamUniqueDomain);
  console.log(teamUniqueDomainArray);

  const handleGoto = (event: any) => {
    event.preventDefault();
    const goPageNo = event.target.goPageNo.value;
    if (goPageNo > totalPages || goPageNo < 1) {
      return;
    }
    setQuery({ ...query, page: goPageNo });
    event.target.reset();
  };
  return (
    <div>
      {/* search and filter start */}
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col md:flex-row w-full justify-center ">
          <div className=" mt-3 mb-8 flex   ">
            <div className="flex flex-col-reverse ">
              <div className=" flex space-x-2 mt-2"></div>

              {/* search Input */}
              <form>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    value={searchTerm}
                    onChange={(e) => (
                      setQuery({
                        ...query,
                        page: 1,
                      }),
                      setSearchTerm(e.target.value)
                    )}
                    className="peer h-full w-full border-b border-gray-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-gray-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-gray-gray-50"
                    placeholder=" "
                  />
                  <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-gray-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:after:scale-x-100 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-gray-500">
                    Search
                  </label>
                </div>
              </form>
            </div>
          </div>

          <div className="ml-3 flex justify-center ">
            <div>
              {Object.keys(query).length || searchTerm ? (
                <button
                  onClick={() => {
                    setQuery({}), setSearchTerm("");
                  }}
                  className="middle none center bg-green-800  px-4 py-2 mt-4   text-xs font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg "
                >
                  clear search
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Option*/}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-3/4 mx-auto">
        <div className="relative h-10 w-52 min-w-[200px]">
          <select
            onChange={(event) => {
              setQuery({ ...query, domain: event.target.value });
            }}
            className="peer h-full w-full outline-none rounded-[3px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-1 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          >
            <option disabled selected value="">
              select Domain
            </option>
            {teamUniqueDomainArray?.map((value: any, i: number) => (
              <option key={i} value={value}>
                {value}
              </option>
            ))}
          </select>
          <label className=" font-sans before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Domain
          </label>
        </div>
        <div className="relative h-10 w-52 min-w-[200px]">
          <select
            onChange={(event) => {
              setQuery({ ...query, gender: event.target.value });
              console.log(event.target.value);
            }}
            className="peer h-full w-full outline-none rounded-[3px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-1 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          >
            <option disabled selected value="">
              select Gender
            </option>

            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </select>
          <label className=" font-sans before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Gender
          </label>
        </div>
        <div className="relative h-10 w-52 min-w-[200px]">
          <select
            onChange={(event) => {
              setQuery({ ...query, available: event.target.value });
            }}
            className="peer h-full w-full outline-none rounded-[3px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-1 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          >
            <option disabled selected value="">
              select Availability
            </option>

            <option value={"true"}>Available</option>
            <option value={"false"}>NotAvailable</option>
          </select>
          <label className=" font-sans before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Availability
          </label>
        </div>
      </div>
      {/* search and filter end */}

      <div className="w-full">
        <h1 className="text-center">
          Page Number:{meta?.page} In this Page:{meta?.limit} total:
          {meta?.total}
        </h1>
      </div>
      <div>
        {users?.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 ">
            {users?.map((user: IUser, i: number) => (
              <UserCard key={i} user={user}></UserCard>
            ))}
          </div>
        ) : (
          <div className="h-screen flex justify-center items-center">
            <p className="font-bold"> No user Found</p>
          </div>
        )}
      </div>

      {/* pagination */}

      <div className="flex justify-center">
        <ul className="flex">
          <li>
            <div
              onClick={() => setQuery({ ...query, page: meta?.page - 1 })}
              className="mx-1 cursor-pointer flex h-9 w-9 items-center justify-center rounded-full border border-gray-gray-100 bg-transparent p-0 text-sm text-gray-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              aria-label="Next"
            >
              <FaAnglesLeft />
            </div>
          </li>
          {pageNumbers
            .slice(
              meta?.page > 5 ? meta?.page - 5 : 0,
              meta?.page < 5 ? 10 : meta?.page + 5
            )
            ?.map((pageNumber) => (
              <li>
                <div
                  onClick={() => setQuery({ ...query, page: pageNumber })}
                  className={`${
                    pageNumber === meta?.page
                      ? "from-blue-600 to-blue-400 text-white"
                      : " bg-slate-300"
                  } mx-1  flex h-9 w-9 items-center justify-center cursor-pointer rounded-full bg-gradient-to-tr  p-0 text-sm text-black shadow-md shadow-gray-500/20 transition duration-150 ease-in-out`}
                >
                  {pageNumber}
                </div>
              </li>
            ))}
          <li>
            <div
              onClick={() => setQuery({ ...query, page: meta?.page + 1 })}
              className="mx-1  cursor-pointer flex h-9 w-9 items-center justify-center rounded-full border border-gray-gray-100 bg-transparent p-0 text-sm text-gray-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              aria-label="Next"
            >
              <FaAnglesRight />
            </div>
          </li>
        </ul>

        {/* go to started */}
        <div className="relative flex h-10  w-[200px]">
          <form onSubmit={handleGoto}>
            {" "}
            <input
              type="number"
              name="goPageNo"
              className="peer h-full w-full rounded-[7px] border border-gray-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-gray-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-gray-200 placeholder-shown:border-t-gray-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-gray-50"
              placeholder=" "
              required
            />
            <button
              className="!absolute right-1 top-1 z-10 select-none rounded bg-black py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg  cursor-pointer focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-gray-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
              type="submit"
            >
              Go To
            </button>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-gray-500">
              Page No.
            </label>
          </form>
        </div>
      </div>

      {/* pagination end */}
    </div>
  );
};

export default User;
