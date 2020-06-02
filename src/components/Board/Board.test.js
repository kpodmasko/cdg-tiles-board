import React from "react";
import { render } from "@testing-library/react";

import Board from ".";
import getData from "@utils/getData";
import { testIds } from "@constants";
import { shuffle } from "@helpers";

const data = getData();

describe("testing Board component", () => {
  it("renders without error", () => {
    const { getByTestId } = render(<Board />);
    const root = getByTestId(testIds.board);

    expect(root).toBeInTheDocument();
  });

  it("handles prop className", () => {
    const testClassname = "test-classname";
    const { getByTestId } = render(<Board className={testClassname} />);
    const root = getByTestId(testIds.board);

    expect(root.classList.contains(testClassname)).toBe(true);
  });

  it("handles prop cards and game", () => {
    const game = shuffle(Object.keys(data));
    const { getAllByTestId } = render(<Board cards={data} game={game} />);
    const cards = getAllByTestId(testIds.card);

    expect(cards[10].getAttribute("id")).toBe(game[10]);
  });

  it("handles prop renderCardContent", () => {
    const renderCardContent = jest.fn();
    const game = shuffle(Object.keys(data));
    render(
      <Board cards={data} game={game} renderCardContent={renderCardContent} />
    );

    expect(renderCardContent.mock.calls.length).toBe(game.length);
  });

  it("opens clicked card", () => {
    const game = shuffle(Object.keys(data));
    const { getAllByTestId } = render(<Board cards={data} game={game} />);
    const cards = getAllByTestId(testIds.card);

    cards[0].click();

    expect(cards[0].classList.contains("card--opened")).toBe(true);
  });
});
