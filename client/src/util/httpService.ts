class HttpService {

    static get(url: string, callback: Function) {
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
              callback(data);
            })
            .catch((err) => {
                throw new Error(err);
            })
    }
}

export default HttpService;