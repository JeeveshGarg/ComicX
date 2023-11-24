import Navbar from "../components/common/Navbar";
import { Button } from "@mui/joy";
import { AiOutlinePlus } from "react-icons/ai";
import { Grid, Stack, Typography } from "@mui/joy";
import getItems from "../lib/apis/getItems";
import { useEffect, useState } from "react";
import ItemCard from "../components/dashboard/ItemCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import createNewItem from "../lib/apis/createNewItem";

const HomePage = () => {
  const navigate = useNavigate();
  const handleCreateComic = async () => {
    try {
      const id = await createNewItem();
      navigate(`/edit/${id}`);
    } catch (err) {
      toast.error("Error creating new comic");
    }
  };
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getItems();
        console.log("hh");
        console.log(res);
        setItems(res ?? []);
      } catch (err) {
        toast.error("Sorry! Unable to fetch comics");
      }
    };

    fetchItems();
  }, []);
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
        <Typography level="h3">My Dashboard</Typography>
        <Button
          onClick={handleCreateComic}
          variant="outlined"
          startDecorator={<AiOutlinePlus />}
        >
          Create New Comic
        </Button>
      </Stack>
      <Grid container spacing={3} mx={2}>
        {items.map((item) => (
          <Grid
            xs={12}
            md={3}
            key={item.id}
            sx={{
              maxWidth: 400,
            }}
          >
            <ItemCard item={item} page={"myItems"} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
