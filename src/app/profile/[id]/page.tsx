const UserProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>profile page</h1>
      <hr />
      <p className="text-4">params {params.id}</p>
    </div>
  );
};

export default UserProfile;
