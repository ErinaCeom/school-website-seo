"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Stack,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { supabaseBrowser } from "@/lib/supabaseBrowserClient";

//components
import DialogueBox from "@/components/admin/DialogueBox";

//icons
import CloseIcon from "@mui/icons-material/Close";

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
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmProgress, setConfirmProgress] = useState(false);
  const router = useRouter();

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
    setFormData(data);
    setDialogOpen(true);
  };

  const handleConfirmPublish = async () => {
    setConfirmProgress(true);

    try {
      const file = formData?.attachment;
      let attachmentUrl: string | null = null;

      if (file && file != null) {
        const fileName = `${file.type.startsWith("image/") ? "images/" : "pdfs/"}${file.name}`;

        const { error: uploadError } = await supabaseBrowser.storage
          .from("attachments")
          .upload(fileName, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data } = supabaseBrowser.storage
          .from("attachments")
          .getPublicUrl(fileName);

        attachmentUrl = data.publicUrl;
      }

      // Inserting the notice,this will be moved to api later
      const { data: insertedData, error: insertError } = await supabaseBrowser
        .from("Notice")
        .insert({
          title: formData?.title,
          desc: formData?.body,
          date: formData?.date,
          category: formData?.category,
          fileUrl: attachmentUrl,
          fileType:
            (file && (file.type.startsWith("image/") ? "IMAGE" : "PDF")) ||
            null,
        })
        .select("id")
        .single();

      if (insertError) throw insertError;

      const insertedId = insertedData.id;
      fetch("/api/reload-cache", { method: "GET", credentials: "include" });
      router.push(`/notice/${insertedId}`);
    } catch {
      alert("Something went wrong");
    } finally {
      setConfirmProgress(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 2,
        maxWidth: 500,
        mx: "auto",
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
          <MenuItem value="primary">Primary</MenuItem>
          <MenuItem value="pre-primary">Pre-Primary</MenuItem>
          <MenuItem value="college">College</MenuItem>
        </TextField>

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                label="Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toDate())}
                enableAccessibleFieldDOMStructure={false}
                slots={{
                  textField: TextField,
                }}
                slotProps={{
                  textField: {
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "gray",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                    },
                  },
                  mobilePaper: {
                    sx: {
                      bgcolor: "#1b1d21",
                      color: "#fff",
                      ".MuiPickersToolbar-root": {
                        color: "#fff",
                      },
                      ".MuiDayCalendar-weekDayLabel": {
                        color: "#fff",
                      },
                      "& .MuiPickersCalendarHeader-switchViewButton": {
                        color: "#fff",
                      },
                    },
                  },
                  openPickerButton: {
                    sx: {
                      color: "#fff",
                      border: 0,
                      p: 0,
                      pr: 1,
                    },
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
      </Stack>

      {/* Body  */}
      <Box mt={2}>
        <Typography variant="subtitle1">Body</Typography>

        <Controller
          name="body"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              minRows={6}
              maxRows={10}
              fullWidth
              variant="outlined"
              placeholder="Enter the notice body here..."
              error={!!errors.body}
              helperText={errors.body?.message}
              sx={{
                ...formStyle,
                textarea: {
                  color: "white",
                  fontSize: 10,
                  minHeight: "40px",
                  maxHeight: "220px",
                },
              }}
            />
          )}
        />
      </Box>

      {/* Attachment */}
      <Box mt={1}>
        {!watch("attachment") && (
          <Button variant="outlined" component="label" fullWidth>
            Add attachment
            <input
              type="file"
              hidden
              accept="image/*,application/pdf"
              onChange={(e) =>
                setValue("attachment", e.target.files?.[0] || null, {
                  shouldValidate: true,
                })
              }
            />
          </Button>
        )}
        {watch("attachment") && (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{
              p: 0.5,
              border: 1,
              borderColor: "gray",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" noWrap>
              {watch("attachment")?.name} (
              {(watch("attachment")!.size / 1024).toFixed(1)} KB)
            </Typography>
            <IconButton
              size="small"
              onClick={() => setValue("attachment", null)}
              color="error"
              sx={{ ml: "auto" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
        {errors.attachment && (
          <Typography color="error" variant="caption">
            errors.attachment.message
          </Typography>
        )}
      </Box>

      {/* Publish Button */}
      <Stack direction="row" spacing={0} mt={1}>
        <Button fullWidth type="submit" variant="contained">
          Publish
        </Button>
      </Stack>

      {/* DialogBox for final post */}
      <DialogueBox
        open={dialogOpen}
        title="Publish Notice?"
        content="Are you sure you want to publish this notice? You can’t undo this."
        confirmText="Confirm"
        cancelText="Cancel"
        confirmColor="primary"
        confirmDisabled={false}
        confirmProgress={confirmProgress}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmPublish}
      />
    </Box>
  );
}
