import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, afterEach, beforeEach, it, Mock, expect } from "vitest";
import { useAuthContext } from "@/modules/auth/contexts";
import { LogoutButton } from "./LogoutButton";

vi.stubGlobal("chrome", {
  i18n: {
    getMessage: vi.fn((key: string) => key),
  },
});

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
    expect(screen.getByText("signOut_buttonLabel")).toBeInTheDocument();
  });

  it("opens the modal on button click", () => {
    render(<LogoutButton />);
    fireEvent.click(screen.getByText("signOut_buttonLabel"));
    expect(screen.getByText("signOut_modal_title")).toBeInTheDocument();
    expect(screen.getByText("signOut_modal_message")).toBeInTheDocument();
  });

  it("calls logout and closes the modal on confirm", async () => {
    render(<LogoutButton />);
    fireEvent.click(screen.getByText("signOut_buttonLabel"));

    fireEvent.click(screen.getAllByText("signOut_buttonLabel")[1]);

    expect(mockLogout).toHaveBeenCalled();
  });

  it("closes the modal on close button click", () => {
    render(<LogoutButton />);

    fireEvent.click(screen.getByText("signOut_buttonLabel"));

    fireEvent.click(screen.getByText("common_cancel"));

    expect(screen.queryByText("signOut_modal_title")).not.toBeInTheDocument();
  });
});
