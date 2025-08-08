"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Editor from "@/components/admin/editor";
import DialogueBox from "@/components/admin/DialogueBox";

// Form style
const formStyle = {
  input: { color: "white" },
  label: { color: "gray" },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
    },
    "&:hover fieldset": {
      borderColor: "lightgray",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
};

// Schema
const schema = z.object({
  title: z.string().min(3),
  category: z.string().min(1),
  date: z.date(),
  body: z.string().min(10),
  attachment: z
    .any()
    .nullable()
    .refine((file) => {
      if (!file) return true;
      const acceptedTypes = ["application/pdf", "image/png", "image/jpeg"];
      return acceptedTypes.includes(file.type);
    }, "Only image or PDF allowed"),
});

type FormValues = z.infer<typeof schema>;

// Page Component
export default function CreateNoticePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmProgress, setConfirmProgress] = useState(false);
  const searchParams = useSearchParams();
  const isEditMode = !!searchParams.get("edit");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      category: "",
      date: new Date(),
      body: "",
      attachment: null,
    },
  });

  const onSubmit = (data: FormValues) => {
    // Pass form data to DialogBox via props or context
    setDialogOpen(true);
  };

  const handleConfirmPublish = async () => {
    setConfirmProgress(true);
    alert("publishing");
    setConfirmProgress(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 2,
        maxWidth: 500,
        mx: "auto",
        mt: 1,
        color: "white",
      }}
    >
      <Typography variant="h5">Publish notice</Typography>
      <Typography variant="body2" mb={1}>
        Fill all the inputs with appropriate content to publish a new notice
      </Typography>

      {/* Title */}
      <TextField
        label="Title"
        fullWidth
        variant="outlined"
        margin="normal"
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{ ...formStyle }}
      />

      {/* Category & Date */}
      <Stack direction="row" spacing={2} mt={0.5}>
        <TextField
          label="Category"
          fullWidth
          select
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
          sx={{ ...formStyle }}
          slotProps={{
            select: {
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: "#1b1d21",
                  },
                },
              },
            },
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Highschool">Highschool</MenuItem>
          <MenuItem value="Primary">Primary</MenuItem>
          <MenuItem value="Pre-primary">Pre-Primary</MenuItem>
        </TextField>

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toDate())}
                slotProps={{
                  textField: {
                    label: "Date",
                    fullWidth: true,
                    error: !!errors.date,
                    helperText: errors.date?.message,
                    variant: "outlined",
                    InputLabelProps: {
                      sx: { color: "#fff" },
                    },
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "gray",
                        },
                        "&:hover fieldset": {
                          borderColor: "lightgray",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    },
                  },
                  mobilePaper: {
                    sx: {
                      bgcolor: "#1b1d21",
                      color: "#fff",
                    },
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
      </Stack>

      {/* Body (Lexical Editor) */}
      <Box mt={2}>
        <Typography variant="subtitle1">Body</Typography>
        <Editor
          onChange={(content) => setValue("body", content)}
          initialContent={watch("body")}
        />
        {errors.body && (
          <Typography color="error" variant="caption">
            {errors.body.message}
          </Typography>
        )}
      </Box>

      {/* Attachment */}
      <Box mt={2}>
        <Button variant="outlined" component="label" fullWidth>
          Add attachment
          <input
            type="file"
            hidden
            accept="image/*,application/pdf"
            onChange={(e) =>
              setValue("attachment", e.target.files?.[0] || null)
            }
          />
        </Button>
        {errors.attachment && (
          <Typography color="error" variant="caption">
            {errors.attachment.message}
          </Typography>
        )}
      </Box>

      {/* Buttons */}
      <Stack direction="row" spacing={2} mt={3}>
        <Button fullWidth type="submit" variant="outlined">
          Publish
        </Button>
      </Stack>

      {/* DialogBox for final post */}
      <DialogueBox
        open={dialogOpen}
        title={isEditMode ? "Update Notice?" : "Publish Notice?"}
        content="Are you sure you want to publish this notice? You can’t undo this."
        confirmText="Confirm"
        cancelText="Cancel"
        confirmColor="primary"
        confirmDisabled={false} // we already validated before opening
        confirmProgress={confirmProgress}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmPublish}
      />
    </Box>
  );
}