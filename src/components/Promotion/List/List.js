import React from 'react';
import PromotionCard from '../Card';

import './List.scss';

function PromotionList({ loading, promotions, error }) {
    if (loading || promotions === null) {
        return (
            <div className="promotion-loading">
                <h2>Carregando...</h2>
            </div>);
    }

    if (promotions.length === 0) {
        return <div> <h2>Nenhum resultado encontrado</h2> </div>
    }

    if (error) {
        return <div><h2>Algo de errado não está certo.</h2></div>
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