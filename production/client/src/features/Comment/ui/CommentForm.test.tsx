import { fireEvent, screen } from "@testing-library/react";
import CommentForm from "./CommentForm";
import { renderWithProviders } from "@/shared/utils/test-utils";
import { userSlice } from "@/entities/User/model/user.slice";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const createFunction = jest.fn();
const userInitialState = {
  id: 1,
  username: "j",
  email: "",
  createdAt: "",
  expireDate: 999999
};
describe("Comment form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should open on focus", () => {
    const { asFragment } = renderWithProviders(<CommentForm onCreate={createFunction} />, {
      slices: [userSlice],
      preloadedState: {
        user: userInitialState
      }
    });

    const textarea = screen.getByTestId("comment-form");
    expect(screen.queryByTestId("comment-form-button-submit")).not.toBeInTheDocument();
    fireEvent.focus(textarea);
    expect(screen.getByTestId("comment-form-button-submit")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
  it("should close on cancel button", async () => {
    const { asFragment } = renderWithProviders(<CommentForm onCreate={createFunction} />, {
      slices: [userSlice],
      preloadedState: {
        user: userInitialState
      }
    });

    const textarea = screen.getByTestId("comment-form");
    expect(screen.queryByTestId("comment-form-button-cancel")).not.toBeInTheDocument();

    fireEvent.focus(textarea);
    const cancelButton = screen.getByTestId("comment-form-button-cancel");
    expect(cancelButton).toBeInTheDocument();

    await userEvent.click(cancelButton);
    expect(screen.queryByTestId("comment-form-button-cancel")).toBeNull();
    expect(asFragment).toMatchSnapshot();
  });
  it("should send message on submit", async () => {
    const { asFragment } = renderWithProviders(<CommentForm onCreate={createFunction} />, {
      slices: [userSlice],
      preloadedState: {
        user: userInitialState
      }
    });
    const textarea = screen.getByTestId("comment-form");
    fireEvent.focus(textarea);
    const message = "Satisfying";
    fireEvent.input(textarea, {
      target: {
        value: message
      }
    });
    expect(asFragment()).toMatchSnapshot();

    await userEvent.click(screen.getByTestId("comment-form-button-submit"));
    expect(createFunction).toHaveBeenCalledTimes(1);
    expect(createFunction).toHaveBeenCalledWith(message, expect.anything());
  });
});