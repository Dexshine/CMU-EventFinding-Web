import { Avatar, MenuItem, MenuList } from "@mui/material";
import Popover from "@mui/material/Popover";

import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import InterestingList from "./interesting-list";
import { useState } from "react";

export default function BasicPopover() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <InterestingList dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />

      <Avatar
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        src={user?.picture}
        sx={{
          width: "70px",
          height: "70px",
          cursor: "pointer",
        }}
      >
        {user?.name}
      </Avatar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableScrollLock={true} // Add this line to prevent scrollbar from disappearing
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              setDialogOpen(true);
              handleClose();
            }}
          >
            ตั้งค่าประเภทกิจกรรมที่สนใจ
          </MenuItem>
          <MenuItem
            onClick={() => {
              logout();
              toast.success("ออกจากระบบเรียบร้อยแล้ว");
              handleClose();
            }}
          >
            ออกจากระบบ
          </MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
}
