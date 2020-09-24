import React, { useState, useEffect } from 'react';
import PromotionCard from 'components/Promotion/Card';
import api from 'services/api';

import './Search.scss';

function PagesPromotionSearch(props) {
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {

        const getAllPromotions = async () => {
            try {
                const response = await api.get('/promotions?_embed=comments');
                setPromotions(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getAllPromotions();

    }, []);

    return (
        <div className="Search">
            {
                promotions.map(promotion => (
                    <PromotionCard key={promotion.id} promotion={promotion} />
                ))
            }
        </div>
    );
}

export default PagesPromotionSearch;