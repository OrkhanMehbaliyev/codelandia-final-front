import { Flex } from "antd";
import LandingField from "../../features/app/home/LandingField";
import PopularProducts from "../../features/app/home/PopularProducts";
import { useState } from "react";
import SearchField from "../../features/app/home/SearchField";
import SearchedProducts from "../../features/app/home/SearchedProducts";

function Home() {
  const [query, setQuery] = useState("");
  return (
    <Flex gap={"50px"} vertical align="center" justify="center">
      <LandingField>
        <SearchField setQuery={setQuery} />
      </LandingField>
      {!query ? <PopularProducts /> : <SearchedProducts query={query} />}
    </Flex>
  );
}

export default Home;
