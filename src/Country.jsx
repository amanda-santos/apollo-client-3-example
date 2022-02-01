import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
      nameWithEmoji @client
    }
  }
`;

function Country() {
  const [code, setCode] = useState("");
  const { data, loading, error } = useQuery(COUNTRY, {
    variables: { code: code.toUpperCase() },
    skip: code.length !== 2,
  });

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <>
      {error && <h1>{`You broke it! ${error}`}</h1>}

      <input type="text" value={code} onChange={handleChange} />

      {!data || loading ? (
        <h1>Insert a country code</h1>
      ) : (
        <h1>{data.country?.nameWithEmoji}</h1>
      )}
    </>
  );
}

export default Country;
