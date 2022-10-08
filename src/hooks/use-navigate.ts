import { useNavigate } from "react-router-dom";

const useNavigation = ({ page }: { page: string }) => {
  const navigate = useNavigate();

  const doNavigate = async () => {
    navigate(page);
  };
  return { doNavigate };
};

export default useNavigation;
