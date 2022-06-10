import { Link } from "@mui/material";

interface Props {
  link: string;
  text: string;
}

const CardBottomRightLink = ({ link, text }: Props) => {
  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Link underline="none" href={link}>
        {text}
      </Link>
    </div>
  );
};

export default CardBottomRightLink;
