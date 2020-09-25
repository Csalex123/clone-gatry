import React, { useState, useEffect } from 'react';
import PromotionList from 'components/Promotion/List';
import { Link } from 'react-router-dom';
import useApi from 'utils/useApi';

import './Search.scss';

function PromotionSearch() {
    const [search, setSearch] = useState('');
    const [load, loadInfo] = useApi({
        url: '/promotions',
        method: 'get',
        params: {
            _embed: 'comments',
            _order: 'desc',
            _sort: 'id',
            title_like: search || undefined,
        },
    });

    useEffect(() => {
        load();
    }, [search]);

    return (
        <div className="promotion-search">
            <header className="promotion-search__header">
                <h1>Promo show</h1>
                <Link to="/create">Nova promoção</Link>
            </header>
            <input
                className="promotion-search__input"
                type="search"
                placeholder="Buscar"
                value={search}
                onChange={(ev) => setSearch(ev.target.value)} />

            <PromotionList
                loading={loadInfo.loading}
                promotions={loadInfo.data}
                error={loadInfo.error}
            />
        </div>

    );
}

export default PromotionSearch;