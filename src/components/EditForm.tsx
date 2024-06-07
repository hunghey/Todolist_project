import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { InputField } from '../feature/form-controls/InputField';

// Định nghĩa giao diện cho các props
interface EditFormProps {
  editTodo: (value: string, id: string) => void;
  task: {
    id: string;
    task: string;
    isCompleted: boolean;
    isEdited: boolean;
    status: string;
    filterStatus: string;
  };
}

// Định nghĩa schema validation cho form
const validationSchema = Yup.object().shape({
  task: Yup.string()
    .required('This field is required')
    .min(3, 'Task must be at least 3 characters'),
});

interface IFormInputs {
  task: string;
}

export const EditForm: React.FC<EditFormProps> = ({ editTodo, task }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      task: task.task,
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (values) => {
    editTodo(values.task, task.id);

  };

  return (
    <form className='TodoForm' onSubmit={handleSubmit(onSubmit)}>
    <InputField
        name="task"
        control={control}
        label="Update Task"
        error={!!errors.task}
        helperText={errors.task ? errors.task.message : ''}
        className="todo-input"
        placeholder='Update task'
    />
    <Button type="submit" variant="contained" color="primary" style={{ padding: '1rem' }}>
    Update Task
    </Button>
</form>
);
}

