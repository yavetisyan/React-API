import { List, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./BreedList.css";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Breed from "./Breed";
import { Routes, Route, useNavigate } from "react-router-dom";

function BreedList() {
  const navigate = useNavigate();
  console.log(navigate);

  const [breedlist, setBreedlist] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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
    if (!subBreed) {
      navigate(`Breed/${breed}`);
    } else {
      navigate(`Breed/${breed}/${subBreed}`);
    }
  };

  const breedListArr = Object.keys(breedlist);

  return (
    <div
      style={{
        display: "flex",
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
            sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper", overflowY:'auto ', maxHeight:700 }}
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
                      onClick={() => imgSrc(breed)}
                    >
                      <ListItemText primary={breed} />

                      {/*<Link to={`Breed/${breed}`}> {breed} </Link>*/}

                      {!!subBreedArr.length &&
                        (isOpenData[breed] ? (
                          <ExpandLess
                            onClick={(e) => {
                              e.stopPropagation();
                              onItemClick(breed);
                            }}
                          />
                        ) : (
                          <ExpandMore
                            onClick={(e) => {
                              e.stopPropagation();
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
      <Routes>
        <Route path={`Breed/:breed`} element={<Breed />} />
        <Route path={`Breed/:breed/:subBreed`} element={<Breed />} />
      </Routes>
    </div>
  );
}

export default BreedList;
