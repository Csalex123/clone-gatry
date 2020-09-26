import React, { useState } from 'react';
import PromotionCard from '../Card';
import SharedModal from 'shared/Modal/';
import './List.scss';

function PromotionList({ loading, promotions, error }) {
    const [promotionId, setPromotionId] = useState(null);

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

        <>
            <div className="promotion-list">
                {
                    promotions.map(promotion => (
                        <PromotionCard
                            key={promotion.id}
                            promotion={promotion}
                            onClickComments={() => setPromotionId(promotion.id)}
                             />
                    ))
                }
            </div>

            <SharedModal isOpen={ Boolean(promotionId) } onClickClose={() => setPromotionId(null)}>
                <h1>Comentáros</h1>
            </SharedModal>
        </>
    )
}

export default PromotionList;