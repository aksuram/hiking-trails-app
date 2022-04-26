import { Alert, Button, Card, Link, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Form, Formik, FormikHelpers } from "formik";
import TextFieldWithErrors from "./TextFieldWithErrors";
import * as yup from "yup";
import { API_URL } from "../utils/Config";
import { useContext, useState } from "react";
import { ErrorList } from "../utils/ErrorInterfaces";
import { UserContext } from "./UserContext";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

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

//TODO: Redirect if already loggedin
const Login = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

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
        setUserInfo({
          id: tokenData.id as string,
          email: tokenData.email as string,
          role: tokenData.role as string,
          firstName: tokenData.firstName as string,
          lastName: tokenData.lastName as string,
          fullName: tokenData.fullName as string,
          token: token,
        });
        navigate("/");
        return;
      }

      if (response.status === 400) {
        const { errors } = (await response.json()) as ErrorList;
        errors.forEach((x) => formikHelpers.setFieldError(x.field, x.error));
        return;
      }

      if (response.status === 401 || response.status === 403) {
        const { errors } = (await response.json()) as ErrorList;
        setAlertMessage(errors[0].error);
        return;
      }

      setAlertMessage("Įvyko nežinoma klaida");
    } catch (error) {
      setAlertMessage("Įvyko nežinoma klaida");
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

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link underline="none" href="/registration">
          Užsiregistruokite čia
        </Link>
      </div>
    </Card>
  );
};

export default Login;
