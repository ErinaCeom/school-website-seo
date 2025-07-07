// components/CategoryFilter.tsx
"use client";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const categories = ["all", "college", "highschool", "primary", "pre-primary"];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("category") || "all";

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="category-select-label" sx={{ color: "white" }}>
        Category
      </InputLabel>
      <Select
        labelId="category-select-label"
        value={current}
        label="Category"
        onChange={handleChange}
        sx={{
          color: "white",
          bgcolor: "transparent",
          borderRadius: 2,
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "lightgray",
          },
          ".MuiSvgIcon-root": {
            color: "white",
          },
          p: 0.2,
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: "black",
              border: 1,
              borderRadius: 2,
              mt: 1,
              color: "white",
              "& .MuiMenuItem-root": {
                "&.Mui-selected": {
                  color: "dodgerblue",
                },
                "&.Mui-selected:hover": {
                  bgcolor: "#555",
                },
                "&.MuiMenuItem-divider": {
                  borderColor: "white",
                },
                "&:hover": {
                  bgcolor: "#303030",
                  color: "white",
                },
              },
            },
          },
        }}
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
