import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createEvent } from "../../../api/event";
import { departmentOptions, tagOptions } from "../../../assets/options";
import {
  RHFDatePicker,
  RHFMultiSelect,
  RHFQuill,
  RHFSwitch,
  RHFTextField,
} from "../../../components/hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as yup from "yup";
import RHFUploadWrapper from "./RHFUploadWrapper";
import { useDialogs } from "@toolpad/core";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import dayjs from "dayjs";

const validationSchema = yup.object().shape({
  title: yup.string().required("กรุณากรอกชื่อกิจกรรม"),
  start_date: yup.date().required("กรุณาเลือกวันเริ่มต้น"),
  end_date: yup.date().required("กรุณาเลือกวันสิ้นสุด"),
  location: yup.string().required("กรุณากรอกสถานที่จัดกิจกรรม"),
  faculties: yup
    .array()
    .min(1, "กรุณาเลือกคณะของผู้ร่วมอย่างน้อย 1 คณะ")
    .max(3, "เลือกคณะของผู้ร่วมได้สูงสุด 3 คณะ"),
  tags: yup
    .array()
    .min(1, "กรุณาเลือกประเภทกิจกรรมอย่างน้อย 1 ประเภท")
    .max(3, "เลือกประเภทกิจกรรมได้สูงสุด 3 ประเภท"),
  email: yup.string().email("กรุณากรอกอีเมลที่ถูกต้อง"),
  phone: yup.string(),
  other_contact: yup.string(),
});

const EventCreateEditPage = () => {
  const navigate = useNavigate();
  const method = useForm({ resolver: yupResolver(validationSchema) });
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = method;
  const [isLoading, setIsLoading] = useState(false);
  const dialogs = useDialogs();
  const { user } = useAuth();

  console.log("user", user);

  const onHandleSubmit = async (data, status) => {
    console.log("onHandleSubmit", data);

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", data?.title ?? "");
      formData.append("detail", data?.detail ?? "");
      // formData.append("tags", data.tags);
      data.tags.forEach((tag) => {
        formData.append("tags", tag);
      });

      formData.append("start_date", data?.start_date ?? "");

      formData.append("end_date", data?.end_date ?? "");

      formData.append("location", data?.location ?? "");
      // formData.append("faculties", data.faculties);
      data.faculties.forEach((faculty) => {
        formData.append("faculties", faculty);
      });

      data.uploadImages.forEach((image) => {
        formData.append("images", image.file);
      });
      formData.append("email", data?.email ?? "");
      formData.append("phone", data?.phone ?? "");
      formData.append("other_contact", data?.other_contact ?? "");
      formData.append("status", status);
      formData.append("is_from_corp", !!data?.is_from_corp);
      formData.append("createdBy", user._id);

      const response = await createEvent(formData);

      toast.success("บันทึกสำเร็จ!");

      if (status === "publish") {
        await dialogs.open(SuccessDialog, {
          id: response.data.id,
        });
      }
    } catch (error) {
      console.warn("error", error);

      toast.error("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setIsLoading(false);
    }
  };

  const displayForm = (
    <Stack spacing={2}>
      <RHFTextField name="title" label="ชื่อกิจกรรม" />
      <RHFQuill name="detail" label="รายละเอียดกิจกรรม" />
      <RHFMultiSelect
        options={tagOptions}
        name="tags"
        chip
        label="ประเภทกิจกรรม"
      />
      <Box display="flex" alignItems="center" gap={2}>
        <RHFDatePicker
          name="start_date"
          label="วันเริ่มต้น"
          datePickerProps={{
            minDateTime: dayjs(),
            maxDateTime: watch("end_date") ?? null,
          }}
        />
        <RHFDatePicker
          name="end_date"
          label="วันสิ้นสุด"
          datePickerProps={{
            minDateTime: watch("start_date") ?? dayjs(),
          }}
        />
      </Box>
      <RHFTextField name="location" label="สถานที่จัดกิจกรรม" />
      <RHFMultiSelect
        options={departmentOptions}
        name="faculties"
        chip
        label="คณะของผู้ร่วม"
      />

      <RHFSwitch name="is_from_corp" label="จัดโดยหน่วยงาน / คณะ" />
    </Stack>
  );

  const dispkayForm2 = (
    <Stack spacing={2}>
      <RHFUploadWrapper />

      <RHFTextField name="email" label="อีเมลติดต่อ" />
      <RHFTextField name="phone" label="เบอร์ติดต่อ" />
      <RHFTextField name="other_contact" label="ช่องทางติดต่ออื่น ๆ" />
    </Stack>
  );

  const SuccessDialog = ({ open, onClose, payload }) => {
    return (
      <Dialog
        open={open}
        onClose={() => {
          onClose();
          navigate("/");
        }}
      >
        <DialogTitle>สร้างกิจกรรมสำเร็จ</DialogTitle>

        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              navigate("/");
              onClose();
            }}
          >
            ไปหน้าแรก
          </Button>
          <Button
            color="primary"
            onClick={() => {
              navigate(`/event/${payload.id}`);
              onClose();
            }}
          >
            ไปหน้ากิจกรรม
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography>ข้อมูลกิจกรรม</Typography>

      <FormProvider {...method}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 2,
          }}
        >
          <Box>{displayForm}</Box>
          <Box>{dispkayForm2}</Box>
        </Box>

        <Stack direction="row" gap={2} justifyContent="end" alignItems="center">
          <Button variant="outlined" color="error">
            ยกเลิก
          </Button>
          {/* <Button
            variant="contained"
            color="info"
            disabled={isLoading}
            onClick={async () => {
              const data = getValues();

              await onHandleSubmit(data, "draft");
            }}
          >
            บันทึกฉบับร่าง
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit((ev) => onHandleSubmit(ev, "publish"))}
            disabled={isLoading}
          >
            ต่อไป
          </Button>
        </Stack>
      </FormProvider>
    </Paper>
  );
};

export default EventCreateEditPage;
