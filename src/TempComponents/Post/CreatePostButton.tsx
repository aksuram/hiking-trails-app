import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";

const CreatePostButton = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "600px", minWidth: "600px" }}>
      <Fab
        sx={{ float: "right", mb: 2, mr: 1 }}
        variant="extended"
        size="medium"
        color="primary"
        onClick={() => {
          navigate("/post/create");
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Sukurti
      </Fab>
    </div>
  );
};

export default CreatePostButton;
