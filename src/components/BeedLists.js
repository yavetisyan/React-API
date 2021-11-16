import React from "react";
import { v4 as uuidv4 } from "uuid";

class BreedList extends React.Component {
  state = {
    breedList: [],
  };

  getBreeds = async () => {
    const responce = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await responce.json();
    this.setState({
      breedList: data.message,
    });
  };

  imgSrc = async (breed) => {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    const data = await response.json();
    this.setState({
      src: data.message,
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
			<div></div>
        <div class="loader"></div>

        <ul>
          {breedListArr.map((breed) => {
            return (
              <li
                key={uuidv4()}
                onClick={() => this.imgSrc(breed)}
                style={{
                  margin: 10,
                  cursor: "pointer",
                  color: this.state.breedList[breed].length ? "red" : "green",
                }}
              >
                {breed}
              </li>
            );
          })}
        </ul>
        {this.state.src === "" ? null : (
          <img
            src={this.state.src}
            style={{ width: 300, height: 300, marginTop: 30 }}
            alt={"Dog Pic"}
          />
        )}
      </div>
    );
  }
}
export default BreedList;
