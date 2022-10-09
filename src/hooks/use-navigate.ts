import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const doNavigate = async ({ page }: { page: string }) => {
    navigate(page);
  };
  return { doNavigate };
};

export default useNavigation;
