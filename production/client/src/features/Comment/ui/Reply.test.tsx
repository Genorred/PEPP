import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "@/shared/utils/test-utils";
import { userSlice } from "@/entities/User/model/user.slice";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { userInitialState } from "@/entities/User/consts/testing-data";
import Reply from "./Reply";

const commentData = {
  id: 99,
  message: "",
  user: {
    id: 0,
    username: ""
  },
  createdAt: "08/07/2025"
};
const respondedComment = {
  id: 1,
  message: "",
  user: {
    id: 2,
    username: "",
    img: ""
  }
};
const funcClosure = jest.fn();
const onCreate = jest.fn().mockImplementation((id?: number) => funcClosure);
describe("Reply", () => {
  it("should call create function", async () => {
    const { asFragment } = renderWithProviders(<Reply onCreate={onCreate} comment={commentData} />, {
      slices: [userSlice],
      preloadedState: {
        user: {
          user: userInitialState
        }
      }
    });

    await userEvent.click(screen.getByTestId("reply-button"));
    expect(onCreate).toHaveBeenCalledWith(commentData.id);

    const textarea = screen.getByTestId("comment-form");
    const message = "Satisfying";
    await userEvent.type(textarea, message);
    await userEvent.click(screen.getByTestId("comment-form-button-submit"));
    expect(funcClosure).toHaveBeenCalledWith(message, expect.any(Function));

    expect(asFragment()).toMatchSnapshot();
  });
  it("should display provided responded comment", () => {
    const { asFragment } = renderWithProviders(
      <Reply onCreate={onCreate}
             comment={{ ...commentData, respondedComment }}
      />
    );
    expect(screen.getByTestId("responded-comment")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it("should not display unprovided responded comment", () => {
    const { asFragment } = renderWithProviders(
      <Reply onCreate={onCreate}
             comment={commentData}
      />
    );
    expect(screen.queryByTestId("responded-comment")).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
});