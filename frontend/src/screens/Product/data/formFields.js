export const formFields = {
  left: [
    { label: 'Name', type: 'text', validation: { required: 'Field required' } },
    {
      label: 'Price',
      type: 'number',
      validation: {
        required: 'Field required',
      },
      step: 0.01,
    },
    {
      label: 'Description',
      type: 'textarea',
      validation: { required: 'Field required' },
    },
    {
      label: 'Category',
      type: 'text',
      validation: { required: 'Field required' },
    },
  ],
  right: [
    {
      label: 'Brand',
      type: 'text',
      validation: { required: 'Field required' },
    },
    {
      label: 'Count In Stock',
      type: 'number',
      validation: {
        required: 'Field required',
        validate: {
          inRange: (value) =>
            (value >= 0 && value <= 10) || 'Should be between 0-10 (inclusive)',
        },
      },
    },
    {
      label: 'Image URL',
      type: 'text',
      validation: { required: 'Field Required' },
    },
    {
      label: 'Image Upload',
      type: 'file',
    },
  ],
};
