import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
//import { v4 as uuidv4 } from "uuid";
//import "./BreedList.css";
import CircularProgress from "@mui/material/CircularProgress";

class BreedList extends React.Component {
  state = {
    breedList: [],
    src: "",
    isLoading: false,
    isOpen: false,
  };

  getBreeds = async () => {
    this.setState({
      isLoading: true,
    });
    const responce = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await responce.json();
    this.setState({
      breedList: data.message,
      isLoading: false,
    });
  };

  onListItemButtonClick = async (breed) => {
    //const response = await fetch(
    //  `https://dog.ceo/api/breed/${breed}/images/random`
    //);
    //const data = await response.json();
    //this.setState({
    //  src: data.message,
    //});

    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  componentDidMount() {
    this.getBreeds();
  }

  render() {
    const breedListArr = Object.keys(this.state.breedList);

    return (
      <div
        style={{
          display: "flex",
        }}
      >
        {this.state.isLoading ? (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "trnaslateX(-50%)",
              zIndex: 50,
            }}
          />
        ) : (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {breedListArr.map((breed) => {
              return (
                <React.Fragment>
                  <ListItemButton
                    component="li"
                    key={breed}
                    onClick={() => this.onListItemButtonClick(breed)}
                    style={{
                      margin: 10,
                      cursor: "pointer",
                      color: this.state.breedList[breed].length
                        ? "red"
                        : "green",
                    }}
                  >
                    <ListItemText primary={breed} />
                  </ListItemButton>
                  {this.state.breedList[breed].length ? (
                    <Collapse
                      in={this.state.isOpen}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary="Starred" />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  ) : null}
                </React.Fragment>
              );
            })}
          </List>
        )}

        {this.state.src === "" ? null : (
          <img
            src={this.state.src}
            style={{ maxWidth: "100%", height: 500, marginTop: 30 }}
            alt={"Dog Pic"}
          />
        )}
      </div>
    );
  }
}
export default BreedList;
