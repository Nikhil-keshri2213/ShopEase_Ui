import React from 'react'
import { ArrayInput, BooleanInput, Edit, ImageField, NumberInput, required, SelectInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin'
import { colorSelector } from '../../../components/Filters/ColorFilter';
import { sizeSelector } from './CreateProduct'
import CustomImageInput from '../../../components/CustomImageInput/CustomImageInput'; // Import custom component

const EditProduct = () => {
  return (
    <Edit>
        <SimpleForm>
            <TextInput label="Name" source='name'/>
            <TextInput label="Description" source='description'/>
            <TextInput label="Price" source='price' type='number'/>
            <TextInput label="Brand" source='brand'/>
            <TextInput label="Slug" source='slug' />

            {/* Show existing thumbnail */}
            {/* <ImageField source='thumbnail' label='Current Thumbnail'/> */}
            {/* Upload new thumbnail */}
            <CustomImageInput source='thumbnail' label='Update Thumbnail' />

            <ArrayInput source='variants' label={'Edit Variants'}>
              <SimpleFormIterator inline>
                <SelectInput source='color' choices={Object.keys(colorSelector)} resettable/>
                <SelectInput source='size' choices={sizeSelector}/>
                <NumberInput source='stockQuantity'/>
              </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput source='productResource'>
              <SimpleFormIterator inline>
                <CustomImageInput source='url' label='Update Product Image' />
                <TextInput source='name' validate={[required()]}/>
                <SelectInput source='type' choices={["image"]}/>
                <BooleanInput source='isPrimary'/>
              </SimpleFormIterator>
            </ArrayInput>
            
        </SimpleForm>
    </Edit>
  )
}

export default EditProduct