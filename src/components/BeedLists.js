import React from "react";

class BreedList extends React.Component {
  state = {
    breedList: [],
  };

  getBreeds = async () => {
    const responce = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await responce.json();
    const breedListArr = Object.keys(data.message);

    this.setState({
      breedList: breedListArr,
    });
  };

  componentDidMount() {
    this.getBreeds();
  }

	
  render() {
    return (
      <div>
        <div> this is breed BeedLists</div>
        <ul>
          {this.state.breedList.map((breed) => (
            <li>{breed}</li>
          ))}
        </ul>
      </div>
    );
  }
}
export default BreedList;
