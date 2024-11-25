import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi, describe, afterEach, beforeEach, it, Mock, expect } from "vitest";
import { useAuthContext } from "@/modules/auth/contexts";
import { LogoutButton } from "./LogoutButton";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@/modules/auth/contexts", () => ({
  useAuthContext: vi.fn(),
}));

describe("<LogoutButton />", () => {
  const mockLogout = vi.fn().mockResolvedValue(null);

  beforeEach(() => {
    (useAuthContext as Mock).mockReturnValue({
      logout: mockLogout,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the logout button", () => {
    render(<LogoutButton />);
    expect(screen.getByText("signOut.buttonLabel")).toBeInTheDocument();
  });

  it("opens the modal on button click", () => {
    render(<LogoutButton />);
    act(() => {
      fireEvent.click(screen.getByText("signOut.buttonLabel"));
    });

    expect(screen.getByText("signOut.modal.title")).toBeInTheDocument();
    expect(screen.getByText("signOut.modal.message")).toBeInTheDocument();
  });

  it("calls logout and closes the modal on confirm", async () => {
    render(<LogoutButton />);
    act(() => {
      fireEvent.click(screen.getByText("signOut.buttonLabel"));
      fireEvent.click(screen.getAllByText("signOut.buttonLabel")[1]);
    });

    expect(mockLogout).toHaveBeenCalled();
  });

  it("closes the modal on close button click", () => {
    render(<LogoutButton />);
    act(() => {
      fireEvent.click(screen.getByText("signOut.buttonLabel"));
      fireEvent.click(screen.getByText("common.cancel"));
    });

    expect(screen.queryByText("signOut.modal.title")).not.toBeInTheDocument();
  });
});
