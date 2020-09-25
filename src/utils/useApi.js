import { useState } from 'react';
import api from 'services/api';

const initialRequestInfo = {
    error: null,
    data: null,
    loading: false,
};

export default function useApi(config) {
    const [requestInfo, setRequestInfo] = useState(initialRequestInfo)

    async function call() {
        setRequestInfo({
            ...initialRequestInfo,
            loading: true
        });

        let response = null
        try {
            response = await api(config);
            setRequestInfo({
                ...initialRequestInfo,
                data: response.data,
            });


        } catch (error) {
            setRequestInfo({
                ...initialRequestInfo,
                error,
            })
        }

        if (config.onCompleted) {
            config.onCompleted(response);
        }
    }

    return [
        call,
        requestInfo
    ]
}