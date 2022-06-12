import { UNKNOWN_ERROR_MESSAGE } from "../../Utilities/config";
import CustomErrorMessage from "./CustomErrorMessage";

interface Props {
  isUnknownError: boolean;
}

const UnknownErrorMessage = ({ isUnknownError }: Props) => {
  if (isUnknownError) {
    return <CustomErrorMessage errorMessage={UNKNOWN_ERROR_MESSAGE} />;
  }
  return <></>;
};

export default UnknownErrorMessage;
