import Link from 'next/link';
import nookies from 'nookies'
import { useState } from 'react';
import { useRouter } from 'next/router'

export default function Organization({ organization, cookies }) {

  const [nameInput, setNameInput] = useState(organization.name)

  const router = useRouter()

  const editOrganization = async event => {

    event.preventDefault();

    if(organization.name !== nameInput && nameInput !== ""){
      try {
        const res = await fetch(`https://api.dev.citizenwave.me/api/v1/admin/organizations/${organization.id}`, {
          body: JSON.stringify({
            name: nameInput,
            bio: "TEST BIO"
          }),
          headers: {
              "Authorization": `Bearer ${cookies}`,
              'Content-Type': 'application/json'
          },
          method: 'PUT'
        })
  
        if (res.status === 200) {
          alert('Organisation modifié')
          router.push('/organizations')
        } else {
          alert('Erreur !')
        }
      
      }catch(err) {
        alert(err)
      }

    } else {
      alert('Veuillez modifier les champs de texte')
    }

  }

  return ( 
    <>
      <h1>Une organisation</h1>
      <div> 
        <p>{organization.id}</p>
        <p>{organization.name}</p>
      </div>
      <Link href="/organizations">
        <a>Retour</a>
      </Link>
      <form onSubmit={editOrganization}>
        <input type='text' placeholder='Nom organisation' value={nameInput} onChange={e => setNameInput(e.target.value)} required />
        <button type='submit'>Modifier</button>
      </form>
    </>
  )
}

export async function getServerSideProps(context) {

  let cookies = nookies.get(context).user_token

  if (!cookies) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const res = await fetch(`https://api.dev.citizenwave.me/api/v1/admin/organizations/${context.params.id}`, {
    headers: {
      "Authorization": `Bearer ${cookies}`
    }
  })

  const organization = await res.json()

  if (!organization) {
    return {
      notFound: true,
    }
  }

  return { props: { organization, cookies } }
}