import { Form, Formik, FormikHelpers } from "formik";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

import AddAPhotoIcon from "@mui/icons-material/AddAPhotoOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  IconButton,
  Typography
} from "@mui/material";

import { UserContext } from "../Components/Auth/UserContext";
import CardBottomRightLink from "../Components/Shared/CardBottomRightLink";
import TextFieldWithErrors from "../Components/Shared/TextFieldWithErrors";
import { AvatarInput } from "../Components/User/AvatarInput";
import { FieldErrorList } from "../Interfaces/FieldError";
import { API_URL, CAPITALIZED_ALPHA_REGEX } from "../Utilities/config";

interface FormStructure {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  avatar: any;
}

interface ResizedImage {
  file: File;
  fileString: string;
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
      CAPITALIZED_ALPHA_REGEX,
      "Vardas prasideda didžiąja raide, varde galimos tik raidės"
    ),
  lastName: yup
    .string()
    .required("Įveskite pavardę")
    .matches(
      CAPITALIZED_ALPHA_REGEX,
      "Pavardė prasideda didžiąja raide, pavardėje galimos tik raidės"
    ),
  avatar: yup
    .mixed()
    .test(
      "fileSize",
      "Pasirinkta per didelė nuotrauka, neviršykite 10 MB",
      (file) => {
        if (file === null) return true;
        return file.size <= 10000000; //10MB
      }
    ),
});

const Registration = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<ResizedImage | null>(null);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userInfo !== null) {
      navigate("/", { replace: true, state: { from: location } });
    }
  }, []);

  const resizeImage = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (onloadEvent) => {
      const image = new Image();
      image.src = onloadEvent.target?.result as string;
      image.onload = () => {
        const canvas = document.createElement("canvas") as HTMLCanvasElement;
        canvas.width = 100;
        canvas.height = 100;
        canvas.getContext("2d")?.drawImage(image, 0, 0, 100, 100);
        const newFileString = canvas.toDataURL("image/jpeg", 1);
        canvas.toBlob(
          (blob) => {
            if (blob === null) return;
            const newFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            setAvatarImage({
              file: newFile,
              fileString: newFileString,
            });
          },
          "image/jpeg",
          1
        );
      };
    };
  };

  const handleSubmit = async (
    values: FormStructure,
    formikHelpers: FormikHelpers<FormStructure>
  ) => {
    setAlertMessage(null);

    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("repeatPassword", values.repeatPassword);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      if (avatarImage !== null) {
        formData.append("avatar", avatarImage.file);
      }

      const response = await fetch(`${API_URL}register`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        navigate("/login", {
          state: "Sėkmingai užsiregistravote! Jau galite prisijungti",
        });
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

  const initialValues: FormStructure = {
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    avatar: null,
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
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Badge
                sx={{ mt: 3 }}
                anchorOrigin={{
                  vertical: avatarImage ? "top" : "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <div>
                    {!avatarImage && (
                      <label>
                        <AvatarInput
                          name="avatar"
                          accept="image/*"
                          type="file"
                          onChange={(e) => {
                            if (e?.currentTarget?.files !== null) {
                              if (!e.currentTarget.files.length) return;
                              resizeImage(e.currentTarget.files[0]);
                              setFieldValue("avatar", e.currentTarget.files[0]);
                            }
                          }}
                        />
                        <IconButton
                          aria-label="upload photo"
                          color="primary"
                          component="span"
                        >
                          <AddAPhotoIcon />
                        </IconButton>
                      </label>
                    )}
                    {avatarImage && (
                      <IconButton
                        onClick={() => {
                          setAvatarImage(null);
                          setFieldValue("avatar", null);
                        }}
                        aria-label="remove photo"
                        color="error"
                        component="span"
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                  </div>
                }
              >
                <Avatar
                  sx={{ width: 70, height: 70 }}
                  src={avatarImage?.fileString}
                />
              </Badge>
            </div>
            {errors.avatar ? (
              <Alert severity="error" sx={{ mt: 3, mb: -1 }}>
                {errors.avatar}
              </Alert>
            ) : null}

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
          </Form>
        )}
      </Formik>

      <CardBottomRightLink link="/login" text="Prisijunkite čia" />
      {/* TODO: REMOVE */}
      {/* <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link underline="none" href="/login">
          Prisijunkite čia
        </Link>
      </div> */}
    </Card>
  );
};

export default Registration;
