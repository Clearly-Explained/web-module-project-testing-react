import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');
import Display from './../Display';

const testShow = {
    //add in approprate test data structure here.
    name: "Test Show",
    image:{
        medium: "https://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
        original: "https://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg"
        },
    seasons: [{id: 0, name: "Test Season 1", episodes: []},
                {id: 1, name: "Test Season 2", episodes: [{
                    //Add in approprate test data structure here.
                    id:1,
                    name: "",
                    image: null,
                    season: 1,
                    number: 1,
                    summary: "Text to test if correct content is passed.",
                    runtime: 1
                }]},
                {id: 2, name: "Test Season 3", episodes: []}],
    summary: "Test summary text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi pariatur ratione quos itaque, tempore dolore iste aut veritatis provident dolorem debitis, amet accusamus, quam adipisci distinctio quod eligendi similique ipsum!" 
}

test('renders without errors with no props', ()=>{
    render(<Display />);
    const imageSelector = screen.queryByAltText("header image");
    expect(imageSelector).toBeInTheDocument();
});

test('renders Show component when the button is clicked ', async ()=>{
    // Arrange
    render(<Display />);
    mockFetchShow.mockResolvedValueOnce(testShow);
    // Act
    const button = screen.getByRole("button");
    userEvent.click(button);
    // Assert the show-container div displays
    await waitFor(()=> {
        const showContainer = screen.getByTestId("show-container");
        expect(showContainer).toBeInTheDocument();
    });
});

test('renders show season options matching your data when the button is clicked', async ()=>{
     // Arrange
     render(<Display />);
     mockFetchShow.mockResolvedValueOnce(testShow);
     // Act
     const button = screen.getByRole("button");
     userEvent.click(button);
     // Assert the show-container div displays
     await waitFor(()=> {
         const showContainer = screen.getByTestId("show-container");
         expect(showContainer).toBeInTheDocument();
     });
     const seasonOptions = screen.getAllByTestId("season-option");
     expect(seasonOptions).toHaveLength(3);
});
