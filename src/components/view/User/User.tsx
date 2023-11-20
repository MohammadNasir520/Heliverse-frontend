import { useState } from "react";
import { useGetAllUserQuery } from "../../../redux/api/userApi/userApi";
import UserCard from "../../ui/UserCard/UserCard";

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
  tema?: string;
};

const User = () => {
  const [query, setQuery] = useState({});
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data } = useGetAllUserQuery({ ...query });
  const users = data?.data;
  const meta = data?.meta;
  console.log(meta);
  console.log(users);

  const totalPages = Math.ceil(meta?.total / meta?.limit);

  // Generate an array of numbers from 1 to totalPages
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  console.log(pageNumbers);
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
                    onChange={(e) =>
                      setQuery({ ...query, searchTerm: e.target.value })
                    }
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                  />
                  <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:after:scale-x-100 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Search
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="ml-3 flex justify-center ">
            <div>
              {searchTerm ? (
                <button
                  onClick={() => {
                    setSearchTerm("");
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
      {/* search and filter end */}

      <div className="w-full">
        <h1 className="text-center">
          total:{meta?.total} Page:{meta?.page}
        </h1>
      </div>
      <div>
        {users?.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 ">
            {users?.map((user: IUser) => (
              <UserCard user={user}></UserCard>
            ))}
          </div>
        ) : (
          <div className="h-screen flex justify-center items-center">
            <p className="font-bold"> No user Found</p>
          </div>
        )}
      </div>

      {/* pagination */}

      <nav>
        <ul className="flex">
          <li>
            <a
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              href="#"
              aria-label="Previous"
            ></a>
          </li>
          {pageNumbers?.map((pageNumber) => (
            <li>
              <div
                onClick={() => setQuery({ ...query, page: pageNumber })}
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 p-0 text-sm text-white shadow-md shadow-blue-500/20 transition duration-150 ease-in-out"
              >
                {pageNumber}
              </div>
            </li>
          ))}

          {}

          <li>
            <a
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              href="#"
              aria-label="Next"
            ></a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default User;
