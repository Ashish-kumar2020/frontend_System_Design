type PROP_TYPE = {
  loading: boolean;
  usersData: USERS_DATA[];
};

type USERS_DATA = {
  id: number;
  name: string;
};

export const UsersList = ({ loading, usersData }: PROP_TYPE) => {
  console.log(loading, usersData);

  if (loading) {
    return <h1>Loadaing Users Data....</h1>;
  }
  return (
    <div>
      {
        <ul>
          {usersData.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      }
    </div>
  );
};
