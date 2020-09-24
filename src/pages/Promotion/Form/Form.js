import React from 'react';
import { useParams } from 'react-router-dom';
import PromotionForm from 'components/Promotion/Form';
import Container from 'shared/Container';

function PagePromotionForm(props) {
    const { id } = useParams();

    return (
        <Container>
            <PromotionForm id={ id ? Number.parseInt(id, 10) : null } />
        </Container>
    );
}

export default PagePromotionForm;