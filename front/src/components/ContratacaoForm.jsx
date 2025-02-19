import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    cache: yup
        .number()
        .typeError('Cachê deve ser um número')
        .required('Cachê é obrigatório')
        .positive('Cachê deve ser positivo'),
    dataEvento: yup
        .date()
        .typeError('Data inválida')
        .required('Data do evento é obrigatória')
        .min(new Date(), 'Data deve ser futura'),
    endereco: yup.string().required('Endereço é obrigatório'),
});

const ContratacaoForm = ({ artist, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema), 
    });

    const onFormSubmit = (data) => {
        onSubmit({ ...data, artista: artist.name }); 
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
                <input
                    {...register('nome')}
                    placeholder="Nome"
                />
                {errors.nome && <span>{errors.nome.message}</span>}
            </div>

            <div>
                <input
                    {...register('cache')}
                    placeholder="Cachê"
                    type="number"
                />
                {errors.cache && <span>{errors.cache.message}</span>}
            </div>

            <div>
                <input
                    {...register('dataEvento')}
                    placeholder="Data do Evento"
                    type="date"
                />
                {errors.dataEvento && <span>{errors.dataEvento.message}</span>}
            </div>

            <div>
                <input
                    {...register('endereco')}
                    placeholder="Endereço"
                />
                {errors.endereco && <span>{errors.endereco.message}</span>}
            </div>

            <button type="submit">Enviar</button>
        </form>
    );

const ContratacaoForm = ({ artist, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <input {...register('nome')} placeholder="Nome" />
            {errors.nome && <span>{errors.nome.message}</span>}

            <input {...register('artista')} placeholder="Artista" value={artist.name} readOnly />
            {errors.artista && <span>{errors.artista.message}</span>}

            <input {...register('cache')} placeholder="Cachê" type="number" />
            {errors.cache && <span>{errors.cache.message}</span>}

            <input {...register('data_evento')} placeholder="Data do Evento" type="date" />
            {errors.data_evento && <span>{errors.data_evento.message}</span>}

            <input {...register('endereco')} placeholder="Endereço" />
            {errors.endereco && <span>{errors.endereco.message}</span>}

            <button type="submit">Enviar</button>
        </form>
    );
};
};

export default ContratacaoForm;