const pinataJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNzdmMmMyNC05NTY4LTQ4ODAtODczZS1lZGM3Mzc3OWM0OGEiLCJlbWFpbCI6ImRndGxmdW5kQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMTc3MmYyZjllNmMyNzEwZmZhZSIsInNjb3BlZEtleVNlY3JldCI6Ijc2YmFlODNlZmVhZDU5YjA2ZmUxZGQxNjBlMzg1YWFlZDBmNmU1YWYwY2E4MWI5NjVkMzEzODg0NzFjNWNmMjIiLCJpYXQiOjE3MTgwNTE2MzF9.PHj6yDGUDYHIt8pEce-dRvC-cNJKf9Uydgqa0-KLDLs";

export const pinFileToIPFS = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const pinataMetadata = JSON.stringify({
      name: file.name,
    });

    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pinataJWT}`,
      },
      body: formData,
    });
    const resData = await res.json();
    return resData.IpfsHash;
  } catch (error) {
    console.log(error);
  }
}

export const pinJSONToIPFS = async (JSONFile: any) => {
  try {
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${pinataJWT}`, 'Content-Type': 'application/json'},
      body: `{"pinataOptions":{"cidVersion":1},"pinataMetadata":{"name":"metadata.json"},"pinataContent":${JSON.stringify(JSONFile)}}`
    };

    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options)
    const response = await res.json()
    console.log("hash json " + response.IpfsHash)
    return response.IpfsHash;
  } catch (e) {
    console.log(e)
  }

}