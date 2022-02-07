import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import userEvent from "@testing-library/user-event";

jest.mock("next/image", () => ({
  // eslint-disable-next-line
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line
    return <img {...props} />;
  },
}));

describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("begins with a score of 0", () => {
    render(<Home />);
    const score = screen.getByTestId("score");
    expect(score).toHaveTextContent("0");
  });

  it("begins without lizard & spock checkbox checked", () => {
    render(<Home />);
    const modeCheckbox = screen.getByTestId("mode-checkbox");
    expect(modeCheckbox).not.toBeChecked();
  });

  it("begins with rock, paper, and scissors buttons but not lizard or spock buttons", () => {
    render(<Home />);
    const rockButton = screen.getByTestId("button-rock");
    const paperButton = screen.getByTestId("button-paper");
    const scissorsButton = screen.getByTestId("button-scissors");
    const lizardButton = screen.queryByTestId("button-lizard");
    const spockButton = screen.queryByTestId("button-spock");
    expect(rockButton).toBeInTheDocument();
    expect(paperButton).toBeInTheDocument();
    expect(scissorsButton).toBeInTheDocument();
    expect(lizardButton).not.toBeInTheDocument();
    expect(spockButton).not.toBeInTheDocument();
  });

  it("begins without rendering rules modal", () => {
    render(<Home />);
    const rulesModal = screen.queryByTestId("rules-modal");
    expect(rulesModal).not.toBeInTheDocument();
  });

  it("renders rules modal when rules button is clicked", () => {
    render(<Home />);
    const rulesButton = screen.getByTestId("rules-button");
    userEvent.click(rulesButton);
    const rulesModal = screen.queryByTestId("rules-modal");
    expect(rulesModal).toBeInTheDocument();
  });

  it("hides rules modal when hide rules modal button is clicked", () => {
    render(<Home />);
    const rulesButton = screen.getByTestId("rules-button");
    userEvent.click(rulesButton);
    const hideRulesModalButton = screen.getByTestId("hide-rules-modal-button");
    userEvent.click(hideRulesModalButton);
    const rulesModal = screen.queryByTestId("rules-modal");
    expect(rulesModal).not.toBeInTheDocument();
  });

  it("shows lizard and spock buttons and checks mode checkbox when checkbox control is clicked", () => {
    render(<Home />);
    const modeCheckboxControl = screen.getByTestId("mode-checkbox-control");
    userEvent.click(modeCheckboxControl);
    const modeCheckbox = screen.getByTestId("mode-checkbox");
    const lizardButton = screen.getByTestId("button-lizard");
    const spockButton = screen.getByTestId("button-spock");
    expect(modeCheckbox).toBeChecked();
    expect(lizardButton).toBeInTheDocument();
    expect(spockButton).toBeInTheDocument();
  });

  it("hides lizard and spock buttons and unchecks mode checkbox when checkbox control is clicked for a second time", () => {
    render(<Home />);
    const modeCheckboxControl = screen.getByTestId("mode-checkbox-control");
    userEvent.click(modeCheckboxControl);
    userEvent.click(modeCheckboxControl);
    const modeCheckbox = screen.queryByTestId("mode-checkbox");
    const lizardButton = screen.queryByTestId("button-lizard");
    const spockButton = screen.queryByTestId("button-spock");
    expect(modeCheckbox).not.toBeChecked();
    expect(lizardButton).not.toBeInTheDocument();
    expect(spockButton).not.toBeInTheDocument();
  });

  it("shows user and house choices after user clicks a game button", () => {
    render(<Home />);
    const rockButton = screen.getByTestId("button-rock");
    userEvent.click(rockButton);
    expect(screen.getByText("You picked")).toBeInTheDocument();
    expect(screen.getByText("The house picked")).toBeInTheDocument();
  });

  it("correctly determines winner when user picks rock", () => {
    render(<Home />);
    const rockButton = screen.getByTestId("button-rock");
    userEvent.click(rockButton);
    const result = screen.getByTestId("result");
    if (result.textContent === "Tie game") {
      expect(screen.getAllByAltText("rock")).toHaveLength(2);
    } else if (result.textContent === "You win") {
      expect(screen.getByAltText("scissors")).toBeInTheDocument();
    } else {
      expect(screen.getByAltText("paper")).toBeInTheDocument();
    }
  });

  it("correctly determines winner when user picks paper", () => {
    render(<Home />);
    const paperButton = screen.getByTestId("button-paper");
    userEvent.click(paperButton);
    const result = screen.getByTestId("result");
    if (result.textContent === "Tie game") {
      expect(screen.getAllByAltText("paper")).toHaveLength(2);
    } else if (result.textContent === "You win") {
      expect(screen.getByAltText("rock")).toBeInTheDocument();
    } else {
      expect(screen.getByAltText("scissors")).toBeInTheDocument();
    }
  });

  it("correctly determines winner when user picks scissors", () => {
    render(<Home />);
    const scissorsButton = screen.getByTestId("button-scissors");
    userEvent.click(scissorsButton);
    const result = screen.getByTestId("result");
    if (result.textContent === "Tie game") {
      expect(screen.getAllByAltText("scissors")).toHaveLength(2);
    } else if (result.textContent === "You win") {
      expect(screen.getByAltText("paper")).toBeInTheDocument();
    } else {
      expect(screen.getByAltText("rock")).toBeInTheDocument();
    }
  });

  it("correctly determines winner when user picks lizard", () => {
    render(<Home />);
    const modeCheckboxControl = screen.getByTestId("mode-checkbox-control");
    userEvent.click(modeCheckboxControl);
    const lizardButton = screen.getByTestId("button-lizard");
    userEvent.click(lizardButton);
    const result = screen.getByTestId("result");
    if (result.textContent === "Tie game") {
      expect(screen.getAllByAltText("lizard")).toHaveLength(2);
    } else if (result.textContent === "You win") {
      try {
        expect(screen.getByAltText("paper")).toBeInTheDocument();
      } catch {
        expect(screen.getByAltText("spock")).toBeInTheDocument();
      }
    } else {
      try {
        expect(screen.getByAltText("rock")).toBeInTheDocument();
      } catch {
        expect(screen.getByAltText("scissors")).toBeInTheDocument();
      }
    }
  });

  it("correctly determines winner when user picks spock", () => {
    render(<Home />);
    const modeCheckboxControl = screen.getByTestId("mode-checkbox-control");
    userEvent.click(modeCheckboxControl);
    const spockButton = screen.getByTestId("button-spock");
    userEvent.click(spockButton);
    const result = screen.getByTestId("result");
    if (result.textContent === "Tie game") {
      expect(screen.getAllByAltText("spock")).toHaveLength(2);
    } else if (result.textContent === "You win") {
      try {
        expect(screen.getByAltText("scissors")).toBeInTheDocument();
      } catch {
        expect(screen.getByAltText("rock")).toBeInTheDocument();
      }
    } else {
      try {
        expect(screen.getByAltText("paper")).toBeInTheDocument();
      } catch {
        expect(screen.getByAltText("lizard")).toBeInTheDocument();
      }
    }
  });

  it("correctly increments/decrements score after game is finished", () => {
    render(<Home />);
    const rockButton = screen.getByTestId("button-rock");
    userEvent.click(rockButton);
    const result = screen.getByTestId("result");
    const score = screen.getByTestId("score");
    if (result.textContent === "Tie game") {
      expect(score).toHaveTextContent("0");
    } else if (result.textContent === "You win") {
      expect(score).toHaveTextContent("1");
    } else {
      expect(score).toHaveTextContent("-1");
    }
  });

  it("returns to game start when user clicks play again button", () => {
    render(<Home />);
    let rockButton = screen.getByTestId("button-rock");
    userEvent.click(rockButton);
    const playAgainButton = screen.getByText("Play Again");
    userEvent.click(playAgainButton);
    rockButton = screen.getByTestId("button-rock");
    expect(rockButton).toBeInTheDocument();
  });
});
