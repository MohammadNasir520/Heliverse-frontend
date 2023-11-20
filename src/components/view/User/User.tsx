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
  const { data } = useGetAllUserQuery(undefined);
  const users = data?.data;
  const meta = data?.meta;
  console.log(meta);
  console.log(users);
  return (
    <div>
      <div className="w-full">
        <h1 className="text-center">total:{meta?.total}</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 ">
        {users?.map((user: IUser) => (
          <UserCard user={user}></UserCard>
        ))}
      </div>
    </div>
  );
};

export default User;
