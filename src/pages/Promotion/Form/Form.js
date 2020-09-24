import React from 'react';
import { useParams } from 'react-router-dom';
import PromotionForm from 'components/Promotion/Form';
import Container from 'shared/Container';

function PagePromotionForm(props) {
    const { id } = useParams();

    return (
        <Container>
            <PromotionForm />
        </Container>
    );
}

export default PagePromotionForm;