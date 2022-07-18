import nookies from 'nookies';
import { useState } from 'react';
import Link from 'next/link';
import { wrapper } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';

export default function Organizations({ cookies }) {
  const [newName, setNewName] = useState('');
  console.log();
  const [publicSearch, setPublicSearch] = useState('');
  const [authSearch, setAuthSearch] = useState('');

  const { organizations } = useSelector((state) => state.organizations);
  const dispatch = useDispatch();

  console.log(organizations);

  const [allData] = useState(organizations);
  const [filteredData, setFilteredData] = useState(allData);

  const nameInput = (event) => {
    let value = event.target.value;

    let result = [];

    result = allData.filter((data) => {
      return data.name.search(value) != -1;
    });

    setFilteredData(result);
  };

  const idInput = (event) => {
    let value = event.target.value;

    let result = [];

    result = allData.filter((data) => {
      return data.id.search(value) != -1;
    });

    setFilteredData(result);
  };

  const publicSelect = (event) => {
    setPublicSearch(event.target.value);

    let result = [];

    result = allData.filter((data) => {
      if (publicSearch !== '') {
        if (publicSearch === 'true') {
          return data.public === true;
        }

        if (publicSearch === 'false') {
          return data.public === false;
        }
      }
      return data.public != -1;
    });
    setFilteredData(result);
  };

  const authSelect = (event) => {
    setAuthSearch(event.target.value);

    let result = [];

    result = allData.filter((data) => {
      if (authSearch !== '') {
        if (authSearch === 'true') {
          return data.required_authentication === true;
        }

        if (authSearch === 'false') {
          return data.required_authentication === false;
        }
      }
      return data.required_authentication != -1;
    });

    setFilteredData(result);
  };

  const addOrganization = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `${process.env.API_ENDPOINT}/v1/admin/organizations`,
        {
          body: JSON.stringify({
            name: newName,
          }),
          headers: {
            Authorization: `Bearer ${cookies}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }
      );

      if (res.status === 200) {
        alert('Organisation ajouté');
        setNewName('');
      } else {
        alert('Erreur !');
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <h1>Les organisations</h1>
      <form onSubmit={addOrganization}>
        <input
          type="text"
          placeholder="Nouveau nom"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
      <select value={publicSearch} onChange={(event) => publicSelect(event)}>
        <option value="">-- Public --</option>
        <option value="true">Oui</option>
        <option value="false">Non</option>
      </select>
      {'\n'}
      <select value={authSearch} onChange={(event) => authSelect(event)}>
        <option value="">-- Authentification requise --</option>
        <option value="true">Oui</option>
        <option value="false">Non</option>
      </select>
      {'\n'}
      <input
        list="name_data"
        type="search"
        placeholder="Rechercher un nom"
        onChange={nameInput}
      />
      <datalist id="name_data">
        {allData.map((item) => (
          <option key={item.id} value={item.name} />
        ))}
      </datalist>
      {'\n'}
      <input
        list="id_data"
        type="search"
        placeholder="Rechercher un id"
        onChange={idInput}
      />
      <datalist id="id_data">
        {allData.map((item) => (
          <option key={item.id} value={item.id} />
        ))}
      </datalist>
      {'\n'}
      <ul>
        {filteredData.map((value) => {
          return (
            <li key={value.id}>
              <Link href={`/organization/${value.id}`}>
                <a>{value.id}</a>
              </Link>
              <h3>{value.name}</h3>
              <p>{value.public === true ? 'public' : 'non public'}</p>
              <p>
                {value.required_authentication === true
                  ? 'Authentification requise'
                  : 'Authentification non requise'}
              </p>
            </li>
          );
        })}
      </ul>
      {'\n'}
      <Link href="/">
        <a>Retour</a>
      </Link>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store, context) => async () => {
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

      const res = await fetch(
        `${process.env.API_ENDPOINT}/v1/admin/organizations`,
        {
          headers: {
            Authorization: `Bearer ${cookies}`,
          },
        }
      );

      const organizations = await res.json();

      if (!organizations) {
        return {
          notFound: true,
        };
      }

      return { props: { organizations, cookies } };
    } catch (err) {
      console.error(err);
    }
  }
);
