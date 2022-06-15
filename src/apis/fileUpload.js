// import { serverAxios } from "apis/axios";
// const PREFIX_URL = "/api/v1/upload";

// export const getSearchRfqList = async (test) => {
//   try {
//     // TODO: GET 시도해보기
//     console.log(test);
//     const { data } = await serverAxios.post(`${PREFIX_URL}/rfqSearch`, test);
//     console.log("~~~", data);
//     return data;
//   } catch (err) {
    
//     throw new Error("Failed to load");
//   }
// };

function handleErrors(response) {
    if (!(response.status === 200 || response.status === 204 )) {
        return response.json()
            .then(response => {
                return Promise.reject({code: response.status, message: response.message});
            })
            .catch(err => {
                throw err;
            });
    } else {
        return response.status === 200 ? response.json() : new Promise(function (resolve, reject) {
            resolve();
        });
    }
}


export const uploadFile = async (file, title, details) => {
  try {
    // const { data } = await serverAxios.post(`${PREFIX_URL}`, test);
    const url = 'http://localhost:9080/api/v1/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('details', details);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    return fetch(url, {
        method: 'POST',
        body: formData,
        config: config
    })
    .then(handleErrors);

  } catch (err) {
    throw new Error("Failed to load");
  }
};

