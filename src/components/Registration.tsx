import {
  Alert,
  Avatar,
  Button,
  Card,
  Divider,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldWithErrors from "./TextFieldWithErrors";
import * as yup from "yup";
import { capitalizedAlphaRegex } from "../utils/Random";

interface FormStructure {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Įveskite el. pašto adresą")
    .min(5, "Negalimas el. paštas trumpesnis už 5 simbolius")
    .max(1000, "Negalimas el. paštas ilgesnis už 1000 simbolių")
    .email("Įveskite el. pašto adresą"),
  //TODO: check that password contains at least one lowercase, uppercase letter and a number
  //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  password: yup
    .string()
    .required("Įveskite slaptažodį")
    .min(8, "Slaptažodis negali būti trumpesnis už 8 simbolius"),
  repeatPassword: yup
    .string()
    .required("Pakartokite slaptažodį")
    .oneOf([yup.ref("password"), null], "Slaptažodžiai turi sutapti"),
  firstName: yup
    .string()
    .required("Įveskite vardą")
    .matches(
      capitalizedAlphaRegex,
      "Vardas prasideda didžiąja raide, varde galimos tik raidės"
    ),
  lastName: yup
    .string()
    .required("Įveskite pavardę")
    .matches(
      capitalizedAlphaRegex,
      "Pavardė prasideda didžiąja raide, pavardėje galimos tik raidės"
    ),
});

//TODO: Redirect if loggedin
const Registration = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  //TODO: handle submit function

  const initialValues: FormStructure = {
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
  };

  return (
    <Card sx={{ padding: 3, maxWidth: "600px", minWidth: "600px", mt: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
        Registracija
      </Typography>

      {alertMessage && (
        <Alert severity="error" sx={{ mt: 4 }}>
          {alertMessage}
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          return;
        }}
        // onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Avatar sx={{ mt: 3, width: 70, height: 70 }}></Avatar>
            </div>

            <div
              style={{
                marginTop: 15,
                display: "grid",
                gridTemplateColumns: "50% 50%",
              }}
            >
              <div style={{ gridColumn: "1 / 2" }}>
                <TextFieldWithErrors
                  name="firstName"
                  label="Vardas"
                  sx={{ mt: 2, pr: 1 }}
                />
              </div>
              <div style={{ gridColumn: "2 / 3" }}>
                <TextFieldWithErrors
                  name="lastName"
                  label="Pavardė"
                  sx={{ mt: 2 }}
                />
              </div>
            </div>

            <Divider sx={{ mt: 3, mb: 1 }} />

            <TextFieldWithErrors
              name="email"
              label="El. paštas"
              sx={{ mt: 2 }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "50% 50%",
              }}
            >
              <div style={{ gridColumn: "1 / 2" }}>
                <TextFieldWithErrors
                  name="password"
                  type="password"
                  label="Slaptažodis"
                  sx={{ mt: 2, pr: 1 }}
                />
              </div>
              <div style={{ gridColumn: "2 / 3" }}>
                <TextFieldWithErrors
                  name="repeatPassword"
                  type="password"
                  label="Pakartokite slaptažodį"
                  sx={{ mt: 2 }}
                />
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <Button
                size="large"
                variant="contained"
                disabled={isSubmitting}
                type="submit"
              >
                Registruotis
              </Button>
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Registration;
