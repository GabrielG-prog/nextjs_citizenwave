import Link from 'next/link'
import nookies from 'nookies'
import { useState } from 'react'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export default function Collections({ collections, organizations, profiles }) {
  const [allData] = useState(collections.content)
  const [filteredData, setFilteredData] = useState(allData)

  const idInput = (event) => {
    let value = event.target.value

    let result = []

    result = allData.filter((data) => {
      return data.id.search(value) != -1
    })
    setFilteredData(result)
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Les collections
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
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
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Identifiant</TableCell>
                <TableCell align="right">Auteur</TableCell>
                <TableCell align="right">Organisation</TableCell>
                <TableCell align="right">Profil</TableCell>
                <TableCell align="right">Titre</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((value) => (
                <TableRow
                  key={value.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link href={`/account/${value.id}`}>
                      <a>{value.id}</a>
                    </Link>
                  </TableCell>
                  <TableCell align="right">{value.author}</TableCell>
                  <TableCell align="right">
                    {organizations.content.map((o) => {
                      if (o.id === value.organization) {
                        return (
                          <Link href={`/organization/${o.id}`}>
                            <a>{o.name}</a>
                          </Link>
                        )
                      }
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {profiles.content.map((p) => {
                      if (p.id === value.profile) {
                        return (
                          <Link href={`/profile/${p.id}`}>
                            <a>
                              {p.first_name} {p.last_name}
                            </a>
                          </Link>
                        )
                      }
                    })}
                  </TableCell>
                  <TableCell align="right">{value.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    let cookies = nookies.get(context).user_token

    if (!cookies) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    const [collectionsRes, organizationsRes, profilesRes] = await Promise.all([
      fetch('https://api.dev.citizenwave.me/api/v1/admin/collections', {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      }),
      fetch('https://api.dev.citizenwave.me/api/v1/admin/organizations', {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      }),
      fetch('https://api.dev.citizenwave.me/api/v1/admin/profiles', {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      }),
    ])
    const [collections, organizations, profiles] = await Promise.all([
      collectionsRes.json(),
      organizationsRes.json(),
      profilesRes.json(),
    ])

    if (!collections && !organizations && !profiles) {
      return {
        notFound: true,
      }
    }

    return { props: { collections, organizations, profiles } }
  } catch (err) {
    console.error(err)
  }
}
