import { fireEvent, screen } from "@testing-library/react";
import CommentForm from "./CommentForm";
import { renderWithProviders } from "@/shared/utils/test-utils";
import { userSlice } from "@/entities/User/model/user.slice";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { userInitialState } from "@/entities/User/consts/testing-data";

const createFunction = jest.fn();
describe("Comment form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should not open on focus with unauthorized user", () => {
    const { asFragment } = renderWithProviders(<CommentForm onCreate={createFunction} />, {
      slices: [userSlice],
      preloadedState: {
        user: {
          user: null
        }
      }
    });

    const textarea = screen.getByTestId("comment-form");
    expect(textarea).toBeDisabled();
    expect(screen.queryByTestId("comment-form-button-submit")).not.toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
  it("should open on focus with authorized user", () => {
    const { asFragment } = renderWithProviders(<CommentForm onCreate={createFunction} />, {
      slices: [userSlice],
      preloadedState: {
        user: {
          user: userInitialState
        }
      }
    });

    const textarea = screen.getByTestId("comment-form");
    expect(screen.queryByTestId("comment-form-button-submit")).not.toBeInTheDocument();
    expect(textarea).toBeEnabled();
    fireEvent.focus(textarea);
    expect(screen.getByTestId("comment-form-button-submit")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should close on cancel button", async () => {
    const { asFragment } = renderWithProviders(<CommentForm onCreate={createFunction} />, {
      slices: [userSlice],
      preloadedState: {
        user: {
          user: userInitialState
        }
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
        user: {
          user: userInitialState
        }
      }
    });
    const textarea = screen.getByTestId("comment-form");
    fireEvent.focus(textarea);
    const message = "Satisfying";
    await userEvent.type(textarea, message);

    expect(asFragment()).toMatchSnapshot();

    await userEvent.click(screen.getByTestId("comment-form-button-submit"));
    expect(createFunction).toHaveBeenCalledTimes(1);
    expect(createFunction).toHaveBeenCalledWith(message, expect.anything());
  });
});