import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const testShow = {
    //add in approprate test data structure here.

    image: {
        medium: "https://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
        original: "https://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg"
    },//I retrieved this image data from the chrome console from the res data
    name: "Test Show",
    summary: "Test Summary blah blah blah",
    //note seasons is from fetchShow.js line 34 seasons: formatSeasons(data._embedded.episodes). Which is becuase the res data returns _embedded as episodes: Array
    seasons: [
        { id: 0, name: "Test Season 1", episodes: [] },
        { id: 1, name: "Tet Season 2", episodes: [] },
        { id: 2, name: "Test Season 3", episodes: [] },
        {
            id: 3, name: "Test Season 4", episodes: [{
                id: 3,
                image: null,
                name: "",
                number: 3,
                runtime: 3,
                season: 3,
                summary: "Text to test if passed or not"
            }]
        }],//the res data has more to it but this is all our app is useing. I put it in the same order as the chrome console.log of the response data just as can see it there on in postman. 
}

test('renders without errors', ()=>{
    render(<Show/>)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectedSeason={null}/>);
    let loading = screen.getByText(/Fetching data.../i);
    expect(loading).toHaveTextContent('Fetching data...');
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={testShow} selectedSeason={"none"} />);
  const seasonOptions = screen.queryAllByTestId("season-option");
  expect(seasonOptions).toHaveLength(4);
});

test('handleSelect is called when a season is selected', () => {
   //Arrange - render -  becomes a mock function as the prop this time.
   const handleSelect = jest.fn(() => { return ("TEST") });
   render(<Show show={testShow} selectedSeason="3" handleSelect={handleSelect} />);
   //Act - const/screen - could pick anything. Tried Season 3. 
   const select = screen.getByLabelText(/select a season/i)
   userEvent.selectOptions(select, ['1'])
   expect(handleSelect).toBeCalled()
});

test('component renders when no seasons are selected and then rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={testShow} selectedSeason="none" />);
    //Act
    let episodeDiv = document.getElementsByClassName("episode");
    //Assert
    expect(episodeDiv.length).toBe(0);

    //Arrange
    rerender(<Show show={testShow} selectedSeason={3} />)//remember above I selected season 3
    //Act
    episodeDiv = document.getElementsByClassName("episode");//already defined above useing let
    //Assert
    expect(episodeDiv.length).toBe(1);
});
