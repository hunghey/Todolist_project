import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { InputField } from '../feature/form-controls/InputField';

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('This field is required')
        .min(3, 'Title must be at least 3 characters'),
});

const FormTodo = ({ addTodo }) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: '',
        },
    });

    const onSubmit = (values) => {
        addTodo && addTodo(values.title);
        reset();
    };

    return (
        <form className = 'TodoForm' onSubmit={handleSubmit(onSubmit)}>
           <InputField 
                name="title"
                label="Todo"
                control={control}
                rules={{ required: 'This field is required', minLength: { value: 3, message: 'Title must be at least 3 characters' } }}
            />
            <Button type="submit" variant="contained" color="primary" style={{ padding: '1rem' }}>
                Add Todo
            </Button>
        </form>
    );
};

export default FormTodo;
