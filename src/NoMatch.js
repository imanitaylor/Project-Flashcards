import { useLocation } from "react-router-dom";

export function NoMatch() {
  const location = useLocation();

  return (
    <h3>
      Page not found for <code>{location.pathname}</code>
    </h3>
  );
}
