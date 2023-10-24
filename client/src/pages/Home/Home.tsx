import React from "react";
import { useHomeQuery } from "../../graphql";
const Home = () => {
  const { data, loading, error } = useHomeQuery();
  console.log(error);
  if (loading) return <h2>loading..</h2>;
  return (
    <h1>
      Home Pag <span>{data?.home}</span>e.
    </h1>
  );
};

export default Home;
