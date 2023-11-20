import { IUser } from "../../view/User/User";

interface IProps {
  user: IUser;
}

const UserCard = ({ user }: IProps) => {
  const {
    avatar,
    available,
    domain,

    first_name,
    last_name,
    gender,
  } = user;

  const name = first_name + " " + last_name;
  console.log(user);
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
            <button className="flex-1 rounded text-white bg-blue-600 antialiased font-bold hover:bg-blue-900 -900 px-1 py-1">
              add to Team
            </button>
            <button className="flex-1 rounded border-2 border-gray-400 00 font-semibold text-black px-4 py-2">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
