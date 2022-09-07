import avro from 'avsc';

export default avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'designation',
      type: { type: 'enum', symbols: ['Lead', 'Developer' ,'Manager'] }
    },
    {
      name: 'name',
      type: 'string',
    }
  ]
});