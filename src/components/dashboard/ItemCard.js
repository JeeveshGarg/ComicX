import React from "react";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/joy";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import truncate from "lodash/truncate";

const ItemCard = ({ item, page }) => {
  const { title, author, authorName, description, id, shareToken } = item;

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };
  const handleView = () => {
    window.open(
      `${window.location.origin}/view/${shareToken}`,
      "_blank",
      "noopener noreferrer"
    );
  };

  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{
        borderRadius: "4px",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardContent>
        <Typography level="title-lg" mr="auto">
          {truncate(title)}
        </Typography>
        <Typography level="body-md">
          {truncate(description, {
            length: 140,
          })}
        </Typography>
        {page === "allItems" && (
          <Typography level="body-sm">by {authorName}</Typography>
        )}
      </CardContent>
      <CardActions>
        <Button variant="soft" size="sm" onClick={handleView}>
          Preview
        </Button>
        {page !== "allItems" && (
          <Button
            variant="outlined"
            endDecorator={<MdEdit />}
            size="sm"
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ItemCard;
