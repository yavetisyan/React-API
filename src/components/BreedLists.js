import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import React, { useEffect, useState } from "react";
import "./BreedList.css";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

function BreedList() {
  const [breedlist, setBreedlist] = useState([]);
  const [src, setSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBreedName, setSelectedBreedName] = useState("");
  const [selectedSubbreedName, setSelectedSubbreedName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isOpenData, setIsOpenData] = useState({});

  const getBreeds = async () => {
    const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
    const data = await response.json();
    setBreedlist(data.message);
    setIsLoading(false);
  };

  useEffect(() => {
    getBreeds();
  }, []);

  const onItemClick = (breed) => {
    setIsOpenData({
      ...isOpenData,
      [breed]: !isOpenData[breed],
    });
  };

  const imgSrc = async (breed, subBreed) => {
    let data;
    if (!subBreed) {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );
      data = await response.json();
    } else {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`
      );
      data = await response.json();
    }

    setSrc(data.message);
    setSelectedBreedName(breed);
    setSelectedSubbreedName(subBreed);
  };

  const breedListArr = Object.keys(breedlist);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <TextField
        margin="dense"
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        value={searchText}
      />
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <ul>
          <List
            sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}
          >
            {breedListArr
              .filter((breed) => breed.includes(searchText))
              .map((breed) => {
                const subBreedArr = breedlist[breed];
                return (
                  <React.Fragment key={breed}>
                    <ListItemButton
                      style={{
                        cursor: "pointer",
                        margin: 10,
                        color: subBreedArr.length ? "red" : null,
                      }}
                    >
                      <ListItemText
                        primary={breed}
                        onClick={() => imgSrc(breed)}
                      />

                      {!!subBreedArr.length &&
                        (isOpenData[breed] ? (
                          <ExpandLess
                            onClick={() => {
                              onItemClick(breed);
                            }}
                          />
                        ) : (
                          <ExpandMore
                            onClick={() => {
                              onItemClick(breed);
                            }}
                          />
                        ))}
                    </ListItemButton>

                    {subBreedArr.length ? (
                      <Collapse
                        in={isOpenData[breed]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {subBreedArr.map((subBreed) => {
                            return (
                              <ListItemButton
                                onClick={() => imgSrc(breed, subBreed)}
                                key={subBreed}
                                sx={{ pl: 4 }}
                              >
                                <ListItemText primary={subBreed} />
                              </ListItemButton>
                            );
                          })}
                        </List>
                      </Collapse>
                    ) : null}
                  </React.Fragment>
                );
              })}
          </List>
        </ul>
      )}

      {src === "" ? null : (
        // <img src={src} style={{width: 400, height: 400}} alt=""></img>
        <Card sx={{ maxWidth: 345, height: 300}}>
          <CardMedia
            component="img"
            height="200"
            image={src}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {selectedBreedName}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {selectedSubbreedName}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
  // render(){
  //   const breedListArr = Object.keys(breedlist)

  // }
}

export default BreedList;
