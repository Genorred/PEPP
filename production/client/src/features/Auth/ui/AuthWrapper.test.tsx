import { fireEvent, render, screen } from "@testing-library/react";
import { AuthWrapper } from "@/features/Auth";
import { useRouter } from "next/navigation";

jest.mock("next/navigation");

it("Auth wrapper handles google button", () => {
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
  });

  const returnUrl = "http://localhost:5678/auth/google";

  const { asFragment } = render(<AuthWrapper returnUrl={returnUrl} children={<></>} />);
  expect(screen.getByText(/Sign in With Google/i));
  expect(asFragment).toMatchSnapshot();

  const button = screen.getByTestId("sign-in-button");
  fireEvent.click(button);

  const url = new URL("http://localhost:7878/auth/google");
  url.searchParams.set("returnUrl", returnUrl);
  expect(useRouter().push).toHaveBeenCalledWith(url.href);
});