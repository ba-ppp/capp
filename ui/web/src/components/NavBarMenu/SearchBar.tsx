import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setSearchText } from "app/slices/global.slice";

export const SearchBar = () => {
  const dispatch = useDispatch();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value.trim()));
  };

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
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search caption"
        onChange={handleChangeText}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
