import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import TagCard from "./TagCard";
import { LoadingButton } from "@mui/lab";
import { updateProfile } from "../../api/user";
import toast from "react-hot-toast";
import { tagOptions } from "../../assets/options";
import { useNavigate } from "react-router-dom";

const lists = tagOptions;

const InterestingList = ({ dialogOpen = false, setDialogOpen = () => {} }) => {
  const { user, updateUser } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  // const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (user && !user?.interests?.length) {
      setDialogOpen(true);
    }
  }, [user]);

  const handleSelectTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((item) => item !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = async () => {
    try {
      const data = {
        interests: selectedTags,
      };

      const response = await updateProfile(user._id, data);

      updateUser(response.data);

      toast.success("บันทึกสำเร็จ");

      setDialogOpen(false);

      navigate(0);
    } catch (error) {
      console.warn(error);
    }
  };

  const displayContent = (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {lists.map((list) => (
        <Box
          key={list.label}
          onClick={() => handleSelectTag(list.label)}
          sx={{
            position: "relative",
            cursor: "pointer",
            borderColor: theme.palette.primary.main,
            borderWidth: selectedTags.includes(list.label) ? 2 : 1,
            borderStyle: "solid",
            borderRadius: theme.shape.borderRadius,
            overflow: "hidden",
            "&:hover": {
              scale: 1.01,
            },
          }}
        >
          {selectedTags.includes(list.label) && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,

                padding: "4px",
                fontSize: "10px",
                borderRadius: "0 0 0 8px",
              }}
            >
              ลำดับที่ {selectedTags.findIndex((el) => el === list.label) + 1}
            </Box>
          )}
          <TagCard title={list.label} imageSrc={list.image} />
        </Box>
      ))}
    </Box>
  );

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      maxWidth="lg"
    >
      <DialogTitle>เลือกประเภทกิจกรรมที่สนใจ</DialogTitle>
      <DialogContent>
        <Box p={1}>{displayContent}</Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <LoadingButton
          variant="contained"
          disabled={selectedTags.length < 3}
          onClick={handleSave}
        >
          บันทึก
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default InterestingList;
