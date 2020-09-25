import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useApi from 'utils/useApi';

import './Form.scss';

function PromotionForm({ id }) {

    const initialForm = {
        title: '',
        url: '',
        imageUrl: '',
        price: 0,
    }

    const [form, setForm] = useState(id ? null : initialForm);
    const history = useHistory();

    const [load] = useApi({
        url: `/promotions/${id}`,
        method: 'get',
        onCompleted: (response) => {
            setForm(response.data)
        }
    });

    const [save, saveInfo] = useApi({
        url: id ? `/promotions/${id}` : '/promotions',
        method: id ? 'put' : 'post',
        data: form,
        onCompleted: (response) => {
            if(!response.error){
                history.push('/');
            }
        }
    });

    useEffect(() => {
        if (id) {
            load();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    const onChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        save();
    }

    return (
        <div className="promotion-form">
            <h1>Promo Show</h1>
            <h2>{id ? 'Editar' : 'Nova'} Promoção</h2>

            {!form
                ? (<div>Carregando...</div>)
                : (
                   
                    <form onSubmit={onSubmit}>
                        {saveInfo.loading && <div> <h2 style={{ textAlign: 'center' }}>Salvando as informações.... </h2></div>}
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