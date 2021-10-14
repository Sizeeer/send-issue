import { render, screen } from "@testing-library/react";
import { AdminForm } from "./AdminForm";

describe("AdminForm", () => {
  it("should render fields", () => {
    render(<AdminForm />);

    expect(screen.getByText(/Логин/i)).toBeInTheDocument();
    expect(screen.getByText(/^Пароль$/i)).toBeInTheDocument();
  });
});
