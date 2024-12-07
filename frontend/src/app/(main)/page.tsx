import { QueryConsumer } from "@/components/common/QueryConsumer";
import MainView from "./views/main";

export default function Home() {
  return (
    <QueryConsumer>
      <MainView />
    </QueryConsumer>
  );
}
