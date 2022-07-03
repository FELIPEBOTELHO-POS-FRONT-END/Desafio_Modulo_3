import {
  Avatar,
  Box,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
} from "@mui/material";
import { memo, useState } from "react";
import { useAuthContext } from "../Contexts/authContext";
import { signOutEndpoint } from "../Service/apiService";

const boxStyle: SxProps = {
  borderBottom: "1px solid rgb(224,224,224)",
  padding: "16px",
  marginBottom: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& > *": {
    marginBottom: "8px",
  },
};
export const UserMenu = memo(function () {
  const { user, onSignOut } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    signOutEndpoint();
    onSignOut();
  }

  return (
    <div>
      <IconButton
        aria-label="Usuário"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box sx={boxStyle}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.nome}</div>
          <small>{user.email}</small>
        </Box>
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
});
