/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../utils/jwt";
import { IUser } from "../../view/User/User";
import { useGetSingleUserQuery } from "../../../redux/api/userApi/userApi";
import { useState } from "react";
import {
  useAddMemberToTeamMutation,
  useCreateATeamMutation,
} from "../../../redux/api/teamApi copy/teamApi";

interface IProps {
  user: IUser;
}

const UserCard = ({ user }: IProps) => {
  const { _id, avatar, available, domain, id, first_name, last_name, gender } =
    user;
  const name = first_name + " " + last_name;
  const [showModal, setShowModal] = useState(false);

  // const [disable, setDisable] = useState(false);

  const { userId } = getUserInfo() as { userId: string };

  const { data: loggedInUserInfo } = useGetSingleUserQuery(userId);
  const loggedInUser = loggedInUserInfo?.data;

  const [createATeam] = useCreateATeamMutation();
  const [addMemberToTeam] = useAddMemberToTeamMutation();

  const navigate = useNavigate();
  const handleAddToTeam = async (user: IUser) => {
    if (!userId) {
      navigate("/login");
    }
    if (!loggedInUser?.team.length) {
      setShowModal(true);
    } else if (loggedInUser?.team.length) {
      const res = await addMemberToTeam({
        userId: user._id,
        teamId: loggedInUser?.team[0],
      });
      console.log(res);
    }
  };

  const handleCreateTeam = async (event: any) => {
    event.preventDefault();
    const teamName = event.target.name.value;
    const res = await createATeam({ title: teamName, members: [_id] });

    // @ts-expect-error mess
    if (res?.data?.success) {
      setShowModal(false);
    }
  };
  return (
    <div>
      <div className="my-7 max-w-sm mx-auto bg-white  rounded-lg overflow-hidden shadow-lg">
        <div className="border-b px-4 pb-6">
          <div className="text-center my-2">
            <img
              className="h-24 w-24 rounded-full border-4 border-gray-300  mx-auto my-4"
              src={avatar}
              alt=""
            />
            <div className="">
              <h3 className="font-bold text-xl text-gray-800  mb-1">{name}</h3>
              <h3 className="font-bold text-xl text-gray-800  mb-1">
                ID: {id}
              </h3>
              <div className="inline-flex text-gray-700  items-center">
                <p>{available ? "available" : "not available"}</p>
              </div>
            </div>
          </div>
          <div className=" flex justify-center gap-3 mb-3">
            <p className="font-semibold"> Domain: {domain}</p>
            <p className="font-semibold"> Gender: {gender}</p>
          </div>
          <div className="flex gap-2 px-2">
            <button
              onClick={() => handleAddToTeam(user)}
              className="flex-1 rounded text-white bg-blue-600 antialiased font-bold hover:bg-blue-900 -900 px-1 py-1"
            >
              add to Team
            </button>
            <button className="flex-1 rounded border-2 border-gray-400 00 font-semibold text-black px-4 py-2">
              Details
            </button>
          </div>
        </div>
      </div>
      {/* ..........................modal....................... */}

      <div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Create A team First
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <form onSubmit={handleCreateTeam}>
                    <div className="relative p-10 flex-auto ">
                      <div className="w-72 mb-2">
                        <div className="relative h-10 w-full min-w-[200px]">
                          <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            type="text"
                            name="name"
                          />
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Team Name
                          </label>
                        </div>
                      </div>
                    </div>

                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        // disabled={disable ? true : false}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default UserCard;
