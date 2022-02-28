export async function getNotes(userId: string, apiToken: string) {
  return fetch(`https://60b793ec17d1dc0017b8a6bc.mockapi.io/users/${userId}`,{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiToken}`
    }
  })
}

export async function postNote(userId: string, apiToken: string, note: string) {
  return fetch(`https://60b793ec17d1dc0017b8a6bc.mockapi.io/users/${userId}`,{
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    body: JSON.stringify({note})
  })
}
