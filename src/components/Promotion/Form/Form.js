import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from 'services/api';

import './Form.scss';

function PromotionForm({ id }) {

    const initialForm = {
        title: '',
        url: '',
        imageUrl: '',
        price: 0,
    }

    const [form, setForm] = useState(id ? null : initialForm);

    useEffect(() => {

        const getPromotionFilted = async () => {
            if (id) {
                try {
                    const response = await api.get(`/promotions/${id}`);
                    setForm(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
        }

        getPromotionFilted();
    }, []);

    const history = useHistory();

    const onChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const method = id ? 'put' : 'post';
        const url = id
            ? `/promotions/${id}`
            : '/promotions';

        try {
            await api[method](url, form);
            history.push('/')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="promotion-form">
            <h1>Promo Show</h1>
            <h2>{id ? 'Editar' : 'Nova'} Promoção</h2>

            {!form
                ? (<div>Carregando...</div>)
                : (

                    <form onSubmit={onSubmit}>
                        <div className="promotion-form__group">
                            <label htmlFor="title">Título</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                placeholder="Digite o titulo"
                                value={form.title}
                                required
                                onChange={onChange}
                            />
                        </div>
                        <div className="promotion-form__group">
                            <label htmlFor="url">Url do produto</label>
                            <input
                                id="url"
                                name="url"
                                type="text"
                                placeholder="Digite o titulo"
                                value={form.url}
                                required
                                onChange={onChange} />
                        </div>
                        <div className="promotion-form__group">
                            <label htmlFor="imageUrl">Imagem (URL)</label>
                            <input id="imageUrl" name="imageUrl" type="text" placeholder="Digite o titulo" value={form.imageUrl} required onChange={onChange} />
                        </div>
                        <div className="promotion-form__group">
                            <label htmlFor="price" >Preço</label>
                            <input id="price" type="number" name="price" placeholder="Digite o preço" value={form.price} required onChange={onChange} />
                        </div>

                        <div>
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                )}
        </div>
    );

}


export default PromotionForm;