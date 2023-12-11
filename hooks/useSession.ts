import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
  const { data } = useSWR("/api/session", fetcher);

  return {
    data,
  };
};

export default useCurrentUser;
