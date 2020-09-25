import { useState } from 'react';
import api from 'services/api';
import useDebouncedPromise from 'utils/useDebouncedPromise';

const initialRequestInfo = {
    error: null,
    data: null,
    loading: false,
};

export default function useApi(config) {
    const [requestInfo, setRequestInfo] = useState(initialRequestInfo);
    const debouncedAxios = useDebouncedPromise(api, config.debounceDelay);

    async function call(localConfig) {
        setRequestInfo({
            ...initialRequestInfo,
            loading: true
        });

        const finalConfig = {
            ...config,
            ...localConfig     
        }

        let response = null
        const fn = finalConfig.debounced ? debouncedAxios : api;
        try {
            response = await fn(finalConfig);
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