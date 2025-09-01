import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "@/shared/utils/test-utils";
import { userSlice } from "@/entities/User/model/user.slice";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { userInitialState } from "@/entities/User/consts/testing-data";
import PostComment from "./PostComment";

const commentData = {
  user: { id: 0, img: "", username: "" },
  postId: 0,
  repliesQuantity: 0,
  message: "",
  id: 0,
  createdAt: ""
};
jest.mock("@/shared/api/base", () => ({
  fetcher: jest.fn().mockImplementation(() => () => Promise.resolve({
    createReply: { id: 0 }
  }))
}));

describe("Post Comment", () => {
  // it("should open replies", async () => {
  //   const { asFragment } = renderWithProviders(<PostComment comment={commentData} />);
  // });
  it("should open created replies", async () => {

    const { asFragment } = renderWithProviders(<PostComment comment={commentData} />, {
      slices: [userSlice],
      preloadedState: {
        user: {
          user: userInitialState
        }
      }
    });
    await userEvent.click(screen.getByTestId("reply-button"))
    const textarea = screen.getByTestId("comment-form");
    const message = "Satisfying";
    await userEvent.type(textarea, message);

    await userEvent.click(screen.getByTestId("comment-form-button-submit"));
    expect(screen.queryByTestId('replies')).toBeNull()
    await userEvent.click(screen.getByTestId("open-replies-button"));
    expect(screen.getByTestId('replies')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot();
  });
});