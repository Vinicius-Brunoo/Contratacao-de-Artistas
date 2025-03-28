import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createContratacao } from '../api';
import dayjs from 'dayjs';
import axios from 'axios';

const ContratacaoForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const artist = location.state?.artist; // Retrieve artist details from navigation state

    // Validation schema for form inputs
    const schema = yup.object().shape({
        nome: yup.string().required('Nome é obrigatório'),
        cache: yup
            .number()
            .typeError('Cachê deve ser um número')
            .required('Cachê é obrigatório')
            .positive('Cachê deve ser positivo'),
        dataEvento: yup
            .string()
            .required('Data do evento é obrigatória')
            .test('valid-date', 'Data inválida', (value) => dayjs(value, 'YYYY-MM-DD', true).isValid())
            .test('future-date', 'Data deve ser futura', (value) => 
                dayjs(value, 'YYYY-MM-DD', true).isValid() && dayjs(value, 'YYYY-MM-DD', true).isAfter(dayjs())
            ),
        endereco: yup.string().required('Endereço é obrigatório'),
    });

    // React Hook Form setup with Yup validation
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [cep, setCep] = useState('');
    const [cepError, setCepError] = useState('');

    // Function to handle the CEP lookup
    const handleCepChange = async (e) => {
        const value = e.target.value;
        setCep(value);

        if (value.length === 8) { // When the CEP is 8 digits
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
                if (response.data.erro) {
                    setCepError('CEP não encontrado');
                    setValue('endereco', '');
                } else {
                    setCepError('');
                    setValue('endereco', `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`);
                }
            } catch (error) {
                setCepError('Erro ao buscar CEP');
            }
        }
    };

    // Form submission handler
    const onSubmit = async (data) => {
        console.log('Dados do formulário:', data);
        try {
            const dataFormatada = dayjs(data.dataEvento, 'YYYY-MM-DD', true).isValid()
                ? dayjs(data.dataEvento).format('YYYY-MM-DD')
                : null;

            await createContratacao({
                ...data,
                dataEvento: dataFormatada,
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
                                        {...register('cep')}
                                        placeholder="CEP"
                                        type="text"
                                        value={cep}
                                        onChange={handleCepChange}
                                        className={`form-control ${cepError ? 'is-invalid' : ''}`}
                                    />
                                    {cepError && <div className="invalid-feedback">{cepError}</div>}
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
};

export default ContratacaoForm;
