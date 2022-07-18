import nookies from 'nookies';
import Link from 'next/link';
import { useState } from 'react';

export default function Themes({ themes }) {
  const [allData] = useState(themes.content);
  const [filteredData, setFilteredData] = useState(allData);

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];

    result = allData.filter((data) => {
      return data.title_alias.search(value) != -1;
    });
    setFilteredData(result);
  };

  const handleSearch1 = (event) => {
    let value = event.target.value;
    let result = [];

    result = allData.filter((data) => {
      return data.id.search(value) != -1;
    });
    setFilteredData(result);
  };

  return (
    <>
      <h1>Les themes</h1>
      {'\n'}
      <input
        list="title_data"
        type="search"
        placeholder="Rechercher un titre"
        onChange={(event) => handleSearch(event)}
      />
      <datalist id="title_data">
        {allData.map((item) => (
          <option key={item.id} value={item.title_alias} />
        ))}
      </datalist>
      {'\n'}
      <input
        list="id_data"
        type="search"
        placeholder="Rechercher un id"
        onChange={(event) => handleSearch1(event)}
      />
      <datalist id="id_data">
        {allData.map((item) => (
          <option key={item.id} value={item.id} />
        ))}
      </datalist>
      {'\n'}
      <ul>
        {filteredData.map((value, key) => {
          return (
            <li key={key}>
              <Link href={`/theme/${value.id}`}>
                <a>{value.id}</a>
              </Link>
              <h3>{value.title_alias}</h3>
            </li>
          );
        })}
      </ul>
      <br />
      <Link href="/">
        <a>Retour</a>
      </Link>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    let cookies = nookies.get(context).user_token;

    if (!cookies) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const res = await fetch(`${process.env.API_ENDPOINT}/v1/admin/themes`, {
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    });

    const themes = await res.json();

    if (!themes) {
      return {
        notFound: true,
      };
    }

    return { props: { themes } };
  } catch (err) {
    console.error(err);
  }
}
