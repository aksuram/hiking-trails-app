import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Alert, Button, Card, Link, Typography } from "@mui/material";

import MultilineTextField from "../Components/Shared/MultilineTextField";
import TextFieldWithErrors from "../Components/Shared/TextFieldWithErrors";
import { FieldErrorList } from "../Interfaces/FieldError";
import { API_URL } from "../Utilities/config";
import { guidToShortenedGuid } from "../Utilities/guidEncoding";

interface FormStructure {
  title: string;
  body: string;
}

const validationSchema = yup.object({
  title: yup
    .string()
    .required("Įveskite įrašo pavadinimą")
    .min(1, "Įrašo pavadinimas per trumpas")
    .max(200, "Įrašo pavadinimas per ilgas"),
  body: yup
    .string()
    .required("Įrašas negali būti tuščias")
    .min(1, "Įrašas per trumpas")
    .max(5000, "Įrašas per ilgas"),
});

const PostCreateForm = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (
    values: FormStructure,
    formikHelpers: FormikHelpers<FormStructure>
  ) => {
    setAlertMessage(null);

    try {
      const response = await fetch(`${API_URL}post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
        body: JSON.stringify(values),
      });

      if (response.status === 201) {
        const { id } = (await response.json()) as any;
        console.log(id);
        console.log(guidToShortenedGuid(id));
        console.log(guidToShortenedGuid(id as string));
        navigate(`/post/${guidToShortenedGuid(id)}`);
        return;
      }

      if (response.status === 400) {
        const { errors } = (await response.json()) as FieldErrorList;
        errors.forEach((x) => formikHelpers.setFieldError(x.field, x.error));
        return;
      }

      setAlertMessage("Įvyko nežinoma klaida");
    } catch (error) {
      setAlertMessage("Įvyko nežinoma klaida");
    }
  };

  const initialValues: FormStructure = { title: "", body: "" };

  return (
    <Card sx={{ padding: 3, maxWidth: "600px", minWidth: "600px", mt: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
        Įrašo kūrimas
      </Typography>

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
              name="title"
              label="Pavadinimas"
              sx={{ mt: 4 }}
            />

            <MultilineTextField
              name="body"
              label="Tekstas"
              sx={{ mt: 2 }}
              minRows={5}
              maxRows={10}
            />

            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <Button
                size="large"
                variant="contained"
                disabled={isSubmitting}
                type="submit"
              >
                Sukurti
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
        <Link underline="none" href="/posts">
          Sugrįžti į įrašų sąrašą
        </Link>
      </div>
    </Card>
  );
};

export default PostCreateForm;
