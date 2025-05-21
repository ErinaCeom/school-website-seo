import React from "react";
import { Card, CardMedia, Typography, IconButton, Box } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  onAddToCart,
}) => {
  return (
    <Card
      sx={{
        position: "relative",
        width: 250,
        height: 300,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        m:2
      }}
    >
      {/* Background Image */}
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Overlay Content */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(180deg,rgba(42, 123, 155, 0) 0%, rgba(5, 5, 5, 0.7) 100%)",
          color: "#fff",
          px: 2,
          py: 1.5,
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2">${price.toFixed(2)}</Typography>
        </Box>
        <IconButton
          variant="contained"
          size="small"
          onClick={onAddToCart}
          sx={{
            color: "white",
            textTransform: "none",
            p: 2,
            boxShadow: "none",
          }}
        >
          <AddShoppingCartIcon fontSize="medium" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ProductCard;
