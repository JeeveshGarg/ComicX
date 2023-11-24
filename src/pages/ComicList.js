import Navbar from "../components/common/Navbar";
import { Grid, Input, Stack, Typography } from "@mui/joy";
import getAllItems from "../lib/apis/getAllItems";
import { useEffect, useState } from "react";
import ItemCard from "../components/dashboard/ItemCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const ComicList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getAllItems();
        console.log(res);
        setItems(res ?? []);
      } catch (err) {
        toast.error("Sorry! Unable to fetch comics");
      }
    };

    fetchItems();
  }, []);
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.description.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.authorName?.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <>
      <Navbar />
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        gap={3}
        m={3}
      >
        <Typography level="h3">All Comics</Typography>
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          size="small"
          variant="outlined"
          value={searchInput}
          onChange={handleSearchChange}
        />
      </Stack>
      <Grid container spacing={3} mx={2}>
        {filteredItems.map((item) => (
          <Grid
            xs={12}
            md={3}
            key={item.id}
            sx={{
              maxWidth: 400,
            }}
          >
            <ItemCard item={item} page={"allItems"} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ComicList;
