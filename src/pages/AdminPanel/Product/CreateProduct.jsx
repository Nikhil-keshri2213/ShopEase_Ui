import React from 'react'
import { ArrayInput, BooleanInput, Create, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin'
import CategoryTypeInput from '../Category/CategoryTypeInput';
import { colorSelector } from '../../../components/Filters/ColorFilter';
import CustomImageInput from '../../../components/CustomImageInput/CustomImageInput'; // Import custom component

export const sizeSelector = ["S","M","L","XL","XXL"]

const CreateProduct = () => {
  return (
    <Create>
        <SimpleForm>
            <TextInput source='name' validate={[required()]}/>
            <TextInput source='slug' validate={[required()]}/>
            <TextInput source='description' validate={[required()]}/>
            <NumberInput source='price' validate={[required()]}/>
            <TextInput source='brand' validate={[required()]}/>
            
            {/* Refer category fields */}
            <ReferenceInput source='categoryId' reference='category'/>
            <CategoryTypeInput />

            {/* Replace ImageInput with CustomImageInput */}
            <CustomImageInput source='thumbnail' label='Thumbnail' />

            <ArrayInput source='variants'>
              <SimpleFormIterator inline>
                <SelectInput source='color' choices={Object.keys(colorSelector)} resettable/>
                <SelectInput source='size' choices={sizeSelector}/>
                <NumberInput source='stockQuantity'/>
              </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput source='productResource'>
              <SimpleFormIterator inline>
                <TextInput source='name' validate={[required()]}/>
                {/* Use CustomImageInput for product images too */}
                <CustomImageInput source='url' label='Product Image' />
                <SelectInput source='type' choices={["image"]}/>
                <BooleanInput source='isPrimary'/>
              </SimpleFormIterator>
            </ArrayInput>
            
            <NumberInput source='rating'/>
            <BooleanInput source='newArrival'/>
        </SimpleForm>
    </Create>
  )
}

export default CreateProduct