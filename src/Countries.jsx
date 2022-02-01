import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { sortOrder } from ".";

const COUNTRIES = gql`
  query Countries {
    sortedCountries @client {
      code
      name
      emoji
      nameWithEmoji
    }
    countries {
      code
      name
      emoji
      nameWithEmoji @client
    }
  }
`;

function Countries() {
  const {
    data: dataCountries,
    loading: loadingCountries,
    error: errorCountries,
  } = useQuery(COUNTRIES);

  useEffect(() => {
    setTimeout(() => sortOrder("ASC"), 5000);
  });

  return (
    <>
      {errorCountries && <h1>{`You broke it! ${errorCountries}`}</h1>}

      {!dataCountries || loadingCountries ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Countries with Flags</h1>
          <ul>
            {dataCountries?.sortedCountries?.map((country) => (
              <li key={country?.code}>
                {country?.name} {country?.emoji}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Countries;
