import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { InputField } from '../feature/form-controls/InputField';

// Định nghĩa giao diện cho các giá trị form
interface IFormInputs {
    title: string;
}

// Định nghĩa giao diện cho props
interface FormTodoProps {
    addTodo: (title: string) => void;
}

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('This field is required')
        .min(3, 'Title must be at least 3 characters'),
});

const FormTodo: React.FC<FormTodoProps> = ({ addTodo }) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: '',
        },
    });

    const onSubmit: SubmitHandler<IFormInputs> = (values) => {
        addTodo && addTodo(values.title);
        reset();
    };

    return (
        <form className='TodoForm' onSubmit={handleSubmit(onSubmit)}>
            <InputField
                name="title"
                label="Todo"
                control={control}
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ''}
                className="todo-input"
                placeholder='Add task'
                // rules={{ required: 'This field is required', minLength: { value: 3, message: 'Title must be at least 3 characters' } }}
            />
            <Button type="submit" variant="contained" color="primary" style={{ padding: '1rem' }}>
                Add Todo
            </Button>
        </form>
    );
};

export default FormTodo;
