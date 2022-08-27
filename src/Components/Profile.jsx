import React from 'react'
import { useForm } from 'react-hook-form'

export default function Profile() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder='Full Name' {...register('name', { required: true })} />
            <input placeholder='Age' {...register('age', { required: true })} />
            <input placeholder='Home Address' {...register('h_address', { required: true })} />
            <input placeholder='Google Drive Link' {...register('gd_link', { required: true })} />

            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit" />
        </form>
    )
}
