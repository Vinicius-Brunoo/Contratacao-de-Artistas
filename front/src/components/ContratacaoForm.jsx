import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createContratacao } from '../api';

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

function ContratacaoForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const artist = location.state?.artist;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        console.log('Dados do formulário:', data);
        try {
            await createContratacao({
                ...data,
                artista: artist.name,
            });
            navigate('/sucesso');
        } catch (error) {
            console.error('Erro ao criar contratação:', error);
        }
    };

    if (!artist) {
        navigate('/');
        return null;
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Contratar {artist.name}</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <input
                                        {...register('nome')}
                                        placeholder="Nome do Contratante"
                                        className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                                    />
                                    {errors.nome && 
                                        <div className="invalid-feedback">{errors.nome.message}</div>
                                    }
                                </div>

                                <div className="mb-3">
                                    <input
                                        {...register('cache')}
                                        placeholder="Cachê"
                                        type="number"
                                        className={`form-control ${errors.cache ? 'is-invalid' : ''}`}
                                    />
                                    {errors.cache && 
                                        <div className="invalid-feedback">{errors.cache.message}</div>
                                    }
                                </div>

                                <div className="mb-3">
                                    <input
                                        {...register('dataEvento')}
                                        placeholder="Data do Evento"
                                        type="date"
                                        className={`form-control ${errors.dataEvento ? 'is-invalid' : ''}`}
                                    />
                                    {errors.dataEvento && 
                                        <div className="invalid-feedback">{errors.dataEvento.message}</div>
                                    }
                                </div>

                                <div className="mb-3">
                                    <input
                                        {...register('endereco')}
                                        placeholder="Endereço"
                                        className={`form-control ${errors.endereco ? 'is-invalid' : ''}`}
                                    />
                                    {errors.endereco && 
                                        <div className="invalid-feedback">{errors.endereco.message}</div>
                                    }
                                </div>

                                <div className="d-grid gap-2">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg"
                                    >
                                        Confirmar Contratação
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/')}
                                    >
                                        Voltar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContratacaoForm;