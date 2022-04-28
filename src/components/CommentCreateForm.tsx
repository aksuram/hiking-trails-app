import { Alert, Avatar, Card, IconButton } from "@mui/material";
import { green } from "@mui/material/colors";
import { Form, Formik, FormikHelpers } from "formik";
import { useContext, useState } from "react";
import { API_URL, DO_NOT_SHOW, IMG_URL } from "../utils/Config";
import { MultilineTextField } from "./TextFieldWithErrors";
import { UserContext } from "./UserContext";
import SendIcon from "@mui/icons-material/Send";
import * as yup from "yup";
import { ErrorList } from "../utils/ErrorInterfaces";
import { Comment } from "./Comment";

interface FormStructure {
  body: string;
}

interface Props {
  setNewComment: React.Dispatch<React.SetStateAction<Comment | null>>;
  postId: string;
  replyToId?: string;
}

const validationSchema = yup.object({
  body: yup
    .string()
    .required(DO_NOT_SHOW)
    .min(1, "Komentaras per trumpas")
    .max(1000, "Komentaras per ilgas"),
});

//TODO: Add ability to upload comment images
const CommentCreateForm = ({ setNewComment, postId, replyToId }: Props) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const userContext = useContext(UserContext);

  const handleSubmit = async (
    values: FormStructure,
    formikHelpers: FormikHelpers<FormStructure>
  ) => {
    setAlertMessage(null);

    try {
      const response = await fetch(`${API_URL}post/${postId}/comment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
        body: JSON.stringify({
          body: values.body,
          replyToId: replyToId === undefined ? null : replyToId,
        }),
      });

      if (response.status === 200) {
        const comment = (await response.json()) as Comment;
        setNewComment(comment);
        return;
      }

      if (response.status === 400) {
        const { errors } = (await response.json()) as ErrorList;
        errors.forEach((x) => formikHelpers.setFieldError(x.field, x.error));
        return;
      }

      setAlertMessage("Įvyko nežinoma klaida");
    } catch (error) {
      setAlertMessage("Įvyko nežinoma klaida");
    }
  };

  const initialValues: FormStructure = { body: "" };

  return (
    <Card
      sx={{
        ml: replyToId !== undefined ? 6 : 0,
        backgroundColor: "#FAFAFA",
        px: 1,
        py: 1,
        mt: 1.5,
      }}
      variant="outlined"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  mr: 1.5,
                  ml: 0.8,
                  width: 35,
                  height: 35,
                  fontSize: "21px",
                  bgcolor: green[500],
                }} //TODO: Get random color depending on username?
                alt={userContext.userInfo?.fullName}
                src={
                  userContext.userInfo?.avatar === null
                    ? undefined
                    : `${IMG_URL}${userContext.userInfo?.avatar}`
                }
              >
                {userContext.userInfo?.fullName[0]}
              </Avatar>
              <MultilineTextField
                name="body"
                placeholder="Įveskite komentarą"
                maxRows={3}
                size="small"
              />
              <IconButton
                sx={{ mr: -0.2, ml: 0.5 }}
                disabled={isSubmitting}
                type="submit"
              >
                <SendIcon sx={{ fontSize: "27px" }} />
              </IconButton>
            </div>
          </Form>
        )}
      </Formik>
      {alertMessage && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {alertMessage}
        </Alert>
      )}
    </Card>
  );
};

export default CommentCreateForm;
