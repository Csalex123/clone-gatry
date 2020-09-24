import React from 'react';
import PromotionCard from '../Card';

import './List.scss';

function PromotionList({ loading, promotions }) {
    if (loading) {
        return (
        <div className="promotion-loading">
            <h2>Carregando...</h2>
        </div>);
    }

    return (
        <div className="promotion-list">
            {
                promotions.map(promotion => (
                    <PromotionCard key={promotion.id} promotion={promotion} />
                ))
            }
        </div>
    )
}

export default PromotionList;