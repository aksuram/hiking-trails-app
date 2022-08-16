import { Form, Formik, FormikHelpers } from "formik";
import jwt_decode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

import LoginIcon from "@mui/icons-material/Login";
import { Alert, Button, Card, Typography } from "@mui/material";

import { UserContext } from "../Components/Auth/UserContext";
import CardBottomRightLink from "../Components/Shared/CardBottomRightLink";
import TextFieldWithErrors from "../Components/Shared/TextFieldWithErrors";
import { FieldErrorList } from "../Interfaces/FieldError";
import { API_URL, UNKNOWN_ERROR_MESSAGE } from "../Utilities/config";

interface FormStructure {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Įveskite el. pašto adresą")
    .email("Įveskite el. pašto adresą"),
  password: yup.string().required("Įveskite slaptažodį"),
});

//TODO: Doesn't seem to work properly if the url is entered directly in the browser
const LoginPage = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userInfo !== null) {
      navigate("/", { replace: true, state: { from: location } });
    }
  }, []);

  const handleSubmit = async (
    values: FormStructure,
    formikHelpers: FormikHelpers<FormStructure>
  ) => {
    setAlertMessage(null);
    location.state = null;

    try {
      const response = await fetch(`${API_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        const { token } = (await response.json()) as { token: string };
        const tokenData: any = jwt_decode(token);
        let avatar = tokenData.avatar as string | null;
        if (avatar === "") avatar = null;

        setUserInfo({
          id: tokenData.id as string,
          email: tokenData.email as string,
          role: tokenData.role as string,
          firstName: tokenData.firstName as string,
          lastName: tokenData.lastName as string,
          fullName: tokenData.fullName as string,
          avatar: avatar,
          token: token,
        });

        navigate("/");
        return;
      }

      if (response.status === 400) {
        const { errors } = (await response.json()) as FieldErrorList;
        errors.forEach((x) => formikHelpers.setFieldError(x.field, x.error));
        return;
      }

      if (response.status === 401 || response.status === 403) {
        const { errors } = (await response.json()) as FieldErrorList;
        setAlertMessage(errors[0].error);
        return;
      }

      setAlertMessage(UNKNOWN_ERROR_MESSAGE);
    } catch (error) {
      setAlertMessage(UNKNOWN_ERROR_MESSAGE);
    }
  };

  const initialValues: FormStructure = { email: "", password: "" };

  return (
    <Card sx={{ padding: 3, maxWidth: "400px", minWidth: "400px", mt: 8 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
        Prisijungimas
      </Typography>

      {location.state && (
        <Alert sx={{ mt: 4 }}>{location.state as string}</Alert>
      )}

      {alertMessage && (
        <Alert severity="error" sx={{ mt: 4 }}>
          {alertMessage}
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextFieldWithErrors
              name="email"
              label="El. paštas"
              sx={{ mt: 4 }}
            />
            <TextFieldWithErrors
              name="password"
              type="password"
              label="Slaptažodis"
              sx={{ mt: 2 }}
            />

            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <Button
                size="large"
                variant="contained"
                endIcon={<LoginIcon />}
                disabled={isSubmitting}
                type="submit"
              >
                Prisijungti
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <CardBottomRightLink link="/registration" text="Užsiregistruokite čia" />
      {/* TODO: REMOVE */}
      {/* <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link underline="none" href="/registration">
          Užsiregistruokite čia
        </Link>
      </div> */}
    </Card>
  );
};

export default LoginPage;
