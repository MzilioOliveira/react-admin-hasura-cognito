import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput } from 'react-admin'

export const CustomersList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="street" />
      <TextField source="street_number" />
      <TextField source="city" />
      <TextField source="state" />
      <TextField source="country" />
      <TextField source="phones" />
      <EditButton basePath="/customers" />
    </Datagrid>
  </List>
)

const CustomerTitle = ({ record }) => {
  return <span>Customer {record ? `"${record.name}"` : ''}</span>
}

export const CustomerEdit = props => (
  <Edit title={<CustomerTitle record={props.record} />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="street" />
      <TextInput source="street_number" />
      <TextInput source="city" />
      <TextInput source="state" />
      <TextInput source="country" />
    </SimpleForm>
  </Edit>
)

export const CustomerCreate = props => (
  <Create title="Create a Customer" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="street" />
      <TextInput source="street_number" />
      <TextInput source="city" />
      <TextInput source="state" />
      <TextInput source="country" />
    </SimpleForm>
  </Create>
)
