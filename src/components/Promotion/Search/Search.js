import React, { useState, useEffect } from 'react';
import PromotionList from 'components/Promotion/List';
import { Link } from 'react-router-dom';
import api from 'services/api';

import './Search.scss';

function PromotionSearch() {
    const [promotions, setPromotions] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const params = {};
        if (search) {
            params.title_like = search;
        }
        const getAllPromotions = async () => {
            try {
                const response = await api.get('/promotions?_embed=comments', { params });
                setPromotions(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getAllPromotions();

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

            <PromotionList loading={ !promotions.length } promotions={promotions} />
        </div>

    );
}

export default PromotionSearch;