import { useEffect } from "react";
import { tabTitle } from "../utils";

function UserChart() {
  useEffect(() => {
    tabTitle("User Chart");
  }, []);

  return (
    <div>User Chart</div>
  )
}

export default UserChart;