import { useEffect, useState } from "react";
import { UsersList } from "./UsersList";

const MOCK_USERS = [
  { id: 1, name: "Ashish" },
  { id: 2, name: "Rahul" },
  { id: 3, name: "Amit" },
];

type USERS_DATA = {
    id: number,
    name: string
}


export const UsersContainer = () => {
  const [users, setUsers] = useState<USERS_DATA[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    async function fetchUser() : Promise<USERS_DATA[]>{
        return new Promise((resolve) =>{
            setTimeout(() => {
                resolve(MOCK_USERS);
            },3000)
        })
    }    

    async function getAllUser(){
        try {
            setIsLoading(true);
            const data = await fetchUser();
            setUsers(data);
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false);
        }
    }

    getAllUser();

  }, []);

  return (
    <>
      <UsersList loading={isLoading} usersData={users} />
    </>
  );
};
