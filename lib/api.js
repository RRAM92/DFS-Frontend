export async function apiFetch(endpoint, options = {}){
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseURL}${endpoint}`, options);
    if(!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return res.json();
}

