function getBaseUrl(subdomain = null) {
    return 'http://127.0.0.1:5000'
}

function getHeaders() {
    let headers = {
        'Content-Type': 'application/json',
    }
    let accessToken = localStorage.getItem('accessToken')
    if(accessToken != null) {
        headers.Authorization = `Bearer ${accessToken}`
    }
    return headers
}

export async function GET(endPoint, subdomain = null) {
    let baseUrl = getBaseUrl(subdomain)
    let response = await fetch(`${baseUrl}/${endPoint}`, {
        headers: getHeaders()
    })
    let body = await response.json()
    return body
}

export async function DELETE(endPoint, subdomain = null) {
    let baseUrl = getBaseUrl(subdomain)
    let response = await fetch(`${baseUrl}/${endPoint}`, {
        method: 'DELETE',
        headers: getHeaders()
    })
    let body = await response.json()
    return body
}

export async function DOWNLOAD(endPoint, subdomain = null) {
    let baseUrl = getBaseUrl(subdomain)
    let response = await fetch(`${baseUrl}/${endPoint}`)
    let blob = await response.blob()
    return blob
}

export async function POST(endPoint, body, subdomain = null) {
    let baseUrl = getBaseUrl(subdomain)
    let response = await fetch(`${baseUrl}/${endPoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: getHeaders()
    })

    let data = response.json()
    return data
}

export async function POST_FORM_DATA(endPoint, body, subdomain = null) {
    let baseUrl = getBaseUrl(subdomain)
    let response = await fetch(`${baseUrl}/${endPoint}`, {
        method: 'POST',
        body: body,
        headers: {}
    })

    let data = response.json()
    return data
}


export async function PATCH(endPoint, body, subdomain = null) {
    let baseUrl = getBaseUrl(subdomain)
    let response = await fetch(`${baseUrl}/${endPoint}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: getHeaders()
    })

    let data = response.json()
    return data
}
