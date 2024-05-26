import { useQuery } from "react-query";

function useUserData(userId) {
  return useQuery(["user", userId], () => fetchUserData(userId));
}

function UserProfile({ userId }) {
  const { data, isLoading, error } = useUserData(userId);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}
