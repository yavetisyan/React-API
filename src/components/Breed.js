import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Breed() {
  let { breed } = useParams();
	
  const [src, setSrc] = useState("");
  const [selectedSubbreedName, setSelectedSubbreedName] = useState("");

  useEffect(() => {
    const getBreedImageUrl = async () => {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );

      const data = await response.json();
      setSrc(data.message);
    };
    getBreedImageUrl();
  }, [breed]);

  //if (!subBreed) {
  //	const response = await fetch(
  //		`https://dog.ceo/api/breed/${breed}/images/random`
  //	);
  //	data = await response.json();
  //} else {
  //	const response = await fetch(
  //		`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`
  //	);
  //	data = await response.json();
  //}

  return (
    <div>
      this is breed component
      <Card sx={{ maxWidth: 345, height: 300 }}>
        <CardMedia
          component="img"
          height="200"
          image={src}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {breed}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {selectedSubbreedName}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
