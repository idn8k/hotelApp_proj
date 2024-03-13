import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import { createCabin } from '../../services/apiCabins';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

function CreateCabinForm() {
   const { register, handleSubmit, reset, getValues, formState } = useForm();

   const { errors } = formState;

   const queryClient = useQueryClient();

   const { mutate, isLoading: creatingCabin } = useMutation({
      mutationFn: createCabin,

      onSuccess: () => {
         toast.success('New cabin created!');
         queryClient.invalidateQueries({
            queryKey: ['cabins'],
         });
         reset();
      },
      onError: (err) => toast.error(err.message),
   });

   function onSubmit(data) {
      mutate({ ...data, image: data.image[0] });
   }

   function onError(errors) {
      // console.log(errors);
   }

   return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
         <FormRow
            label="Cabin name"
            error={errors?.name?.message}
         >
            <input
               disabled={creatingCabin}
               type="text"
               id="name"
               {...register('name', {
                  required: 'This field is required',
               })}
            />
         </FormRow>

         <FormRow
            label="Maximum capacity"
            error={errors?.maxCapacity?.message}
         >
            <Input
               disabled={creatingCabin}
               type="number"
               id="maxCapacity"
               {...register('maxCapacity', {
                  required: 'This field is required',
                  min: {
                     value: 1,
                     message: 'Capacity should be at list 1',
                  },
               })}
            />
         </FormRow>

         <FormRow
            label="Regular price"
            error={errors?.regularPrice?.message}
         >
            <Input
               disabled={creatingCabin}
               type="number"
               id="regularPrice"
               {...register('regularPrice', {
                  required: 'This field is required',
                  min: {
                     value: 1,
                     message: 'Price should be at list 1',
                  },
               })}
            />
         </FormRow>

         <FormRow
            label="Discount"
            error={errors?.discount?.message}
         >
            <Input
               disabled={creatingCabin}
               type="number"
               id="discount"
               defaultValue={0}
               {...register('discount', {
                  required: 'This field is required',
                  validate: (value) =>
                     value <= getValues().regularPrice ||
                     'Discount should be less than the regular price',
               })}
            />
         </FormRow>

         <FormRow
            label="Description for website"
            error={errors?.description?.message}
         >
            <Textarea
               disabled={creatingCabin}
               type="number"
               id="description"
               {...register('description', {
                  required: 'This field is required',
               })}
               defaultValue=""
            />
         </FormRow>

         <FormRow label="Cabin photo">
            <FileInput
               id="image"
               accept="image/*"
               type="file"
               {...register('image', {
                  required: 'This field is required',
               })}
            />
         </FormRow>

         <FormRow>
            {/* type is an HTML attribute! */}
            <Button
               variation="secondary"
               type="reset"
            >
               Cancel
            </Button>
            <Button disabled={creatingCabin}>Add cabin</Button>
         </FormRow>
      </Form>
   );
}

export default CreateCabinForm;
