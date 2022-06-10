import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Alert, Box } from "@mui/material";

import { FieldError } from "../Interfaces/FieldError";
import { DetailedUser } from "../Interfaces/User";
import {
  INCORRECT_URL_MESSAGE,
  UNKNOWN_ERROR_MESSAGE
} from "../Utilities/config";
import { shortenedGuidToGuid } from "../Utilities/guidEncoding";

const UserView = () => {
  const [isUnknownError, setIsUnknownError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [user, setUser] = useState<DetailedUser | null>(null);

  const params = useParams();
  const urlUserId = shortenedGuidToGuid(params.userId ?? "");

  useEffect(() => {
    if (urlUserId !== null) {
      //getUser(urlUserId);
    }
  }, []);

  //TODO: If urlUserId is the same as logged in user - redirect to "/profile"
  return (
    <Box>
      {urlUserId === null && (
        <Alert severity="error" sx={{ mt: 4, minWidth: "300px" }}>
          {INCORRECT_URL_MESSAGE}
        </Alert>
      )}

      {isUnknownError && (
        <Alert severity="error" sx={{ mt: 4, minWidth: "300px" }}>
          {UNKNOWN_ERROR_MESSAGE}
        </Alert>
      )}

      {fieldErrors.map((x, i) => (
        <Alert key={i} severity="error" sx={{ mt: 4, minWidth: "300px" }}>
          {x.error}
        </Alert>
      ))}

      {/* TODO: COMPLETE PAGE */}
      {/* {user !== null && <UserElement user={user} />} */}
    </Box>
  );
};

export default UserView;
