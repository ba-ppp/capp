import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "app/slices/global.slice";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value.trim()));
  }
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      }}
    >
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search caption" onChange={handleOnChange} />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
