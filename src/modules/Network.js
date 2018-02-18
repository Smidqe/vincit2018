import $ from 'jquery'

const Network = {
    request: (url, type, data, success, fail) => {
        let result = null;
        let config = {
            type: type,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        if (type === 'POST')
            config.data = JSON.stringify(data);

        $.ajax(url, config).done(success).fail(fail);
    }
}


export default Network